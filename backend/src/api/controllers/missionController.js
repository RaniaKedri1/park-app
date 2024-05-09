const Mission = require('../models/mission')
const path = require('path')
const Vehicle = require('../models/Vehicle');

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const register = async (req, res) => {
    try {
        if (!req.body) {
            throw new Error("Request body info is missing or invalid");
        }
        const { user, dateArrive, dateDepart, is_verified } = req.body;
        const image = `http://localhost:5000/uploads/${req.file.filename}`;
        const voitureId = req.params.voitureId
        const voiture = await Vehicle.findById(voitureId);
        if (!voiture) {
            return res.status(404).json({ error: 'vehicle not found' });
        }
        const mission = await Mission.findOne({ user, voiture: voitureId })

        // console.log(image);
        const newMission = await Mission.create({
            user,
            vehicle: voitureId,
            dateDepart,
            dateArrive,
            is_verified,
            image,
        });  

        const savedMission = await newMission.save();

        await Vehicle.findByIdAndUpdate(voitureId, {
            $push: { missions: savedMission._id },
        });

        res.json(savedMission);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: `something went wrong` });
    }
};


// @desc    Fetch all missions
// @route   GET /api/missions
// @access  Public
const GetMissions = async (req, res) => {
    try {
        const newMission = await Mission.find()
        res.json(newMission)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: `something went wrong` })
    }
}

// @desc    get Mission by id
// @route   GET /api/Missions/id
// @access  Public
const getMissionById = async (req, res) => {
    try {
        const newMission = await Mission.findById(req.params.id)
        if (Mission)
            res.json(newMission)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: `something went wrong` })
    }
}

// @desc    Update a Mission
// @route   PUT /api/Missions/:id
// @access  Private/Admin
const UpdateMission = async (req, res) => {
    try {
        const { dateDepart, dateArrive } = req.body;
        const image = `http://localhost:3000/uploads/${req.file.filename}`;
        const newMission = await Mission.findOneAndUpdate({ _id: req.params.id }, { dateDepart, dateArrive, image }, { new: true })
        // console.log(newProduct)
        res.status(200).json(newMission)
    } catch (error) {
        console.error(error)
        res.status(404)
        throw new Error('Mission not found')
    }
}

// @desc    Delete single Mission by id
// @route   DELETE /api/Mission/:id
// @access  Private/Admin
const deleteMission = async (req, res) => {
    try {
        //const mission = await Mission.findById(req.params.id)
        // if(String(mission._id) !== req.userId) return res.status(401).json({msg:'you are not authorized'})
        await Mission.findByIdAndDelete(req.params.id)
        res.json({ msg: 'Mission removed' })
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: `something went wrong` })
    }
}

module.exports = { register, UpdateMission, GetMissions, getMissionById, deleteMission }
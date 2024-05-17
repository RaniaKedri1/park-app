const Vehicle = require('../models/Vehicle');
const db = require('../../database/db.config');
const mission = require('../models/mission');

//create vehicle function
exports.createdVehicle = (req, res) => {
    const image = `http://localhost:5000/uploads/${req.file.filename}`;
    //console.log(req.body); 
    const vehicleObj = {
        make: req.body.make,
        prix: req.body.prix,
        model: req.body.model,
        year: req.body.year,
        mileage: req.body.mileage,
        fuelType: req.body.fuelType,
        color: req.body.color,
        vin: req.body.vin,
        registrationNumber: req.body.registrationNumber,
        status: req.body.status,
        image,
    }; 

    const vehicle = new Vehicle(vehicleObj);
    vehicle.save()
        .then(createdVehicle => {
            res.status(200).json({ message: "Vehicle added successfully", vehicle: createdVehicle });
        })
        .catch(err => {
            console.error('Error saving vehicle:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
};
//Route lister vehicules get from db
exports.listervehicles = (req, res) => {
    Vehicle.find()
        .then(listervehicles => {
            res.status(200).json(listervehicles);
        })
        .catch(err => {
            console.error('Error finding vehicles:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
};
// Delete a vehicle by ID
exports.deletedVehicle = (req, res) => {
    const id = req.params.id;
    Vehicle.findByIdAndDelete(id)
        .then(deletedVehicle => {
            if (!deletedVehicle) {
                return res.status(404).json({ message: 'Vehicle not found' });
            }
            res.status(200).json({ message: 'Vehicle deleted successfully' });
        })
        .catch(err => {
            console.error('Error deleting vehicle:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
};
// Get a vehicle by ID
exports.vehicle = (req, res) => {
    const id = req.params.id;
    Vehicle.findById(id)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).json({ message: 'Vehicle not found' });
            }
            res.status(200).json(vehicle);
        })
        .catch(err => {
            console.error('Error finding vehicle by ID:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
};
// Update a vehicle by ID
exports.updatedVehicle = (req, res) => {
    const id = req.params.id;
    const { make, model, year, mileage, fuelType, color, vin, registrationNumber, status } = req.body;

    // Check for required fields
    if (!make || !model || !year || !vin || !registrationNumber) {
        return res.status(400).json({ message: 'Make, model, year, VIN, and registration number are required fields' });
    }

    Vehicle.findByIdAndUpdate(id, {
        make,
        model,
        year,
        mileage: mileage || 0,
        fuelType,
        color,
        vin,
        registrationNumber,
        status: status || 'available'
    }, { new: true })
        .then(updatedVehicle => {
            if (!updatedVehicle) {
                return res.status(404).json({ message: 'Vehicle not found' });
            }
            res.status(200).json({ message: 'Vehicle updated successfully', vehicle: updatedVehicle });
        })
        .catch(err => {
            console.error('Error updating vehicle:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
};
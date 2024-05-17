const express = require('express')
const { register , GetMissions,getMissionById,UpdateMission,deleteMission, getMissionByUser} = require('../controllers/missionController');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads-identity/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })

router.post('/register/:voitureId', upload.single('file'), register)
router.get('/', GetMissions)
router.get('/missionByUser/:id', getMissionByUser)
router.get('/:id', getMissionById)
router.put('/:id', upload.single('file'), UpdateMission)
router.delete('/:id', upload.single('file'),deleteMission)

module.exports = router

const mongoose = require('mongoose')
const { vehicle } = require('../controllers/VehicleController')

const missionSchema = mongoose.Schema({

    dateDepart: {
        type: String,
        required: true,
    },
    dateArrive: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    is_verified: {
        type:String,
        enum: ['No', 'Yes'], default: 'No'
    },

    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vehicle',
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },

},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Mission', missionSchema)
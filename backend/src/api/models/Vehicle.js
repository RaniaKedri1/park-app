// src/api/models/Vehicle.js
//Exporting the Mode

module.exports = mongoose => {
    const VehicleSchema = new mongoose.Schema({
        make: { type: String, required: true },
        model: { type: String, required: true },
        year: { type: Number, required: true },
        mileage: { type: Number, default: 0 },
        fuelType: { type: String },
        color: { type: String },
        vin: { type: String, required: true, unique: true },
        registrationNumber: { type: String, required: true, unique: true },
        status: { type: String, enum: ['available', 'in-use', 'maintenance'], default: 'available' },
        missions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Mission'
            }
        ],
    }, {
        timestamps: true
    });

    // Adding a toJSON method
    VehicleSchema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    // Create the Vehicle model
    const Vehicle = mongoose.model('Vehicle', VehicleSchema);
    module.exports = Vehicle;
}

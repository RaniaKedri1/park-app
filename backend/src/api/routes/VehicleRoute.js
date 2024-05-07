const express = require('express');
const router = express.Router();
const vc = require('../controllers/VehicleController')

// Route to create a new vehicle
router.post('/create', vc.createdVehicle);
// Route to get all vehicles
router.get('/', vc.listervehicles);
// Route to get a vehicle by ID
router.get('/:id', vc.vehicle);
// Route to update a vehicle by IDvehicleController
router.put('/:id', vc.updatedVehicle);
// Route to delete a vehicle by ID
router.delete('/:id', vc.deletedVehicle);

module.exports = router;
const express = require('express');
const database = require('./src/database/db.config');
const path = require('path')
const cors = require ('cors')
require('dotenv').config(); 
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors('http://localhost:3000'));

const vehicleRoute = require('./src/api/routes/VehicleRoute');
const userRoute = require('./src/api/routes/userRoute');
app.use('/api/vehicle', vehicleRoute)
app.use('/api/user', userRoute)
app.use('/api/mission', require('./src/api/routes/missionRoute'))

database.mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log(err);
});

app.use('/uploads', express.static(path.join(__dirname, './', 'uploads-identity')))


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

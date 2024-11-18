const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const workoutRoutes = require('./src/routes/workoutRoutes');
const exerciseRoutes = require('./src/routes/exerciseRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/workouts', workoutRoutes);
app.use('/exercise', exerciseRoutes);
app.use(errorHandler);

// Connect to MongoDB only when not in a test environment
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch(err => console.log('MongoDB Atlas connection error:', err));
}

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

module.exports = app;

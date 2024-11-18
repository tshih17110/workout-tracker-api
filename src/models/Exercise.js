const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Cardio', 'Strength', 'Calisthenics']
    },
    muscleGroup: {
        type: String,
        enum: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']
    }
});

module.exports = mongoose.model('Exercise', exerciseSchema);

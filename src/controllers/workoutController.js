// const Workout = require('../models/Workout');

// exports.createWorkout = async (req, res) => {
//     const { user, name, exercises } = req.body;
//     if (!name || !exercises) {
//         console.log("Error: missing fields");
//         return res.status(400).json({ message: 'Minimum of one exercise required.' });
//     };
    
//     try {
//         const workout = new Workout({
//             user: req.user.id,
//             name: req.body.name,
//             exercises: req.body.exercises,
//         });
//         await workout.save();
//         res.status(201).json({ message: 'Workout created.', workout: workout });
//     } catch (err) {
//         console.error('Error in createWorkout: ', err);
//         res.status(400).json({ message: 'Server error', error: err});
//     }
// };

// exports.getWorkout = async (req, res) => {
//     try {
//         const workout = await Workout.find({ user: req.user._id }).populate('exercises.exercise');
        
//         res.status(200).json({ workout });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to retrieve workout' });
//     }
// };

// exports.updateWorkout = async (req, res) => {
//     const { id } = req.params;
//     const { name, exercises } = req.body;

//     if (!name || !exercises) {
//         return res.status(400).json({ message: 'Minimum of one exercise required.' });
//     };

//     try {
//         const workout = await Workout.findById(id);
//         if (!workout) {
//             return res.status(404).json({ message: 'Workout not found.' });
//         };
//         workout.name = name;
//         workout.exercises = exercises;
//         await workout.save();
//         res.status(200).json({ message: 'Workout updated.', workout: workout });
//     } catch (err) {
//         res.status(400).json({ message: 'Server error', error: err});
//     }
// }

// exports.deleteWorkout = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const workout = await Workout.findById(id);
//         if (!workout) {
//             return res.status(404).json({ message: 'Workout not found.' });
//         };
//         await workout.remove();
//         res.status(200).json({ message: 'Workout deleted.' });
//     } catch (err) {
//         res.status(400).json({ message: 'Server error', error: err});
//     }
// }

const { status } = require('http-status');
const workoutService = require('../services/workoutService');
const ApiError = require('../utils/ApiError');

const createWorkout = async(req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { name, exercises } = req.body;
        const workoutData = {
            user: userId,
            name,
            exercises,
        };

        const workout = await workoutService.createWorkout(workoutData);
        res.status(status.CREATED).json({workout});
    } catch (error) {
        next(error);
    }
};

const getAllWorkouts = async (req, res, next) => {
    try {
        const workouts = await workoutService.getAllWorkouts();
        res.status(status.OK).json(workouts);
    } catch (error) {
        next(error);
    }
};

const getWorkout = async (req, res, next) => {
    try {
        const workout = await workoutService.getWorkout(req.params.id);
        if (!workout) {
            throw new ApiError(status.NOT_FOUND, 'Exercise not found');
        };   
        res.status(status.OK).json(workout);
    } catch (error) {
        next(error);
    }
};

const updateWorkout = async (req, res, next) => {
    try {
        const workout = await workoutService.updateWorkout(req.params.id);
        res.status(status.OK).json(workout);
    } catch (error) {
        next(error);
    }
};

const deleteWorkout = async (req, res, next) => {
    try {
        await workoutService.deleteWorkout(req.params.id);
        res.status(status.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
};

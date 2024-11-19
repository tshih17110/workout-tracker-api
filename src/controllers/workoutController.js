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

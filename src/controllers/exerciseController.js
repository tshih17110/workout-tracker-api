const { status } = require('http-status');
const exerciseService = require('../services/exerciseService');
const ApiError = require('../utils/ApiError');

const createExercise = async (req, res, next) => {
    try {
        const exercise = await exerciseService.createExercise(req.body);
        res.status(status.CREATED).json({exercise});
    } catch (error) {
        next(error);
    }
};

const getAllExercises = async (req, res, next) => {
    try {
        const exercises = await exerciseService.getAllExercises();
        res.status(status.OK).json(exercises);
    } catch (error) {
        next(error);
    }
};

const getExercise = async (req, res, next) => {
    try {
        const exercise = await exerciseService.getExercise(req.params.id);
        if (!exercise) {
            throw new ApiError(status.NOT_FOUND, 'Exercise not found');
        };
        res.status(status.OK).json(exercise);
    } catch (error) {
        next(error);
    }
};

const updateExercise = async (req, res, next) => {
    try {
        const exercise = await exerciseService.updateExercise(req.params.id, req.body);
        res.status(status.OK).json(exercise);
    } catch (error) {
        next(error);
    }
};

const deleteExercise = async (req, res, next) => {
    try {
        await exerciseService.deleteExercise(req.params.id);
        res.status(status.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createExercise,
    getAllExercises,
    getExercise,
    updateExercise,
    deleteExercise
};

const Exercise = require('../models/Exercise');

/**
 * Create new exercise
 * @param {Object} exerciseData
 * @returns {Promise<Exercise>}
 */
const createExercise = async (exerciseData) => {
    const exercise = new Exercise(exerciseData);
    return await exercise.save();
};

/**
 * Get all exercises
 * @return {Promise<Exercise[]}
 */
const getAllExercises = async () => {
    return await Exercise.find();
};

/**
 * Get exercise
 * @param {ObjectId} id
 * @return {Promise<Exercise>}
 */
const getExercise = async (id) => {
    return await Exercise.findById(id);
};

/**
 * Update exercise
 * @param {ObjectId} id 
 * @param {Object} updateData
 * @return {Promise<Exercise>}
 */
const updateExercise = async (id, updateData) => {
    const exercise = await Exercise.findById(id);
    if (!exercise) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Exercise not found');
    }
    Object.assign(exercise, updateData);
    await exercise.save();
    return exercise;
};

/**
 * Delete exercise
 * @param {ObjectId} id
 * @return {Promise<void>}
 */
const deleteExercise = async (id) => {
    return await Exercise.findByIdAndDelete(id);
};

module.exports = {
    createExercise,
    getAllExercises,
    getExercise,
    updateExercise,
    deleteExercise
};

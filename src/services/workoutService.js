const Workout = require('../models/Workout');

/**
 * Create new workout
 * @param {Object} workoutData 
 * @returns {Promise<Workout>}
 */
const createWorkout = async (workoutData) => {
    const workout = new Workout(workoutData);
    return await workout.save();
};

/**
 * Get all workouts
 * @return {Promise<Workout[]}
 */
const getAllWorkouts = async () => {
    return await Workout.find();
};

/**
 * Get workout by id
 * @param {string} id
 * @returns {Promise<Workout>}
 */
const getWorkout = async (id) => {
    return await Workout.findById(id).populate(exercises.exercise);
};

/**
 * Update a workout by id
 * @param {string} id
 * @param {Object} updateData
 * @returns {Promise<Workout>}
 */
const updateWorkout = async (id, updateData) => {
    const workout = await Workout.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Delete workout
 * @param {string} id
 * @return {Promise<void>}
 */
const deleteWorkout = async (id) => {
    return await Workout.findByIdAndDelete(id);
};

module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
};

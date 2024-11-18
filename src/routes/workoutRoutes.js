const express = require('express');
const workoutController = require('../controllers/workoutController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', protect, workoutController.createWorkout);
router.get('/', protect, workoutController.getAllWorkouts);
router.get('/:id', protect, workoutController.getWorkout);
router.put('/:id', protect, workoutController.updateWorkout);
router.delete('/:id', protect, workoutController.deleteWorkout);

module.exports = router;

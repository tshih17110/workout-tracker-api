const express = require('express');
const exerciseController = require('../controllers/exerciseController');
// const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// router.get('/getExercises', exerciseController.getAllExercises);
// router.post('/create', exerciseController.createExercise)

router.post('/create', exerciseController.createExercise);
router.get('/', exerciseController.getAllExercises);
router.get('/:id', exerciseController.getExercise);
router.put('/:id', exerciseController.updateExercise);
router.delete('/:id', exerciseController.deleteExercise);

module.exports = router;

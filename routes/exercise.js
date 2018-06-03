const router = require('express').Router();

const db = require('../models');

router
  .route('/users')
  .get(async (req, res) => {
    try {
      const users = await db.User.find().populate('exercises', [
        'date',
        'description',
        'duration',
      ]);
      res.json(users);
    } catch (err) {
      res.json(err);
    }
  })
  .post(async (req, res) => {
    const { username } = req.body;
    try {
      const user = await db.User.create({ username });
      res.json(user);
    } catch (err) {
      res.json(err);
    }
  });

router
  .route('/exercises')
  .get(async (req, res) => {
    try {
      const exercises = await db.Exercise.find().populate('user', ['username']);
      res.json(exercises);
    } catch (err) {
      res.json(err);
    }
  })
  .post(async (req, res) => {
    try {
      const { userId, description, duration, date } = req.body;
      const user = await db.User.findById(userId);
      const exercise = await db.Exercise.create({
        user,
        description,
        duration,
        date: date || Date.now(),
      });
      user.exercises.push(exercise);
      await user.save();

      res.json(exercise);
    } catch (err) {
      res.json(err);
    }
  });

module.exports = router;

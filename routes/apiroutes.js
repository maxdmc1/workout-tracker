const Workout = require("../models/workout");
const router = require("express").Router();
const path = require("path");

Workout.on("error", error => {
  console.log("Database Error: ", error);
});

router.get("/api/workouts", (req, res) => {
  console.log(req.body);
  Workout.find({})
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  console.log(req.body);
  Workout.create({
    exercises: []
  })
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.json(err);
    });
});

// Edna Jonsson (tutor) assisted with writing this route.
router.put("/api/workouts/:id", ({ body, params }, res) => {
  console.log(body);
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.json(err);
    });
});

// found route in the stats.js file - added a find for all workouts
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.json(err);
    });
});

// Front end routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// Export routes for server.js to use.
module.exports = router;

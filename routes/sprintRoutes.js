const router = require("express").Router();
const Group = require("../models/group");
const Sprint = require("../models/sprint");

router.post("/create", async (req, res) => {
  const { groupId } = req.body;
  if (groupId) {
    try {
      // group exists ?
      const group = await Group.findById(groupId);
      if (!group) {
        throw Error("No groupe found");
      }

      // Create sprint
      const sprint = await Sprint.create({
        comment: "",
        ratings: group.labels.map((l) => {
          return {
            label: l,
            rating: 0,
          };
        }),
      });
      // Adding sprint ref to group
      const sprints = [...group.sprints, sprint._id];
      await Group.findByIdAndUpdate(groupId, { sprints });
      res.status(202).json(sprint);
    } catch (err) {
      console.error(err);
    }
  }
  res.status(402).end();
});

router.post("/delete", async (req, res) => {
  const { groupId, sprintId } = req.body;
  if ((groupId, sprintId)) {
    try {
      // Deleting sprints
      const group = await Group.findById(groupId);
      const sprints = group.sprints.filter((s) => s != sprintId);
      await Group.findByIdAndUpdate(groupId, { sprints });
      await Sprint.findByIdAndDelete(sprintId);

      res.status(202).end();
    } catch (err) {
      console.error(err);
    }
  }
  res.status(402).end();
});

// ratings => {"label": valeur,...}
router.post("/updateratings", async (req, res) => {
  const { sprintId, ratings } = req.body;
  if (sprintId && ratings) {
    try {
      const sprint = await Sprint.findById(sprintId);
      // Generating ratings array []
      const newRatings = sprint.ratings.map(({ label, rating }) => {
        return Object.prototype.hasOwnProperty.call(ratings, label)
          ? { label, rating: ratings[label] }
          : { label, rating };
      });
      await Sprint.findByIdAndUpdate(sprintId, { ratings: newRatings });

      res.status(202).end();
    } catch (err) {
      console.error(err);
    }
  }
  res.status(402).end();
});

router.post("/updatecomment", async (req, res) => {
  const { sprintId, comment } = req.body;
  if (sprintId) {
    try {
      await Sprint.findByIdAndUpdate(sprintId, {
        // if null, then empty string
        comment: comment ? comment : "",
      });
      res.status(202).end();
    } catch (err) {
      console.error(err);
    }
  }
  res.status(402).end();
});

// GETTERS
router.get("/getallsprint", async (req, res) => {
  try {
    const sprint = await Sprint.find();
    console.log(sprint);
    res.status(202).json(sprint);

  } catch (error) {
    res.status(402).end();
  }
});

module.exports = router;

const router = require("express").Router();
const Group = require("../models/group");
const Sprint = require("../models/sprint");

const DEFAULT_LABELS = ["TASKS", "ISSUES", "RELEASES", "README", "JSP"];
router.post("/create", async (req, res) => {
  const { manager, students } = req.body;
  if (manager) {
    try {
      const groupe = await Group.create({
        manager,
        students: students ? students : [],
        sprints: [],
        labels: [...DEFAULT_LABELS],
      });
      res.status(200).json(groupe);
    } catch (err) {
      res.status(402).json(err);
    }
  }
});

router.post("/addlabel", async (req, res) => {
  const { groupId, label } = req.body;
  if (groupId && label) {
    try {
      const group = await Group.findById(groupId);
      const labels = [...group.labels, label];
      await Group.findByIdAndUpdate(groupId, { labels });
      res.status(200).json({ ...group, labels });
    } catch (err) {
      res.status(402).json(err);
    }
  }
});

router.post("/removelabel", async (req, res) => {
  const { groupId, label } = req.body;
  if (groupId && label) {
    try {
      const group = await Group.findById(groupId);
      const labels = group.labels.filter((l) => l != label);
      await Group.findByIdAndUpdate(groupId, { labels });
      res.status(200).json({ ...group, labels });
    } catch (err) {
      res.status(402).json(err);
    }
  }
});

router.post("/deletesprint", async (req, res) => {
  const { groupId, sprintId } = req.body;
  if ((groupId, sprintId)) {
    try {
      // Deleting sprints
      const group = await Group.findById(groupId);
      const sprints = group.sprints.filter((s) => s != sprintId);
      await Group.findByIdAndUpdate(groupId, { sprints });
      await Sprint.findByIdAndDelete(sprintId);

      res.status(202).json({ ...group, sprints });
    } catch (err) {
      res.status(402).end();
    }
  }
  res.status(402).end();
});

router.post("/createsprint", async (req, res) => {
  const { groupId, sprintParams } = req.body;
  if (groupId) {
    try {
      // group exists ?
      // const group = await Group.findById(groupId);
      // if (!group) {
      //   throw Error("No groupe found");
      // }

      // Create sprint
      const sprint = await Sprint.create({
        comment: sprintParams.comment ? sprintParams.comment : "",
        ratings: sprintParams.labels.map((l) => {
          return {
            label: l,
            rating: 0,
          };
        }),
      });
      // Adding sprint ref to group
      const sprints = [...groupe.sprints, sprint._id];
      await Group.findByIdAndUpdate(groupId, { sprints });
      res.status(202).json(sprint);
    } catch (err) {
      res.status(402).json(err);
    }
    res.status(402).end();
  }
});

// ratings => {"label": valeur,...}
router.post("/ratesprint", async (req, res) => {
  const { sprintId, ratings } = req.body;
  if (sprintId && ratings) {
    try {
      const sprint = await Sprint.findById(sprintId);
      const newRatings = sprint.ratings.map(({ label, rating }) => {
        return ratings.hasOwnProperty(label)
          ? { label, rating: ratings[label] }
          : { label, rating };
      });
      console.log(newRatings);
      await Sprint.findByIdAndUpdate(sprintId, {ratings: newRatings});
      res.status(202).json({ ...sprint, ratings: newRatings });
    } catch (err) {
      res.status(402).json(err);
    }
  }
  res.status(402).end();
});

module.exports = router;

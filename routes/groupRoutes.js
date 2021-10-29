const router = require("express").Router();
const Group = require("../models/group");
const Groupe = require("../models/group");
const Sprint = require("../models/sprint");

router.post("/creategroup", async (req, res) => {
  const { manager, students } = req.body;
  if (manager) {
    try {
      const groupe = await Groupe.create({
        manager,
        students: students ? students : [],
        sprints: [],
      });
      res.status(200).json(groupe);
    } catch (err) {
      res.status(402).json(err);
    }
  }
});

router.post("/deletesprintfromgroup", async (req, res) => {
  const { groupId, sprintId } = req.body;
  if ((groupId, sprintId)) {
    try {
      const group = await Groupe.findById(groupId);
      await Group.findByIdAndUpdate(groupId, {
        ...group,
        sprints: group.sprints.filter((s) => s != sprintId),
      });

      res.status(202).json(group);
    } catch (err) {
      res.status(402).end();
    }
  }
  res.status(402).end();
});

router.get("/insertsprint", async (req, res) => {
  const { groupId, sprintParams } = req.body;
  if (groupId) {
    try {
      const groupe = await Groupe.findById(groupId);
      if (!groupe) {
        throw Error("No groupe found");
      }

      const sprint = await Sprint.create({
        comment: sprintParams.comment ? sprintParams.comment : "",
        ratings: sprintParams.labels.map((c) => {
          let i = 1;
          return {
            _id: i++,
            label: c,
            rating: 0,
          };
        }),
      });
      await Groupe.findByIdAndUpdate(groupId, {
        sprints: [...groupe.sprints, sprint._id],
      });
      res.status(202).json(sprint);
    } catch (err) {
      res.status(402).json(err);
    }
    res.status(402).end();
  }
});

router.post("/ratesprint", async (req, res) => {
  const { sprintId, ratings } = req.body;
  if (sprintId && ratings) {
    try {
      const sprint = await Sprint.findByIdAndUpdate(sprintId, { ratings });
      res.status(202).json(sprint);
    } catch (err) {
      res.status(402).json(err);
    }
  }
  res.status(402).end();
});

module.exports = router;

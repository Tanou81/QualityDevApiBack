const router = require("express").Router();
const Group = require("../models/group");
const Sprint = require("../models/sprint");
const LabelFormat = require("../models/labelformat");

router.post("/create", async (req, res) => {
  const { groupId } = req.body;
  console.log("sprint/create id:");
  console.log(groupId);
  if (groupId) {
    try {
      // group exists ?
      const group = await Group.findById(groupId);
      if (!group) {
        throw Error("No group found");
      }
      let labelFormatId = group.labelFormat;
      const labelFormat = await LabelFormat.findById(labelFormatId);
      if (!labelFormat) {
        throw "No labelFormat found";
      }
      let ratingsLength = labelFormat.labels.length;
      let previous_ratings = null;
      let previous_comment = null;
      if (group.sprints.length > 0 && group.sprints[group.sprints.length - 1]) {
        let sprint = await Sprint.findById(group.sprints[group.sprints.length - 1]);
        if (!sprint) {
          throw "No sprint found";
        }
        previous_ratings = sprint.ratings;
        previous_comment = sprint.comment
      } else {
        previous_ratings = new Array(ratingsLength).fill(0);
        previous_comment = "";
      }
      console.log("RATINGS:");
      console.log(previous_ratings);
      // Create sprint
      const new_sprint = await Sprint.create({
        comment: previous_comment,
        ratings: previous_ratings,
        doSend: false,
        group: groupId
      });
      // Adding sprint ref to group
      const sprints = [...group.sprints, new_sprint._id];
      const new_group = await Group.findByIdAndUpdate(groupId,
        { sprints });
      res.status(202).json(new_sprint);
    } catch (err) {
      console.error(err);
      res.status(402).send()
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

router.post("/updatesprint", async (req, res) => {
  const { sprintId, sprint} = req.body;
  console.log("/updatesprint");
  if (sprintId && sprint) {
    try {
      await Sprint.findByIdAndUpdate(sprintId, {
        comment: sprint.comment,
        ratings: sprint.ratings,
        doSend: sprint.doSend
      },
      // options
      {
        new: true
      }
      );
      res.status(202).end();
    } catch (error) {
      console.log("error trying to update sprint, error:");
      console.log(error);
      console.error(error);
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
    res.status(202).json(sprint);
  } catch (error) {
    res.status(402).end();
  }
});

router.get("/getsprintbyid", async (req, res) => {
  console.log("/getsprintbyid");
  let { _id } = req.query;
  try {
    const sprint = await Sprint.findById(_id);
    if (sprint) {
      res.status(201).json(sprint);
    } else throw "Could not find asked sprint";
  } catch (error) {
    console.log("error fetching specific sprint, error:");
    console.log(error);
    console.error(error);
    res.status(402).end();
  }
});

module.exports = router;

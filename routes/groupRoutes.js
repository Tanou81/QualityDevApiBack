const router = require("express").Router();
const Group = require("../models/group");
const User = require("../models/user");
const Evaluation = require("../models/evaluation");
const EvaluationFormat = require("../models/evaluationformats");

const chartFromGroup = require("../services/chartServices").chartFromGroup;

const DEFAULT_LABELS = [
  "TASKS",
  "ISSUES",
  "RELEASES",
  "DOCUMENTATION",
  "TESTS",
  "BUILD/CI",
];

const DEFAULT_GROUP_NAME = "Sans Nom";
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 32;


/** Group creation
 * 
 * @param managerId manager/teacher of group
 * @param students array of student ids
 * @param evaluationFormatId evaluation format id chosen
 * @param labelFormatId evaluation format id chosen
 */
router.post("/create", async (req, res, next) => {
  console.log("group/create");
  const { managerId, students, evaluationFormatId, labelFormatId, name } = req.body;
  // validation of string parameters
  if (managerId && typeof(managerId) == "string"
      && evaluationFormatId && typeof(evaluationFormatId) == "string"
      && labelFormatId && typeof(labelFormatId) == "string") {
        // validation of array (student)
        seenStudentArray = [];
        if (Array.isArray(students) && students.length > 0) {
          for (let studentIndex in students) {
            let studentId = students[studentIndex];
            if (seenStudentArray.includes(studentId)) {
              // Duplicate studentId found during group creation
              res.status(400).json({err: "Duplicate studentId found during group creation"});
              next();
              return;
            } else {
              seenStudentArray.push(studentId);
            }
          }
          try {
            // New group = new evaluation
            const evaluationFormat = await EvaluationFormat.findById(evaluationFormatId);
            const grades = Array.from({ length: evaluationFormat.factors.length}, () => {return 0;});
            const evaluation = await Evaluation.create({
              format: evaluationFormatId,
              grades
            });
            let constructedName = name;
            if (!constructedName && students && Array.isArray(students) && students.length > 0) {
              constructedName = "";
              for (let studentId of students) {
                let student = await User.findById(studentId);
                if (student.firstname.length > 1) constructedName += student.firstname.substring(0, 2) + ".";
              }
            }
            if (constructedName.length < 2) constructedName = DEFAULT_GROUP_NAME;
            console.log("constructed name for group: " + constructedName);
            const group = await Group.create({
              manager: managerId,
              students: students ? students : [],
              sprints: [],
              studentBonusPoints: [],
              evaluation,
              labelFormat: labelFormatId,
              name: constructedName
            });
            res.status(202).json(group);
          } catch (err) {
            console.error(err);
            res.status(402).json(err);
          }
        }
      } else {
        // Wrong field found during group creation (not string)
        res.status(400).json({err:"Wrong field found during group creation (not string)"})
        next();
        return;
      }
});

/** Delete one group and update its Evaluation
 * 
 * @param _id @deprecated
 * @param id
 * @todo clean & check for usage in front (update param usage?)
 */
router.delete("/delete", async (req, res) => {
  console.log("group/delete");
  const { id, _id } = req.body;
  if (_id) id = _id;
  if (id && typeof(id) == "string" && id.length > 0) {
    try {
      const group = await Group.findById(id);
      const groupDeleteSummary = await Group.deleteOne({_id: id});
      // console.log("group");
      // console.log(group);
      // console.log("groupDeleteSummary");
      // console.log(groupDeleteSummary);
      const evaluation = await Evaluation.deleteOne({_id: group.evaluation});
      // console.log("evaluation deleted:");
      // console.log(evaluation);
      res.status(200).json(groupDeleteSummary);
    } catch (err) {
      res.status(404).json({err: err});
    }
  } else {
    res.status(400).json({err: "Id wrong format or too short"});
  }
});

/** Add label
 * 
 * @deprecated HIGHLY UNRECOMMENDED (@todo check usefulness)
 * @param groupId
 * @param label
 */
router.post("/addlabel", async (req, res) => {
  const { groupId, label } = req.body;
  if (groupId && label) {
    try {
      const group = await Group.findById(groupId);
      if (!group) throw new Error("Group does not exist");
      const labels = [...group.labels, label];
      await Group.findByIdAndUpdate(groupId, { labels });
      res.status(202).end();
    } catch (err) {
      console.error(err);
    }
  }
  res.status(402).end();
});


/** Remove label
 * 
 * @deprecated HIGHLY UNRECOMMENDED (@todo check usefulness)
 * @param groupId
 * @param label
 */
router.post("/removelabel", async (req, res) => {
  const { groupId, label } = req.body;
  if (groupId && label) {
    try {
      const group = await Group.findById(groupId);
      const labels = group.labels.filter((l) => l != label);
      await Group.findByIdAndUpdate(groupId, { labels });
      res.status(202).end();
    } catch (err) {
      console.error(err);
    }
  }
  res.status(402).end();
});


/** Update labels
 * 
 * Replaces all labels
 * @deprecated HIGHLY UNRECOMMENDED (@todo check usefulness)
 * @param groupId
 * @param labels
 */
router.put("/changelabels", async (req, res) => {
  const { groupId, labels } = req.body;
  if (groupId) {
    try {
      await Group.findByIdAndUpdate(groupId, { labels });
      res.status(202).end();
    } catch (err) {
      console.error(err);
    }
  }
  res.status(402).end();
});

/** Add student(s) to group
 * 
 * @param groupId
 * @param students an array of student ids
 */
router.post("/addstudents", async (req, res) => {
  const { groupId, students } = req.body;
  if (groupId) {
    try {
      const group = await Group.findById(groupId);
      const newStudents = [
        ...group.students,
        ...students.filter((id) => !group.students.includes(id)),
      ];
      await Group.findByIdAndUpdate(groupId, { students: newStudents });
      res.status(202).end();
    } catch (err) {
      console.error(err);
    }
  }
  res.status(402).end();
});

/** Remove student(s) from group
 * 
 * @param groupId
 * @param students an array of student ids
 */
router.post("/removestudents", async (req, res) => {
  const { groupId, students } = req.body;
  if (groupId) {
    try {
      const group = await Group.findById(groupId);
      const newStudents = [
        ...group.students.filter((id) => !students.includes(id)),
      ];
      await Group.findByIdAndUpdate(groupId, { students: newStudents });
      res.status(202).end();
    } catch (err) {
      console.error(err);
    }
  }
  res.status(402).end();
});

/** Update manager
 * 
 * @param groupId
 * @param managerId
 */
router.put("/updatemanager", async (req, res) => {
  const { groupId, managerId } = req.body;
  if (groupId) {
    try {
      if (!(await User.findById(managerId)))
        throw new Error("Manager does not exist");

      let manager = await Group.findByIdAndUpdate(groupId,
        { manager: managerId },
        // options
        {
          new: true
        });
      res.status(201).json(manager);
    } catch (err) {
      console.error(err);
    }
  }
  res.status(402).end();
});

/** Update students
 * 
 * @param groupId
 * @param students
 */
router.put("/updatestudents", async (req, res) => {
  let { groupId, students } = req.body;
  console.log("groupId");
  console.log(groupId);
  console.log("students");
  console.log(students);
  try {
    let group = await Group.findByIdAndUpdate(groupId, {
      students
    },
    // options
    {
      new: true
    });
    console.log("new group");
    console.log(group);
    res.status(201).json(group);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

/** Update labelFormat
 * 
 * @param groupId
 * @param labelFormatId
 */
router.put("/updatelabelformat", async (req, res) => {
  let { groupId, labelFormatId } = req.body;
  try {
    let group = await Group.findByIdAndUpdate(groupId, {
      labelFormat: labelFormatId
    },
    // options
    {
      new: true
    });
    res.status(201).json(group);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

/** Update name
 * 
 * @param groupId
 * @param name
 */
router.put("/updatename", async (req, res) => {
  let { groupId, name } = req.body;
  if (!(name && typeof(name) == "string" && name.length >= NAME_MIN_LENGTH && name.length <= NAME_MAX_LENGTH)) {
    res.status(400).end();
  } else {
    try {
      let group = await Group.findByIdAndUpdate(groupId, {
        name: name
      },
      // options
      {
        new: true
      });
      res.status(201).json(group);
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  }
});

// GETTERS
/** Get all groups
 * 
 * 
 */
router.get("/getallgroups", async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(202).json(groups);
  } catch (error) {
    res.status(402).end();
  }
});

/** Get one group by id
 * 
 * @param _id
 */
router.get("/getgroupbyid", async (req, res) => {
  let { _id } = req.query;
  try {
    console.log("/getgroupbyid");
    let group = await Group.findById(_id);
    res.status(201).json(group);
  } catch (error) {
    console.log("error");
    console.error(error);
    res.status(402).end();
  }
})

/** Get all groups with required school year
 * 
 * 
 * @param schoolYear
 */
router.get("/getgroupsbyyear", async (req, res) => {
  let { schoolYear } = req.query;
  try {
    let groups = await Group.find({schoolYear});
    res.status(201).json(groups);
  } catch (error) {
    console.error(error);
    res.status(400).end()
  }
  res.status(400).end()
});

/** Get (grades) graph image
 * 
 * @param _id
 */
router.get("/getgraphbyid", async (req, res) => {
  let { _id } = req.query;
  try {
    console.log("getgraphbyid");
    let group = await Group.findById(_id);
    // res.status(201).render("<img src=" + (await chartFromGroup(group)) + "/>");
    img = await chartFromGroup(group);
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img); 

  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
})

module.exports = router;

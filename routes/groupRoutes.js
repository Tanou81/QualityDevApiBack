const router = require("express").Router();
//on appel les modèles pour vérif 
const Group = require("../models/group");
const User = require("../models/user");

const DEFAULT_LABELS = [
  "TASKS",
  "ISSUES",
  "RELEASES",
  "DOCUMENTATION",
  "TESTS",
  "BUILD/CI",
];

/* création de groupe /Il faut comme argument
* un manager 
*  students 
* sprints
* labels 
*
*retourne status code 
*/
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
      res.status(202).json(groupe);
    } catch (err) {
      res.status(402).json(err);
    }
  }
});

/* ajout de  de label /Il faut comme argument
* le groupId
*  le label 
* 
* retourne status code 
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


/* supprimer un  label de groupe  /Il faut comme argument
* le groupId
*  le label 
* 
* retourne status code 
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


/* changement de un  label de groupe  /Il faut comme argument
* le groupId
*  le label 
* 
* retourne status code 
*/
router.post("/changelabels", async (req, res) => {
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

/* Ajoutes un étudians à un groupe   /Il faut comme argument
* le groupId
*  l'etudiant
* 
* retourne status code 
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


/* supprime  un étudians à un groupe   /Il faut comme argument
* le groupId
*  l'etudiant
* 
* retourne status code 
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

/* change le manager d'un groupe e   /Il faut comme argument
* le groupId
*  le managerId
* 
* retourne status code 
*/
router.post("/changemanager", async (req, res) => {
  const { groupId, managerId } = req.body;
  if (groupId) {
    try {
      if (!(await User.findById(managerId)))
        throw new Error("Manager does not exist");

      await Group.findByIdAndUpdate(groupId, { manager: managerId });
      res.status(202).end();
    } catch (err) {
      console.error(err);
    }
  }
  res.status(402).end();
});

// GETTERS
/* récupère  tous les groupes   /Il faut comme argument
* rien 
*  
* 
* retourne status code 
*/
router.get("/getallgroups", async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(202).json(groups);
  } catch (error) {
    res.status(402).end();
  }
});

router.get("/getgroupbyid", async (req, res) => {
  let { _id } = req.query;
  try {
    console.log("/getgroupbyid");
    let group = await Group.findById(_id);
    res.status(201).json(group);
  } catch (error) {
    console.log("error");
    console.log(error);
    console.error(error);
    res.status(402).end();
  }
})

module.exports = router;

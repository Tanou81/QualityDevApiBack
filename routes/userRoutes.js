const router = require("express").Router();
//on appel les modèles pour vérif 
const User = require("../models/user");

// CREATION DELETION

/* création d'un étudiant   /Il faut comme argument
* email 
* name 
* firstname

* retourne status code 
*/
router.post("/createstudent", async (req, res) => {
  const { email, name, firstname } = req.body;
  if (email && name && firstname && !(await User.findOne({ email })))
    try {
      const student = await User.create({
        email,
        name,
        firstname,
        userType: 0,//type 0 veut dire prof dans users
      });
      res.status(201).json(student);
    } catch (err) {
      res.status(401).end();
    }
  res.status(401).end();
});


/* création d'un étudiant   /Il faut comme argument
* email 
* name 
* firstname

* retourne status code 
*/
router.post("/createteacher", async (req, res) => {
  const { email, name, firstname } = req.body;
  if (email && name && firstname && !(await User.findOne({ email })))
    try {
      const teacher = await User.create({
        email,
        name,
        firstname,
        userType: 1,//type 1 veut dire prof dans users
      });
      res.status(201).json(teacher);
    } catch (err) {
      res.status(401).end();
    }
  res.status(401).end();
});

/* supprimer un étudiant ici par son email     /Il faut comme argument
* email 


* retourne status code 
*/
router.post("/delete", async (req, res) => {
  const { email } = req.body;
  if (email)
    try {
      await User.deleteOne({ email });
      res.status(201).end();
    } catch (err) {
      res.status(401).end();
    }
  res.status(401).end();
});

router.post("/deletemultiple", async (req, res) => {
  // await User.deleteMany();
  // res.status(201);
  res.status(200).send("<span>Not implemented yet...</span>");
});

// GETTERS
// students
/* récupère  tous les étudiants      /Il faut comme argument
* rien 


* retourne status code 
*/
router.get("/getallstudents", async (req, res) => {
  try {
    const students = await User.find({ userType: 0 });
    res.status(201).json(students);
  } catch (err) {
    res.status(401).end();
  }
});

/* récupère  un  étudiants  par son mail     /Il faut comme argument
* email  


* retourne status code 
*/
router.get("/getstudentbyemail", async (req, res) => {
  const { email } = req.body;
  try {
    const student = await User.find({ userType: 0, email });
    res.status(201).json(student);
  } catch (err) {
    res.status(401).end();
  }
});

// teachers
/* récupère  tous les profs   /Il faut comme argument
* rien 


* retourne status code 
*/
router.get("/getallteachers", async (req, res) => {
  try {
    const teachers = await User.find({ userType: 1 });
    res.status(201).json(teachers);
  } catch (err) {
    res.status(401).end();
  }
});

// teachers
/* récupère un  profs par son mail   /Il faut comme argument
* email  


* retourne status code 
*/
router.get("/getteacherbyemail", async (req, res) => {
  const { email } = req.body;
  try {
    const teacher = await User.find({ userType: 1, email });
    res.status(201).json(teacher);
  } catch (err) {
    res.status(401).end();
  }
});

module.exports = router;

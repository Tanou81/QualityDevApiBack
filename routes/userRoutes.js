const router = require("express").Router();
const User = require("../models/user");

// CREATION DELETION
router.post("/createstudent", async (req, res) => {
  const { email, name, firstname } = req.body;
  if (email && name && firstname && !(await User.findOne({ email })))
    try {
      const student = await User.create({
        email,
        name,
        firstname,
        userType: 0,
      });
      res.status(201).json(student);
    } catch (err) {
      res.status(401).end();
    }
  res.status(401).end();
});

router.post("/createteacher", async (req, res) => {
  const { email, name, firstname } = req.body;
  if (email && name && firstname && !(await User.findOne({ email })))
    try {
      const teacher = await User.create({
        email,
        name,
        firstname,
        userType: 1,
      });
      res.status(201).json(teacher);
    } catch (err) {
      res.status(401).end();
    }
  res.status(401).end();
});

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
router.get("/getallstudents", async (req, res) => {
  try {
    const students = await User.find({ userType: 0 });
    res.status(201).json(students);
  } catch (err) {
    res.status(401).end();
  }
});

router.get("/getstudentbyemail", async (req, res) => {
  const { email } = req.body;
  try {
    const student = await User.find({ userType: 0, email });
    res.status(201).json(student);
  } catch (err) {
    res.status(401).end();
  }
});

router.get("/getstudentbyid", async (req, res) => {
  const { _id } = req.body;
  try {
    const student = await User.find({ userType: 0, _id });
    console.log("/getstudentbyid id - student")
    console.log(_id)
    console.log(student)
    res.status(201).json(student);
  } catch (err) {
    res.status(401).end();
  }
});

// teachers
router.get("/getallteachers", async (req, res) => {
  try {
    const teachers = await User.find({ userType: 1 });
    res.status(201).json(teachers);
  } catch (err) {
    res.status(401).end();
  }
});

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

const router = require("express").Router();
const User = require("../models/user");

router.post("/createstudent", async (req, res) => {
  const userData = ({ email, name, firstname } = req.body);
  if (
    userData.email &&
    userData.name &&
    userData.firstname &&
    !(await User.findOne({ email: userData.email }))
  )
    try {
      const student = await User.create({
        ...userData,
        userType: 0,
      });
      res.status(201).json(student);
    } catch (err) {
      res.status(401).end();
    }
  res.status(401).end();
});

router.post("/createteacher", async (req, res) => {
  const userData = ({ email, name, firstname } = req.body);
  if (
    userData.email &&
    userData.name &&
    userData.firstname &&
    !(await User.findOne({ email: userData.email }))
  )
    try {
      const teacher = await User.create({
        ...userData,
        userType: 1,
      });
      res.status(201).json(teacher);
    } catch (err) {
      res.status(401).end();
    }
  res.status(401).end();
});

router.get("/getallstudents", async (req, res) => {
  try {
    const students = await User.find({ userType: 0 });
    res.status(201).json(students);
  } catch (err) {
    res.status(401).end();
  }
});

router.get("/getallteachers", async (req, res) => {
  try {
    const teachers = await User.find({ userType: 1 });
    res.status(201).json(teachers);
  } catch (err) {
    res.status(401).end();
  }
});

router.post("/deleteuser", async (req, res) => {
  const userData = ({ email } = req.body);
  if (email)
    try {
      const user = await User.deleteOne(userData);
      res.status(201).json(user);
    } catch (err) {
      res.status(401).end();
    }
  res.status(401).end();
});

router.post("/deleteusers", async (req, res) => {
  // await User.deleteMany();
  // res.status(201);
  res.status(200).send("<span>Not implemented yet...</span>");
});

module.exports = router;

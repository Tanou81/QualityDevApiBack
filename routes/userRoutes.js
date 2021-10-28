const router = require("express").Router();
const User = require("../models/user");

router.get("/createstudent", async (req, res) => {
  const userData = ({ email, name, firstname } = req.body);
  if (
    userData.email &&
    userData.name &&
    userData.firstname &&
    !(await User.findOne({ email: userData.email }))
  )
    User.create({
      ...userData,
      userType: 0,
    })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(401).end();
      });

  res.status(401).end();
});

router.get("/createteacher", async (req, res) => {
  const userData = ({ email, name, firstname } = req.body);
  if (
    userData.email &&
    userData.name &&
    userData.firstname &&
    !(await User.findOne({ email: userData.email }))
  )
    User.create({
      ...userData,
      userType: 1,
    })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(401).end();
      });

  res.status(401).end();
});

router.get("/getallstudents", async (req, res) => {
  User.find({ userType: 0 })
    .then((result) => res.status(201).json)
    .catch((err) => {
      res.status(401).end();
    });
});

router.get("/getallteachers", async (req, res) => {
  User.find({ userType: 1 })
    .then((result) => res.status(201).json)
    .catch((err) => {
      res.status(401).end();
    });
});

router.get("/deleteuser", (req, res) => {
  const userData = ({ email } = req.body);
  if (email)
    User.deleteOne(userData)
      .then((result) => {
        res.status(201).json({ msg: "Utilisateur supprimé" });
      })
      .catch((err) => {
        res.status(401).end();
      });

  res.status(401).end();
});

router.get("/deleteusers", async (req, res) => {
  await User.deleteMany();
  res.status(201);
});

module.exports = router;

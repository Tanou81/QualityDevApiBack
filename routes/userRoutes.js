const router = require("express").Router();
const User = require("../models/user");

// CREATION

/**
 * Student creation
 * @param email
 * @param name
 * @param firstname
 */
router.post("/createstudent", async (req, res) => {
  const { email, name, firstname } = req.body;
  if (email && typeof(email) == "string" && name && typeof(name) == "string" && firstname && typeof(firstname) == "string") {
    if (await User.findOne({ email })) {
      // Already existing user, conflict
      res.status(409).end();
    }
    try {
      const student = await User.create({
        email,
        name,
        firstname,
        userType: 0,//type 0 veut dire prof dans users
      });
      res.status(201).json(student);
    } catch (err) {
      res.status(400).end();
    }
  res.status(400).end();
  }
});


/** Student creation
*
* @param email
* @param name
* @param firstname
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
      res.status(400).end();
    }
  res.status(400).end();
});

/** Delete one user
 * @param email
 * @deprecated
 */
router.post("/delete", async (req, res) => {
  const { email } = req.body;
  if (email)
    try {
      await User.deleteOne({ email });
      res.status(201).end();
    } catch (err) {
      res.status(400).end();
    }
  res.status(400).end();
});

/** Delete one user by id
 * 
 * @param _id
 */
router.delete("/deletebyid", async (req, res) => {
  let { _id } = req.body;
  try {
    let user = await User.findOneAndDelete({_id});
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

/** Delete one user by mail
*
* @param email
*/
router.delete("/deletebyemail", async (req, res) => {
  let { email } = req.body;
  try {
    let user = await User.findOneAndDelete({email});
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

/** Delete multiple users by id
 * 
 * @param idArray an array containing id of users to be deleted
 * @todo migrate this request as a .delete
 */
router.post("/deletemultiple", async (req, res) => {
  console.log("/deletemultiple");
  let { idArray } = req.body;
  if (Array.isArray(idArray) && idArray.length > 0) {
    try {
      let res = await User.deleteMany({_id: {$in: idArray}});
      res.status(200).json(res);
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(400).end();
  }
});

// GETTERS (READ)

/** Get all users
*
*
*/
router.get("/getallusers", async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json(res);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

/** Get one user by id
*
* @param _id
*/
router.get("/getuserbyid", async (req, res) => {
  let { _id } = req.body;
  try {
    let user = await User.findById(_id);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});


/** Get all students
*
*
*/
router.get("/getallstudents", async (req, res) => {
  try {
    const students = await User.find({ userType: 0 });
    res.status(201).json(students);
  } catch (err) {
    res.status(400).end();
  }
});

/** Get one student using his email
*
* @param email
*/
router.get("/getstudentbyemail", async (req, res) => {
  const { email } = req.body;
  try {
    const student = await User.findById({ userType: 0, email });
    res.status(201).json(student);
  } catch (err) {
    res.status(400).end();
  }
});

/** Get one student by id
*
* @param _id
*/
router.get("/getstudentbyid", async (req, res) => {
  console.log("/getstudentbyid")
  const { _id } = req.query;
  try {
    const student = await User.findById({ userType: 0, _id });
    res.status(201).json(student);
  } catch (err) {
    res.status(400).end();
  }
});

/** Get all teachers
*
*
*/
router.get("/getallteachers", async (req, res) => {
  try {
    const teachers = await User.find({ userType: 1 });
    res.status(201).json(teachers);
  } catch (err) {
    res.status(400).end();
  }
});

/** Get one techer using his email
*
* @param email
*/
router.get("/getteacherbyemail", async (req, res) => {
  const { email } = req.body;
  try {
    const teacher = await User.findById({ userType: 1, email });
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).end();
  }
});

/** Get one teacher using his id
*
* @param _id
*/
router.get("/getteacherbyid", async (req, res) => {
  console.log("/getteacherbyid")
  const { _id } = req.query;
  try {
    const teacher = await User.findById({ userType: 1, _id });
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).end();
  }
});

// Update

/** Update user email
 * 
 * @param _id
 * @param email
 */
router.put("/updateemail", async (req, res) => {
  console.log("/updateemail");
  const { _id, email } = req.body;
  try {
    let usersUsingEmail = await User.find({ email });
    if (Array.isArray(usersUsingEmail) && usersUsingEmail.length > 0){
      console.error("User trying to update email already used");
      res.status(409).end();
    }
    let user = await User.findByIdAndUpdate(_id, {
      email
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

/** Update user name
 * 
 * @param _id
 * @param name
 */
router.put("/updatename", async (req, res) => {
  console.log("/updatename");
  const { _id, name } = req.body;
  try {
    let user = await User.findByIdAndUpdate(_id, {
      name
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

/** Update user firstname
 * 
 * @param _id
 * @param firstname
 */
 router.put("/updatefirstname", async (req, res) => {
  console.log("/updatefirstname");
  const { _id, name } = req.body;
  try {
    let user = await User.findByIdAndUpdate(_id, {
      firstname
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

/** Update user userType
 * 
 * @param _id
 * @param userType
 */
 router.put("/updateusertype", async (req, res) => {
  console.log("/updatefirstname");
  const { _id, userType } = req.body;
  try {
    let user = await User.findByIdAndUpdate(_id, {
      userType
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

module.exports = router;

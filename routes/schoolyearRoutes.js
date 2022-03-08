const router = require("express").Router();
const SchoolYear = require("../models/schoolyear");

// Create
/** Create a school year
 * 
 * @param name
 * @param startYear
 * @param endYear
 */
router.post("/create", async (req, res) => {
  let { name, startYear, endYear } = req.body;
  try {
    let schoolYear = await SchoolYear.create({
      name,
      startYear,
      endYear
    });
    res.status(201).json(schoolYear);
  } catch (error) {
    console.error(error);
    res.status(401).end();
  }
  res.status(401).end();
});

// Read / Getter
/** Get all school years
 * 
 * 
 */
router.get("/getallschoolyears", async (req, res) => {
  console.log("/getallschoolyears");
  try {
    let schoolYears = await SchoolYear.find();
    res.status(201).json(schoolYears);
  } catch (error) {
    console.error(error);
    res.status(401).end()
  }
  res.status(401).end()
});

/** Get one school year by id
 * 
 * @param _id
 */
router.get("/getbyid", async (req, res) => {
  let { _id } = req.query;
  try {
    let schoolYear = await SchoolYear.findById({
      _id
    });
    res.status(201).json(schoolYear);
  } catch (error) {
    console.error(error);
    res.status(401).end();
  }
  res.status(401).end();
});

// Update
router.put("/updatename", async (req, res) => {
  let { _id, name } = req.body;
  try {
    let schoolYear = await SchoolYear.findByIdAndUpdate(_id, {
      name
    },
    // options
    {
      new: true
    });
    res.status(201).json(schoolYear);
  } catch (error) {
    console.error(error);
    res.status(401).end();
  }
  res.status(401).end();
});

// Delete
/** Delete one school year using id
 * 
 * @param _id
 */
router.delete("/delete", async (req, res) => {
  let { _id } = req.body;
  try {
    let schoolYear = await SchoolYear.deleteOne({
      _id
    },
    // options
    {
      new: true
    });
    res.status(201).json(schoolYear);
  } catch (error) {
    console.error(error);
    res.status(401).end();
  }
  res.status(401).end();
});

module.exports = router;
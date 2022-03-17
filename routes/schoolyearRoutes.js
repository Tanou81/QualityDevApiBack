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
    res.status(400).end();
  }
  res.status(400).end();
});

// Getters (Read)

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
    res.status(400).end()
  }
  res.status(400).end()
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
    res.status(400).end();
  }
  res.status(400).end();
});

/** Get all schoolYears objects which start at year startYear
 * 
 * @param startYear
 */
router.get("/getAllStartingByYear", async (req, res) => {
  let { startYear } = req.query;
  try {
    let schoolYears = await SchoolYear.find({startYear});
    res.status(201).json(schoolYears);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
  res.status(400).end();
});

// Update

/** Update name
 * 
 * @param _id
 * @param name
 */
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
    res.status(400).end();
  }
  res.status(400).end();
});

/** Update startYear
 * 
 * @param _id
 * @param startYear
 */
router.put("/updatestartyear", async (req, res) => {
  let { _id, startYear } = req.body;
  try {
    let schoolYear = await SchoolYear.findByIdAndUpdate(_id, {
      startYear
    },
    // options
    {
      new: true
    });
    res.status(201).json(schoolYear);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
  res.status(400).end();
});

/** Update endYear
 * 
 * @param _id
 * @param endYear
 */
router.put("/updateendyear", async (req, res) => {
  let { _id, endYear } = req.body;
  try {
    let schoolYear = await SchoolYear.findByIdAndUpdate(_id, {
      endYear
    },
    // options
    {
      new: true
    });
    res.status(201).json(schoolYear);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
  res.status(400).end();
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
    res.status(400).end();
  }
  res.status(400).end();
});

module.exports = router;
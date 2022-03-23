const router = require("express").Router();
const Evaluation = require("../models/evaluation");
const EvaluationFormat = require("../models/evaluationformats");
const Group = require("../models/group");

// Create

/** Create evaluation
 * 
 * 
 * @param evaluationFormatId
 * @param grades optional array of grades [int]
 */
router.post("/create", async (req, res) => {
  let { grades, evaluationFormatId } = req.body;
  if (evaluationFormatId && typeof(evaluationFormatId) == "string") {
    try {
      let evaluationFormat = await EvaluationFormat.find(evaluationFormatId);
      let factorsLength = evaluationFormat.factors.length;
      grades = grades ? grades : Array.from({length: factorsLength}, () => {return 0});
      let evaluation = Evaluation.create({
        format: evaluationFormatId,
        grades
      });
      res.status(201).json(evaluation);
    } catch (error) {
      console.error(error);
      res.status(400).end()
    }
  }
  res.status(400).end();
});

// GETTERS (Read)

/** Get all evaluation
 * 
 * 
 */
router.get("/getallevaluations", async (req, res) => {
  try {
    let evaluations = await Evaluation.find();
    res.status(201).json(evaluations);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

/** Get one evaluation by id 
 * 
 * @param _id
 */
router.get("/getevaluationbyid", async (req, res) => {
  let { _id } = req.query;
  console.log("/getevaluationbyid",_id);
  try {
    const evaluation = await Evaluation.findById(_id);
    if (evaluation) {
      res.status(201).json(evaluation);
    } else throw new Error("Could not find asked sprint");
  } catch (error) {
    console.error(error);
    res.status(402).end();
  }
});

// UPDATE

/** Update evaluation format
 * 
 * @description BE CAUTIOUS: updating to a new
 * evaluation formatwith factors length different
 * than previous will result in grades being reset
 * @param evaluationId
 * @param formatId
 */
router.put("/updateformat", async (req, res) => {
  let { evaluationId, formatId } = req.body;
  try {
    // Check if new format has the same amount of factors as previous
    // if not we have to reset grades
    let evaluation = await Evaluation.find(evaluationId);
    let evaluationFormat = await EvaluationFormat.find(formatId);
    let factorsLength = evaluationFormat.factors.length;
    let gradesLength = evaluation.grades.length;
    let newGrades = evaluation.grades;
    if (factorsLength != gradesLength) {
      newGrades = Array.from({length: factorsLength}, () => {return 0});
    }
    let newEvaluation = Evaluation.findByIdAndUpdate({
      format: formatId,
      grades: newGrades
    },
    // options
    {
      new: true
    });
    res.status(201).json(newEvaluation);
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
});

/** Update grades array
 * 
 * @description "grades" must have the required length
 * specified by the evaluation format
 * @param evaluationId
 * @param grades an array of grades
 */
router.put("/updategrades", async (req, res) => {
  let { evaluationId, grades } = req.body;
  if (Array.isArray(grades) && grades.length > 0) {
    try {
      let evaluation = await Evaluation.findById(evaluationId);
      if (evaluation.grades.length != grades.length) 
        throw "\"grades\" array is not of required length";
      let newEvaluation = await Evaluation.findByIdAndUpdate(evaluationId, {
        grades
      },
      // options
      {
        new: true
      });
      res.status(201).json(newEvaluation);
    } catch (error) {
      console.error(error);
    }
  }
  res.status(400).end();
});

/** Update one (only one) grade 
 * 
 * @param evaluationId
 * @param grade
 * @param index index of the grade to be replaced
 */
router.put("/updategradeatindex", async (req, res) => {
  let { evaluationId, grade, index } = req.body;
  try {
    let evaluation = await Evaluation.find(evaluationId);
    
    if (index >= evaluation.grades.length)
      throw "Index out of bound";
    if (index < 0)
      throw "Index is negative";
    
    let newGrades = evaluation.grades;
    newGrades[index] = grade;
    let newEvaluation = await Evaluation.findByIdAndUpdate(evaluationId, {
      grades: newGrades
    },
    // options
    {
      new: true
    });
    res.status(201).json(newEvaluation);
  } catch (error) {
    console.error(error);
  }
});

// Delete

/** Delete one evaluation
 * 
 * @description Safe delete: if evaluation is referenced
 * in any group, deleting is cancelled
 * @param evaluationId
 */
router.delete("/delete", async (req, res) =>{
  let { evaluationId } = req.body;
  try {
    // Checking if the evaluation is referenced in any group
    let occurence = Group.count({
      evaluation: evaluationId
    });
    if (occurence > 0) 
      throw `evaluation is referenced ${occurence} time(s), check /deleteforce`;
    let evaluation = Evaluation.findOneAndDelete({
      _id: evaluationId
    });
    res.status(201).json(evaluation);
  } catch (error) {
    console.error(error);
    res.status(400).end()
  }
});


/** Force delete of one evaluation
 * 
 * @description Force delete: evaluation is deleted
 * without checking if it is referenced in a group
 * @param evaluationId
 */
router.delete("/deleteforce", async (req, res) =>{
  let { evaluationId } = req.body;
  try {
    let evaluation = Evaluation.findOneAndDelete({
      _id: evaluationId
    });
    res.status(201).json(evaluation);
  } catch (error) {
    console.error(error);
    res.status(400).end()
  }
});

/** Update evaluation (??)
 * 
 * @param evaluationFormatId
 * @param evalFormat
 * @todo clean and check
 * @deprecated HIGHLY UNRECOMMENDED
 */
  router.post("/updategradesevaluationID", async (req, res) => {
    const { evaluationID, evaluation} = req.body;
    console.log("/updategradesevaluationID",evaluationID,evaluation);
    if (evaluationID && evaluation) {
      try {
        await Evaluation.findByIdAndUpdate(evaluationID, {
          grades: evaluation,
        });
        res.status(202).json(evaluation);
      } catch (error) {
        console.error(error);
      }
    }
    res.status(402).end();
  
  });

module.exports = router;

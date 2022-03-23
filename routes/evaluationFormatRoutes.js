const router = require("express").Router();
//on appel les modèles pour vérif 
// const Group = require("../models/group");
 const Sprint = require("../models/sprint");
 const Group = require("../models/group");
// const LabelFormat = require("../models/labelformat");
const EvaluationFormat = require("../models/evaluationformats");
const Evaluation = require("../models/evaluation");

// Getters (Read)

/** Get all evaluationFormats
 * 
 */
router.get("/getallevaluationformat", async (req, res) => {
  console.log("/getallevaluationformat");
  try {
    const evalFormat = await EvaluationFormat.find();
    res.status(202).json(evalFormat);
  } catch (error) {
    res.status(402).end();
  }
});

/** Get an evaluationFormat by id
 * 
 * 
 * @param _id
 * @todo rename/migrate/create duplicate request with lower case name
 */
router.get("/getEvaluationFormatById", async (req, res) => {
  console.log("/getEvaluationFormatById");
  const { _id } = req.query;
  if (_id && typeof(_id) == "string") {
    try {
      const evaluationFormat = await EvaluationFormat.findById(_id);
      if (evaluationFormat) {
        res.status(201).json(evaluationFormat);
      } else throw "Could not find asked evaluationFormat";
    } catch (err) {
      console.error("error trying to get evaluationFormat by id");
      console.error(err);
      res.status(402).end();
    }
  } else {
    res.status(402).end();
  }
});

// Update

/** Update evaluationFormat
 * 
 * @param evaluationFormatId
 * @param evalFormat
 * @todo rename/migrate/create duplicate request with full name
 * @todo clean
 */
 router.post("/updateevalformat", async (req, res) => {
  const { evaluationFormatId, evalFormat} = req.body;
  console.log("/updateevalformat", evaluationFormatId, evalFormat);
  if (evaluationFormatId && evalFormat) {
    try {
      const EvaluationFormatt = await EvaluationFormat.findByIdAndUpdate(evaluationFormatId, {
        factors: evalFormat.factors,
        name: evalFormat.name,
      });
      res.status(202).json(EvaluationFormatt);
    } catch (error) {
      console.error(error);
    }
  }
  try{
  const Eval = await Evaluation.find({format : evaluationFormatId});
      const newGrades=[]
      for(i = 0; i<evalFormat.factors.length ;i++){
        newGrades.push(0);
      }
      for(i = 0; i<Eval.length ;i++){
        const newEVal= await Evaluation.findByIdAndUpdate(Eval[i]._id,{grades: newGrades});
      }
      res.status(201).json();
    }  catch (error) {
      console.error(error);
    }
  res.status(402).end();

});

// Create

/** Create an evalautionFormat
 * 
 * @param name
 * @param factors
 * @todo rename/migrate/create duplicate request with full name
 */
router.post("/createevalFormat", async (req, res) => {
  const { name, factors } = req.body;
  console.log("/createevalFormat",name,factors)
  if (name && factors)
    try {
      const evalFormat = await EvaluationFormat.create({
        name,
        factors,
      });
      res.status(201).json(evalFormat);
    } catch (err) {
      res.status(400).end();
    }
  res.status(400).end();
});

// Delete

/** Delete one format
 * 
 * 
 * @param id
 */
 router.delete("/delete", async (req, res) => {
  console.log("/delete");
  const { _id } = req.body;
  try {
      let evaluationsUsingFormat = await Evaluation.find({format: _id});
      if (Array.isArray(evaluationsUsingFormat) && evaluationsUsingFormat.length > 0)
          throw new Error("Trying to delete evaluationFormat in use in certains evaluations");
      let deletedEvaluationFormat = await EvaluationFormat.findByIdAndDelete(_id);
      res.status(200).json(deletedEvaluationFormat);
  } catch (error) {
      console.error(error);
      res.status(400).end();
  }
});

module.exports = router;

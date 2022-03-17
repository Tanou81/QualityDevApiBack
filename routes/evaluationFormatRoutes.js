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
  console.log("/updateevalformat",evaluationFormatId,evalFormat);
  if (evaluationFormatId && evalFormat) {
    try {
      
      const EvaluationFormatt = await EvaluationFormat.findByIdAndUpdate(evaluationFormatId, {
        factors: evalFormat.factors,
        name: evalFormat.name,
      });
      
      console.log(EvaluationFormatt);
      res.status(202).json(EvaluationFormatt);
    } catch (error) {
      console.log("error trying to update sprint, error:");
      console.log(error);
      console.error(error);
    }
  }
  try{
  const Eval = await Evaluation.find({format : evaluationFormatId});
      console.log("Eval",Eval)
      const newGrades=[]
      // console.log("rétrécrir",Eval.length)
      for(i = 0; i<evalFormat.factors.length ;i++){
        
        console.log(evalFormat.factors.length)
        newGrades.push(0)
      
      }
      for(i = 0; i<Eval.length ;i++){
        console.log("la",Eval[i]._id)
        const newEVal= await Evaluation.findByIdAndUpdate(Eval[i]._id,{grades: newGrades});
        console.log(newEVal);
       
      }
      res.status(201).json();

     
     
      // if( evalFormat.factors.length ()>Eval.grades.length ()){
      //   console.log("rétrécrirrr")
      // }
    }  catch (error) {
      console.log("error trying to take eval, error:");
      console.log(error);
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
  console.log("createevalFormat",name,factors)
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

/** Delete one evaluationFormat
 * 
 * @param _id
 * @todo clean
 */
 router.delete("/deleteevalFormat", async (req, res) => {
  console.log("evalFormat/deleteevalFormat",req.body);
  const { _id } = req.body;
  //if (_id) id = _id;
  if (_id) {
    try {
      const group = await EvaluationFormat.findById(_id);
      const groupDeleteSummary = await EvaluationFormat.deleteOne({_id: _id});
      console.log("group");
      console.log(group);
      console.log("groupDeleteSummary");
      console.log(groupDeleteSummary);
      // const evaluation = await Evaluation.deleteOne({_id: group.evaluation});
      // console.log("evaluation deleted:");
      // console.log(evaluation);
      // res.status(200).json(groupDeleteSummary);
    } catch (err) {
      res.status(404).json({err: err});
    }
  } else {
    res.status(400).json({err: "Id wrong format or too short"});
  }
});


/** Delete one format
 * @param id
 * @deprecated
 */
 router.post("/delete", async (req, res) => {
  const { _id } = req.body;
  
  //const { email } = req.body;
  console.log("deleteevalFormat delete id : ",_id);
  if (_id)
    try {
      await EvaluationFormat.deleteOne({ _id });
      res.status(201).end();
    } catch (err) {
      res.status(400).end();
    }
  res.status(400).end();
});

module.exports = router;

const router = require("express").Router();
//on appel les modèles pour vérif 
// const Group = require("../models/group");
 const Sprint = require("../models/sprint");
 const Group = require("../models/group");
// const LabelFormat = require("../models/labelformat");
const EvaluationFormat = require("../models/evaluationformats");
const Evaluation = require("../models/evaluation");
/* récupérer un  label  /Il faut comme argument
* un _id 

*retourne status code 
*/
router.get("/getallevaluationformat", async (req, res) => {
  console.log("/getallevaluationformat");
  try {
    const evalFormat = await EvaluationFormat.find();
    console.log("evalFormat");
    console.log(evalFormat);
    res.status(202).json(evalFormat);
  } catch (error) {
    res.status(402).end();
  }
});

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
      for(i = 0; i<Eval.length ;i++){
        console.log("rétrécrir",Eval[i].grades.length)
        console.log(evalFormat.factors.length)
        if (evalFormat.factors.length<Eval[i].grades.length){
          newGrades = [evalFormat.factors.length]
        }
      }
      console.log("newGrades",newGrades)
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


/** Delete one group and update its Evaluation
 * 
 * @param _id @deprecated
 * @param id
 * @todo clean & check for usage in front (update param usage?)
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

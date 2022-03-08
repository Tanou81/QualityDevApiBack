const router = require("express").Router();
//on appel les modèles pour vérif 
// const Group = require("../models/group");
// const Sprint = require("../models/sprint");
// const LabelFormat = require("../models/labelformat");
const Evaluation = require("../models/evaluation");

/* récupérer un  label  /Il faut comme argument
* un _id 

*retourne status code 
*/
router.get("/getevaluationbyid", async (req, res) => {

    let { _id } = req.query;
    console.log("/getevaluationbyid",_id);
    try {
      const evaluation = await Evaluation.findById(_id);
      if (evaluation) {
        res.status(201).json(evaluation);
      } else throw "Could not find asked sprint";
    } catch (error) {
      console.log("error fetching specific sprint, error:");
      console.log(error);
      console.error(error);
      res.status(402).end();
    }
  });

  router.post("/updateevaluationID", async (req, res) => {
    const { evaluationID, evaluation} = req.body;
    console.log("/updateevaluationID",evaluationID,evaluation);
    if (evaluationID && evaluation) {
      try {
        await Evaluation.findByIdAndUpdate(evaluationID, {
          grades: evaluation.grades,
        });
        res.status(202).end();
      } catch (error) {
        console.log("error trying to update sprint, error:");
        console.log(error);
        console.error(error);
      }
    }
    res.status(402).end();
  
  });





module.exports = router;
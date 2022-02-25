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
router.get("/getevaluationID", async (req, res) => {
  console.log("/getevaluationID");
  let { _id } = req.query;
  try {
    const sprint = await Evaluation.findById(_id);
    if (sprint) {
      res.status(201).json(sprint);
    } else throw "Could not find asked sprint";
  } catch (error) {
    console.log("error fetching specific sprint, error:");
    console.log(error);
    console.error(error);
    res.status(402).end();
  }
});

router.post("/updateevaluationID", async (req, res) => {
  const { evaluationFormatId, evalFormat} = req.body;
  console.log("/updateevalformat",evaluationFormatId,evalFormat);
  if (evaluationFormatId && evalFormat) {
    try {
      await EvaluationFormat.findByIdAndUpdate(evaluationFormatId, {
        factors: evalFormat.factorss,
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
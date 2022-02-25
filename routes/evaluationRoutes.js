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
  console.log("/getevaluationbyid  tt")
  const { _id } = req.query;
  try {
    const evaluation = await User.find({ _id });
    res.status(201).json(evaluation);
  } catch (err) {
    res.status(401).end();
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
const router = require("express").Router();
//on appel les modèles pour vérif 
// const Group = require("../models/group");
 const Sprint = require("../models/sprint");
// const LabelFormat = require("../models/labelformat");
const EvaluationFormat = require("../models/evaluationformats");

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

module.exports = router;

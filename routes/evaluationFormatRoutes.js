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
    const evalFormat = await Sprint.find();
    console.log("evalFormat");
    console.log(evalFormat);
    res.status(202).json(evalFormat);
  } catch (error) {
    res.status(402).end();
  }
});

module.exports = router;

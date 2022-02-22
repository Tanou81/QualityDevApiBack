const router = require("express").Router();
//on appel les modèles pour vérif 
// const Group = require("../models/group");
// const Sprint = require("../models/sprint");
// const LabelFormat = require("../models/labelformat");
const evaluationFormat = require("../models/evaluationformats");

/* récupérer un  label  /Il faut comme argument
* un _id 

*retourne status code 
*/
router.get("/getallevaluationformat", async (req, res) => {
  try {
    const evalFormat = await evaluationFormat.find();
    res.status(202).json(evalFormat);
  } catch (error) {
    res.status(402).end();
  }
});

module.exports = router;
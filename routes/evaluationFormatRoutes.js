const router = require("express").Router();
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

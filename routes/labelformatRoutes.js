const router = require("express").Router();
const LabelFormat = require("../models/labelformat");


/* récupérer un  label  /Il faut comme argument
* un _id 

*retourne status code 
*/
router.get("/getlabelformatbyid", async (req, res) => {
    let { _id } = req.query;
    console.log("/getlabelformatbyid, id");
    console.log(_id);
    try {
        const labelformat = await LabelFormat.findById(_id);
        if (labelformat) {
            res.status(201).json(labelformat);
        } else throw "Could not find asked labelformat";
    } catch (error) {
        console.error(error);
        res.status(402).end();
    }
});

module.exports = router;
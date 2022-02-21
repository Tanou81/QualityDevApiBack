const router = require("express").Router();
const LabelFormat = require("../models/labelformat");

router.get("/getlabelformatbyid", async (req, res) => {
    console.log("/getlabelformatbyid, id");
    let { _id } = req.query;
    console.log(_id);
    try {
        const labelformat = await LabelFormat.findById(_id);
        if (labelformat) {
            console.log("labelformat");
            console.log(labelformat);
            res.status(201).json(labelformat);
        } else throw "Could not find asked labelformat";
    } catch (error) {
        console.log("error fetching specific labelformat, error:");
        console.log(error);
        console.error(error);
        res.status(402).end();
    }
});

module.exports = router;
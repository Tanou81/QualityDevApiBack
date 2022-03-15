const router = require("express").Router();
const LabelFormat = require("../models/labelformat");

// CREATE
/** Create a label format
 * 
 * @param name should not be already used for another labelFormat
 * @param weeks number of weeks/sprints
 * @param labels an array of object
 * with field label(String) and maxValue(Number)
 */
router.post("/create", async (req, res) => {
    let { name, weeks, labels } = req.body;
    if (name && typeof(name) == "string"
    && weeks && typeof(weeks) == "number"
    && Array.isArray(labels) && labels.length > 0) {
        try {
            let occurence = await LabelFormat.count({
                name
            });
            if (occurence > 0)
                throw "LabelFormat with same name already existing";
            let labelFormat = await LabelFormat.create({
                name,
                weeks,
                labels
            });
            res.status(201).json(labelFormat);
        } catch (error) {
            console.error(error);
            res.status(400).end();
        }
    }
    res.status(400).end();
});


// GETTERS
/** Get all labelFormats
 * 
 * 
 */
router.get("/getalllabelformats", async (req, res) => {
    try {
        let labelFormats = await LabelFormat.find();
        res.status(201).json(labelFormats);
    } catch (error) {
        console.error(error);
        res.status(400).end();
    }
});

/** Get one label format by id
 * 
 * @param _id
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
        res.status(400).end();
    }
});


/** Update labelFormat name 
 * 
 * @param name should not be already used for another labelFormat
 */
router.put("/updatename", async (req, res) => {
    let { _id, name } = req.body;
    if (name && typeof(name) == "string") {
        try {
            let occurence = await LabelFormat.count({
                name
            });
            if (occurence > 0)
                throw "LabelFormat with same name already existing";
            let labelFormat = await LabelFormat.findOneAndUpdate(_id, {
                name
            },
            // options
            {
                new: true
            });
            res.status(201).json(labelFormat);
        } catch (error) {
            console.error(error);
            res.status(400).end();
        }
    }
    res.status(400).end();
});

/** Update labelFormat weeks amount
 * 
 * @param weeks
 */
router.put("/updateweeks", async (req, res) => {
    let { _id, weeks } = req.body;
    try {
        let labelFormat = await LabelFormat.findOneAndUpdate(_id, {
            weeks
        },
        // options
        {
            new: true
        });
        res.status(201).json(labelFormat);
    } catch (error) {
        console.error(error);
        res.status(400).end();
    }
});

// TODO
/** Update labelFormat labels 
 * 
 * @param labels an array of object
 * with field label(String) and maxValue(Number)
 */
/*
router.put("/updatelabels", async (req, res) => {
    let { _id, name } = req.body;
    if (name && typeof(name) == "string") {
        try {
            let occurence = await LabelFormat.count({
                name
            });
            if (occurence > 0)
                throw "LabelFormat with same name already existing";
            let labelFormat = await LabelFormat.findOneAndUpdate(_id, {
                name
            },
            // options
            {
                new: true
            });
            res.status(201).json(labelFormat);
        } catch (error) {
            console.error(error);
            res.status(400).end();
        }
    }
    res.status(400).end();
});
*/

module.exports = router;

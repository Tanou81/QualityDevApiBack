const router = require("express").Router();
const LabelFormat = require("../models/labelformat");
const Group = require("../models/group");
const Sprint = require("../models/sprint");
const startSession = require("mongoose").startSession;

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


// GETTERS (READ)

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

// Update

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

/** Update labelFormat labels 
 * 
 * @param labels an array of object
 * with field label(String) and maxValue(Number)
 * @todo currently it is not implemented in a restrictive way
 * but you may want to ensure that values stored in sprint ratings
 * do not exceed future "label" maxValue
 */
router.put("/updatelabels", async (req, res) => {
    let { _id, labels } = req.body;
    let session = await startSession();
    session.startTransaction();
    try {
        let labelFormat = await LabelFormat.findById(_id);
        let groupsUsingLabelFormat = await Group.find({labelFormat: _id});
        // If any existing sprint of a given group has ratings of different size than @param labels
        // we write over the 'ratings' field of the given sprint
        for (let group of groupsUsingLabelFormat) {
            for (let sprintId of group.sprints) {
                let sprint = await Sprint.findById(sprintId);
                if (sprint.ratings.length !== labels.length) {
                    let array = Array.from({length: labels.length}, () => { return 0; });
                    let newSprint = await Sprint.findByIdAndUpdate(sprintId, {
                        ratings: array
                    }, { new: true });
                }
            }
        }
        let newLabelFormat = await LabelFormat.findByIdAndUpdate(_id, {
            labels
        });
        res.status(200).json(newLabelFormat);
    } catch (error) {
        session.abortTransaction();
        console.error(error);
        res.status(400).end();
    } finally {
        session.endSession();
    }
    res.status(400).end();
});

// Delete

/** Delete a labelFormat using his id
 * 
 * @param _id
 */
router.delete("/delete", async (req, res) => {
    console.log("/delete");
    const { _id } = req.body;
    try {
        let groupsUsingLabelFormat = await Group.find({labelFormat: _id});
        if (Array.isArray(groupsUsingLabelFormat) && groupsUsingLabelFormat.length > 0)
            throw new Error("Trying to delete labelFormat is use in certains groups");
        let deletedLabelFormat = await LabelFormat.findByIdAndDelete(_id);
        res.status(200).json(deletedLabelFormat);
    } catch (error) {
        console.error(error);
        res.status(400).end();
    }
});

module.exports = router;

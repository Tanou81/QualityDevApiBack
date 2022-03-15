const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// TODO: Add grades array contained type
const evaluationSchema = new Schema({
    format: mongoose.Types.ObjectId,
    grades: [Number],
},
{
    // For some reason this seems to not throw any error even when object doesn't match schema
    strict: "throw"
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;
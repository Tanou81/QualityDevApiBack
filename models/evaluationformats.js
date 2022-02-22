const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evaluationformatSchema = new Schema({
    name: String,
    factors: [{
        name: String,
        maxValue: Number,
        ratio:Number, 
        bonus: Boolean
    }]
});

const EvaluationFormat = mongoose.model("EvaluationFormatSchema", evaluationformatSchema);

module.exports = EvaluationFormat;
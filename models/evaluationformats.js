const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evaluationformatSchema = new Schema({
    name: String,
    
    factors: [{
        name: String,
        maxvalue: Number,
        ratio:Number, 
        bonus: Boolean
    }]
});

const evaluationsFormat = mongoose.model("evaluationformatSchema", evaluationformatSchema);

module.exports = evaluationsFormat;
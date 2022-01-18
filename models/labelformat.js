const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelformatSchema = new Schema({
    name: String,
    weeks: Number,
    labels: [{
        label: String,
        maxvalue: Number
    }]
});

const LabelFormat = mongoose.model("LabelFormat", labelformatSchema);

module.exports = LabelFormat;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublicationSchema = new Schema(
    {
        userId: {type: Number, required: true},
        date: {type: String, required: true},
        title: String,
        content: {type: String, required: true},
        favedBy: Array,
        favCount: Number
    },
    {collection: "publications"}
);

module.exports = mongoose.model("publication", PublicationSchema);
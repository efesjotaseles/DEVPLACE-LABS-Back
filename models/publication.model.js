const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublicationSchema = new Schema(
    {
        userId: {type: String, required: true},
        date: {type: String, required: true},
        title: String,
        content: {type: String, required: true},
        favedBy: Array,
        favCount: Number,
        likedBy: Array,
        likeCount: Number,
        dislikedBy: Array,
        dislikeCount: Number
    },
    {collection: "publications"}
);

module.exports = mongoose.model("publication", PublicationSchema);
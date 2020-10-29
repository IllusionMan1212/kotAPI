const mongoose = require("mongoose");

const kotsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    compressed_url: {
        type: String,
        required: true,
        unique: true,
    }
});


module.exports = mongoose.model("kots", kotsSchema);
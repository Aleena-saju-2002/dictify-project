const { default: mongoose } = require("mongoose");

const wordSchema = new mongoose.Schema({
    word: String  
});
module.exports = mongoose.model('Word', wordSchema);

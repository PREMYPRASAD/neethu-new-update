const mongoose = require('mongoose');

const dbUrl = "mongodb+srv://neethuS115:sureshN115@cluster0.k7axd0h.mongodb.net/LibraryDB";
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(dbUrl, connectionParams)
    .then(() => {
        console.log("UserData Database connected");
    })
    .catch(() => {
        console.log("error");
    })
const Schema = mongoose.Schema;

var NewProductSchema = new Schema({
    uFname: String,
    uLname: String,
    username: String,
    //uPhone : Number,
    upassword: String
});

var logindata = mongoose.model('userdata', NewProductSchema); //UserData is the model and NewBookData is the schema

module.exports = logindata;
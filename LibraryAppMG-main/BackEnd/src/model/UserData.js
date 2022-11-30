const mongoose = require('mongoose');

const dbUrl = "mongodb+srv://neethuS115:sureshN115@cluster0.k7axd0h.mongodb.net/LibraryDB?retryWrites=true&w=majority";
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

var NewCredentialSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String


});

var UserData = mongoose.model('userdata', NewCredentialSchema); //UserData is the model and NewBookData is the schema

module.exports = UserData;
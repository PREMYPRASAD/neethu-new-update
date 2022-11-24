const mongoose = require('mongoose');
//mongoose.connect('mongodb+srv://neethuS115:sureshN115@cluster0.k7axd0h.mongodb.net/LibraryDB?retryWrites=true&w=majority');
const dbUrl = "mongodb+srv://neethuS115:sureshN115@cluster0.k7axd0h.mongodb.net/LibraryDB";
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(dbUrl, connectionParams)
    .then(() => {
        console.log("bookdata Database connected");
    })
    .catch(() => {
        console.log("error");
    })
const Schema = mongoose.Schema;

var NewProductSchema = new Schema({
    bookName: String,
    bookAuthorname: String,
    bookdescription: String,
    //bookPrice : Number,
    //bookRate : Number,
    bookImageurl: String
});

var bookdata = mongoose.model('book', NewProductSchema); //UserData is the model and NewBookData is the schema

module.exports = bookdata;
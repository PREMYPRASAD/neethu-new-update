const mongoose = require('mongoose');
const dbUrl = "mongodb+srv://neethuS115:sureshN115@cluster0.k7axd0h.mongodb.net/LibraryDB?retryWrites=true&w=majority";
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(dbUrl, connectionParams)
    .then(() => {
        console.log("Book Database connected");
    })
    .catch(() => {
        console.log("error");
    })

const Schema = mongoose.Schema;

var NewBookSchema = new Schema({
    name: String,
    author: String,
    imageUrl: String,
    description: String
});

var BookData = mongoose.model('books', NewBookSchema);

module.exports = BookData;
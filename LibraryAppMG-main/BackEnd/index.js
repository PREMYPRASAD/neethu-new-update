const express = require('express');
const UserData = require('./src/model/UserData');
const BookData = require('./src/model/BookData');
const app = new express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

app.use(express.static('./dist/frontend'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


function verifyToken(req, res, next) {
    console.log('headers', req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token == 'null') {
        return res.status(401).send('Unauthorized request')
    }
    console.log('token', token);
    let payload = jwt.verify(token, 'secretKey');
    console.log('payload', payload);
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}
// for inserting user details during signup to database
app.post('/api/signup', function(req, res) {

    console.log("userdata from front", req.body);

    var userdata = {
        firstname: req.body.userdata.firstname,
        lastname: req.body.userdata.lastname,
        username: req.body.userdata.username,
        password: req.body.userdata.password

    }
    console.log("userdata 1", userdata);
    var userdata = new UserData(userdata);
    console.log("userdata 2", userdata);
    userdata.save();
    res.status(200).send({ status: 'Signup completed successfully' });
});


app.post("/api/login", (req, res) => {
    let userData = req.body;
    var flag = false;

    UserData.find().then(function(user) {
        console.log("user-db", user);
        for (let i = 0; i < user.length; i++) {
            if (userData.username == user[i].username && userData.password == user[i].password) {
                flag = true;
                break;
            } else {
                flag = false;
            }
        }
        console.log("flag", flag);
        if (flag == true) {
            let payload = { subject: userData.username + userData.password };
            let token = jwt.sign(payload, "secretKey");
            res.status(200).send({ token });
        } else {
            res.status(401).send("Invalid UserName or Password");
        }
    });
});

//to get the booklist from the database
app.get('/api/books', function(req, res) {

    console.log('hi')

    BookData.find()
        .then(function(books) {
            res.send(books);
            
        });
});

// to insert book details to the database
app.post('/api/insertbook', verifyToken, function(req, res) {

    console.log(req.body);

    var book = {
        name: req.body.book.name,
        author: req.body.book.author,
        description: req.body.book.description,
        imageUrl: req.body.book.imageUrl,
    }
    var book = new BookData(book);
    book.save();

});

//to access the details of single book
app.get('/api/:id', (req, res) => {
    const id = req.params.id;
    console.log("req id", id);
    BookData.findOne({ "_id": id })
        .then((book) => {

            res.send(book);
        });
});

//to update the details of a book
app.put('/api/update', (req, res) => {
    
    id = req.body._id,
        name = req.body.name,
        author = req.body.author,
        description = req.body.description,
        imageUrl = req.body.imageUrl
    BookData.findByIdAndUpdate({ "_id": id }, {
            $set: {
                "name": name,
                "author": author,
                "description": description,
                "imageUrl": imageUrl
            }
        })
        .then(function() {
            res.send();
        })
});


// to delete a book

app.delete('/api/remove/:id', (req, res) => {

    id = req.params.id;
    BookData.findByIdAndDelete({ "_id": id })
        .then(() => {
            
            res.send();
        })
});

app.listen(process.env.PORT || 3000, function() {
    console.log('listening to port 3000');
});
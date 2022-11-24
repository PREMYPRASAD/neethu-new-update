const express = require('express');
const logindata = require('./src/Model/logindb');
const bookdata = require('./src/Model/bookdb');
const app = new express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
var bodyparser = require('body-parser');


app.use(cors());
app.use(bodyparser.json())

// username = "admin";
// password = "1234";

function verifyToken(req, res, next) {
    console.log('headers', req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split('')[1];
    if (token == 'null') {
        return res.status(401).send('Unauthorised request')
    }
    console.log('token', token);
    let payload = jwt.verify(token, 'secretkey')
    console.log(payload)
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}


// for inserting user details during signup to database

app.post('/api/signup', function(req, res) {

    console.log(req.body);
    var userdata = {
        uFname: req.body.userdata.uFname,
        uLname: req.body.userdata.uLname,
        username: req.body.userdata.username,
        //uphone: req.body.Users.uPhone,
        upassword: req.body.userdata.upassword

    }
    console.log("userdata 1", userdata);
    var userdata = new logindata(userdata);
    console.log("userdata 2", userdata);
    userdata.save();
    res.status(200).send({ status: 'Signup completed successfully' });
});
//   var signup = {       
//     uFname : req.body.login.uFname,

//     uLname : req.body.login.uLname,
//       uEmail : req.body.login.uEmail,
//       uphone : req.body.login.uphone,
//       upassword : req.body.login.upassword
//   }       
// var signup = new logindata(signup);
// signup.save();
// });
app.post("/api/login", (req, res) => {
    let userData = req.body;
    var flag = false;

    logindata.find().then(function(user) {
        console.log("user-db", user);
        for (let i = 0; i < user.length; i++) {
            if (userData.username == user[i].username && userData.upassword == user[i].upassword) {
                flag = true;
                break;
            } else {
                flag = false;
            }
        }
        console.log("flag", flag);
        if (flag == true) {
            let payload = { subject: userData.username + userData.upassword };
            let token = jwt.sign(payload, "secretKey");
            res.status(200).send({ token });
        } else {
            res.status(401).send("Invalid UserName or Password");
        }
    });
});

// app.post('/api/login', (req, res) => {
//     console.log('inside');
//     let userData = req.body
//     if (!username) {
//         res.status(401).send('Invalid Password')
//     } else
//     if (password !== userData.upassword) {
//         res.status(401).send('Invalid Password')
//     } else {
//         let payload = { subject: username + password }
//         let token = jwt.sign(payload, 'secretkey')
//         res.status(200).send({ token })
//     }
// })

//to get the booklist from the database
app.get('/api/books', function(req, res) {

    console.log('hi')

    bookdata.find()
        .then(function(book) {
            res.send(book);
        });

});


// to insert book details to the database
app.post('/api/insertbook', verifyToken, function(req, res) {

    console.log(req.body);

    var book = {
        bookName: req.body.book.bookName,
        bookAuthorname: req.body.book.bookAuthorname,
        bookdescription: req.body.book.bookdescription,
        //bookPrice: req.body.Books.bookPrice,
        //bookRate: req.body.Books.bookRate,
        bookImageurl: req.body.book.bookImageurl,
    }
    var book = new bookdata(book);
    book.save();

});


//to access the details of single book
app.get("/api/:id", (req, res) => {
    const id = req.params.id;
    bookdata.findOne({ _id: id })
        .then((book) => {
            res.send(book);
        });
});


//to update the details of a book
app.put('/api/update', (req, res) => {
    console.log(req.body)

    id = req.body._id
    bookName = req.body.bookName,
        bookAuthorname = req.body.bookAuthorname,
        bookdescription = req.body.bookdescription,
        //bookPrice = req.body.bookPrice,
        // bookRate = req.body.bookRate,
        bookImageurl = req.body.bookImageurl
    bookdata.findByIdAndUpdate({ "_id": id }, {
            $set: {
                "bookName": bookName,
                "bookAuthorname": bookAuthorname,
                "bookdescription": bookdescription,
                //"bookPrice": bookPrice,
                //"bookRate": bookRate,
                "bookImageurl": bookImageurl
            }
        })
        .then(function() {
            res.send();
        })
});


// to delete a book
app.delete('/api/remove/:id', (req, res) => {

    id = req.params.id;
    bookdata.findByIdAndDelete({ "_id": id })
        .then(() => {
            console.log('success')
            res.send();
        })
});



app.listen(3006, function() {
    console.log('listening to port 3006');
});
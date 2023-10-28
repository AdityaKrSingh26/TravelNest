const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('./config/databse')


app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());


const user = require('./models/user');
const hotel = require('./models/hotel');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// creating webtoken for user authentication
let check = null;
const maxAge = 60 * 60 * 24 * 3;
const createToken = (id) => {
    return jwt.sign({ id }, "hello world", {
        expiresIn: maxAge
    })
}



// send data over api

app.get('/apiData', async (req, res) => {
    const apidata = await hotel.find(req.query)
    res.status(200).send(apidata)
})




// home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + './public/index.html');
})
// booking page
app.get('/bookhotel', (req, res) => {
    res.sendFile(__dirname + '/public/bookingPage.html')
})
// login page
app.get('/login', async (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
})
// hotel page for booking
app.get('/hotel', (req, res) => {
    res.sendFile(__dirname + '/public/hotel.html');
});
// user dashboard
app.get('/user', (req, res) => {
    res.sendFile(__dirname + '/public/user.html');
});



app.get('/userdetails', (req, res) => {

    try {

        const token = req.cookies.jwt; // assuming your JWT is stored in a cookie named "token"
        const secret = 'hello world'; // replace with your JWT secret key

        if (!token) {
            console.log("jwt not present")
            res.redirect('/login')
        }

        else {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.log(token)
                    console.log("jwt there unaothorised")
                    res.redirect('/login')
                }
                else {
                    const data = jwt.verify(token, secret)
                    res.send(data.id)
                }
            });
        }

    }
    catch (error) {
        console.log(error)
    }

})



app.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        check = await user.findOne({
            email: req.body.email
        })

        // console.log(check)
        if (check === null) {
            console.log('NO user found')
            res.redirect('/login')

        }

        else if (check.password === req.body.password) {

            const token = createToken(check)
            res.cookie('jwt', token, { maxAge: maxAge * 1000 })

            res.redirect('/')
        }

        else {
            console.log('Wrong credentials')
            res.redirect('/login')
        }
    }
    catch (err) {
        console.log(err)
    }
})


app.post('/register', async (req, res) => {
    try {
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }

        const updatedData = await user.insertMany(data)


        console.log(updatedData)

        const token = createToken(updatedData)
        res.cookie('jwt', token, { maxAge: maxAge * 1000 })

        res.redirect('/');

    }
    catch (err) {
        console.log(err)
        // res.status(err.status || 500).json({ err: err.message });
    }
});


// logout user
app.get('/logout', async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login')
})


app.get('/data', async (req, res) => {
    const data = await user.findOne()
    res.send(data);
})




app.listen(8080, (req, res) => {
    console.log("listening on port 8080");
});
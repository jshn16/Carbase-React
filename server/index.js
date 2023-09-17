const express = require('express')
const bcrypt = require('bcrypt')
const cors = require("cors");
const bodyParser = require('body-parser')
const localeStratergy = require('passport-local').Strategy;
//declaring user model
const userModel = require('./models/user');
const carModel = require('./models/car')
const customerModel = require('./models/customer')

const app = express();
//checking enviroment status
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();

}

//mongoose connection
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING).then((responce) => {
  console.log('Connected to mongoose');
}).catch((error) => {
  console.log('Disconnected from mongoose');
})

const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
passport.use(userModel.createStrategy())

app.use(express.json());
app.use(bodyParser.json())

//using CORS for request
app.use(
  cors({
    // origin: "http://localhost:3000",
    // origin: "https://auth-client-80ok.onrender.com",

    // credentials: true,
  })
);


app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: false

}));


app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


passport.use(localeStratergy)

//register functionality

app.post('/register', (req, res) => {


  userModel.register(new userModel({
    username: req.body.username,
    email: req.body.email,
  }), req.body.password,
    (error, user, info) => {
      if (user) {
        console.log(user)
        res.json(user)
      }
      else if (info) {
        // console.log(info)
        // res.json(error)
      }
      else {
        console.log(error)
        res.json(error)
      }
    });

})



app.post('/login', (req, res) => {
  passport.authenticate('local', (error, user, info) => {

    if (user) {

      console.log(user)
      res.json(user)
    }
    else if (info) {
      console.log(info.message)
      res.json(info.message)

    }
    if (error) {
      console.log(error)

    }

  })(req, res)
})



//customer

app.post('/createCustomer', (req, res) => {
  customerModel.create(req.body, (error, responce, info) => {
    if (responce) {
      console.log(responce)
      res.json(responce)
    }
    else if (info) {
      console.log(info)
    }
    else {
      console.log(error)
    }
  })
})


app.post('/createCar', (req, res) => {
  carModel.create(req.body, (error, responce, info) => {
    if (responce) {
      console.log(responce)
      res.json(responce)
    }
    else if (info) {
      console.info(info)
    }
    else {
      console.log(error)
    }
  })
})

app.get("/createCustomer", (req, res) => {
  customerModel.find((error, customer) => {
    if (customer) {
      res.json(customer)
    }
    else {
      res.json(error)
    }
  })
})


app.get("/cars", (req, res) => {
  carModel.find((error, car) => {
    if (car) {
      res.json(car)
    }
    else {
      res.json(error)
    }
  })
})


app.post("/delete/:_id", (req, res) => {
  customerModel.deleteOne({ _id: req.params }, (error, customers,) => {
    if (customers) {
      res.json(customers)
    }
    else {
      res.json(error)
    }
  })
})

app.post('/deleteCar/:_id', (req, res) => {
  carModel.deleteOne({ _id: req.params }, (error, cars) => {
    if (cars) {
      res.json(cars)
    }
    else {
      res.json(error)
    }
  })
})


app.post("/edit/:_id", (req, res) => {

  customerModel.findByIdAndUpdate(req.params, { name: req.body.name, age: req.body.age, address: req.body.address }, { new: true }, (error, responce, info) => {
    if (responce) {
      console.log(responce)
      res.json(responce)
    }
    else if (info) {
      console.log(info)
    }
    else {
      console.log(error)
    }
  })
})


app.post("/editCar/:_id", (req, res) => {
  carModel.findByIdAndUpdate(req.params, req.body, { new: true }, (error, responce, info) => {
    if (responce) {
      res.json(responce)
    }
    else if (info) {
      res.json(info)
    }
    else {
      res.json(error)
    }
  })
})

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
    console.log("authenticatred")
  }
}



app.listen(4000, () => {
  console.log("server running")
})

module.exports = app;

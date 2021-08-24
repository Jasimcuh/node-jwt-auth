const express = require('express');
var jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user')

const mongoose = require('mongoose')
const db = 'mongodb+srv://jasim:jasim@cluster0.hf4gu.mongodb.net/eventsdb'

mongoose.connect(db,err => {
    if(err){
        console.log('Erroe!!' + err);
    }else {
        console.log('Connected to mongodb');
    }
})
router.get('/', (req,res) => {
    res.send('From API route')
})

// Verify token 
function verifyToken(req, res,next){
  if(!req.headers.authorization){
      return res.status(401).send('Unauthorized token')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
      return res.status(401).send('Unauthorized token')
  }
  let payload = jwt.verify(token,'secretKey')
  if(!payload) {
      return res.status(401).send('Unauthorized token')
  }
  req.userId = payload.subject
  next();
}
//Registration API
router.post('/register', (req,res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser) => {
        if(error){
            console.log(error);
        }else {
            let payload = { subject : registeredUser._id}
            let token = jwt.sign(payload,'secretKey');
            res.status(200).send({token})
        }
    })
})


//login API
router.post('/login',(req,res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (error,user) => {
        if(error) {
            console.log(error);
        }else {
            if(!user){
                res.status(401).send('Invalid email')
            }else {
                if(user.password !== userData.password){
                    res.status(401).send('Invalid password')
                }else {
                    let payload = { subject: user._id}
                    let token = jwt.sign(payload,'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

router.get('/events', (req, res) =>{
    let events = [
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"2",
            "name":"Mosito Expo",
            "description":"lorem ipsum",
            "date":"2021-01-23T18:25:43.511Z"
        },
        {
            "_id":"3",
            "name":"Fab Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"4",
            "name":"Fashion Expo",
            "description":"lorem ipsum",
            "date":"2021-12-23T18:25:43.511Z"
        },
        {
            "_id":"5",
            "name":"Gym Expo",
            "description":"lorem ipsum",
            "date":"2021-09-23T18:25:43.511Z"
        },
        {
            "_id":"6",
            "name":"Nortaze Expo",
            "description":"lorem ipsum",
            "date":"2021-08-23T18:25:43.511Z"
        },
        {
            "_id":"7",
            "name":"Textile Expo",
            "description":"lorem ipsum",
            "date":"2021-06-23T18:25:43.511Z"
        },
        {
            "_id":"8",
            "name":"Motor Bike Expo",
            "description":"lorem ipsum",
            "date":"2021-05-23T18:25:43.511Z"
        },
    ]
    res.json(events);
})

router.get('/special', verifyToken, (req, res) =>{
    let events = [
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"2",
            "name":"Mosito Expo",
            "description":"lorem ipsum",
            "date":"2021-01-23T18:25:43.511Z"
        },
        {
            "_id":"3",
            "name":"Fab Expo",
            "description":"lorem ipsum",
            "date":"2021-04-23T18:25:43.511Z"
        },
        {
            "_id":"4",
            "name":"Fashion Expo",
            "description":"lorem ipsum",
            "date":"2021-12-23T18:25:43.511Z"
        },
        {
            "_id":"5",
            "name":"Gym Expo",
            "description":"lorem ipsum",
            "date":"2021-09-23T18:25:43.511Z"
        },
        {
            "_id":"6",
            "name":"Nortaze Expo",
            "description":"lorem ipsum",
            "date":"2021-08-23T18:25:43.511Z"
        },
        {
            "_id":"7",
            "name":"Textile Expo",
            "description":"lorem ipsum",
            "date":"2021-06-23T18:25:43.511Z"
        },
        {
            "_id":"8",
            "name":"Motor Bike Expo",
            "description":"lorem ipsum",
            "date":"2021-05-23T18:25:43.511Z"
        },
    ]
    res.json(events);
})

module.exports = router
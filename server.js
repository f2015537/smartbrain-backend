const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test123',
      database : 'smartbrain'
    }
  });

const app = express()
app.use(bodyParser.json())
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'jally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req,res) => {
    res.json(database.users)
})

app.post('/signin', (req,res) => {
    if(req.body.email === database.users[0].email
        && req.body.password === database.users[0].password) {
            res.json(database.users[0])
        }
    else {
        res.status(400).json('error')
    }
    
})

app.post('/register', (req,res) => {
    const { email, password, name } = req.body
    db('users').insert({
        email,
        name,
        joined: new Date()
    }).then(console.log)
    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params
    let found = false
    database.users.forEach(user => {
        if(user.id === id){
            found = true
            return res.json(user)
        }
    })
    if(!found) res.status(400).json("no such user")
})

app.put('/image', (req,res) => {
    const { id } = req.body
    let found = false
    database.users.forEach(user => {
        if(user.id === id){
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if(!found) res.status(400).json("no such user")
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

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
            res.json('success')
        }
    else {
        res.status(400).json('error')
    }
    
})

app.post('/register', (req,res) => {
    const { email, password, name } = req.body
    database.users.push({
        id: '125',
        name,
        email,
        password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})


app.listen(3000, () => {
    console.log('listening on port 3000')
})
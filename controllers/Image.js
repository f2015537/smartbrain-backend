const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'bc3931e43d884a67aa83b7a1a904bd63'
   });

const handleApiCall = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImageGet = (req,res, db) => {
    const { id } = req.body
    db('users')
    .where('id', '=', id) 
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImageGet,
    handleApiCall
}
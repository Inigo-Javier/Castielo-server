const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/jwt.middleware')
const Place = require('./../models/Place.model')
const { checkRole } = require('../middlewares/routerGuards')

router.post('/create', isAuthenticated, (req, res) => { // funciona

    const { title, imageUrl, description, type, village, country, street, lat, lng } = req.body
    const owner = req.payload._id
    const location = {
        type: "Point",
        coordinates: [lat, lng]
    }
    console.log('-----------------------------------------', owner)
    Place
        .create({ title, imageUrl, description, type, address: { village, country, street, location }, owner })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/', (req, res) => { // funciona

    // console.log('-----------EL USUARIO LOGUEADO ES:', req.payload)
    Place
        .find()
        .then(response => setTimeout(() => res.json(response), 500))
        .catch(err => res.status(500).json(err))
})

router.get('/:place_id', (req, res) => { // funciona

    const { place_id } = req.params

    Place
        .findById(place_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/:place_id/edit', (req, res) => {//funciona

    const { place_id } = req.params
    const { title, imageUrl, description, type, city, coutry, street, location, owner } = req.body

    Place
        .findByIdAndUpdate(place_id, { title, imageUrl, description, type, address: { city, coutry, street, location: { type: "Point", coordinates: location } }, owner })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/:place_id/delete', (req, res) => {//funciona

    const { place_id } = req.params

    Place
        .findByIdAndDelete(place_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router
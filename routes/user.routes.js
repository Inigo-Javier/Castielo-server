// find all
// find by id
// edit user
// delete user

const router = require('express').Router()
const { json } = require('express')
const User = require('./../models/User.model')


router.get('/', (req, res) => {//funciona

    User.find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/:user_id', (req, res) => {//funciona

    const { user_id } = req.params

    User.findById(user_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})





module.exports = router

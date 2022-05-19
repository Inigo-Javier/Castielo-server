const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/jwt.middleware');
const Comment = require('./../models/Comment.model');

router.post('/:placesId/create', isAuthenticated, (req, res) => {//funciona 
    const { _id: owner } = req.payload
    const { placesId: place } = req.params
    const { description, rating } = req.body

    Comment
        .create({ description, owner, place, rating })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/', (req, res) => {//funciona

    Comment
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/:comment_id', (req, res) => { // funciona

    const { comment_id } = req.params

    Comment
        .findById(comment_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/:comment_id/edit', (req, res) => {//funciona

    const { comment_id } = req.params
    const { description, owner, place, rating } = req.body

    Comment
        .findByIdAndUpdate(comment_id, { description, owner, place, rating })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/:comment_id/delete', (req, res) => {

    const { comment_id } = req.params

    Comment
        .findByIdAndDelete(comment_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router;
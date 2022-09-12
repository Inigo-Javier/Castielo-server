
const express = require("express")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/User.model")
const { isAuthenticated } = require("../middlewares/jwt.middleware")


const router = express.Router()
const saltRounds = 10

router.post('/signup', (req, res, next) => {//funciona

    const { username, email, password, role, image } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 3 characters' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username, role, image })
        })
        .then((createdUser) => {

            const { email, password: hashedPassword, username, role, _id } = createdUser
            const user = { email, password: hashedPassword, username, role, _id }

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})

router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }//validacion manual, no nativa(del modelo por defecto), ya que el modelo sólo aplica a creación o edicion de registros, no al rescate de estos.

    //si creas registros, el modelo te va a validar todo excepto la password.

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username } = foundUser

                const payload = { _id, email, username }//informacion de usuario que se guarda dentro del token que vamos a generar.El payload es una info esencial, lo mínimo que necesitas tener del ususario.

                //firmo mi token con sign():
                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})


router.get('/verify', isAuthenticated, (req, res, next) => {

    res.status(200).json(req.payload)

})
//este middleware protege rutas. si el token no es válido no te deja entrar.y si es válido, te deja dentro de la ruta quién es el user que está conectado.(equivale a req.session())

//Nota: el servido ya no almacena la sesión.Ahora genera tokens y los comprueba.

module.exports = router

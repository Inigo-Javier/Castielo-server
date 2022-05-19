const { Schema, model } = require('mongoose')

const placeSchema = new Schema(
    {
        title: {
            type: String,
            // required: [true, 'El nombre es obligatorio']
        },
        imageUrl: {
            type: String,
            // required: [true, 'La imagen es obligatoria'],
            default: 'https://i.imgur.com/Itw5P5a.jpeg',
        },
        description: {
            type: String,
            // required: [true, 'La descripción es obligatoria'],
            minlength: [5, 'La descripción debe tener min. 5 caracteres'],
        },
        type: {
            type: String,
            enum: ['vineyard', 'historic building', 'landscapes', 'not defined yet'],
            default: 'not defined yet'
        },
        address: {
            village: String,
            country: String,
            street: String,
            location: {
                type: {
                    type: String
                },
                coordinates: [Number],
            }
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
)

const Place = model('Place', placeSchema)

module.exports = Place

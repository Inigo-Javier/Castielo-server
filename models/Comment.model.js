const { model, Schema } = require('mongoose')

const commentSchema = new Schema(
    {
        description: {
            type: String,
            maxlength: [300, 'Cannot exceed 300 characters'],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        place: {
            type: Schema.Types.ObjectId,
            ref: 'Place'
        },
        rating: {
            type: Number,
            min: 0,
            max: 5
        },
    },
    {
        timestamps: true
    }
)
const Comment = model('Comment', commentSchema)

module.exports = Comment
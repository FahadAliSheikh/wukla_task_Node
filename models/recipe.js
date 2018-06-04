const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    prep_time: {
        type: String
    },
    difficulty: {
        type: Number
    },
    vegetarian: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);
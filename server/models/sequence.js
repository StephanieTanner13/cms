const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sequenceSchema = new Schema(
    {
        value: {
            type: String,
            required: true,
        },
    },
);

module.exports = mongoose.model('Sequence', sequenceSchema);
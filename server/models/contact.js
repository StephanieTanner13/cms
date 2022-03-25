const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
    },
);

module.exports = mongoose.model('Contact', contactSchema);
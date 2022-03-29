
const mongoose = require('mongoose');

let schema = mongoose.Schema({
  maxDocumentId: {type: String, required: true},
  maxMessageId: {type: String, required: true},
  maxContactId: {type: String, required: true}
});

module.exports = mongoose.model('Sequence', schema);
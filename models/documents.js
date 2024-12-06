const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    documents: [{
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }]
});

const Document = mongoose.model('Document', DocumentSchema);

module.exports = {Document};

const mongoose = require('mongoose')


const CsrfTokenAndSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false,
        trim: true, 
        unique: false
    },
    AccessToken: {
        type: String,
        required: true,
        trim: true,
    },
    docExpire: { type: Date, required: true, default: new Date(Date.now() + 60 * 60 * 1000) } // 60 minutes
})


const csrfAndSession = mongoose.model('csrfAndSession', CsrfTokenAndSessionSchema);
// applying TTL (1.field,2.operation)
csrfAndSession.collection.createIndex({ docExpire: 1 }, { expireAfterSeconds: 0 })

module.exports = csrfAndSession;
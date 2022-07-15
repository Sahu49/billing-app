const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    havePriceList: {
        type: Boolean,
        default: false
    },
    priceListId: {
        type: String,
        default: null
    },
    invoices: []

})

module.exports = mongoose.model("User", userSchema)
const mongoose = require("mongoose")

const invoiceSchema = mongoose.Schema({
    storeDetails: {
        type: Object,
        require: true
    },
    customerDetails: {
        type: Object,
        require: true
    },

    products: [],

    allTotal: {
        type: Number,
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model("Invoice", invoiceSchema)
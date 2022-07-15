const mongoose = require("mongoose")

const customersOfStoreSchema = mongoose.Schema({
    storeDetails: {
        type: Object,
        require: true
    },
    customerDetails: {
        type: Object,
        require: true
    },
    invoiceIds: []
})
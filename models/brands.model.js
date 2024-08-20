const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    branch: {
        type: String,
        require: true
    },
    address: {
        addressLine1: {
            type: String,
            require: true
        },
        addressLine2: {
            type: String,
            require: false
        },
        city: {
            type: String,
            require: true
        },
        state: {
            type: String,
            require: true
        },
        areaCode: {
            type: String,
            require:true
        }
    },
    isAvailable: {
        type: Boolean,
        require: false
    },
},{
    timestamps: true

})

const Brands = mongoose.model("brands", BrandSchema);
module.exports = Brands;
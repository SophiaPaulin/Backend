const mongoose = require('mongoose');
const { Types } = require('mongoose')

const ProductSchema = mongoose.Schema({
    offerId: {
        type: Types.ObjectId,
        required: false,
        refs: 'offers'
    },
    name: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    normalPrice: {
        type: String,
        required: true,
    },
    actualPrice: {
        type: String,
        required: true,
    },
    availableQuantity: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;
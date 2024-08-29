const mongoose = require('mongoose');
const { Types } = require('mongoose')

const OrderSchema = mongoose.Schema({
    userId: {
        type: Types.ObjectId,
        required: false,
        refs: 'users'
    },
    products: {
        type: Array,
        required: true
    },
    orderValue: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paymentMode: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        default: 'Placed',
    },
    duration: {
        type: String,
    }
}, {
    timestamps: true
})

const Orders = mongoose.model("orders", OrderSchema);
module.exports = Orders;
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    Date: {
        type: Date,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Person: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Receipt: {
        type: String,
        required: true
    },
    Actions: [{
        type: String
    }],
    Projectid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    id: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense; 
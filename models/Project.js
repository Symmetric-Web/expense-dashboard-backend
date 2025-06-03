const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    ProjectName: {
        type: String,
        required: true
    },
    Customer: {
        type: String,
        required: true
    },
    Site: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    ContactInformation: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    PeopleInfo: [{
        type: String
    }]
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; 
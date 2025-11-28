const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    position: String,
    salary: {
        type: Number,
        default: 0
    },
    date_of_joining: {
        type: Date,
        default: Date.now
    },
    department: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
})

employeeSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('employee', employeeSchema);
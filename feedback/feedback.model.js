// name
// contact
// email
// feedback
// foodrating
// servicerating
// cleaningrating
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedback = new Schema({
    name: { type: String, required: true },
    phonenumber: { type: String },
    email: { type: String, required: true },
    feedback: { type: String },
    foodrating: { type: String, required: true },
    servicerating: { type: String, required: true },
    cleanrating: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

feedback.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Feedback', feedback);
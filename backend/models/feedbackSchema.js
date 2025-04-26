const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  formData: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Feedback', feedbackSchema);

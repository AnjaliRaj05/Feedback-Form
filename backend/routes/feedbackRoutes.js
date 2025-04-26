const express = require('express');
const router = express.Router();
const { getFeedbackForm, submitFeedbackForm, sendFeedbackForm,  deleteFeedbackForm} = require('../controllers/feedbackController');

router.get('/feedback-data', getFeedbackForm);
router.get('/feedback-form', sendFeedbackForm);
router.post('/feedback', submitFeedbackForm);
router.delete('/feedback-data/:id', deleteFeedbackForm)

module.exports = router;
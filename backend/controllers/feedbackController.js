const Feedback = require('../models/feedbackSchema');

exports.getFeedbackForm = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve feedback data' });
  }
};
exports.submitFeedbackForm = async (req, res) => {
    try {
        const feedback = new Feedback({
          formData: req.body,
        });
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save feedback' });
      }
};

exports.sendFeedbackForm = async (req, res) => {
  const schema = {
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "text",
            name: "full-name",
            title: "Enter your full name",
            isRequired: true,
            placeHolder: "John Doe"
          },
          {
            type: "text",
            name: "email",
            title: "Enter your email address",
            inputType: "email",
            isRequired: true,
            placeHolder: "john@example.com"
          },
          {
            type: "rating",
            name: "platform-satisfaction",
            title: "How satisfied were you with the efficiency and effectiveness of the LiaPlus platform?",
            rateType: "smileys",
            scaleColorMode: "colored",
            displayMode: "buttons",
            isRequired: true,
          },
          {
            type: "rating",
            name: "usability-satisfaction",
            title: "How satisfied were you with the usability of the LiaPlus platform?",
            rateType: "stars",
            displayMode: "buttons",
            isRequired: true,
          },
          {
            type: "comment",
            name: "feature-suggestions",
            title: "What features would you like to see added to LiaPlus or do you have any additional comments?",
            rows: 2,
            autoGrow: true,
            allowResize: false,
          },
          {
            type: "rating",
            name: "nps-score",
            title: "On a scale of 1 to 10, how likely are you to recommend LiaPlus to a friend or colleague?",
            rateType: "smileys",
            scaleColorMode: "colored",
            rateCount: 10,
            rateMax: 10,
            displayMode: "buttons",
          },
        ],
      },
    ],
  };

  res.status(200).json(schema);
};

exports.deleteFeedbackForm = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    console.error('Error deleting feedback:', err);
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
};
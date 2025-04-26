# Feedback Form Project

## Deployed Link
You can view the live version of the feedback form application here:

[Feedback Form - Live](https://feedback-form-sigma-eight.vercel.app/)

## Description
The **Feedback Form Project** is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The app allows users to submit feedback with various ratings (Platform Satisfaction, Performance Satisfaction) and comments, which are then displayed in an admin dashboard. Admins can view, delete, and manage the feedback submitted by users. The form is responsive and provides an intuitive user experience with notifications for success or errors.

### Key features include:
- **User Feedback Submission**: Collect user feedback with star ratings and comments.
- **Admin Dashboard**: View and delete feedback.
- **Sorting**: Feedback is sorted by submission date, with the most recent feedback appearing first.
- **Responsive Design**: Fully responsive UI for mobile and desktop devices.
- **Notifications**: Notifications for successful actions or errors using react-toastify.

### Customizable Feedback Form
- The feedback form can be easily **modified** to add new fields or change the structure of the feedback submission.
- You can dynamically add or remove fields (like additional ratings, comments, etc.) in the **form JSON structure**.
- **JSON-based form structure**: Feedback values are passed as a **JSON object**, where each field is captured and stored in the database as an object. This makes it easier to manage, extend, or modify the form's fields as needed.

## Usage

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/feedback-form.git

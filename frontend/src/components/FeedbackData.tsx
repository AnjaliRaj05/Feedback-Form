import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array(rating).fill('⭐');
  return <span>{stars.join(' ')}</span>;
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  return new Date(dateString).toLocaleString(undefined, options);
};

const FeedbackData = () => {
  const [feedbackData, setFeedbackData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchFeedbackData = async () => {
    try {
      const response = await axios.get('https://feedback-backend-tog9.onrender.com/api/v1/feedback-data');
      const sortedData = response.data.sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setFeedbackData(sortedData);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
      toast.error('Failed to load feedback data.');
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await axios.delete('https://feedback-backend-tog9.onrender.com/api/v1/feedback-data/' + selectedId);
      toast.success('Feedback deleted successfully.');
      setFeedbackData(prevData => prevData.filter(feedback => feedback._id !== selectedId));
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast.error('Failed to delete feedback.');
    }
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <div>
      {feedbackData.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {feedbackData.map((feedback: any) => (
            <li key={feedback._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <p><strong>Full Name:</strong> {feedback.formData['full-name'] || 'N/A'}</p>
              <p><strong>Email:</strong> {feedback.formData['email'] || 'N/A'}</p>
              <p><strong>Platform Satisfaction:</strong> <StarRating rating={Number(feedback.formData['platform-satisfaction'])} /></p>
              <p><strong>Performance Satisfaction:</strong> <StarRating rating={Number(feedback.formData['usability-satisfaction'])} /></p>
              <p><strong>Feedback Comment :</strong> {feedback.formData['feature-suggestions'] || 'None'}</p>
              <p><strong>NPS Score:</strong> {feedback.formData['nps-score'] || 'N/A'}</p>
              <p><strong>Submitted At:</strong> {formatDate(feedback.createdAt)}</p>
              <button 
                onClick={() => confirmDelete(feedback._id)}
                style={{ 
                  backgroundColor: '#e74c3c', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback data available.</p>
      )}

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            minWidth: '300px'
          }}>
            <p>Are you sure you want to delete this feedback?</p>
            <div style={{ marginTop: '15px' }}>
              <button 
                onClick={handleDelete}
                style={{ marginRight: '10px', padding: '5px 15px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px' }}
              >
                Yes
              </button>
              <button 
                onClick={() => setShowModal(false)}
                style={{ padding: '5px 15px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackData;

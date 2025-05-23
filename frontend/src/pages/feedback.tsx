import { useEffect, useState } from 'react';
import axios from 'axios';
import { Survey } from 'survey-react-ui';
import 'survey-core/survey-core.css';
import { Model, SurveyModel } from 'survey-core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const Feedback = () => {
  const [surveyModel, setSurveyModel] = useState<SurveyModel | null>(null); // <- fixed
  const router = useRouter();

  useEffect(() => {
    const fetchSurveySchema = async () => {
      try {
        const response = await axios.get('https://feedback-backend-tog9.onrender.com/api/v1/feedback-form');
        const schema = response.data;
        const survey = new Model(schema);

        survey.onComplete.add(async (sender: SurveyModel) => {
          try {
            await axios.post('https://feedback-backend-tog9.onrender.com/api/v1/feedback', sender.data);
            toast.success('Thanks for your feedback!');
            setTimeout(() => router.push('/'), 2000);
          } catch (error) {
            console.error('Error submitting feedback:', error);
            toast.error('Failed to submit feedback. Please try again.');
          }
        });

        setSurveyModel(survey);
      } catch (error) {
        console.error('Error fetching survey schema:', error);
        toast.error('Failed to load feedback form. Please try again.');
      }
    };

    fetchSurveySchema();
  }, [router]);

  return (
    <Layout>
      {surveyModel ? <Survey model={surveyModel} /> : <div>Loading survey...</div>}
    </Layout>
  );
};

export default Feedback;

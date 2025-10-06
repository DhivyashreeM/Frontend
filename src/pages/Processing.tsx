import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProcessingSteps } from '../components/ProcessingSteps';
import { Card } from '../components/Card';
import { biodiversityAPI } from '../services/api';
import { ProcessingStatus } from '../types/types';

export const Processing: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<ProcessingStatus | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!jobId) return;

    const checkStatus = async () => {
      try {
        const statusData = await biodiversityAPI.getProcessingStatus(jobId);
        setStatus(statusData);

        if (statusData.status === 'completed') {
          navigate(`/report/${jobId}`);
        } else if (statusData.status === 'error') {
          setError('Analysis failed. Please try again.');
        }
      } catch (err) {
        setError('Failed to fetch status updates');
        console.error('Status check error:', err);
      }
    };

    // Initial check
    checkStatus();

    // Set up polling
    const interval = setInterval(checkStatus, 2000);

    return () => clearInterval(interval);
  }, [jobId, navigate]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Card>
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Processing Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/upload')}
            className="btn-primary"
          >
            Try Again
          </button>
        </Card>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Processing Your Data
        </h1>
        <p className="text-gray-600">
          We're analyzing your biodiversity dataset. This may take a few minutes.
        </p>
      </div>

      <Card className="mb-8">
        <ProcessingSteps status={status} />
      </Card>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        <Card>
          <div className="text-2xl font-bold text-primary-600 mb-2">
            {status.progress}%
          </div>
          <div className="text-sm text-gray-600">Progress</div>
        </Card>
        
        <Card>
          <div className="text-2xl font-bold text-primary-600 mb-2">
            {status.estimatedTime ? `${status.estimatedTime}s` : '--'}
          </div>
          <div className="text-sm text-gray-600">Estimated Time</div>
        </Card>
        
        <Card>
          <div className="text-2xl font-bold text-primary-600 mb-2">
            {status.jobId.slice(0, 8)}
          </div>
          <div className="text-sm text-gray-600">Job ID</div>
        </Card>
      </div>
    </div>
  );
};

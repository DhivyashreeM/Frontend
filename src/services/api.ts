import axios from 'axios';
import { AnalysisResult, UploadResponse, ProcessingStatus } from '../types/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const biodiversityAPI = {
  uploadDataset: async (file: File, config: any): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('config', JSON.stringify(config));
    
    const response = await api.post('/upload', formData);
    return response.data;
  },

  getProcessingStatus: async (jobId: string): Promise<ProcessingStatus> => {
    const response = await api.get(`/status/${jobId}`);
    return response.data;
  },

  getAnalysisResults: async (jobId: string): Promise<AnalysisResult> => {
    const response = await api.get(`/results/${jobId}`);
    return response.data;
  },

  downloadReport: async (jobId: string): Promise<Blob> => {
    const response = await api.get(`/download/${jobId}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw new Error(
      error.response?.data?.message || 
      'An error occurred while processing your request'
    );
  }
);

import { AnalysisResult, UploadResponse, ProcessingStatus } from '../types/types';

// Mock data for demonstration
const mockAnalysisResult: AnalysisResult = {
  totalSpecies: 24,
  totalObservations: 1567,
  speciesDiversity: 3.456,
  dominantSpecies: "Quercus robur",
  analysisTime: 45,
  data: [
    { id: '1', timestamp: '2024-01-15', species: 'Quercus robur', count: 245, location: 'Forest A', confidence: 0.95 },
    { id: '2', timestamp: '2024-01-15', species: 'Fagus sylvatica', count: 189, location: 'Forest A', confidence: 0.92 },
    { id: '3', timestamp: '2024-01-15', species: 'Pinus sylvestris', count: 167, location: 'Forest B', confidence: 0.89 },
  ],
  charts: {
    speciesDistribution: [
      { name: 'Quercus robur', value: 245 },
      { name: 'Fagus sylvatica', value: 189 },
      { name: 'Pinus sylvestris', value: 167 },
      { name: 'Betula pendula', value: 145 },
      { name: 'Acer pseudoplatanus', value: 123 },
    ],
    temporalDistribution: [
      { name: 'Jan', value: 145 },
      { name: 'Feb', value: 189 },
      { name: 'Mar', value: 234 },
      { name: 'Apr', value: 267 },
      { name: 'May', value: 298 },
    ],
    locationHeatmap: [
      { name: 'Forest A', value: 567 },
      { name: 'Forest B', value: 434 },
      { name: 'Meadow C', value: 356 },
    ],
  },
};

export const mockAPI = {
  uploadDataset: async (file: File, config: any): Promise<UploadResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      jobId: 'mock-' + Date.now(),
      status: 'processing',
      message: 'File uploaded successfully',
    };
  },

  getProcessingStatus: async (jobId: string): Promise<ProcessingStatus> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const statuses: Array<'uploading' | 'processing' | 'analyzing' | 'completed'> = 
      ['uploading', 'processing', 'analyzing', 'completed'];
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      jobId,
      status: randomStatus,
      progress: randomStatus === 'completed' ? 100 : Math.floor(Math.random() * 100),
      currentStep: `Processing ${randomStatus}...`,
      estimatedTime: Math.floor(Math.random() * 60) + 30,
    };
  },

  getAnalysisResults: async (jobId: string): Promise<AnalysisResult> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAnalysisResult;
  },

  downloadReport: async (jobId: string): Promise<Blob> => {
    return new Blob(['Mock PDF content'], { type: 'application/pdf' });
  },
};

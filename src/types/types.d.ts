export interface BiodiversityData {
  id: string;
  timestamp: string;
  species: string;
  count: number;
  location: string;
  confidence: number;
}

export interface AnalysisResult {
  totalSpecies: number;
  totalObservations: number;
  speciesDiversity: number;
  dominantSpecies: string;
  analysisTime: number;
  data: BiodiversityData[];
  charts: {
    speciesDistribution: ChartData[];
    temporalDistribution: ChartData[];
    locationHeatmap: ChartData[];
  };
}

export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

export interface UploadResponse {
  jobId: string;
  status: 'processing' | 'completed' | 'error';
  message: string;
}

export interface ProcessingStatus {
  jobId: string;
  status: 'uploading' | 'processing' | 'analyzing' | 'completed' | 'error';
  progress: number;
  currentStep: string;
  estimatedTime?: number;
}

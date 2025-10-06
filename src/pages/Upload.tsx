import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, Settings, AlertCircle } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { FileUploader } from '../components/FileUploader';
import { biodiversityAPI } from '../services/api';

export const Upload: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [analysisConfig, setAnalysisConfig] = useState({
    calculateDiversity: true,
    generateCharts: true,
    includeStatistics: true,
    confidenceThreshold: 0.8,
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError('');
  };

  const handleConfigChange = (key: string, value: any) => {
    setAnalysisConfig(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await biodiversityAPI.uploadDataset(selectedFile, analysisConfig);
      navigate(`/processing/${response.jobId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upload Biodiversity Dataset
        </h1>
        <p className="text-gray-600">
          Upload your species observation data for comprehensive biodiversity analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Upload Dataset">
            <FileUploader 
              onFileSelect={handleFileSelect}
              acceptedTypes=".csv,.xlsx,.xls,.json"
              maxSize={100}
            />
            
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg mt-4">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </Card>

          {/* File Requirements */}
          <Card title="File Requirements">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Supported Formats</span>
                <span className="font-medium">CSV, Excel, JSON</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Maximum File Size</span>
                <span className="font-medium">100 MB</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Required Columns</span>
                <span className="font-medium">Species, Count, Location</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Encoding</span>
                <span className="font-medium">UTF-8</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Configuration Section */}
        <div className="space-y-6">
          <Card 
            title="Analysis Configuration"
            actions={<Settings className="w-5 h-5 text-gray-400" />}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Calculate Diversity
                </label>
                <input
                  type="checkbox"
                  checked={analysisConfig.calculateDiversity}
                  onChange={(e) => handleConfigChange('calculateDiversity', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Generate Charts
                </label>
                <input
                  type="checkbox"
                  checked={analysisConfig.generateCharts}
                  onChange={(e) => handleConfigChange('generateCharts', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Include Statistics
                </label>
                <input
                  type="checkbox"
                  checked={analysisConfig.includeStatistics}
                  onChange={(e) => handleConfigChange('includeStatistics', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Confidence Threshold: {analysisConfig.confidenceThreshold}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.1"
                  value={analysisConfig.confidenceThreshold}
                  onChange={(e) => handleConfigChange('confidenceThreshold', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </Card>

          <Button
            onClick={handleUpload}
            loading={isLoading}
            disabled={!selectedFile || isLoading}
            icon={UploadIcon}
            className="w-full"
          >
            Start Analysis
          </Button>

          {/* Quick Tips */}
          <Card title="Quick Tips">
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Ensure your data includes species names and counts</li>
              <li>• Include location data for spatial analysis</li>
              <li>• Clean data improves analysis accuracy</li>
              <li>• Larger datasets may take longer to process</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

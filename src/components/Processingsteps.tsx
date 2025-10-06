import React from 'react';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { ProcessingStatus } from '../types/types';

interface ProcessingStepsProps {
  status: ProcessingStatus;
}

export const ProcessingSteps: React.FC<ProcessingStepsProps> = ({ status }) => {
  const steps = [
    { key: 'uploading', label: 'Uploading Dataset', description: 'Uploading and validating your data file' },
    { key: 'processing', label: 'Data Processing', description: 'Cleaning and preparing data for analysis' },
    { key: 'analyzing', label: 'Analysis', description: 'Running biodiversity analysis algorithms' },
    { key: 'completed', label: 'Completed', description: 'Analysis complete, generating report' },
  ];

  const getStepStatus = (stepKey: string) => {
    const stepIndex = steps.findIndex(step => step.key === stepKey);
    const currentIndex = steps.findIndex(step => step.key === status.status);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return status.status === 'error' ? 'error' : 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        {steps.map((step, index) => {
          const stepStatus = getStepStatus(step.key);
          
          return (
            <div key={step.key} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full border-2
                  ${
                    stepStatus === 'completed' 
                      ? 'bg-green-500 border-green-500 text-white'
                      : stepStatus === 'current'
                      ? 'border-primary-500 text-primary-500'
                      : stepStatus === 'error'
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'border-gray-300 text-gray-300'
                  }
                `}>
                  {stepStatus === 'completed' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : stepStatus === 'error' ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-0.5 h-12 mt-2
                    ${stepStatus === 'completed' ? 'bg-green-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
              
              <div className="flex-1 pb-8">
                <div className="flex items-center justify-between">
                  <h3 className={`
                    text-sm font-medium
                    ${stepStatus === 'completed' ? 'text-green-600' :
                      stepStatus === 'current' ? 'text-primary-600' :
                      stepStatus === 'error' ? 'text-red-600' :
                      'text-gray-500'}
                  `}>
                    {step.label}
                  </h3>
                  {stepStatus === 'current' && status.progress > 0 && (
                    <span className="text-xs text-gray-500">
                      {status.progress}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {step.description}
                </p>
                {stepStatus === 'current' && status.currentStep && (
                  <p className="text-xs text-primary-600 mt-1 font-medium">
                    {status.currentStep}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

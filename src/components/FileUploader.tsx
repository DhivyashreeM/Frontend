import React, { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  acceptedTypes = '.csv,.xlsx,.xls,.json',
  maxSize = 50,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = useCallback((selectedFile: File) => {
    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }
    setFile(selectedFile);
    onFileSelect(selectedFile);
  }, [maxSize, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            isDragOver 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-primary-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-lg font-medium text-primary-600">
                Upload a file
              </span>
              <span className="text-gray-600"> or drag and drop</span>
            </label>
            <p className="text-sm text-gray-500 mt-2">
              CSV, Excel, JSON up to {maxSize}MB
            </p>
          </div>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            accept={acceptedTypes}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-1 hover:bg-red-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-red-600" />
          </button>
        </div>
      )}
    </div>
  );
};

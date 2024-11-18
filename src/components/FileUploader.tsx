import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: File, carName: string, ownerName: string) => void;
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const carName = prompt('Enter car model:') || '';
      const ownerName = prompt('Enter owner name:') || '';
      if (carName && ownerName) {
        onFileUpload(file, carName, ownerName);
      }
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {isDragActive
          ? 'Drop the PDF file here...'
          : 'Drag & drop a PDF file here, or click to select'}
      </p>
    </div>
  );
}
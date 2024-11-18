import React, { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { FileList } from './components/FileList';
import { ThemeToggle } from './components/ThemeToggle';
import { FolderOpen } from 'lucide-react';
import { useDarkMode } from './hooks/useDarkMode';
import { uploadToS3 } from './services/s3Service';

interface FileItem {
  id: string;
  name: string;
  carName: string;
  ownerName: string;
  url: string;
}

function App() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDark, setIsDark] = useDarkMode();

  const handleFileUpload = async (file: File, carName: string, ownerName: string) => {
    try {
      const url = await uploadToS3(file, carName, ownerName);
      const newFile: FileItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        carName,
        ownerName,
        url
      };
      setFiles(prev => [newFile, ...prev]);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
          <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
        </div>
        
        <div className="text-center mb-8">
          <FolderOpen className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">PDF File Manager</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Upload, organize, and manage your PDF files easily</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <FileUploader onFileUpload={handleFileUpload} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <FileList
            files={files}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
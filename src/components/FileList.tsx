import React from 'react';
import { FileText, Download, Search } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  carName: string;
  ownerName: string;
  url: string;
}

interface FileListProps {
  files: FileItem[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function FileList({ files, searchTerm, onSearchChange }: FileListProps) {
  const filteredFiles = files.filter(file => 
    file.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Search by car model or owner name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div className="space-y-4">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 
                     rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 
                     hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <FileText className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{file.name}</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="mr-2">Car: {file.carName}</span>
                  <span>Owner: {file.ownerName}</span>
                </div>
              </div>
            </div>
            <a
              href={file.url}
              download
              className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
                       rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
            >
              <Download className="h-5 w-5" />
            </a>
          </div>
        ))}
        
        {filteredFiles.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No files found matching your search criteria
          </div>
        )}
      </div>
    </div>
  );
}
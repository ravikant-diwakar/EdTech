import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileType, Upload, File } from 'lucide-react';
import { Lock } from 'lucide-react';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected, isLoading }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'pdf' || fileExtension === 'docx') {
        setFileName(file.name);
        setError(null);
        onFileSelected(file);
      } else {
        setError('Please upload a PDF or DOCX file');
        setFileName(null);
      }
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    disabled: isLoading,
    maxFiles: 1
  });

  // return (
  //   <div className="my-8">
  //     <div 
  //       {...getRootProps()} 
  //       className={`border-2 border-dashed rounded-lg p-8 cursor-pointer transition-all
  //         ${isDragActive ? 'border-primary-500 bg-black' : 'border-gray-700 hover:border-primary-400 hover:bg-black'}
  //         ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}
  //       `}
  //     >
  //       <input {...getInputProps()} />
        
  //       <div className="flex flex-col items-center justify-center text-center">
  //         <div className="mb-4">
  //           {fileName ? (
  //             <div className="flex items-center">
  //               <File className="text-primary-500 mr-2\" size={24} />
  //               <span className="text-gray-300 font-medium">{fileName}</span>
  //             </div>
  //           ) : (
  //             <div className={`p-4 rounded-full bg-black text-primary-500 ${isDragActive ? 'animate-pulse' : ''}`}>
  //               <Upload size={36} />
  //             </div>
  //           )}
  //         </div>
          
  //         <div>
  //           {isLoading ? (
  //             <p className="text-gray-400">Analyzing your resume...</p>
  //           ) : (
  //             <>
  //               <p className="text-gray-300 font-medium mb-1">
  //                 {isDragActive
  //                   ? "Drop your resume here"
  //                   : fileName
  //                   ? "Click or drag to replace file"
  //                   : "Click or drag to upload your resume"}
  //               </p>
  //               <p className="text-gray-500 text-sm">Supports PDF and DOCX files</p>
                
  //               {error && (
  //                 <p className="text-red-400 mt-2 text-sm">{error}</p>
  //               )}
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
  <div className="my-8">
    <div
      {...getRootProps()}
      className={`rounded-2xl border-2 border-dashed p-4 text-center transition-all shadow-sm
        ${isDragActive ? 'border-green-500' : 'border-green-300 hover:border-green-500'}
        ${isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center justify-center">
        {/* Icon or File name */}
        <div className="mb-4">
          {fileName ? (
            <div className="flex items-center">
              <File className="text-green-600 mr-2" size={24} />
              <span className="text-white font-medium">{fileName}</span>
            </div>
          ) : (
            <Upload size={40} className="text-green-500" />
          )}
        </div>

        {/* Text */}
        <div>
          <p className="text-white font-medium mb-1">
            {isDragActive
              ? "Drop your resume here"
              : fileName
              ? "Click or drag to replace file"
              : "Drop your resume here or choose a file."}
          </p>
          <p className="text-gray-500 text-sm mb-5">
            PDF & DOCX only. Max 2MB file size.
          </p>

          {/* Upload Button */}
          <button
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-6 py-2 rounded-md transition disabled:opacity-50"
          >
            {isLoading ? "Uploading..." : "Upload Your Resume"}
          </button>

          {/* Error */}
          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}

          {/* Privacy Note */}
          <div className="mt-5 flex items-center justify-center text-gray-600 text-sm font-bold">
            <Lock size={14} className="mr-1" />
            Privacy guaranteed
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default FileUpload;
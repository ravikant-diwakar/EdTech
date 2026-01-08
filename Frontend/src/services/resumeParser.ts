import { getDocument } from 'pdfjs-dist';
import mammoth from 'mammoth';

// Import the worker directly
// import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs';

if (typeof window !== 'undefined' && 'Worker' in window) {
  // const worker = new Worker(new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url));
  // worker.onmessage = () => {};
}

export type FileType = 'pdf' | 'docx' | 'unknown';

/**
 * Parse PDF file to text
 */
export const parsePdf = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = getDocument({ data: arrayBuffer, worker: pdfjsWorker });
    const pdf = await loadingTask.promise;

    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('PDF Parsing Error:', error);
    throw new Error('Failed to parse PDF file');
  }
};

/**
 * Parse DOCX file to text
 */
export const parseDocx = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('DOCX Parsing Error:', error);
    throw new Error('Failed to parse DOCX file');
  }
};

/**
 * Determine file type from file extension
 */
export const getFileType = (file: File): FileType => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension === 'pdf') return 'pdf';
  if (extension === 'docx') return 'docx';
  return 'unknown';
};

/**
 * Parse resume file to text based on file type
 */
export const parseResume = async (file: File): Promise<string> => {
  const fileType = getFileType(file);

  switch (fileType) {
    case 'pdf':
      return await parsePdf(file);
    case 'docx':
      return await parseDocx(file);
    default:
      throw new Error('Unsupported file format. Please upload a PDF or DOCX file.');
  }
};
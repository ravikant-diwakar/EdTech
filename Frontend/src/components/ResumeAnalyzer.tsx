import React, { useState, useRef } from 'react';
import { parseResume } from '../services/resumeParser';
import { analyzeResume, generateInterviewGuide } from '../services/groqService';
import { AnalysisResult } from '../types';
import { Download, BookOpen, FileText, X, Play } from 'lucide-react';
import jsPDF from 'jspdf';

import FileUpload from './FileUpload';
import LoadingState from './LoadingState';
import TopicSuggestions from './TopicSuggestions';
import ProjectAnalysis from './ProjectAnalysis';
import ExperienceAnalysis from './ExperienceAnalysis';
import CertificateAnalysis from './CertificateAnalysis';
import OverallSummary from './OverallSummary';
import EmptyState from './EmptyState';

function ResumeAnalyzer() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  // Create a ref for the file upload section
  const fileUploadRef = useRef<HTMLDivElement>(null);

  const handleFileSelected = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);

      const extractedText = await parseResume(file);
      setResumeText(extractedText);

      const result = await analyzeResume(extractedText);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error processing resume:', error);
      setError(typeof error === 'object' && error !== null && 'message' in error
        ? String(error.message)
        : 'An error occurred while processing your resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to scroll to file upload section
  const scrollToFileUpload = () => {
    fileUploadRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Function to open video preview modal
  const openVideoPreview = () => {
    setShowVideoModal(true);
  };

  // Function to close video preview modal
  const closeVideoPreview = () => {
    setShowVideoModal(false);
  };

  // Helper function to clean and format text for PDF
  const cleanText = (text: string): string => {
    return text
      // Remove markdown bold formatting
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      // Remove markdown headers
      .replace(/^#{1,6}\s+/gm, '')
      // Clean up extra spaces and line breaks
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  };

  // Helper function to extract headings from text
  const extractHeadings = (text: string): { heading: string; content: string }[] => {
    const sections: { heading: string; content: string }[] = [];

    // Split by common heading patterns
    const parts = text.split(/(?=^(?:\d+\.|[A-Z][^a-z]*:|##\s+|###\s+))/gm);

    parts.forEach(part => {
      if (part.trim()) {
        const lines = part.trim().split('\n');
        const firstLine = lines[0].trim();
        const restContent = lines.slice(1).join('\n').trim();

        // Check if first line looks like a heading
        if (firstLine.match(/^\d+\.|^[A-Z][^a-z]*:$|^##|^###/) ||
          firstLine.length < 100 && firstLine.endsWith(':')) {
          sections.push({
            heading: cleanText(firstLine.replace(/^#+\s*/, '').replace(/:$/, '')),
            content: cleanText(restContent)
          });
        } else {
          sections.push({
            heading: '',
            content: cleanText(part)
          });
        }
      }
    });

    return sections;
  };

  const generateComprehensivePDF = async () => {
    if (!analysisResult || !resumeText) return;

    try {
      setIsGeneratingPDF(true);

      // Generate comprehensive interview guide using AI
      const interviewGuide = await generateInterviewGuide(resumeText, analysisResult);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 6;
      let currentY = margin;

      // Color scheme
      const colors = {
        primary: '#1e40af',
        secondary: '#dc2626',
        accent: '#059669',
        purple: '#7c3aed',
        text: '#000000',
        gray: '#666666'
      };

      // Helper function to add new page if needed
      const checkPageBreak = (requiredSpace: number) => {
        if (currentY + requiredSpace > pageHeight - margin - 20) {
          pdf.addPage();
          currentY = margin;
          return true;
        }
        return false;
      };

      // Helper function to add text with proper formatting
      const addText = (text: string, fontSize: number, style: 'normal' | 'bold' = 'normal', color: string = colors.text, indent: number = 0) => {
        if (!text.trim()) return;

        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', style);
        pdf.setTextColor(color);

        const maxWidth = pageWidth - 2 * margin - indent;
        const lines = pdf.splitTextToSize(text, maxWidth);

        lines.forEach((line: string) => {
          checkPageBreak(lineHeight + 2);
          pdf.text(line, margin + indent, currentY);
          currentY += lineHeight;
        });

        currentY += 2; // Extra spacing after text block
      };

      // Helper function to add section header
      const addSectionHeader = (title: string, level: number = 1) => {
        checkPageBreak(15);
        currentY += level === 1 ? 8 : 4;

        const fontSize = level === 1 ? 18 : level === 2 ? 14 : 12;
        const color = level === 1 ? colors.primary : level === 2 ? colors.secondary : colors.accent;

        addText(title, fontSize, 'bold', color);
        currentY += 3;
      };

      // Helper function to add bullet point
      const addBulletPoint = (text: string, indent: number = 5) => {
        checkPageBreak(lineHeight + 2);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(colors.text);

        // Add bullet
        pdf.text('•', margin + indent, currentY);

        // Add text with proper wrapping
        const maxWidth = pageWidth - 2 * margin - indent - 5;
        const lines = pdf.splitTextToSize(text, maxWidth);

        lines.forEach((line: string, index: number) => {
          if (index > 0) checkPageBreak(lineHeight);
          pdf.text(line, margin + indent + 5, currentY);
          currentY += lineHeight;
        });

        currentY += 1;
      };

      // Title Page
      pdf.setFontSize(28);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(colors.primary);
      pdf.text('Interview Preparation Guide', pageWidth / 2, 40, { align: 'center' });

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(colors.gray);
      pdf.text('AI-Generated Personalized Study Plan', pageWidth / 2, 55, { align: 'center' });

      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 70, { align: 'center' });

      currentY = 90;

      // Executive Summary
      addSectionHeader('Executive Summary');
      addText(analysisResult.overallSummary, 12);

      // Priority Topics Section
      addSectionHeader('Priority Topics for Interview Success');
      addText('Focus your preparation on these key areas, ranked by importance based on your resume analysis:', 11, 'normal', colors.gray);

      const sortedTopics = [...analysisResult.topics].sort((a, b) => b.importance - a.importance);

      sortedTopics.forEach((topic, index) => {
        addSectionHeader(`${index + 1}. ${topic.topic} (Priority: ${topic.importance}/10)`, 2);
        addText(`Why it's important: ${topic.reason}`, 11);

        if (topic.subtopics && topic.subtopics.length > 0) {
          addText('Key Areas to Study:', 12, 'bold', colors.accent);
          topic.subtopics.forEach(subtopic => {
            addBulletPoint(`${subtopic.name} (${subtopic.importance}/10): ${subtopic.description}`);
          });
        }
        currentY += 3;
      });

      // AI Generated Interview Guide
      addSectionHeader('Comprehensive Interview Preparation Guide');

      const guideSections = extractHeadings(interviewGuide);

      guideSections.forEach(section => {
        if (section.heading) {
          addSectionHeader(section.heading, 2);
        }

        if (section.content) {
          // Check if content contains questions (lines ending with ?)
          const lines = section.content.split('\n').filter(line => line.trim());

          lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine) {
              // If it looks like a question or numbered item
              if (trimmedLine.match(/^\d+\./) || trimmedLine.endsWith('?')) {
                addBulletPoint(trimmedLine.replace(/^\d+\.\s*/, ''));
              } else if (trimmedLine.match(/^[A-Z][^a-z]*:/) || trimmedLine.length < 80) {
                // Looks like a subheading
                addText(trimmedLine, 12, 'bold', colors.accent);
              } else {
                // Regular content
                addText(trimmedLine, 11);
              }
            }
          });
        }
      });

      // Project Analysis
      if (analysisResult.projectAnalysis.length > 0) {
        addSectionHeader('Project Analysis');

        analysisResult.projectAnalysis.forEach(project => {
          addSectionHeader(project.name, 2);

          if (project.technologies.length > 0) {
            addText('Technologies Used:', 12, 'bold', colors.accent);
            const techGroups: { [key: string]: string[] } = {};
            project.technologies.forEach(tech => {
              if (!techGroups[tech.category]) techGroups[tech.category] = [];
              techGroups[tech.category].push(tech.name);
            });

            Object.entries(techGroups).forEach(([category, techs]) => {
              addBulletPoint(`${category}: ${techs.join(', ')}`);
            });
          }

          if (project.strengths.length > 0) {
            addText('Strengths:', 12, 'bold', colors.accent);
            project.strengths.forEach(strength => addBulletPoint(strength));
          }

          if (project.interviewFocus.length > 0) {
            addText('Interview Focus Areas:', 12, 'bold', colors.accent);
            project.interviewFocus.forEach(focus => addBulletPoint(focus));
          }

          currentY += 5;
        });
      }

      // Experience Analysis
      if (analysisResult.experienceAnalysis.length > 0) {
        addSectionHeader('Experience Analysis');

        analysisResult.experienceAnalysis.forEach(exp => {
          addSectionHeader(`${exp.role} at ${exp.company}`, 2);

          if (exp.technologies.length > 0) {
            addText('Technologies:', 12, 'bold', colors.accent);
            const techGroups: { [key: string]: string[] } = {};
            exp.technologies.forEach(tech => {
              if (!techGroups[tech.category]) techGroups[tech.category] = [];
              techGroups[tech.category].push(tech.name);
            });

            Object.entries(techGroups).forEach(([category, techs]) => {
              addBulletPoint(`${category}: ${techs.join(', ')}`);
            });
          }

          if (exp.skills.length > 0) {
            addText('Key Skills:', 12, 'bold', colors.accent);
            const skillGroups: { [key: string]: string[] } = {};
            exp.skills.forEach(skill => {
              if (!skillGroups[skill.category]) skillGroups[skill.category] = [];
              skillGroups[skill.category].push(skill.name);
            });

            Object.entries(skillGroups).forEach(([category, skills]) => {
              addBulletPoint(`${category}: ${skills.join(', ')}`);
            });
          }

          if (exp.interviewFocus.length > 0) {
            addText('Interview Focus Areas:', 12, 'bold', colors.accent);
            exp.interviewFocus.forEach(focus => addBulletPoint(focus));
          }

          currentY += 5;
        });
      }

      // Certificate Analysis
      if (analysisResult.certificateAnalysis.length > 0) {
        addSectionHeader('Certificate Analysis');

        analysisResult.certificateAnalysis.forEach(cert => {
          addSectionHeader(`${cert.name} - ${cert.issuer}`, 2);

          if (cert.relevantSkills.length > 0) {
            addText('Relevant Skills:', 12, 'bold', colors.accent);
            cert.relevantSkills.forEach(skill => addBulletPoint(skill));
          }

          if (cert.interviewFocus.length > 0) {
            addText('Interview Focus Areas:', 12, 'bold', colors.accent);
            cert.interviewFocus.forEach(focus => addBulletPoint(focus));
          }

          currentY += 5;
        });
      }

      // Footer on all pages
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(colors.gray);

        // Left footer
        pdf.text('Generated by SkillN AI', margin, pageHeight - 10);

        // Right footer
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10);

        // Center footer
        pdf.text('Interview Preparation Guide', pageWidth / 2, pageHeight - 10, { align: 'center' });
      }

      pdf.save('interview-preparation-guide.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <main className="flex-grow min-h-screen bg-black relative overflow-hidden text-white">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">

        {/* Always show EmptyState at the top */}
        <EmptyState
          onGetFreeReview={scrollToFileUpload}
          onSeePreview={openVideoPreview}
        />

        {/* Upload Section below intro with ref */}
        <div ref={fileUploadRef} className="mt-12">
          <FileUpload onFileSelected={handleFileSelected} isLoading={isLoading} />

          {error && (
            <div className="bg-red-900/30 border border-red-700/30 text-red-200 px-4 py-3 rounded my-6">
              {error}
            </div>
          )}

          {/* Show Loading or Analysis */}
          {isLoading ? (
            <LoadingState />
          ) : analysisResult ? (
            <div className="space-y-6 mt-10">
              <div className="flex gap-4 mb-8">
                <button
                  onClick={generateComprehensivePDF}
                  disabled={isGeneratingPDF}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingPDF ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      Download Complete Analysis Report
                    </>
                  )}
                </button>
              </div>

              {/* Resume Analysis Sections */}
              <OverallSummary summary={analysisResult.overallSummary} />
              <TopicSuggestions topics={analysisResult.topics} />
              <ProjectAnalysis projects={analysisResult.projectAnalysis} />
              <ExperienceAnalysis experiences={analysisResult.experienceAnalysis} />
              <CertificateAnalysis certificates={analysisResult.certificateAnalysis} />

              {/* Important Topics */}
              <div className="bg-gradient-to-r from-primary-900/20 to-primary-600/20 rounded-xl border border-primary-500/20 p-4 backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <FileText size={28} className="text-primary-400 mr-3" />
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    Priority Topics
                  </h2>
                </div>

                <p className="text-gray-300 mb-6 text-sm">
                  Based on your resume analysis, focus your preparation on these key areas ranked by importance:
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {analysisResult.topics
                    .sort((a, b) => b.importance - a.importance)
                    .map((topic, index) => (
                      <div
                        key={index}
                        className="bg-black/50 rounded-lg p-6 border border-gray-800 hover:border-primary-500/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-primary-400">{topic.topic}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Priority:</span>
                            <div className="flex items-center gap-1">
                              <div className="w-10 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${topic.importance >= 8
                                    ? 'bg-red-500'
                                    : topic.importance >= 6
                                      ? 'bg-yellow-500'
                                      : 'bg-green-500'
                                    }`}
                                  style={{ width: `${topic.importance * 10}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-primary-400">
                                {topic.importance}/10
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-4">{topic.reason}</p>

                        {topic.subtopics && topic.subtopics.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Key Areas:</h4>
                            <div className="flex flex-wrap gap-2">
                              {topic.subtopics.slice(0, 3).map((subtopic, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-primary-900/30 text-primary-300 rounded-full text-xs border border-primary-700/30"
                                >
                                  {subtopic.name}
                                </span>
                              ))}
                              {topic.subtopics.length > 3 && (
                                <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">
                                  +{topic.subtopics.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-700/30">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">📚 Study Recommendation</h3>
                  <p className="text-gray-300 text-sm">
                    Start with the highest priority topics (8–10/10) and spend 60% of your preparation time on these.
                    The remaining 40% should be distributed among medium priority topics (6–7/10).
                    Download the complete analysis report for detailed study plans and practice questions.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Video Preview Modal */}
        {showVideoModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <Play size={24} className="text-white-400" />
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white">
                    Resume Analysis Preview
                  </h2>
                </div>
                <button
                  onClick={closeVideoPreview}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  {/* You can replace this with an actual video element */}
                  <video
                    controls
                    className="w-full h-full"
                    poster="/video-thumbnail.jpg"
                  >
                    <source src="/interview.prep.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="text-center">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2">
                    See How Our AI Analyzes Your Resume
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                    Watch this demo to understand how our AI-powered resume analysis works and what insights you'll receive.
                  </p>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default ResumeAnalyzer;
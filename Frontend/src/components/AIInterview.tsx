// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Mic, 
//   MicOff, 
//   Play, 
//   Pause, 
//   Square, 
//   RotateCcw, 
//   Clock, 
//   User, 
//   Brain, 
//   CheckCircle, 
//   AlertCircle,
//   Volume2,
//   VolumeX,
//   Settings,
//   FileText,
//   Target,
//   TrendingUp,
//   Award,
//   Lightbulb,
//   ArrowRight,
//   ArrowLeft,
//   Eye,
//   EyeOff,
//   Download,
//   Share2,
//   BookOpen,
//   Zap,
//   Star,
//   MessageSquare,
//   Camera,
//   VideoOff,
//   Video
// } from 'lucide-react';
// import { useReactMediaRecorder } from 'react-media-recorder';
// import FileUpload from './FileUpload';
// import { generateInterviewQuestions, analyzeInterviewResponse } from '../services/groqService';
// import { parseResume } from '../services/resumeParser';

// interface InterviewSession {
//   id: string;
//   questions: string[];
//   responses: Array<{
//     question: string;
//     response: string;
//     feedback: string;
//     score: number;
//     timestamp: Date;
//   }>;
//   overallScore: number;
//   duration: number;
//   status: 'preparing' | 'active' | 'completed';
// }

// interface InterviewSettings {
//   duration: number; // in minutes
//   difficulty: 'beginner' | 'intermediate' | 'advanced';
//   focusAreas: string[];
//   includeVideo: boolean;
//   autoAdvance: boolean;
// }

// const AIInterview: React.FC = () => {
//   // Core state
//   const [isLoading, setIsLoading] = useState(false);
//   const [questions, setQuestions] = useState<string[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [interviewSession, setInterviewSession] = useState<InterviewSession | null>(null);
//   const [settings, setSettings] = useState<InterviewSettings>({
//     duration: 30,
//     difficulty: 'intermediate',
//     focusAreas: [],
//     includeVideo: false,
//     autoAdvance: false
//   });

//   // Recording state
//   const [transcript, setTranscript] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [currentScore, setCurrentScore] = useState(0);

//   // UI state
//   const [showSettings, setShowSettings] = useState(false);
//   const [showTranscript, setShowTranscript] = useState(true);
//   const [interviewStarted, setInterviewStarted] = useState(false);
//   const [timeRemaining, setTimeRemaining] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   // Refs
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const questionStartTime = useRef<Date | null>(null);

//   // Media recorder
//   const {
//     status,
//     startRecording,
//     stopRecording,
//     mediaBlobUrl,
//     clearBlobUrl
//   } = useReactMediaRecorder({ 
//     audio: true,
//     video: settings.includeVideo 
//   });

//   // Timer effect
//   useEffect(() => {
//     if (interviewStarted && !isPaused && timeRemaining > 0) {
//       timerRef.current = setInterval(() => {
//         setTimeRemaining(prev => {
//           if (prev <= 1) {
//             handleEndInterview();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } else {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     }

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [interviewStarted, isPaused, timeRemaining]);

//   // Handle file upload and question generation
//   const handleFileSelected = async (file: File) => {
//     setIsLoading(true);
//     try {
//       const resumeText = await parseResume(file);
//       const generatedQuestions = await generateInterviewQuestions(resumeText);
      
//       setQuestions(generatedQuestions);
      
//       // Initialize interview session
//       const newSession: InterviewSession = {
//         id: Date.now().toString(),
//         questions: generatedQuestions,
//         responses: [],
//         overallScore: 0,
//         duration: settings.duration,
//         status: 'preparing'
//       };
      
//       setInterviewSession(newSession);
//     } catch (error) {
//       console.error('Error processing resume:', error);
//       alert('Failed to process resume. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Start interview
//   const handleStartInterview = () => {
//     if (!interviewSession || questions.length === 0) return;
    
//     setInterviewStarted(true);
//     setTimeRemaining(settings.duration * 60);
//     setCurrentQuestionIndex(0);
//     questionStartTime.current = new Date();
    
//     setInterviewSession(prev => prev ? { ...prev, status: 'active' } : null);
//   };

//   // Handle recording
//   const handleStartRecording = () => {
//     if (status === 'idle') {
//       startRecording();
//       questionStartTime.current = new Date();
//     }
//   };

//   const handleStopRecording = () => {
//     if (status === 'recording') {
//       stopRecording();
//     }
//   };

//   // Analyze response
//   const handleAnalyzeResponse = async () => {
//     if (!mediaBlobUrl || !questions[currentQuestionIndex]) return;

//     setIsAnalyzing(true);
//     try {
//       // Simulate transcription (in real app, you'd use speech-to-text API)
//       const mockTranscript = "This is a simulated transcript of the user's response. In a real implementation, this would be the actual transcribed audio.";
//       setTranscript(mockTranscript);

//       // Get AI feedback
//       const question = questions[currentQuestionIndex];
//       const aiFeedback = await analyzeInterviewResponse(question, mockTranscript);
//       setFeedback(aiFeedback);

//       // Calculate score (simplified)
//       const score = Math.floor(Math.random() * 40) + 60; // 60-100 range
//       setCurrentScore(score);

//       // Update session
//       if (interviewSession) {
//         const newResponse = {
//           question,
//           response: mockTranscript,
//           feedback: aiFeedback,
//           score,
//           timestamp: new Date()
//         };

//         setInterviewSession(prev => {
//           if (!prev) return null;
//           const updatedResponses = [...prev.responses, newResponse];
//           const avgScore = updatedResponses.reduce((sum, r) => sum + r.score, 0) / updatedResponses.length;
          
//           return {
//             ...prev,
//             responses: updatedResponses,
//             overallScore: Math.round(avgScore)
//           };
//         });
//       }

//       // Auto-advance if enabled
//       if (settings.autoAdvance) {
//         setTimeout(() => {
//           handleNextQuestion();
//         }, 5000);
//       }

//     } catch (error) {
//       console.error('Error analyzing response:', error);
//       alert('Failed to analyze response. Please try again.');
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   // Navigation
//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//       setTranscript('');
//       setFeedback('');
//       setCurrentScore(0);
//       clearBlobUrl();
//       questionStartTime.current = new Date();
//     } else {
//       handleEndInterview();
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//       setTranscript('');
//       setFeedback('');
//       setCurrentScore(0);
//       clearBlobUrl();
//     }
//   };

//   // End interview
//   const handleEndInterview = () => {
//     setInterviewStarted(false);
//     setIsPaused(false);
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//     }
    
//     setInterviewSession(prev => prev ? { ...prev, status: 'completed' } : null);
//   };

//   // Reset interview
//   const handleResetInterview = () => {
//     setInterviewStarted(false);
//     setCurrentQuestionIndex(0);
//     setTranscript('');
//     setFeedback('');
//     setCurrentScore(0);
//     setTimeRemaining(0);
//     setIsPaused(false);
//     clearBlobUrl();
    
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//     }
//   };

//   // Format time
//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Get status color
//   const getStatusColor = (score: number) => {
//     if (score >= 80) return 'text-green-400';
//     if (score >= 60) return 'text-yellow-400';
//     return 'text-red-400';
//   };

//   return (
//     <main className="flex-grow bg-black text-white min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl mr-4">
//               <Brain size={48} className="text-white" />
//             </div>
//             <div className="text-left">
//               <h1 className="text-4xl sm:text-5xl font-bold text-white">AI Interview Simulator</h1>
//               <p className="text-gray-400 text-lg mt-2">Practice with AI-powered mock interviews</p>
//             </div>
//           </div>
//         </div>

//         {/* Interview Setup */}
//         {!interviewSession && (
//           <div className="space-y-8">
//             {/* Settings Panel */}
//             <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-700 p-8">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-white flex items-center">
//                   <Settings size={28} className="mr-3 text-blue-400" />
//                   Interview Settings
//                 </h2>
//                 <button
//                   onClick={() => setShowSettings(!showSettings)}
//                   className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-600"
//                 >
//                   {showSettings ? 'Hide' : 'Show'} Advanced
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Duration (minutes)
//                   </label>
//                   <select
//                     value={settings.duration}
//                     onChange={(e) => setSettings(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
//                     className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
//                   >
//                     <option value={15}>15 minutes</option>
//                     <option value={30}>30 minutes</option>
//                     <option value={45}>45 minutes</option>
//                     <option value={60}>60 minutes</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Difficulty Level
//                   </label>
//                   <select
//                     value={settings.difficulty}
//                     onChange={(e) => setSettings(prev => ({ ...prev, difficulty: e.target.value as any }))}
//                     className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
//                   >
//                     <option value="beginner">Beginner</option>
//                     <option value="intermediate">Intermediate</option>
//                     <option value="advanced">Advanced</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Recording Mode
//                   </label>
//                   <div className="flex items-center space-x-4">
//                     <label className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={settings.includeVideo}
//                         onChange={(e) => setSettings(prev => ({ ...prev, includeVideo: e.target.checked }))}
//                         className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
//                       />
//                       <span className="ml-2 text-sm text-gray-300">Include Video</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {showSettings && (
//                 <div className="border-t border-gray-700 pt-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={settings.autoAdvance}
//                           onChange={(e) => setSettings(prev => ({ ...prev, autoAdvance: e.target.checked }))}
//                           className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
//                         />
//                         <span className="ml-2 text-sm text-gray-300">Auto-advance questions</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* File Upload */}
//             <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-700 p-8">
//               <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
//                 <FileText size={28} className="mr-3 text-green-400" />
//                 Upload Your Resume
//               </h2>
//               <p className="text-gray-400 mb-6">
//                 Upload your resume to generate personalized interview questions based on your experience and skills.
//               </p>
//               <FileUpload onFileSelected={handleFileSelected} isLoading={isLoading} />
//             </div>
//           </div>
//         )}

//         {/* Interview Interface */}
//         {interviewSession && interviewSession.status === 'preparing' && (
//           <div className="space-y-8">
//             {/* Interview Preview */}
//             <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-700 p-8">
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-white mb-4">Interview Ready!</h2>
//                 <p className="text-gray-400 text-lg">
//                   We've generated {questions.length} personalized questions based on your resume.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 <div className="bg-black/50 rounded-xl p-6 text-center border border-gray-800">
//                   <Clock size={32} className="text-blue-400 mx-auto mb-3" />
//                   <h3 className="text-xl font-semibold text-white mb-2">{settings.duration} Minutes</h3>
//                   <p className="text-gray-400 text-sm">Total Duration</p>
//                 </div>
//                 <div className="bg-black/50 rounded-xl p-6 text-center border border-gray-800">
//                   <MessageSquare size={32} className="text-green-400 mx-auto mb-3" />
//                   <h3 className="text-xl font-semibold text-white mb-2">{questions.length} Questions</h3>
//                   <p className="text-gray-400 text-sm">Personalized for You</p>
//                 </div>
//                 <div className="bg-black/50 rounded-xl p-6 text-center border border-gray-800">
//                   <Target size={32} className="text-purple-400 mx-auto mb-3" />
//                   <h3 className="text-xl font-semibold text-white mb-2">{settings.difficulty}</h3>
//                   <p className="text-gray-400 text-sm">Difficulty Level</p>
//                 </div>
//               </div>

//               <div className="text-center">
//                 <button
//                   onClick={handleStartInterview}
//                   className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg flex items-center gap-3 mx-auto"
//                 >
//                   <Play size={24} />
//                   Start Interview
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Active Interview */}
//         {interviewSession && interviewSession.status === 'active' && interviewStarted && (
//           <div className="space-y-6">
//             {/* Interview Header */}
//             <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-700 p-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-6">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-white">{formatTime(timeRemaining)}</div>
//                     <div className="text-sm text-gray-400">Time Remaining</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-white">{currentQuestionIndex + 1}/{questions.length}</div>
//                     <div className="text-sm text-gray-400">Question</div>
//                   </div>
//                   <div className="text-center">
//                     <div className={`text-2xl font-bold ${getStatusColor(interviewSession.overallScore)}`}>
//                       {interviewSession.overallScore}%
//                     </div>
//                     <div className="text-sm text-gray-400">Overall Score</div>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={() => setIsPaused(!isPaused)}
//                     className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-600"
//                   >
//                     {isPaused ? <Play size={20} /> : <Pause size={20} />}
//                   </button>
//                   <button
//                     onClick={handleEndInterview}
//                     className="p-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-colors border border-red-700/30"
//                   >
//                     <Square size={20} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Current Question */}
//             <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-700 p-8">
//               <div className="flex items-center mb-6">
//                 <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mr-4">
//                   <span className="text-white font-bold text-lg">{currentQuestionIndex + 1}</span>
//                 </div>
//                 <h2 className="text-2xl font-bold text-white">Interview Question</h2>
//               </div>
              
//               <div className="bg-black/50 rounded-xl p-6 mb-6 border border-gray-800">
//                 <p className="text-lg text-gray-200 leading-relaxed">
//                   {questions[currentQuestionIndex]}
//                 </p>
//               </div>

//               {/* Recording Controls */}
//               <div className="flex items-center justify-center space-x-4 mb-6">
//                 {status === 'idle' && (
//                   <button
//                     onClick={handleStartRecording}
//                     className="flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
//                   >
//                     <Mic size={24} />
//                     Start Recording
//                   </button>
//                 )}
                
//                 {status === 'recording' && (
//                   <button
//                     onClick={handleStopRecording}
//                     className="flex items-center gap-3 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold animate-pulse"
//                   >
//                     <Square size={24} />
//                     Stop Recording
//                   </button>
//                 )}

//                 {mediaBlobUrl && (
//                   <button
//                     onClick={handleAnalyzeResponse}
//                     disabled={isAnalyzing}
//                     className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
//                   >
//                     {isAnalyzing ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                         Analyzing...
//                       </>
//                     ) : (
//                       <>
//                         <Brain size={24} />
//                         Analyze Response
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>

//               {/* Audio Playback */}
//               {mediaBlobUrl && (
//                 <div className="bg-black/30 rounded-xl p-4 mb-6 border border-gray-800">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-sm font-medium text-gray-300">Your Response</span>
//                     <button
//                       onClick={() => setShowTranscript(!showTranscript)}
//                       className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
//                     >
//                       {showTranscript ? <EyeOff size={16} /> : <Eye size={16} />}
//                       {showTranscript ? 'Hide' : 'Show'} Transcript
//                     </button>
//                   </div>
//                   <audio src={mediaBlobUrl} controls className="w-full mb-4" />
                  
//                   {showTranscript && transcript && (
//                     <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
//                       <h4 className="text-sm font-medium text-gray-300 mb-2">Transcript:</h4>
//                       <p className="text-gray-200 text-sm leading-relaxed">{transcript}</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* AI Feedback */}
//               {feedback && (
//                 <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-6 mb-6 border border-purple-700/30">
//                   <div className="flex items-center mb-4">
//                     <Lightbulb size={24} className="text-yellow-400 mr-3" />
//                     <h3 className="text-xl font-semibold text-white">AI Feedback</h3>
//                     {currentScore > 0 && (
//                       <div className={`ml-auto px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(currentScore)} bg-gray-800`}>
//                         Score: {currentScore}%
//                       </div>
//                     )}
//                   </div>
//                   <div className="prose prose-invert max-w-none">
//                     <div dangerouslySetInnerHTML={{ 
//                       __html: feedback.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') 
//                     }} />
//                   </div>
//                 </div>
//               )}

//               {/* Navigation */}
//               <div className="flex items-center justify-between">
//                 <button
//                   onClick={handlePreviousQuestion}
//                   disabled={currentQuestionIndex === 0}
//                   className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600"
//                 >
//                   <ArrowLeft size={20} />
//                   Previous
//                 </button>

//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={handleResetInterview}
//                     className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-600"
//                   >
//                     <RotateCcw size={20} />
//                     Reset
//                   </button>
//                 </div>

//                 <button
//                   onClick={handleNextQuestion}
//                   disabled={currentQuestionIndex === questions.length - 1}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                   <ArrowRight size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Interview Results */}
//         {interviewSession && interviewSession.status === 'completed' && (
//           <div className="space-y-8">
//             {/* Results Header */}
//             <div className="text-center">
//               <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
//                 <Award size={48} className="text-white" />
//               </div>
//               <h2 className="text-4xl font-bold text-white mb-4">Interview Complete!</h2>
//               <p className="text-gray-400 text-lg">
//                 Here's your detailed performance analysis
//               </p>
//             </div>

//             {/* Overall Score */}
//             <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-700 p-8 text-center">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 <div>
//                   <div className={`text-4xl font-bold mb-2 ${getStatusColor(interviewSession.overallScore)}`}>
//                     {interviewSession.overallScore}%
//                   </div>
//                   <div className="text-gray-400">Overall Score</div>
//                 </div>
//                 <div>
//                   <div className="text-4xl font-bold text-white mb-2">{interviewSession.responses.length}</div>
//                   <div className="text-gray-400">Questions Answered</div>
//                 </div>
//                 <div>
//                   <div className="text-4xl font-bold text-white mb-2">{settings.duration}</div>
//                   <div className="text-gray-400">Minutes</div>
//                 </div>
//                 <div>
//                   <div className="text-4xl font-bold text-white mb-2">
//                     {interviewSession.responses.filter(r => r.score >= 70).length}
//                   </div>
//                   <div className="text-gray-400">Strong Answers</div>
//                 </div>
//               </div>
//             </div>

//             {/* Detailed Results */}
//             <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-700 p-8">
//               <h3 className="text-2xl font-bold text-white mb-6">Question-by-Question Analysis</h3>
//               <div className="space-y-6">
//                 {interviewSession.responses.map((response, index) => (
//                   <div key={index} className="bg-black/50 rounded-xl p-6 border border-gray-800">
//                     <div className="flex items-center justify-between mb-4">
//                       <h4 className="text-lg font-semibold text-white">Question {index + 1}</h4>
//                       <div className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(response.score)} bg-gray-800`}>
//                         {response.score}%
//                       </div>
//                     </div>
//                     <p className="text-gray-300 mb-4">{response.question}</p>
//                     <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
//                       <div dangerouslySetInnerHTML={{ 
//                         __html: response.feedback.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') 
//                       }} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center justify-center space-x-4">
//               <button
//                 onClick={() => window.location.reload()}
//                 className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
//               >
//                 <RotateCcw size={20} />
//                 Start New Interview
//               </button>
//               <button
//                 onClick={() => {/* Implement download functionality */}}
//                 className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors font-semibold border border-gray-600"
//               >
//                 <Download size={20} />
//                 Download Report
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default AIInterview;

import { AlertTriangle } from 'lucide-react';

const WorkingPhaseNotice = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md text-center border border-gray-800 rounded-2xl p-8 bg-gradient-to-br from-neutral-950 to-black shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-500/10 p-4 rounded-full border border-yellow-400/20">
            <AlertTriangle size={48} className="text-yellow-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Feature in Development</h1>
        <p className="text-gray-400 text-base leading-relaxed">
          This section of the application is currently in the <span className="text-yellow-300 font-medium">working and testing phase</span>. We're actively building and refining it for the best experience.
        </p>
        <p className="text-gray-500 text-sm mt-4">Thank you for your patience.</p>
      </div>
    </div>
  );
};

export default WorkingPhaseNotice;

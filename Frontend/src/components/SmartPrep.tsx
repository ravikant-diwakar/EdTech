import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Calendar,
  Target,
  Users,
  Briefcase,
  Code,
  Brain,
  Clock,
  CheckCircle,
  ArrowRight,
  Github,
  Play,
  Star,
  TrendingUp,
  Award,
  Lightbulb,
  Search,
  Filter,
  Lock,
  LogIn,
  X,
  Eye,
  Database,
  Cloud,
  Smartphone,
  Globe,
  Server,
  Cpu,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface Note {
  id: string;
  title: string;
  description: string;
  category: string;
  githubUrl?: string;
  pdfUrl?: string;
  lastUpdated: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'Video' | 'Article' | 'Practice' | 'Website';
  url: string;
  category: string;
  isNew?: boolean;
}

const SmartPrep: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [notesUrl, setNotesUrl] = useState<string>('');
  const [showPDFModal, setShowPDFModal] = useState<boolean>(false);
  const [selectedPDF, setSelectedPDF] = useState<string>('');
  const [pdfTitle, setPdfTitle] = useState<string>('');
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const userLoggedIn = !!authUser;

  // Updated notes data with all the requested resources
  const [notes, setNotes] = useState<Note[]>([
    // OOPs
    {
      id: '1',
      title: 'Object-Oriented Programming',
      description: 'Complete OOPs concepts including inheritance, polymorphism, encapsulation, and abstraction',
      category: 'OOPs',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/tree/master/OOPs',
      lastUpdated: '2025-01-15',
      difficulty: 'Intermediate',
      tags: ['OOPs', 'Java', 'C++', 'Inheritance', 'Polymorphism']
    },
    // AWS
    {
      id: '2',
      title: 'AWS Cloud Services',
      description: 'Comprehensive AWS services, architecture patterns, and cloud computing concepts',
      category: 'AWS',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/tree/master/AWS',
      lastUpdated: '2025-01-15',
      difficulty: 'Advanced',
      tags: ['AWS', 'Cloud', 'EC2', 'S3', 'Lambda']
    },
    // Computer Networks
    {
      id: '3',
      title: 'Computer Networks',
      description: 'Complete networking concepts including OSI model, TCP/IP, routing, and network security',
      category: 'Networks',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/CN/Computer%20Networks.pdf',
      lastUpdated: '2025-01-12',
      difficulty: 'Intermediate',
      tags: ['Networks', 'OSI', 'TCP/IP', 'Routing', 'Security']
    },
    // DBMS Full Notes
    {
      id: '4',
      title: 'DBMS Full Notes',
      description: 'Complete database management system notes covering SQL, normalization, transactions, and indexing',
      category: 'Database',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/DBMS/DBMS_Full_Notes.pdf',
      lastUpdated: '2025-01-10',
      difficulty: 'Intermediate',
      tags: ['DBMS', 'SQL', 'Normalization', 'Transactions']
    },
    // SQL Master Guide
    {
      id: '5',
      title: '16 Page SQL Master Guide',
      description: 'Concise SQL reference guide covering all essential queries and concepts',
      category: 'Database',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/DBMS/16%20Page%20SQL%20Master%20Guide.pdf',
      lastUpdated: '2025-01-10',
      difficulty: 'Beginner',
      tags: ['SQL', 'Queries', 'Database', 'Reference']
    },
    // Top 100 SQL Questions
    {
      id: '6',
      title: 'Top 100 SQL Interview Questions',
      description: 'Most commonly asked SQL interview questions with detailed solutions',
      category: 'Database',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/DBMS/Top%20100%20SQL%20Interview%20Questions.pdf',
      lastUpdated: '2025-01-10',
      difficulty: 'Intermediate',
      tags: ['SQL', 'Interview', 'Questions', 'Practice']
    },
    // DevOps
    {
      id: '7',
      title: 'DevOps Fundamentals',
      description: 'Complete DevOps concepts including CI/CD, automation, and infrastructure management',
      category: 'DevOps',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/DevOps/DevOps.pdf',
      lastUpdated: '2025-01-08',
      difficulty: 'Advanced',
      tags: ['DevOps', 'CI/CD', 'Automation', 'Infrastructure']
    },
    // Docker Questions
    {
      id: '8',
      title: 'Docker Interview Questions',
      description: 'Comprehensive Docker interview questions covering containers, images, and orchestration',
      category: 'DevOps',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/DevOps/Docker%20Interview%20Questions.pdf',
      lastUpdated: '2025-01-08',
      difficulty: 'Intermediate',
      tags: ['Docker', 'Containers', 'Interview', 'DevOps']
    },
    // Kubernetes Questions
    {
      id: '9',
      title: 'Kubernetes Interview Questions',
      description: 'Essential Kubernetes concepts and interview questions for container orchestration',
      category: 'DevOps',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/DevOps/Kubernetes%20Interview%20Questions.pdf',
      lastUpdated: '2025-01-08',
      difficulty: 'Advanced',
      tags: ['Kubernetes', 'Orchestration', 'Interview', 'DevOps']
    },
    // HTML Notes
    {
      id: '10',
      title: 'Complete HTML Notes',
      description: 'Comprehensive HTML guide covering all tags, attributes, and modern HTML5 features',
      category: 'Frontend',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/Frontend/Complete%20HTML%20%20Notes%20.pdf',
      lastUpdated: '2025-01-05',
      difficulty: 'Beginner',
      tags: ['HTML', 'HTML5', 'Web Development', 'Frontend']
    },
    // JavaScript
    {
      id: '11',
      title: 'JavaScript Complete Guide',
      description: 'Complete JavaScript concepts including ES6+, async programming, and modern features',
      category: 'Frontend',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/Frontend/JAVASCRIPT.md',
      lastUpdated: '2025-01-05',
      difficulty: 'Intermediate',
      tags: ['JavaScript', 'ES6', 'Async', 'DOM']
    },
    // React
    {
      id: '12',
      title: 'React Development Guide',
      description: 'Complete React guide covering hooks, state management, and modern React patterns',
      category: 'Frontend',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/Frontend/REACT.md',
      lastUpdated: '2025-01-05',
      difficulty: 'Intermediate',
      tags: ['React', 'Hooks', 'JSX', 'Components']
    },
    // Operating System
    {
      id: '13',
      title: 'Operating System Complete Notes',
      description: 'Complete operating system concepts including processes, threads, memory management, and file systems',
      category: 'Operating System',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/OS/Operating%20System.pdf',
      lastUpdated: '2025-01-12',
      difficulty: 'Intermediate',
      tags: ['OS', 'Processes', 'Memory', 'File Systems']
    },
    // SDLC
    {
      id: '14',
      title: 'Software Development Life Cycle',
      description: 'Complete SDLC methodologies including Agile, Waterfall, and DevOps practices',
      category: 'SDLC',
      githubUrl: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/SDLC/SDLC.pdf',
      lastUpdated: '2025-01-03',
      difficulty: 'Beginner',
      tags: ['SDLC', 'Agile', 'Waterfall', 'Project Management']
    }
  ]);

  // Career Resources
  const careerResources: Resource[] = [
    // Placement Preparation
    {
      id: '1',
      title: 'Aptitude Practice - IndiaBix',
      description: 'Comprehensive aptitude questions and practice tests',
      type: 'Website',
      url: 'https://www.indiabix.com/',
      category: 'Aptitude'
    },
    {
      id: '2',
      title: 'Aptitude Learning - PrepInsta',
      description: 'Learn aptitude concepts with detailed explanations',
      type: 'Website',
      url: 'https://prepinsta.com/learn-aptitude/',
      category: 'Aptitude'
    },
    // Last Minute Material
    {
      id: '3',
      title: 'Operating Systems - Last Minute Notes',
      description: 'Quick revision notes for operating system concepts',
      type: 'Article',
      url: 'https://www.geeksforgeeks.org/last-minute-notes-operating-systems/',
      category: 'Last Minute'
    },
    {
      id: '4',
      title: 'DBMS - Last Minute Notes',
      description: 'Quick revision notes for database management systems',
      type: 'Article',
      url: 'https://www.geeksforgeeks.org/last-minute-notes-dbms/',
      category: 'Last Minute'
    },
    {
      id: '5',
      title: 'Computer Networks - Last Minute Notes',
      description: 'Quick revision notes for networking concepts',
      type: 'Article',
      url: 'https://www.geeksforgeeks.org/last-minute-notes-computer-network/',
      category: 'Last Minute'
    },
    {
      id: '6',
      title: 'SQL Queries for Interview',
      description: 'Essential SQL queries commonly asked in interviews',
      type: 'Article',
      url: 'https://artoftesting.com/interviewSection/sql-queries-for-interview.html',
      category: 'Last Minute'
    }
  ];

  // Expert Career Tools
  const expertTools: Resource[] = [
    {
      id: '1',
      title: 'Tips and Tricks for Technical PI',
      description: 'Complete guide for technical personal interviews with latest tips and strategies',
      type: 'PDF',
      url: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/Interview/Tips%20and%20Tricks%20for%20Technical%20PI%20-2024.pdf',
      category: 'Interview Guide',
      isNew: true
    }
  ];

  // Interview Preparation Roadmap Resources
  const interviewRoadmapResources: Resource[] = [
    {
      id: '1',
      title: 'Tips and Tricks for Technical PI',
      description: 'Essential tips and strategies for technical personal interviews',
      type: 'PDF',
      url: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/Interview/Tips%20and%20Tricks%20for%20Technical%20PI%20-2024.pdf',
      category: 'Technical Interview'
    },
    {
      id: '2',
      title: 'HR Interview Ques And Ans',
      description: 'Comprehensive guide to HR interview questions with sample answers',
      type: 'PDF',
      url: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/Interview/HR_Interview_Questions_and_Answers.pdf',
      category: 'HR Interview'
    },
    {
      id: '3',
      title: 'HR Round Complete Guide',
      description: 'Complete preparation guide for HR interview rounds',
      type: 'PDF',
      url: 'https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/Interview/HR-Round-Complete-Guide.pdf',
      category: 'HR Interview'
    }
  ];

  const categories = ['All', 'OOPs', 'AWS', 'Networks', 'Database', 'DevOps', 'Frontend', 'Operating System', 'SDLC'];

  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-900/30 text-green-300 border-green-700/30';
      case 'Intermediate': return 'bg-yellow-900/30 text-yellow-300 border-yellow-700/30';
      case 'Advanced': return 'bg-red-900/30 text-red-300 border-red-700/30';
      default: return 'bg-gray-900/30 text-gray-300 border-gray-700/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'OOPs': return <Code className="w-5 h-5" />;
      case 'AWS': return <Cloud className="w-5 h-5" />;
      case 'Networks': return <Globe className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'DevOps': return <Server className="w-5 h-5" />;
      case 'Frontend': return <Smartphone className="w-5 h-5" />;
      case 'Operating System': return <Cpu className="w-5 h-5" />;
      case 'SDLC': return <Target className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const handleLoginRequired = () => {
    navigate('/login?redirect=/smart-prep');
  };

  const handleNoteView = (note: Note) => {
    if (note.githubUrl) {
      window.open(note.githubUrl, '_blank');
    }
  };

  // Component for locked sections
  const LockedSection: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="relative">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 rounded-xl flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Lock size={32} className="text-black" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Premium Content</h3>
          <p className="text-gray-300 mb-6 max-w-sm">
            Log in to access {title.toLowerCase()} and unlock all premium features
          </p>
          <button
            onClick={handleLoginRequired}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-neutral-950 text-white rounded-lg hover:from-blue-900 hover:to-blue-950 transition-all duration-200 font-semibold mx-auto border border-white"
          >
            <LogIn size={20} />
            Log in to Access
          </button>
        </div>
      </div>
      <div className="opacity-30 pointer-events-none">
        {/* Blurred content preview */}
        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-400 mb-6">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-black/50 rounded-lg p-6 border border-gray-800">
                <div className="w-full h-4 bg-gray-700 rounded mb-3"></div>
                <div className="w-3/4 h-3 bg-gray-700 rounded mb-2"></div>
                <div className="w-1/2 h-3 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="flex-grow bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36 bg-[url('https://images.pexels.com/photos/633409/pexels-photo-633409.jpeg')] bg-cover bg-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold bg-white bg-clip-text text-transparent mb-6">
                Smart Prep
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto md:mx-0">
                Your all-in-one interview preparation hub with notes, practice materials, and expert tools to help you succeed.
              </p>
            </div>

            {/* Right Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-neutral-950 rounded-xl border border-blue-500/20 p-5 sm:p-6 text-center">
                <FileText size={28} className="text-white mx-auto mb-2 sm:mb-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">{notes.length}+</h3>
                <p className="text-gray-400 text-sm sm:text-base">Study Notes</p>
              </div>
              <div className="bg-neutral-950 rounded-xl border border-green-500/20 p-5 sm:p-6 text-center">
                <Target size={28} className="text-white mx-auto mb-2 sm:mb-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">500+</h3>
                <p className="text-gray-400 text-sm sm:text-base">Practice Questions</p>
              </div>
              <div className="bg-neutral-950 rounded-xl border border-purple-500/20 p-5 sm:p-6 text-center">
                <Briefcase size={28} className="text-white mx-auto mb-2 sm:mb-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">50+</h3>
                <p className="text-gray-400 text-sm sm:text-base">Companies Covered</p>
              </div>
              <div className="bg-neutral-950 rounded-xl border border-orange-500/20 p-5 sm:p-6 text-center">
                <TrendingUp size={28} className="text-white mx-auto mb-2 sm:mb-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">2025</h3>
                <p className="text-gray-400 text-sm sm:text-base">Updated Content</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interview Preparation Roadmap - Login Required */}
      <section className="py-16 bg-gradient-to-br from-black via-neutral-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Interview Preparation Roadmap</h2>
          </div>

          {!userLoggedIn ? (
            <LockedSection
              title="Interview Preparation Roadmap"
              description="a structured step-by-step roadmap for interview success"
            />
          ) : (
            <div className="space-y-12">
              {/* Flowchart */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="relative">
                  <div className="bg-gradient-to-r from-neutral-950 via-neutral-950 to-black rounded-xl border border-blue-500/30 p-6 text-center">
                    <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Foundation Building</h3>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Review core concepts</li>
                      <li>• Study data structures</li>
                      <li>• Practice algorithms</li>
                      <li>• System design basics</li>
                    </ul>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight size={24} className="text-gray-600" />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="bg-gradient-to-r from-neutral-950 via-neutral-950 to-black rounded-xl border border-green-500/30 p-6 text-center">
                    <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Practice & Application</h3>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Solve coding problems</li>
                      <li>• Mock interviews</li>
                      <li>• Company-specific prep</li>
                      <li>• Behavioral questions</li>
                    </ul>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight size={24} className="text-gray-600" />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="bg-gradient-to-r from-neutral-950 via-neutral-950 to-black rounded-xl border border-purple-500/30 p-6 text-center">
                    <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Final Preparation</h3>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Review weak areas</li>
                      <li>• Practice presentations</li>
                      <li>• Prepare questions</li>
                      <li>• Final mock rounds</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interview Resources */}
              <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Shield size={28} className="text-white mr-3" />
                  Interview Preparation Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {interviewRoadmapResources.map(resource => (
                    <div key={resource.id} className="bg-black/50 rounded-lg p-6 border border-gray-800 hover:border-blue-500/50 transition-colors">
                      <div className="flex items-center mb-4">
                        <FileText size={24} className="text-white mr-3" />
                        <div>
                          <h4 className="text-lg font-semibold text-white">{resource.title}</h4>
                          <span className="text-xs text-gray-400">{resource.category}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-neutral-950 text-white rounded hover:bg-neutral-900 transition-colors text-sm w-full justify-center border border-gray-700"
                      >
                        <Github size={16} />
                        View Guide
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Notes Section - Always Visible */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Study Notes</h2>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedCategory === category
                    ? 'bg-gray-950 text-white border border-gray-800'
                    : 'bg-neutral-950 text-gray-300 hover:bg-gray-800 border border-gray-700'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map(note => (
              <div key={note.id} className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {getCategoryIcon(note.category)}
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-white">{note.title}</h3>
                      <p className="text-sm text-gray-400">{note.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(note.difficulty)}`}>
                    {note.difficulty}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4">{note.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Updated: {note.lastUpdated}</span>
                  <button
                    onClick={() => handleNoteView(note)}
                    className="flex items-center gap-2 px-3 py-2 bg-neutral-950 text-white rounded hover:bg-gray-800 transition-colors text-sm border border-gray-700"
                  >
                    <Github size={16} />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Resources Section - Login Required */}
      <section className="py-16 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Career Resources</h2>
          </div>

          {!userLoggedIn ? (
            <LockedSection
              title="Career Resources"
              description="premium resources including interview guides, practice questions, and expert tools"
            />
          ) : (
            <div className="space-y-12">
              {/* Placement Preparation */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  Placement Preparation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-neutral-950 to-blue-neutral-950 rounded-xl border border-green-500/30 p-6">
                    <h4 className="text-xl font-semibold text-white mb-4">Aptitude Practice</h4>
                    <div className="space-y-3">
                      <a
                        href="https://www.indiabix.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-black/50 text-white rounded hover:bg-black/70 transition-colors border border-gray-800"
                      >
                        <ExternalLink size={16} />
                        IndiaBix - Comprehensive Practice
                      </a>
                      <a
                        href="https://prepinsta.com/learn-aptitude/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-black/50 text-white rounded hover:bg-black/70 transition-colors border border-gray-800"
                      >
                        <ExternalLink size={16} />
                        PrepInsta - Learn Concepts
                      </a>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-neutral-950 to-blue-600/30 rounded-xl border border-blue-500/30 p-6">
                    <h4 className="text-xl font-semibold text-white mb-4">Last Minute Material</h4>
                    <div className="space-y-3">
                      <a
                        href="https://www.geeksforgeeks.org/last-minute-notes-operating-systems/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-black/50 text-white rounded hover:bg-black/70 transition-colors text-sm border border-gray-800"
                      >
                        <ExternalLink size={14} />
                        Operating Systems
                      </a>
                      <a
                        href="https://www.geeksforgeeks.org/last-minute-notes-dbms/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-black/50 text-white rounded hover:bg-black/70 transition-colors text-sm border border-gray-800"
                      >
                        <ExternalLink size={14} />
                        Database Management
                      </a>
                      <a
                        href="https://www.geeksforgeeks.org/last-minute-notes-computer-network/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-black/50 text-white rounded hover:bg-black/70 transition-colors text-sm border border-gray-800"
                      >
                        <ExternalLink size={14} />
                        Networks & Communication
                      </a>
                      <a
                        href="https://artoftesting.com/interviewSection/sql-queries-for-interview.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-black/50 text-white rounded hover:bg-black/70 transition-colors text-sm border border-gray-800"
                      >
                        <ExternalLink size={14} />
                        SQL Queries
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Expert Career Tools Section - Login Required */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Expert Career Tools</h2>
          </div>

          {!userLoggedIn ? (
            <LockedSection
              title="Expert Career Tools"
              description="professional tools including skill assessments, mock interviews, and career guidance"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Technical PI Guide */}
              <div className="bg-gradient-to-r from-neutral-950 to-black rounded-xl border border-purple-500/30 p-8 text-center">
                <Award size={48} className="text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Technical PI Guide 2024</h3>
                <p className="text-gray-300 mb-6">Complete guide with latest tips and strategies for technical personal interviews</p>
                <a
                  href="https://github.com/ravikant-diwakar/Placement-Preparation/blob/master/Interview/Tips%20and%20Tricks%20for%20Technical%20PI%20-2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors border border-gray-800"
                >
                  <Github size={16} />
                  Access Guide
                </a>
              </div>

              {/* Mock Interviews */}
              <div className="bg-gradient-to-r from-black to-neutral-950 rounded-xl border border-green-500/30 p-8 text-center">
                <Users size={48} className="text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Mock Interviews</h3>
                <p className="text-gray-300 mb-6">Practice with industry experts and get real-time feedback on your performance</p>
                <button className="w-full px-4 py-2 bg-neutral-950 text-white rounded-lg hover:bg-gray-800 transition-colors border border-gray-800">
                  Book Session
                </button>
              </div>

              {/* Career Guidance */}
              <div className="bg-gradient-to-r from-neutral-950 to-black rounded-xl border border-blue-500/30 p-8 text-center">
                <Lightbulb size={48} className="text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Career Guidance</h3>
                <p className="text-gray-300 mb-6">One-on-one mentorship sessions with industry professionals and career coaches</p>
                <button className="w-full px-4 py-2 bg-neutral-950 text-white rounded-lg hover:bg-gray-800 transition-colors border border-gray-800">
                  Get Guidance
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default SmartPrep;
import React from 'react';
import { TopicSuggestion } from '../types';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface TopicSuggestionsProps {
  topics: TopicSuggestion[];
}

const TopicSuggestions: React.FC<TopicSuggestionsProps> = ({ topics }) => {
  const [expandedTopics, setExpandedTopics] = React.useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const getImportanceColor = (importance: number): string => {
    if (importance >= 8) return 'bg-error-500';
    if (importance >= 6) return 'bg-warning-500';
    return 'bg-success-500';
  };

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center mb-4">
        <BookOpen size={24} className="text-primary-600 mr-2" />
        <h2 className="text-2xl font-bold text-white">Interview Topics</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Focus on these key topics for your upcoming interviews, prioritized by importance.
      </p>
      
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div 
              className="flex items-center justify-between p-4 bg-white cursor-pointer"
              onClick={() => toggleTopic(topic.topic)}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold ${getImportanceColor(topic.importance)}`}
                >
                  {topic.importance}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{topic.topic}</h3>
              </div>
              
              <button className="text-gray-500 hover:text-gray-700">
                {expandedTopics.includes(topic.topic) ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
            
            {expandedTopics.includes(topic.topic) && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700 mb-4">{topic.reason}</p>
                
                <h4 className="font-medium text-gray-800 mb-2">Key Subtopics:</h4>
                <div className="space-y-3">
                  {topic.subtopics.map((subtopic, idx) => (
                    <div key={idx} className="bg-white p-3 rounded border border-gray-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-800">{subtopic.name}</span>
                        <span className={`px-2 py-0.5 rounded text-xs text-white ${getImportanceColor(subtopic.importance)}`}>
                          Priority: {subtopic.importance}/10
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{subtopic.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicSuggestions;

import React from 'react';
import { X, ChevronRight, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

const courseData: Record<string, any> = {
  'web-development': [
    {
      title: 'Getting Started',
      sections: [
        { id: 'introduction', title: 'Introduction', completed: true },
        { id: 'setup', title: 'Environment Setup', completed: true },
        { id: 'basics', title: 'HTML Basics', completed: false },
      ]
    },
    {
      title: 'HTML Fundamentals',
      sections: [
        { id: 'html-elements', title: 'HTML Elements', completed: false },
        { id: 'html-attributes', title: 'HTML Attributes', completed: false },
        { id: 'html-forms', title: 'HTML Forms', completed: false },
      ]
    },
    {
      title: 'CSS Styling',
      sections: [
        { id: 'css-basics', title: 'CSS Basics', completed: false },
        { id: 'css-selectors', title: 'CSS Selectors', completed: false },
        { id: 'css-layout', title: 'CSS Layout', completed: false },
      ]
    },
    {
      title: 'JavaScript',
      sections: [
        { id: 'js-basics', title: 'JavaScript Basics', completed: false },
        { id: 'js-dom', title: 'DOM Manipulation', completed: false },
        { id: 'js-events', title: 'Event Handling', completed: false },
      ]
    },
    {
      title: 'Advanced Topics',
      sections: [
        { id: 'responsive', title: 'Responsive Design', completed: false },
        { id: 'frameworks', title: 'CSS Frameworks', completed: false },
        { id: 'deployment', title: 'Deployment', completed: false },
      ]
    }
  ],
  'generative-ai': [
    {
      title: 'AI Fundamentals',
      sections: [
        { id: 'ai-intro', title: 'What is AI?', completed: false },
        { id: 'machine-learning', title: 'Machine Learning Basics', completed: false },
        { id: 'neural-networks', title: 'Neural Networks', completed: false },
      ]
    },
    {
      title: 'Generative Models',
      sections: [
        { id: 'gpt-models', title: 'GPT & Language Models', completed: false },
        { id: 'image-generation', title: 'Image Generation', completed: false },
        { id: 'multimodal-ai', title: 'Multimodal AI', completed: false },
      ]
    },
    {
      title: 'Practical Applications',
      sections: [
        { id: 'prompt-engineering', title: 'Prompt Engineering', completed: false },
        { id: 'ai-apis', title: 'Working with AI APIs', completed: false },
        { id: 'building-apps', title: 'Building AI Apps', completed: false },
      ]
    }
  ],
  'data-structures': [
    {
      title: 'Basic Concepts',
      sections: [
        { id: 'ds-intro', title: 'Introduction to Data Structures', completed: false },
        { id: 'complexity', title: 'Time & Space Complexity', completed: false },
        { id: 'arrays', title: 'Arrays & Lists', completed: false },
      ]
    },
    {
      title: 'Linear Structures',
      sections: [
        { id: 'stacks', title: 'Stacks', completed: false },
        { id: 'queues', title: 'Queues', completed: false },
        { id: 'linked-lists', title: 'Linked Lists', completed: false },
      ]
    },
    {
      title: 'Non-Linear Structures',
      sections: [
        { id: 'trees', title: 'Trees', completed: false },
        { id: 'graphs', title: 'Graphs', completed: false },
        { id: 'hash-tables', title: 'Hash Tables', completed: false },
      ]
    },
    {
      title: 'Algorithms',
      sections: [
        { id: 'sorting', title: 'Sorting Algorithms', completed: false },
        { id: 'searching', title: 'Searching Algorithms', completed: false },
        { id: 'dynamic-programming', title: 'Dynamic Programming', completed: false },
      ]
    }
  ],
  'blockchain': [
    {
      title: 'Blockchain Basics',
      sections: [
        { id: 'blockchain-intro', title: 'What is Blockchain?', completed: false },
        { id: 'cryptocurrency', title: 'Cryptocurrency Fundamentals', completed: false },
        { id: 'consensus', title: 'Consensus Mechanisms', completed: false },
      ]
    },
    {
      title: 'Smart Contracts',
      sections: [
        { id: 'solidity', title: 'Solidity Programming', completed: false },
        { id: 'ethereum', title: 'Ethereum Development', completed: false },
        { id: 'dapps', title: 'Decentralized Apps', completed: false },
      ]
    },
    {
      title: 'Advanced Topics',
      sections: [
        { id: 'defi', title: 'DeFi Protocols', completed: false },
        { id: 'nfts', title: 'NFTs & Digital Assets', completed: false },
        { id: 'web3', title: 'Web3 Integration', completed: false },
      ]
    }
  ]
};

export const Sidebar = ({ activeSection, onSectionChange, isOpen, onClose, courseId }: SidebarProps) => {
  const currentCourseData = courseData[courseId] || courseData['web-development'];
  
  const totalSections = currentCourseData.reduce((acc: number, module: any) => acc + module.sections.length, 0);
  const completedSections = currentCourseData.reduce((acc: number, module: any) => 
    acc + module.sections.filter((section: any) => section.completed).length, 0
  );
  const progressPercentage = (completedSections / totalSections) * 100;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between p-4 border-b lg:hidden">
            <h2 className="font-semibold text-gray-900">Course Content</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress section */}
          <div className="p-4 border-b bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-green-600">
                  {completedSections}/{totalSections}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-gray-500">
                {Math.round(progressPercentage)}% Complete
              </p>
            </div>
          </div>

          {/* Course content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {currentCourseData.map((module: any, moduleIndex: number) => (
                <div key={moduleIndex} className="mb-4">
                  <h3 className="px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-100 rounded-md mb-2">
                    {module.title}
                  </h3>
                  <div className="space-y-1">
                    {module.sections.map((section: any) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          onSectionChange(section.id);
                          onClose();
                        }}
                        className={cn(
                          "w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors text-left",
                          activeSection === section.id
                            ? "bg-green-100 text-green-800 border-r-2 border-green-600"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        {section.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        )}
                        <span className="flex-1">{section.title}</span>
                        <ChevronRight className="h-3 w-3 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

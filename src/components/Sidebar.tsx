
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
}

const courseData = [
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
];

export const Sidebar = ({ activeSection, onSectionChange, isOpen, onClose }: SidebarProps) => {
  const totalSections = courseData.reduce((acc, module) => acc + module.sections.length, 0);
  const completedSections = courseData.reduce((acc, module) => 
    acc + module.sections.filter(section => section.completed).length, 0
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
              {courseData.map((module, moduleIndex) => (
                <div key={moduleIndex} className="mb-4">
                  <h3 className="px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-100 rounded-md mb-2">
                    {module.title}
                  </h3>
                  <div className="space-y-1">
                    {module.sections.map((section) => (
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

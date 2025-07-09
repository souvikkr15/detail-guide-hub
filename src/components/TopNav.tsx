import React, { useState } from 'react';
import { Menu, BookOpen, ChevronDown, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle';

interface TopNavProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

const courses = [
  { id: 'web-development', title: 'Web Development' },
  { id: 'generative-ai', title: 'Generative AI' },
  { id: 'data-structures', title: 'Data Structures & Algorithms' },
  { id: 'blockchain', title: 'Blockchain Development' },
  { id: 'compiler', title: 'Code Compiler' }
];

export const TopNav = ({ onMenuClick, sidebarOpen }: TopNavProps) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCourseSelect = (courseId: string) => {
    if (courseId === 'compiler') {
      navigate('/compiler');
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  return (
    <nav className="bg-background border-b border-border px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
            <div className="bg-green-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">LearnHub</h1>
              <p className="text-xs text-muted-foreground">Master Technology Skills</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/compiler')}
            className="flex items-center space-x-2"
          >
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">IDE</span>
          </Button>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <span>Courses</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border border-border shadow-lg">
              {courses.map((course) => (
                <DropdownMenuItem
                  key={course.id}
                  onClick={() => handleCourseSelect(course.id)}
                  className="cursor-pointer hover:bg-accent p-3"
                >
                  {course.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

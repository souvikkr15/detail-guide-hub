
import React, { useState } from 'react';
import { Menu, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface TopNavProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export const TopNav = ({ onMenuClick, sidebarOpen }: TopNavProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search results or filter content
      console.log('Searching for:', searchTerm);
      // You can implement search functionality here
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
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
              <h1 className="text-xl font-bold text-gray-900">LearnHub</h1>
              <p className="text-xs text-gray-500">Master Technology Skills</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search tutorials, courses, topics..."
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

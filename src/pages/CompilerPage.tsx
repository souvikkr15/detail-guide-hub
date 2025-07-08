import React, { useState } from 'react';
import { TopNav } from '@/components/TopNav';
import { CodeCompiler } from '@/components/CodeCompiler';

const CompilerPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <TopNav 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <main className="p-6">
        <CodeCompiler />
      </main>
    </div>
  );
};

export default CompilerPage;
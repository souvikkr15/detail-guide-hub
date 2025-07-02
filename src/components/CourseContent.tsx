
import React, { useState } from 'react';
import { BookOpen, Play, Code, CheckCircle, ArrowRight, ArrowLeft, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface CourseContentProps {
  activeSection: string;
}

const contentData: Record<string, any> = {
  introduction: {
    title: 'Welcome to Web Development',
    description: 'Learn the fundamentals of modern web development from scratch.',
    content: {
      overview: `Web development is the process of creating websites and web applications. In this comprehensive course, you'll learn HTML, CSS, and JavaScript - the three core technologies that power the modern web.`,
      objectives: [
        'Understand the structure of web pages using HTML',
        'Style websites with CSS for beautiful designs',
        'Add interactivity with JavaScript',
        'Build responsive websites that work on all devices',
        'Deploy your projects to the web'
      ],
      prerequisites: [
        'Basic computer skills',
        'Text editor (we recommend VS Code)',
        'Web browser (Chrome, Firefox, or Safari)',
        'Enthusiasm to learn!'
      ]
    },
    codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to web development!</p>
</body>
</html>`,
    nextSection: 'setup'
  },
  setup: {
    title: 'Setting Up Your Development Environment',
    description: 'Get your computer ready for web development with the right tools.',
    content: {
      overview: `Before we start coding, we need to set up a proper development environment. This includes installing a code editor, setting up a browser for testing, and understanding the basic file structure.`,
      steps: [
        'Download and install Visual Studio Code',
        'Install useful VS Code extensions',
        'Set up a project folder structure',
        'Configure your browser developer tools',
        'Create your first HTML file'
      ],
      tools: [
        { name: 'Visual Studio Code', description: 'Free, powerful code editor with great web development features' },
        { name: 'Live Server Extension', description: 'Automatically refreshes your webpage when you save changes' },
        { name: 'Chrome DevTools', description: 'Built-in browser tools for debugging and testing' }
      ]
    },
    codeExample: `// VS Code Extensions to install:
// 1. Live Server
// 2. HTML CSS Support
// 3. Auto Rename Tag
// 4. Bracket Pair Colorizer

// Basic project structure:
my-website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/`,
    nextSection: 'basics'
  },
  basics: {
    title: 'HTML Basics - The Structure of Web Pages',
    description: 'Learn HTML elements, tags, and how to structure content on web pages.',
    content: {
      overview: `HTML (HyperText Markup Language) is the backbone of all web pages. It provides the structure and meaning to web content through elements and tags. Every website you visit is built with HTML.`,
      concepts: [
        'HTML elements and tags',
        'Document structure (head and body)',
        'Headings and paragraphs',
        'Links and images',
        'Lists and tables'
      ],
      bestPractices: [
        'Always use semantic HTML elements',
        'Include proper DOCTYPE declaration',
        'Add alt text to images for accessibility',
        'Use heading hierarchy properly (h1, h2, h3...)',
        'Validate your HTML code'
      ]
    },
    codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Basics Example</title>
</head>
<body>
    <header>
        <h1>My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Welcome to My Website</h2>
            <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
            <img src="image.jpg" alt="Description of image">
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</body>
</html>`,
    nextSection: 'html-elements'
  }
};

export const CourseContent = ({ activeSection }: CourseContentProps) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const { toast } = useToast();
  
  const content = contentData[activeSection] || contentData.introduction;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(content.codeExample);
      setCopiedCode(true);
      toast({
        title: "Code copied!",
        description: "The code has been copied to your clipboard.",
      });
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy code to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="h-6 w-6 text-green-600" />
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Chapter {activeSection === 'introduction' ? '1' : '2'}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
        <p className="text-lg text-gray-600">{content.description}</p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <Tabs defaultValue="learn" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>
          
          <TabsContent value="learn" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="h-5 w-5 text-green-600" />
                  <span>Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{content.content.overview}</p>
              </CardContent>
            </Card>

            {content.content.objectives && (
              <Card>
                <CardHeader>
                  <CardTitle>Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {content.content.objectives.map((objective: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {content.content.steps && (
              <Card>
                <CardHeader>
                  <CardTitle>Setup Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {content.content.steps.map((step: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}

            {content.content.concepts && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {content.content.concepts.map((concept: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{concept}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Exercise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Practice Challenge</h4>
                  <p className="text-yellow-700">
                    Try modifying the code example below. Add your own content and see how it changes the output!
                  </p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Practice Area</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyCode}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedCode ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{content.codeExample}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-green-600" />
                  <span>Code Example</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">HTML Example</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyCode}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedCode ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{content.codeExample}</code>
                  </pre>
                </div>
                
                {content.content.bestPractices && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Best Practices</h4>
                    <div className="space-y-2">
                      {content.content.bestPractices.map((practice: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{practice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Button variant="outline" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Up Next</p>
            <p className="font-medium text-gray-900">Environment Setup</p>
          </div>
          
          <Button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

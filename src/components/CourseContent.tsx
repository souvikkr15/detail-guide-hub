
import React, { useState } from 'react';
import { BookOpen, Play, Code, CheckCircle, ArrowRight, ArrowLeft, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface CourseContentProps {
  activeSection: string;
  courseId: string;
}

const contentData: Record<string, Record<string, any>> = {
  'web-development': {
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
</html>`
    }
  },
  'generative-ai': {
    'ai-intro': {
      title: 'Introduction to Generative AI',
      description: 'Understand the fundamentals of artificial intelligence and generative models.',
      content: {
        overview: `Generative AI represents a revolutionary approach to artificial intelligence that can create new content, from text and images to code and music. This course will guide you through the exciting world of AI technologies.`,
        objectives: [
          'Understand the basics of artificial intelligence',
          'Learn about different types of generative models',
          'Explore real-world applications of AI',
          'Build your first AI-powered application',
          'Master prompt engineering techniques'
        ]
      },
      codeExample: `import openai

# Initialize OpenAI client
client = openai.OpenAI(api_key="your-api-key")

# Generate text with GPT
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "Explain machine learning in simple terms"}
    ]
)

print(response.choices[0].message.content)`
    }
  },
  'data-structures': {
    'ds-intro': {
      title: 'Introduction to Data Structures',
      description: 'Learn the fundamental building blocks of efficient programming.',
      content: {
        overview: `Data structures are the foundation of computer science and programming. They provide efficient ways to organize, store, and manipulate data. Understanding data structures is crucial for writing efficient algorithms and solving complex problems.`,
        objectives: [
          'Understand different types of data structures',
          'Learn when to use each data structure',
          'Analyze time and space complexity',
          'Implement common data structures',
          'Solve algorithmic problems efficiently'
        ]
      },
      codeExample: `class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None
    
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):
        return len(self.items) == 0

# Usage
stack = Stack()
stack.push(1)
stack.push(2)
print(stack.pop())  # Output: 2`
    }
  },
  'blockchain': {
    'blockchain-intro': {
      title: 'Introduction to Blockchain Technology',
      description: 'Discover the revolutionary technology behind cryptocurrencies and Web3.',
      content: {
        overview: `Blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography. This technology forms the backbone of cryptocurrencies and decentralized applications.`,
        objectives: [
          'Understand blockchain fundamentals',
          'Learn about cryptocurrency and digital assets',
          'Explore smart contracts and DApps',
          'Build blockchain applications',
          'Understand Web3 and decentralized finance'
        ]
      },
      codeExample: `pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    
    event DataStored(uint256 indexed value, address indexed sender);
    
    function set(uint256 x) public {
        storedData = x;
        emit DataStored(x, msg.sender);
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
    
    function increment() public {
        storedData += 1;
        emit DataStored(storedData, msg.sender);
    }
}`
    }
  }
};

export const CourseContent = ({ activeSection, courseId }: CourseContentProps) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const { toast } = useToast();
  
  const courseContent = contentData[courseId] || contentData['web-development'];
  const content = courseContent[activeSection] || courseContent[Object.keys(courseContent)[0]];

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
            {courseId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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
                    <span className="text-gray-400 text-sm">Code Example</span>
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
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Button variant="outline" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Continue Learning</p>
            <p className="font-medium text-gray-900">Next Topic</p>
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

import React, { useState } from 'react';
import { Play, Copy, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const languages = [
  { value: 'python', label: 'Python', example: 'print("Hello, World!")' },
  { value: 'javascript', label: 'JavaScript', example: 'console.log("Hello, World!");' },
  { value: 'java', label: 'Java', example: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
  { value: 'cpp', label: 'C++', example: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}' },
  { value: 'c', label: 'C', example: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' }
];

export const CodeCompiler = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState(languages[0].example);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    const selectedLang = languages.find(lang => lang.value === language);
    setCode(selectedLang?.example || '');
    setOutput('');
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');

    // Simulate code execution (in a real app, you'd call a backend API)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock different outputs based on language
      const mockOutputs = {
        python: 'Hello, World!\n',
        javascript: 'Hello, World!\n',
        java: 'Hello, World!\n',
        cpp: 'Hello, World!\n',
        c: 'Hello, World!\n'
      };

      if (code.includes('error') || code.includes('Error')) {
        setOutput('Error: Compilation failed\nLine 1: Syntax error');
      } else {
        setOutput(mockOutputs[selectedLanguage as keyof typeof mockOutputs] || 'Output will appear here...');
      }

      toast({
        title: "Code executed",
        description: "Your code has been compiled and executed successfully.",
      });
    } catch (error) {
      setOutput('Error: Failed to execute code');
      toast({
        title: "Execution failed",
        description: "There was an error executing your code.",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy code to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadCode = () => {
    const extensions = { python: '.py', javascript: '.js', java: '.java', cpp: '.cpp', c: '.c' };
    const filename = `code${extensions[selectedLanguage as keyof typeof extensions]}`;
    
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Downloaded!",
      description: `Code saved as ${filename}`,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Code Compiler</h2>
        <div className="flex items-center space-x-2">
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Code Editor</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={copyCode}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={downloadCode}>
                <Download className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleRunCode} 
                disabled={isRunning}
                className="bg-green-600 hover:bg-green-700"
              >
                {isRunning ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isRunning ? 'Running...' : 'Run'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              className="min-h-[400px] font-mono text-sm bg-muted"
              style={{ resize: 'vertical' }}
            />
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[400px] bg-muted rounded-md p-4">
              <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                {output || 'Output will appear here when you run your code...'}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This is a demo compiler. In a production environment, 
            code would be executed on a secure backend server. Currently showing mock results 
            for demonstration purposes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
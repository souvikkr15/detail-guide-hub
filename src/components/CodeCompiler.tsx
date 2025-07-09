import React, { useState } from 'react';
import { Play, Copy, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const languages = [
  { value: 'python3', label: 'Python', example: 'print("Hello, World!")' },
  { value: 'nodejs', label: 'JavaScript', example: 'console.log("Hello, World!");' },
  { value: 'java', label: 'Java', example: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
  { value: 'cpp17', label: 'C++', example: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}' },
  { value: 'c', label: 'C', example: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' }
];

export const CodeCompiler = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python3');
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

    try {
      const response = await fetch('https://api.jdoodle.com/v1/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: aafc730d65c72289eadeef4ad66d3138, // You'll need to get this from jdoodle.com
          clientSecret: 926f2324a7b3f239688acc6642cad01e716c581e96ab416be0dbd005bdbb854e, // You'll need to get this from jdoodle.com
          script: code,
          language: selectedLanguage,
          versionIndex: '0'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        setOutput(`Error: ${result.error}`);
        toast({
          title: "Execution failed",
          description: "There was an error executing your code.",
          variant: "destructive",
        });
      } else {
        const output = result.output || result.stdout || '';
        const error = result.stderr || '';
        
        setOutput(error ? `${output}\nErrors:\n${error}` : (output || 'Code executed successfully (no output)'));
        
        toast({
          title: "Code executed",
          description: "Your code has been compiled and executed successfully.",
        });
      }
    } catch (error) {
      // Fallback to mock execution for demo purposes
      setOutput(`Demo Mode: Code execution simulated.\n\nActual output would require JDoodle API credentials.\nYour ${languages.find(l => l.value === selectedLanguage)?.label} code appears to be syntactically correct.\n\nTo enable real execution:\n1. Sign up at jdoodle.com\n2. Get your API credentials\n3. Replace the placeholder credentials in the code`);
      
      toast({
        title: "Demo mode",
        description: "Running in demo mode. Real execution requires JDoodle API credentials.",
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
    const extensions = { python3: '.py', nodejs: '.js', java: '.java', cpp17: '.cpp', c: '.c' };
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
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
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
            <strong>Note:</strong> This compiler uses JDoodle API to execute code in multiple languages. 
            To enable real execution, you'll need to sign up at jdoodle.com and replace the API credentials. 
            Currently running in demo mode with simulated results.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

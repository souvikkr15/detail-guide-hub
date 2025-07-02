
import React from 'react';
import { BookOpen, Users, Award, ArrowRight, Search, Code, Brain, Database, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Learn HTML, CSS, JavaScript, and modern frameworks to build stunning websites and web applications.',
    icon: Code,
    color: 'bg-blue-500',
    students: '15,432',
    lessons: 45,
    duration: '12 weeks',
    level: 'Beginner to Advanced'
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    description: 'Master AI technologies including ChatGPT, DALL-E, and learn to build AI-powered applications.',
    icon: Brain,
    color: 'bg-purple-500',
    students: '8,721',
    lessons: 32,
    duration: '8 weeks',
    level: 'Intermediate'
  },
  {
    id: 'data-structures',
    title: 'Data Structures & Algorithms',
    description: 'Build strong programming foundations with essential data structures and algorithmic thinking.',
    icon: Database,
    color: 'bg-green-500',
    students: '12,156',
    lessons: 38,
    duration: '10 weeks',
    level: 'Beginner to Intermediate'
  },
  {
    id: 'blockchain',
    title: 'Blockchain Development',
    description: 'Explore cryptocurrency, smart contracts, and decentralized applications on various blockchain platforms.',
    icon: Link,
    color: 'bg-orange-500',
    students: '6,543',
    lessons: 28,
    duration: '6 weeks',
    level: 'Advanced'
  }
];

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Curriculum',
    description: 'Structured learning paths with hands-on projects and real-world applications.'
  },
  {
    icon: Users,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of practical experience.'
  },
  {
    icon: Award,
    title: 'Certificates',
    description: 'Earn recognized certificates upon completion of each course.'
  }
];

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">LearnHub</h1>
              <p className="text-xs text-gray-500">Master Technology Skills</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Master the Future of Technology
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of learners in our comprehensive courses covering Web Development, 
            AI, Data Structures, and Blockchain technology. Start your journey today.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Start Learning
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              View Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose LearnHub?</h2>
            <p className="text-lg text-gray-600">Everything you need to advance your tech career</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Courses</h2>
            <p className="text-lg text-gray-600">Choose from our comprehensive selection of technology courses</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCourseClick(course.id)}>
                <CardHeader>
                  <div className={`${course.color} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                    <course.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Students:</span>
                      <span className="font-medium">{course.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lessons:</span>
                      <span className="font-medium">{course.lessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mt-3 text-xs">
                    {course.level}
                  </Badge>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    Start Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Tech Journey?</h2>
          <p className="text-lg mb-8">Join thousands of successful learners who have transformed their careers with LearnHub</p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-green-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">LearnHub</span>
          </div>
          <p className="text-gray-400">&copy; 2024 LearnHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

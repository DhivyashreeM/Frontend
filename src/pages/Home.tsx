import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Upload, FileText, Shield } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const Home: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive biodiversity analysis with statistical insights and trend detection.',
    },
    {
      icon: Upload,
      title: 'Easy Data Upload',
      description: 'Support for multiple file formats including CSV, Excel, and JSON datasets.',
    },
    {
      icon: FileText,
      title: 'Detailed Reports',
      description: 'Generate comprehensive reports with visualizations and actionable insights.',
    },
    {
      icon: Shield,
      title: 'Secure Processing',
      description: 'Your data is processed securely with enterprise-grade encryption.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Advanced Biodiversity
          <span className="text-primary-600"> Analysis</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform your ecological data into actionable insights with our powerful 
          biodiversity analysis platform. Upload, analyze, and visualize species data with ease.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/upload">
            <Button size="lg" icon={Upload}>
              Start Analysis
            </Button>
          </Link>
          <Button variant="outline" size="lg" icon={FileText}>
            View Documentation
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
            <div className="text-gray-600">Species Analyzed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">99.9%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">2min</div>
            <div className="text-gray-600">Average Processing</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-600">Platform Availability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

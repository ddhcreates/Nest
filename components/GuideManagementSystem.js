"use client";

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, BookOpen, Clock, Tag, List, ChevronRight, ArrowLeft, Save, X } from 'lucide-react';

const GuideManagementSystem = () => {
  const [guides, setGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit', 'view'
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    thingsNeeded: '',
    estimatedTime: '',
    difficulty: 'beginner',
    steps: '',
    tips: '',
    troubleshooting: ''
  });

  // Initialize with sample data
  useEffect(() => {
    const sampleGuides = [
      {
        id: 1,
        title: "Setting up Google Workspace for Schools",
        description: "Complete guide to implementing Google Workspace in your educational institution with student safety protocols.",
        category: "Digital Tools",
        tags: ["google", "workspace", "email", "collaboration", "safety"],
        thingsNeeded: "Admin access to school domain, List of all staff and students, School email policy document",
        estimatedTime: "2-3 hours",
        difficulty: "intermediate",
        steps: `1. **Domain Verification**
   - Sign up for Google Workspace for Education
   - Verify your school domain ownership
   - Set up billing information (if applicable)

2. **User Management Setup**
   - Create organizational units for different grades/departments
   - Set up user groups (Teachers, Students, Admin)
   - Configure password policies and security settings

3. **Safety and Privacy Configuration**
   - Enable safe search and content filtering
   - Set up data retention policies
   - Configure sharing permissions and external access

4. **Application Deployment**
   - Enable/disable specific Google apps based on age groups
   - Set up Classroom integration
   - Configure Google Drive storage limits

5. **Training and Rollout**
   - Create user accounts and send welcome emails
   - Schedule training sessions for staff
   - Provide student orientation materials`,
        tips: "Start with a pilot group of tech-savvy teachers before full rollout. Always backup existing email data before migration.",
        troubleshooting: "If domain verification fails, check DNS settings with your hosting provider. For login issues, verify user permissions in the admin console.",
        createdAt: "2025-01-15",
        views: 245
      },
      {
        id: 2,
        title: "Safe Student Data Management",
        description: "Best practices for collecting, storing, and protecting student information in compliance with privacy regulations.",
        category: "Data Security",
        tags: ["privacy", "data protection", "student records", "compliance", "security"],
        thingsNeeded: "Current data storage audit, Privacy policy template, Staff training materials",
        estimatedTime: "4-6 hours",
        difficulty: "advanced",
        steps: `1. **Data Audit and Classification**
   - Identify all student data collection points
   - Classify data by sensitivity level
   - Document current storage locations and access methods

2. **Privacy Policy Development**
   - Create comprehensive privacy notice for parents
   - Define data retention periods
   - Establish data subject rights procedures

3. **Technical Implementation**
   - Implement encryption for sensitive data
   - Set up access controls and user permissions
   - Configure automated backup systems

4. **Staff Training Program**
   - Conduct privacy awareness sessions
   - Create data handling procedures manual
   - Establish incident response protocols

5. **Ongoing Compliance**
   - Schedule regular privacy audits
   - Monitor data access logs
   - Update policies as regulations change`,
        tips: "Document everything! Keep detailed records of what data you collect, why you need it, and how long you keep it.",
        troubleshooting: "For compliance questions, consult with legal counsel. If data breach occurs, follow incident response plan immediately.",
        createdAt: "2025-01-10",
        views: 189
      },
      {
        id: 3,
        title: "Canva for Educational Projects",
        description: "Step-by-step guide to using Canva for creating engaging educational materials, presentations, and student projects.",
        category: "Creative Tools",
        tags: ["canva", "design", "presentations", "projects", "creativity"],
        thingsNeeded: "Canva for Education account, Project requirements list, Brand guidelines (school colors/logos)",
        estimatedTime: "1-2 hours",
        difficulty: "beginner",
        steps: `1. **Account Setup**
   - Sign up for Canva for Education (free for teachers)
   - Verify your educator status
   - Explore the education-specific templates

2. **Creating Your First Design**
   - Choose appropriate template for your project
   - Customize colors to match school branding
   - Add school logo and contact information

3. **Content Creation Best Practices**
   - Use high-quality, royalty-free images
   - Maintain consistent font choices
   - Ensure text is readable and accessible

4. **Collaboration Features**
   - Share designs with colleagues for feedback
   - Set up team folders for department resources
   - Use comments for revision suggestions

5. **Export and Distribution**
   - Choose appropriate file format (PDF, PNG, etc.)
   - Optimize for intended use (print vs digital)
   - Save master templates for future use`,
        tips: "Create a brand kit with your school colors and fonts to maintain consistency across all materials.",
        troubleshooting: "If images appear blurry, ensure you're using high-resolution sources. For printing issues, export as PDF with high-quality settings.",
        createdAt: "2025-01-12",
        views: 156
      }
    ];
    setGuides(sampleGuides);
  }, []);

  const categories = ['all', ...new Set(guides.map(guide => guide.category))];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSave = () => {
    if (currentView === 'create') {
      const newGuide = {
        ...formData,
        id: Date.now(),
        tags: formData.tags.split(',').map(tag => tag.trim()),
        createdAt: new Date().toISOString().split('T')[0],
        views: 0
      };
      setGuides([...guides, newGuide]);
    } else if (currentView === 'edit') {
      setGuides(guides.map(guide => 
        guide.id === selectedGuide.id 
          ? { ...formData, id: selectedGuide.id, tags: formData.tags.split(',').map(tag => tag.trim()) }
          : guide
      ));
    }
    setCurrentView('list');
    setFormData({
      title: '',
      description: '',
      category: '',
      tags: '',
      thingsNeeded: '',
      estimatedTime: '',
      difficulty: 'beginner',
      steps: '',
      tips: '',
      troubleshooting: ''
    });
  };

  const handleEdit = (guide) => {
    setSelectedGuide(guide);
    setFormData({
      ...guide,
      tags: guide.tags.join(', ')
    });
    setCurrentView('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this guide?')) {
      setGuides(guides.filter(guide => guide.id !== id));
    }
  };

  const handleView = (guide) => {
    setSelectedGuide(guide);
    setGuides(guides.map(g => 
      g.id === guide.id ? { ...g, views: g.views + 1 } : g
    ));
    setCurrentView('view');
  };

  const renderSteps = (stepsText) => {
    return stepsText.split('\n\n').map((step, index) => {
      const lines = step.split('\n');
      const title = lines[0];
      const content = lines.slice(1);
      
      return (
        <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
          <div className="space-y-1">
            {content.map((line, i) => (
              <p key={i} className="text-gray-600 text-sm ml-4">{line}</p>
            ))}
          </div>
        </div>
      );
    });
  };

  if (currentView === 'create' || currentView === 'edit') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                {currentView === 'create' ? 'Create New Guide' : 'Edit Guide'}
              </h1>
              <button
                onClick={() => setCurrentView('list')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to List</span>
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter guide title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Digital Tools, Data Security"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-20"
                  placeholder="Brief description of what this guide covers"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time</label>
                  <input
                    type="text"
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., 2-3 hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="google, workspace, email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Things You'll Need</label>
                <textarea
                  value={formData.thingsNeeded}
                  onChange={(e) => setFormData({...formData, thingsNeeded: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-20"
                  placeholder="List the prerequisites, materials, or access needed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Steps</label>
                <textarea
                  value={formData.steps}
                  onChange={(e) => setFormData({...formData, steps: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-40"
                  placeholder="Write step-by-step instructions. Use numbers and clear formatting."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tips & Best Practices</label>
                  <textarea
                    value={formData.tips}
                    onChange={(e) => setFormData({...formData, tips: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-24"
                    placeholder="Helpful tips and best practices"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Troubleshooting</label>
                  <textarea
                    value={formData.troubleshooting}
                    onChange={(e) => setFormData({...formData, troubleshooting: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-24"
                    placeholder="Common issues and solutions"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  onClick={() => setCurrentView('list')}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{currentView === 'create' ? 'Create Guide' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'view') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setCurrentView('list')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Guides</span>
              </button>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{selectedGuide.views} views</span>
                <button
                  onClick={() => handleEdit(selectedGuide)}
                  className="flex items-center space-x-1 text-orange-600 hover:text-orange-800 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{selectedGuide.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{selectedGuide.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{selectedGuide.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedGuide.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    selectedGuide.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedGuide.difficulty}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Category:</span>
                  <span className="text-sm text-orange-600 font-medium">{selectedGuide.category}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedGuide.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {selectedGuide.thingsNeeded && (
              <div className="mb-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                  <List className="w-5 h-5 mr-2" />
                  Things You'll Need
                </h3>
                <p className="text-blue-800">{selectedGuide.thingsNeeded}</p>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Step-by-Step Instructions</h3>
              {renderSteps(selectedGuide.steps)}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {selectedGuide.tips && (
                <div className="p-6 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">💡 Tips & Best Practices</h4>
                  <p className="text-green-800 text-sm">{selectedGuide.tips}</p>
                </div>
              )}
              
              {selectedGuide.troubleshooting && (
                <div className="p-6 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-3">🔧 Troubleshooting</h4>
                  <p className="text-yellow-800 text-sm">{selectedGuide.troubleshooting}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Guide Management System</h1>
              <p className="text-gray-600">Create, manage, and share educational guides with your team</p>
            </div>
            <button
              onClick={() => setCurrentView('create')}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>New Guide</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search guides by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-48"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{guides.length}</div>
              <div className="text-sm text-gray-600">Total Guides</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{categories.length - 1}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{guides.reduce((sum, guide) => sum + guide.views, 0)}</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{filteredGuides.length}</div>
              <div className="text-sm text-gray-600">Filtered Results</div>
            </div>
          </div>

          {/* Guides List */}
          <div className="space-y-4">
            {filteredGuides.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">No guides found</h3>
                <p className="text-gray-400">Try adjusting your search or create a new guide</p>
              </div>
            ) : (
              filteredGuides.map((guide) => (
                <div key={guide.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-800">{guide.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          guide.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                          guide.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {guide.difficulty}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{guide.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Tag className="w-4 h-4" />
                          <span>{guide.category}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{guide.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{guide.views} views</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {guide.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                        {guide.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{guide.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleView(guide)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Guide"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(guide)}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Edit Guide"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(guide.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Guide"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideManagementSystem;
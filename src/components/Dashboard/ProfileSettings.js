'use client';
import { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  ArrowLeft, 
  Save, 
  Target, 
  Calendar, 
  Briefcase, 
  GraduationCap,
  Clock,
  User,
  Check
} from 'lucide-react';

export default function ProfileSettings({ user, userProfile, onClose }) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    major: userProfile?.major || '',
    year: userProfile?.year || '',
    careerGoals: userProfile?.careerGoals || [],
    targetCompanies: userProfile?.targetCompanies || [],
    availability: userProfile?.availability || ''
  });

  const majors = [
    'Computer Science', 'Computer Engineering', 'Business', 'Finance', 
    'Mechanical Engineering', 'Chemical Engineering', 'Data Science', 
    'Economics', 'Psychology', 'Marketing', 'Industrial Engineering', 'Other'
  ];

  const years = ['2025', '2026', '2027', '2028'];

  const careerGoals = [
    'Software Engineering', 'Product Management', 'Data Science',
    'Consulting', 'Investment Banking', 'Marketing', 'Sales',
    'UX/UI Design', 'Operations', 'Finance', 'Research', 'Other'
  ];

  const companies = [
    'Google', 'Microsoft', 'Apple', 'Amazon', 'Meta',
    'Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'Blackstone',
    'McKinsey & Company', 'Boston Consulting Group', 'Bain & Company',
    'Deloitte', 'PwC', 'EY', 'KPMG', 'Tesla', 'Uber', 'Airbnb', 'Other'
  ];

  const availabilityOptions = [
    'Weekday evenings (6-9 PM)',
    'Weekend mornings (9 AM-12 PM)', 
    'Weekend afternoons (1-5 PM)',
    'Flexible - any time works'
  ];

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      careerGoals: prev.careerGoals.includes(goal)
        ? prev.careerGoals.filter(g => g !== goal)
        : [...prev.careerGoals, goal]
    }));
  };

  const handleCompanyToggle = (company) => {
    setFormData(prev => ({
      ...prev,
      targetCompanies: prev.targetCompanies.includes(company)
        ? prev.targetCompanies.filter(c => c !== company)
        : [...prev.targetCompanies, company]
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccessMessage('');
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...formData,
        updatedAt: new Date()
      });
      
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={onClose}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
              <h1 className="text-xl font-bold text-indigo-600">Profile Settings</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {userProfile?.name || user?.email?.split('@')[0]}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <Check className="h-5 w-5 mr-2" />
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Academic Background */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg mr-3">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Academic Background</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Major
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {majors.map(major => (
                    <button
                      key={major}
                      onClick={() => setFormData(prev => ({ ...prev, major }))}
                      className={`p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 text-left ${
                        formData.major === major
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {major}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Graduation Year
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => setFormData(prev => ({ ...prev, year }))}
                      className={`p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                        formData.year === year
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Class of {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Career Interests */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg mr-3">
                <Target className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Career Interests</h2>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select roles that interest you ({formData.careerGoals.length} selected)
              </label>
              <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                {careerGoals.map(goal => (
                  <button
                    key={goal}
                    onClick={() => handleGoalToggle(goal)}
                    className={`p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 text-left ${
                      formData.careerGoals.includes(goal)
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Target Companies */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg mr-3">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Target Companies</h2>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Choose your dream companies ({formData.targetCompanies.length} selected)
              </label>
              <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                {companies.map(company => (
                  <button
                    key={company}
                    onClick={() => handleCompanyToggle(company)}
                    className={`p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 text-left ${
                      formData.targetCompanies.includes(company)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {company}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg mr-3">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Availability</h2>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                When can you meet with study partners?
              </label>
              <div className="space-y-2">
                {availabilityOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => setFormData(prev => ({ ...prev, availability: option }))}
                    className={`w-full p-3 text-left font-medium rounded-lg border-2 transition-all duration-200 ${
                      formData.availability === option
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex items-center px-8 py-4 rounded-xl font-bold text-white text-lg transition-all duration-200 transform ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:scale-105 shadow-lg'
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
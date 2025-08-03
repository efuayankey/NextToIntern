// src/components/Onboarding/Onboarding.js - PROFESSIONAL STARTUP ONBOARDING
'use client';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  Calendar, 
  Briefcase, 
  GraduationCap,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';

export default function Onboarding({ user }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    major: '',
    year: '',
    careerGoals: [],
    targetCompanies: [],
    availability: ''
  });

  const steps = [
    {
      id: 'academic',
      title: 'Academic Background',
      subtitle: 'Tell us about your studies at Lehigh',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'goals',
      title: 'Career Interests',
      subtitle: 'What type of roles interest you?',
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'companies',
      title: 'Target Companies',
      subtitle: 'Where would you like to intern?',
      icon: Briefcase,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'schedule',
      title: 'Availability',
      subtitle: 'When can you prep with peers?',
      icon: Clock,
      color: 'from-orange-500 to-orange-600'
    }
  ];

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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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

  const handleComplete = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...formData,
        onboardingComplete: true,
        points: 50, // Welcome bonus
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setLoading(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return formData.major && formData.year;
      case 1: return formData.careerGoals.length > 0;
      case 2: return formData.targetCompanies.length > 0;
      case 3: return formData.availability;
      default: return false;
    }
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen gradient-purple flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white p-3 rounded-2xl shadow-lg">
              <Sparkles className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-white ml-4">Setup Your Profile</h1>
          </div>
          
          {/* Progress Bar */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-white text-indigo-600 shadow-lg' 
                      : 'bg-white/20 text-white/60'
                  }`}>
                    {index < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                      index < currentStep ? 'bg-white' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/80 text-lg">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Main Card */}
        <div className="glass rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          {/* Step Header */}
          <div className="text-center mb-8">
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${currentStepData.color} mb-4`}>
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStepData.title}</h2>
            <p className="text-gray-600">{currentStepData.subtitle}</p>
          </div>

          {/* Step Content */}
          <div className="min-h-[300px] flex flex-col justify-center">
            {/* Step 0: Academic Background */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    What's your major?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {majors.map(major => (
                      <button
                        key={major}
                        onClick={() => setFormData(prev => ({ ...prev, major }))}
                        className={`p-4 text-sm font-medium rounded-xl border-2 transition-all duration-200 ${
                          formData.major === major
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
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
                    Graduation year?
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {years.map(year => (
                      <button
                        key={year}
                        onClick={() => setFormData(prev => ({ ...prev, year }))}
                        className={`p-4 text-sm font-medium rounded-xl border-2 transition-all duration-200 ${
                          formData.year === year
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Class of {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Career Goals */}
            {currentStep === 1 && (
              <div>
                <p className="text-center text-gray-600 mb-6">Select all that interest you</p>
                <div className="grid grid-cols-2 gap-3">
                  {careerGoals.map(goal => (
                    <button
                      key={goal}
                      onClick={() => handleGoalToggle(goal)}
                      className={`p-4 text-sm font-medium rounded-xl border-2 transition-all duration-200 ${
                        formData.careerGoals.includes(goal)
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Selected: {formData.careerGoals.length} {formData.careerGoals.length === 1 ? 'role' : 'roles'}
                </p>
              </div>
            )}

            {/* Step 2: Target Companies */}
            {currentStep === 2 && (
              <div>
                <p className="text-center text-gray-600 mb-6">Choose your dream companies</p>
                <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  {companies.map(company => (
                    <button
                      key={company}
                      onClick={() => handleCompanyToggle(company)}
                      className={`p-4 text-sm font-medium rounded-xl border-2 transition-all duration-200 ${
                        formData.targetCompanies.includes(company)
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {company}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Selected: {formData.targetCompanies.length} {formData.targetCompanies.length === 1 ? 'company' : 'companies'}
                </p>
              </div>
            )}

            {/* Step 3: Availability */}
            {currentStep === 3 && (
              <div>
                <p className="text-center text-gray-600 mb-6">When can you meet with study partners?</p>
                <div className="space-y-3">
                  {availabilityOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => setFormData(prev => ({ ...prev, availability: option }))}
                      className={`w-full p-4 text-left font-medium rounded-xl border-2 transition-all duration-200 ${
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
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous
            </button>

            <div className="text-sm text-gray-500">
              {currentStep + 1} / {steps.length}
            </div>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleComplete}
                disabled={!isStepValid() || loading}
                className={`flex items-center px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 ${
                  !isStepValid() || loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 shadow-lg'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Setting up...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <Sparkles className="h-5 w-5 ml-2" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  !isStepValid()
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105 shadow-lg'
                }`}
              >
                Continue
                <ChevronRight className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
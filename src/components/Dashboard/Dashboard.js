// src/components/Dashboard/Dashboard.js - PROFESSIONAL DESIGN
'use client';
import { useState, useRef, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { 
  Settings, 
  LogOut, 
  User, 
  Users, 
  Briefcase, 
  Trophy, 
  ChevronDown,
  Star,
  TrendingUp,
  MessageSquare,
  GraduationCap,
  Calendar
} from 'lucide-react';
import ProfileSettings from './ProfileSettings';

export default function Dashboard({ user, userProfile }) {
  const [showSettings, setShowSettings] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (userProfile?.name) {
      return userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  // Get user display name
  const getUserDisplayName = () => {
    return userProfile?.name || user?.email?.split('@')[0] || 'User';
  };

  // If showing settings, render the settings component
  if (showSettings) {
    return (
      <ProfileSettings 
        user={user} 
        userProfile={userProfile} 
        onClose={() => setShowSettings(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">NextToIntern</h1>
              <span className="ml-2 px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full">
                Lehigh University
              </span>
            </div>
            
            {/* Right Side - Points & Profile */}
            <div className="flex items-center space-x-4">
              {/* Points Badge */}
              <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-full border border-yellow-200">
                <Star className="h-4 w-4 text-yellow-600 mr-2" />
                <span className="text-yellow-800 font-semibold text-sm">
                  {userProfile?.points || 0} points
                </span>
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getUserInitials()}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-500">{userProfile?.major || 'Student'}</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                      <div className="flex items-center mt-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 w-2 rounded-full mr-2"></div>
                        <span className="text-xs text-gray-500">{userProfile?.level || 'Member'}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setShowSettings(true);
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Profile Settings
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {getUserDisplayName().split(' ')[0]}!
          </h1>
          <p className="text-gray-600">Ready to advance your internship journey?</p>
        </div>

        {/* Profile Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <User className="h-6 w-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Your Profile</h2>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center"
            >
              Edit Profile
              <Settings className="h-4 w-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Major</p>
              <p className="font-semibold text-gray-900">{userProfile?.major || 'Not set'}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Class Year</p>
              <p className="font-semibold text-gray-900">{userProfile?.year || 'Not set'}</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Career Goals</p>
              <p className="font-semibold text-gray-900">
                {userProfile?.careerGoals?.length || 0} selected
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Briefcase className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Target Companies</p>
              <p className="font-semibold text-gray-900">
                {userProfile?.targetCompanies?.length || 0} selected
              </p>
            </div>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Find Study Partners</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Connect with fellow Lehigh students for interview preparation and study sessions.</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Coming Soon →
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Share Opportunities</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Post and discover internship openings shared by your Lehigh community.</p>
            <button className="text-green-600 hover:text-green-700 font-medium text-sm">
              Coming Soon →
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Earn Rewards</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Get rewarded for helping the community and achieving your goals.</p>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              Coming Soon →
            </button>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
          <div className="flex items-center">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
              <MessageSquare className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-indigo-900 mb-1">Platform Status: Active</h3>
              <p className="text-indigo-700 text-sm">All systems operational. New features launching soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
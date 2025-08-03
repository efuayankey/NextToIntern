// src/components/Auth/LoginForm.js - BEAUTIFUL MODERN DESIGN
'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { GraduationCap, Mail, Lock, Users, Sparkles, Zap, Target } from 'lucide-react';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Validate Lehigh email
  const isLehighEmail = (email) => {
    return email.toLowerCase().endsWith('@lehigh.edu');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate Lehigh email for registration
    if (!isLogin && !isLehighEmail(email)) {
      setError('Please use your @lehigh.edu email address');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Sign in existing user
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Create new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Create user profile in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: name,
          email: email,
          points: 0,
          level: 'Freshman',
          createdAt: new Date(),
          isLehighStudent: true,
          onboardingComplete: false
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white opacity-10 rounded-full animate-bounce"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Card */}
        <div 
          className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg border border-white/20"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  NextToIntern
                </h1>
              </div>
            </div>
            <p className="text-gray-600 font-medium">Connect. Prepare. Succeed.</p>
            <div className="flex items-center justify-center mt-2">
              <Sparkles className="h-4 w-4 text-indigo-500 mr-1" />
              <p className="text-sm text-indigo-600 font-semibold">For Lehigh University Students</p>
              <Sparkles className="h-4 w-4 text-indigo-500 ml-1" />
            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isLogin 
                  ? 'bg-white text-indigo-600 shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                !isLogin 
                  ? 'bg-white text-indigo-600 shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="transform transition-all duration-500">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Users className="h-5 w-5 text-indigo-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 text-gray-800 font-medium"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lehigh Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Mail className="h-5 w-5 text-indigo-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 text-gray-800 font-medium"
                  placeholder="yourname@lehigh.edu"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="h-5 w-5 text-indigo-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 text-gray-800 font-medium"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm font-medium animate-pulse">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  {error}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-white text-lg transition-all duration-300 transform ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Target className="h-5 w-5 mr-2" />
                  {isLogin ? 'Sign In' : 'Create Account'}
                </div>
              )}
            </button>
          </form>

          {/* Features Preview */}
          <div className="mt-8 text-center">
            <p className="text-sm font-semibold text-gray-600 mb-4">Join your Lehigh peers to:</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg">🤝</span>
                </div>
                <p className="text-xs font-semibold text-gray-600">Find Partners</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-400 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg">💼</span>
                </div>
                <p className="text-xs font-semibold text-gray-600">Share Jobs</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg">🏆</span>
                </div>
                <p className="text-xs font-semibold text-gray-600">Earn Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
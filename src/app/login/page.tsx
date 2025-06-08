"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = () => {
    setIsLoading(true);
    
    // This is a simulated login flow
    // In a real app, you would use NextAuth.js or similar for GitHub OAuth
    setTimeout(() => {
      // Mock successful login
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8E1] to-[#FFECB3] dark:from-gray-900 dark:to-gray-800">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-[#FFF8E1]/80 dark:bg-gray-800/80 rounded-xl shadow-lg backdrop-blur-sm border border-[#FFECB3]/40 dark:border-gray-700/30"
      >
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#f28500]/20 flex items-center justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-8 h-8 text-[#f28500]"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-[#f28500] mb-2 text-center">Welcome to Maestro</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">Login to access your repository dashboard</p>
        
        <button
          onClick={handleGithubLogin}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-[#f28500] hover:bg-orange-600 text-white rounded-lg shadow-md flex items-center justify-center transition-all duration-200 disabled:opacity-70"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <svg 
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-3" 
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          )}
          {isLoading ? "Logging in..." : "Login with GitHub"}
        </button>
        
        <p className="text-xs text-center mt-6 text-gray-500 dark:text-gray-400">
          This is a demo application. Your actual GitHub account won't be connected.
        </p>
      </motion.div>
    </div>
  );
}

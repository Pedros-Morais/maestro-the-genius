"use client";

import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface RepoCardProps {
  repo: {
    id: string;
    name: string;
    description: string;
    stars: number;
    forks: number;
    issues?: number;
    updatedAt: string;
    language: string;
    owner: string;
    connected: boolean;
  };
  onClick: () => void;
  onConnect: () => void;
}

function RepoCard({ repo, onClick, onConnect }: RepoCardProps) {
  // Function to determine the language color
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-400",
      Python: "bg-green-500",
      Go: "bg-cyan-500",
      Rust: "bg-orange-500",
      Java: "bg-red-500",
      "C++": "bg-pink-500",
      C: "bg-gray-500",
      Ruby: "bg-red-600",
      PHP: "bg-[#f28500]",
    };
    
    return colors[language] || "bg-gray-400";
  };
  
  // Format the date to a relative time
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (err) {
      return "Unknown";
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md overflow-hidden hover:shadow-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/30"
    >
      <div 
        className="p-5 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-orange-100 dark:bg-orange-900/30 text-[#f28500] dark:text-orange-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-800 dark:text-white">{repo.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{repo.owner}</p>
            </div>
          </div>
          <div>
            {repo.connected ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-[#f28500] dark:bg-orange-900/30 dark:text-orange-300">
                Connected
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                Not Connected
              </span>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 h-10">
          {repo.description || "No description provided"}
        </p>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{repo.stars}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{repo.forks}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span>{repo.issues || 0}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <span className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language)} mr-2`}></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{repo.language}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Updated {formatDate(repo.updatedAt)}
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onConnect();
          }}
          className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${
            repo.connected
              ? "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
              : "bg-[#f28500] hover:bg-orange-600 text-white backdrop-blur-sm bg-opacity-30 dark:bg-opacity-30"
          }`}
        >
          {repo.connected ? "Disconnect" : "Connect"}
        </button>
      </div>
    </motion.div>
  );
};

export default RepoCard;

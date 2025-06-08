"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PipelineStatus from "@/components/dashboard/PipelineStatus";
import { formatDistanceToNow } from "date-fns";

interface RepoPipeline {
  id: string;
  name: string;
  status: "running" | "success" | "failed" | "canceled";
  startedAt: string;
  finishedAt?: string;
  duration: number;
  stages: {
    id: string;
    name: string;
    status: "running" | "success" | "failed" | "canceled";
    duration: number;
  }[];
}

interface RepoModalProps {
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
  pipelines: RepoPipeline[];
  onClose: () => void;
  onConnect: () => void;
}

function RepoModal({ repo, pipelines, onClose, onConnect }: RepoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  
  // Close modal when pressing ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  
  // Format the date
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (err) {
      return "Unknown";
    }
  };
  
  // Get language color
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
      PHP: "bg-orange-400",
    };
    
    return colors[language] || "bg-gray-400";
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          ref={modalRef}
          className="relative bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col backdrop-blur-lg border border-white/20 dark:border-gray-700/30"
        >
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-orange-100 dark:bg-orange-900/30 text-[#f28500] dark:text-orange-300 mr-3">
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
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{repo.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{repo.owner}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Repo Details */}
              <div className="lg:col-span-1">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 py-4 px-6 bg-gradient-to-r from-orange-50 to-white dark:from-gray-800 dark:to-gray-900">
                  <h2 className="text-lg font-semibold text-[#f28500] dark:text-orange-300">Repository Details</h2>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {repo.description || "No description provided"}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Language</span>
                      <div className="flex items-center">
                        <span className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language)} mr-2`}></span>
                        <span className="text-sm font-medium text-gray-800 dark:text-white">{repo.language}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Stars</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">{repo.stars}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Forks</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">{repo.forks}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Open Issues</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">{repo.issues || 0}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Last Updated</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {formatDate(repo.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={onConnect}
                  className={`w-full py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                    repo.connected
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200"
                      : "bg-[#f28500] hover:bg-orange-600 text-white"
                  }`}
                >
                  {repo.connected ? "Disconnect Repository" : "Connect Repository"}
                </button>
              </div>
              
              {/* Right Column - Pipelines */}
              <div className="lg:col-span-2">
                <h3 className="font-medium text-gray-800 dark:text-white mb-4">Recent Pipelines</h3>
                
                {pipelines.length === 0 ? (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No Pipelines Found</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      {repo.connected 
                        ? "This repository doesn't have any pipelines yet." 
                        : "Connect this repository to start monitoring pipelines."}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
                    <PipelineStatus pipelines={pipelines} title="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RepoModal;

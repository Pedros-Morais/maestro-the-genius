"use client";

import React, { useState, useEffect } from "react";
import { getAllRepos, Repo } from "@/data/repos";
import { getPipelinesForRepo, Pipeline } from "@/data/pipelines";
// import { users } from "@/data/users";
import RepoCard from "../../../components/repos/RepoCard";
import RepoModal from "../../../components/repos/RepoModal";
import { motion } from "framer-motion";

export default function ReposPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [repoPipelines, setRepoPipelines] = useState<Pipeline[]>([]);
  
  // Simulate loading repos data
  useEffect(() => {
    const loadData = async () => {
      // Simulate network request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const repoData = getAllRepos();
      setRepos(repoData);
      setLoading(false);
    };
    
    loadData();
  }, []);
  
  // Handle clicking on a repo
  const handleRepoClick = (repo: Repo) => {
    setSelectedRepo(repo);
    const pipelines = getPipelinesForRepo(repo.id);
    setRepoPipelines(pipelines);
    setShowModal(true);
  };
  
  // Handle connecting a repo
  const handleConnectRepo = (repo: Repo) => {
    // In a real app, this would make an API call to connect the repo
    // For now, we'll just toggle its connected status
    const updatedRepos = repos.map(r => 
      r.id === repo.id ? { ...r, connected: !r.connected } : r
    );
    setRepos(updatedRepos);
  };
  
  // Group repos by connected status
  const connectedRepos = repos.filter(repo => repo.connected);
  const availableRepos = repos.filter(repo => !repo.connected);
  
  return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#f28500] dark:text-orange-300">Repository Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your connected repositories and discover new ones</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-[#f28500] text-white rounded-md shadow-sm hover:bg-orange-500 flex items-center backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Repository
          </motion.button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-80 bg-gray-50/70 dark:bg-gray-800/70 rounded-md backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-orange-100 dark:bg-orange-900/30 mb-4">
                <svg
                  className="w-10 h-10 text-[#f28500] dark:text-orange-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h2 className="mb-2 text-xl font-semibold text-[#f28500] dark:text-orange-300">Loading repositories</h2>
              <p className="text-gray-500 dark:text-gray-400">Please wait while we fetch your repositories</p>
            </div>
          </div>
        ) : (
          <>
            {/* Connected Repositories */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-[#f28500] dark:text-orange-300">Connected Repositories</h2>
              {connectedRepos.length === 0 ? (
                <div className="bg-gray-50/70 dark:bg-gray-800/70 p-8 rounded-md text-center backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
                  <p className="text-gray-600 dark:text-gray-400">No connected repositories yet.</p>
                  <p className="text-gray-600 dark:text-gray-400">Connect repositories to start monitoring your code.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {connectedRepos.map((repo) => (
                    <RepoCard
                      key={repo.id}
                      repo={repo}
                      onClick={() => handleRepoClick(repo)}
                      onConnect={() => handleConnectRepo(repo)}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Available Repositories */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#f28500] dark:text-orange-300">Available Repositories</h2>
              {availableRepos.length === 0 ? (
                <div className="bg-gray-50/70 dark:bg-gray-800/70 p-8 rounded-md text-center backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
                  <p className="text-gray-600 dark:text-gray-400">No additional repositories available.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableRepos.map((repo) => (
                    <RepoCard
                      key={repo.id}
                      repo={repo}
                      onClick={() => handleRepoClick(repo)}
                      onConnect={() => handleConnectRepo(repo)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      
        {/* Repository Modal */}
        {showModal && selectedRepo && (
          <RepoModal
            repo={selectedRepo}
            pipelines={repoPipelines}
            onClose={() => setShowModal(false)}
            onConnect={() => handleConnectRepo(selectedRepo)}
          />
        )}
      </div>
    );
}

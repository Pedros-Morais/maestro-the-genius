"use client";

import React from "react";
import { motion } from "framer-motion";

interface PipelineStage {
  id: string;
  name: string;
  status: "running" | "success" | "failed" | "canceled";
  duration: number; // seconds
}

interface Pipeline {
  id: string;
  name: string;
  status: "running" | "success" | "failed" | "canceled";
  startedAt: string;
  finishedAt?: string;
  duration: number; // seconds
  stages: PipelineStage[];
}

interface PipelineStatusProps {
  pipelines: Pipeline[];
  title?: string;
}

export default function PipelineStatus({ pipelines, title = "Recent Pipelines" }: PipelineStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500";
      case "running":
        return "bg-blue-500";
      case "failed":
        return "bg-red-500";
      case "canceled":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };
  
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20";
      case "running":
        return "bg-blue-50 dark:bg-blue-900/20";
      case "failed":
        return "bg-red-50 dark:bg-red-900/20";
      case "canceled":
        return "bg-gray-50 dark:bg-gray-800";
      default:
        return "bg-gray-50 dark:bg-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "running":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        );
      case "failed":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case "canceled":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    }
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {pipelines.map((pipeline, index) => (
          <motion.div
            key={pipeline.id}
            className="p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ backgroundColor: "rgba(237, 233, 254, 0.1)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${getStatusBgColor(pipeline.status)}`}>
                  {pipeline.status === "success" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-500">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : pipeline.status === "failed" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-red-500">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  ) : pipeline.status === "running" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-500 animate-spin">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  )}
                </div>
                <h3 className="text-sm font-medium ml-2">{pipeline.name}</h3>
              </div>
              <div className="text-xs text-gray-500">
                {formatDateTime(pipeline.startedAt)} • {formatDuration(pipeline.duration)}
              </div>
            </div>
            <div className="flex space-x-1 mt-3">
              {pipeline.stages.map((stage, stageIndex) => (
                <div 
                  key={stage.id}
                  className="flex-1 flex flex-col"
                >
                  <div
                    className={`h-1.5 rounded-full ${getStatusColor(stage.status)}`}
                    title={`${stage.name}: ${stage.status}`}
                  >
                    {stage.status === "running" && (
                      <motion.div
                        className="h-full bg-white bg-opacity-30"
                        initial={{ width: "0%" }}
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                        }}
                      />
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 truncate" title={stage.name}>
                    {stageIndex + 1}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import React from "react";

interface Integration {
  id: string;
  name: string;
  logo: string;
  status: "active" | "inactive" | "error";
  connectionStrength: number;
  lastSyncAt: string;
}

interface IntegrationStatusProps {
  integrations: Integration[];
}

export default function IntegrationStatus({ integrations }: IntegrationStatusProps) {
  const getIntegrationIcon = (iconType: string, name: string) => {
    switch (iconType) {
      case 'github':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-700 dark:text-gray-300">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
        );
      case 'aws':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-700 dark:text-gray-300">
            <path d="M18.71 14.29a1 1 0 0 0-1.42 1.42l.29.29H16a1 1 0 0 0 0 2h1.59l-.3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l2-2a1 1 0 0 0 .21-.33 1 1 0 0 0 0-.76 1 1 0 0 0-.21-.33l-2-2ZM7 12a5 5 0 1 1 5 5 5 5 0 0 1-5-5Zm5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"></path>
            <path d="M5 15a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1Zm14-3a1 1 0 0 0 1-1V8a1 1 0 0 0-2 0v3a1 1 0 0 0 1 1ZM5 8a1 1 0 0 0 1 1h3a1 1 0 0 0 0-2H6a1 1 0 0 0-1 1Z"></path>
          </svg>
        );
      case 'slack':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-700 dark:text-gray-300">
            <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"></path>
            <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>
            <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"></path>
            <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"></path>
            <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"></path>
            <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path>
            <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"></path>
            <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"></path>
          </svg>
        );
      case 'datadog':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-700 dark:text-gray-300">
            <path d="M10.5 2.29c3.39-.55 7.72.38 9.21 4.21 1.5 3.83-1.21 10.98-4.63 9.08-1.05-.58-1.31-2.06-1.05-3.08" />
            <path d="M5.26 15.37c-.96-1.73-1.92-3.76-.84-8.31C5.5 2.5 12 2 13.35 3.45c.7.75 1.65 1.88.69 6.24" />
            <path d="M2.71 8.56c-1.26 3.67-.81 7.82 2.36 7.64 3.17-.18 6.09-3.08 9.5-3.08" />
            <path d="M14.5 14.4c-.8 1.1-1.89 2.72-3.5 2.6-3.01-.24-2.76-3.46-4.5-4.5-1.74-1.04-1.74-3.54 0-4 1.22-.32 5-.32 5 3" />
          </svg>
        );
      case 'docker':
      case 'docker-hub':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-700 dark:text-gray-300">
            <path d="M22 12.5c0 1.76-1.31 3.74-4.5 3.5-2 5-6 4-8.5 2-3.08 0-5-1.5-5-4C.29 7.12 4.99 3 9.33 3c4.92 0 8.72 5.23 8.72 7.5" />
            <path d="M20 11.5c1 1 2 1 2 1" />
            <path d="M6.2 11.5H6m4.2 0h-.1m4.2 0h-.1m-6.28-4h-.1m4.2 0h-.1m4.2 0h-.1" />
          </svg>
        );
      case 'analytics':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-700 dark:text-gray-300">
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        );
      default:
        return (
          <span className="text-sm font-medium text-gray-500">
            {name.substring(0, 2).toUpperCase()}
          </span>
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-400";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const formatLastSync = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Integrations</h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            className="p-4 flex items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ backgroundColor: "rgba(237, 233, 254, 0.1)" }}
          >
            <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              {getIntegrationIcon(integration.logo, integration.name)}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{integration.name}</h3>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                    {formatLastSync(integration.lastSyncAt)}
                  </span>
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${getStatusColor(integration.status)}`}
                  ></span>
                </div>
              </div>
              <div className="mt-1">
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#f28500]"
                    initial={{ width: 0 }}
                    animate={{ width: `${integration.connectionStrength}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: "up" | "down" | "neutral";
  color?: "purple" | "blue" | "green" | "red" | "orange" | "gray";
}

export default function StatCard({
  title,
  value,
  icon,
  change,
  trend,
  color = "orange",
}: StatCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "purple":
        return "bg-orange-50 text-[#f28500] dark:bg-orange-900/20 dark:text-orange-400";
      case "blue":
        return "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
      case "green":
        return "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      case "red":
        return "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400";
      case "orange":
        return "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
      case "gray":
        return "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-orange-50 text-[#f28500] dark:bg-orange-900/20 dark:text-orange-400";
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 text-green-500 dark:text-green-400"
        >
          <path
            fillRule="evenodd"
            d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else if (trend === "down") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 text-red-500 dark:text-red-400"
        >
          <path
            fillRule="evenodd"
            d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${getColorClasses()}`}>{icon}</div>
          <div className="ml-4 flex-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold">{value}</p>
              {change && (
                <div className="ml-2 flex items-center text-sm">
                  {getTrendIcon()}
                  <span
                    className={`${
                      trend === "up"
                        ? "text-green-500 dark:text-green-400"
                        : trend === "down"
                        ? "text-red-500 dark:text-red-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {change}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import ActivityChart from "../../components/dashboard/ActivityChart";
import ActivityList from "../../components/dashboard/ActivityList";
import IntegrationStatus from "../../components/dashboard/IntegrationStatus";
import PipelineStatus from "../../components/dashboard/PipelineStatus";
import { getCommitStatistics } from "../../data/commits";
import { getIntegrationStatistics, getIntegrationsByStatus } from "../../data/integrations";
import { getPipelineStatistics, getRecentPipelines } from "../../data/pipelines";
import { getRepoStatistics } from "../../data/repos";
import { users } from "../../data/users";

// Helper function to create activity data for charts
const createActivityData = () => {
  const data = [];
  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    data.push({
      name: dayNames[date.getDay()],
      commits: Math.floor(Math.random() * 35) + 10,
      pipelines: Math.floor(Math.random() * 15) + 5,
    });
  }

  return data;
};

// Create language distribution data
const createLanguageData = () => {
  return [
    { name: "TypeScript", value: 45 },
    { name: "JavaScript", value: 25 },
    { name: "Python", value: 15 },
    { name: "Go", value: 10 },
    { name: "Other", value: 5 },
  ];
};

// Create activities for list component
const createActivitiesList = () => {
  return [
    {
      id: "a1",
      title: "Main branch updated",
      description: "Merge pull request #123 from feature/user-auth",
      timestamp: new Date(Date.now() - 35 * 60000).toISOString(),
      type: "commit",
      status: "success",
      user: {
        name: "Ana Silva",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "a2",
      title: "Frontend CI/CD pipeline",
      description: "Pipeline #89 completed successfully",
      timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
      type: "pipeline",
      status: "success",
      user: {
        name: "Miguel Souza",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
    },
    {
      id: "a3",
      title: "API service deployment",
      description: "Deployment to production environment",
      timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
      type: "pipeline",
      status: "failed",
      user: {
        name: "Sofia Oliveira",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    },
    {
      id: "a4",
      title: "New repository created",
      description: "Mobile app repository initialized",
      timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
      type: "repo",
      user: {
        name: "Lucas Mendes",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
    },
    {
      id: "a5",
      title: "New user joined",
      description: "Added to Developer team",
      timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
      type: "user",
      user: {
        name: "Isabel Santos",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
    },
  ];
};

export default function Dashboard() {
  const [activityData, setActivityData] = useState<any[]>([]);
  const [languageData, setLanguageData] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setActivityData(createActivityData());
      setLanguageData(createLanguageData());
      setActivities(createActivitiesList());
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const commitStats = getCommitStatistics();
  const repoStats = getRepoStatistics();
  const pipelineStats = getPipelineStatistics();
  const integrationStats = getIntegrationStatistics();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-3 text-purple-500 font-medium">Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Dashboard header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your projects.
          </p>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Repositories"
            value={repoStats.totalRepos}
            change="+5%"
            trend="up"
            color="purple"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
              </svg>
            }
          />
          <StatCard
            title="Total Commits"
            value={commitStats.totalCommits}
            change="+12%"
            trend="up"
            color="blue"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                />
              </svg>
            }
          />
          <StatCard
            title="Pipeline Success Rate"
            value={`${Math.round((pipelineStats.successfulPipelines / pipelineStats.totalPipelines) * 100)}%`}
            change="-3%"
            trend="down"
            color="green"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z"
                />
              </svg>
            }
          />
          <StatCard
            title="Active Users"
            value={users.length}
            change="0%"
            trend="neutral"
            color="orange"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            }
          />
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ActivityChart
            data={activityData}
            title="Weekly Activity"
            description="Commits and pipeline runs over the past week"
            type="area"
            dataKeys={["commits", "pipelines"]}
            labels={{ commits: "Commits", pipelines: "Pipeline Runs" }}
            colors={["#8b5cf6", "#c4b5fd"]}
          />
          <ActivityChart
            data={languageData}
            title="Repository Languages"
            description="Distribution of programming languages across repos"
            type="bar"
            dataKeys={["value"]}
            labels={{ value: "Distribution %" }}
            colors={["#8b5cf6", "#c4b5fd", "#a78bfa", "#ddd6fe", "#ede9fe"]}
          />
        </div>

        {/* Activity lists and status section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ActivityList
              activities={activities}
              title="Recent Activities"
            />
          </div>
          <div className="lg:col-span-1">
            <PipelineStatus
              pipelines={getRecentPipelines()}
              title="Recent Pipelines"
            />
          </div>
          <div className="lg:col-span-1">
            <IntegrationStatus
              integrations={getIntegrationsByStatus("active")}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

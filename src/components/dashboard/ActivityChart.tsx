"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

interface ActivityChartProps {
  data: any[];
  title: string;
  description?: string;
  type?: "area" | "bar";
  colors?: string[];
  dataKeys: string[];
  labels?: Record<string, string>;
}

export default function ActivityChart({
  data,
  title,
  description,
  type = "area",
  colors = ["#8b5cf6", "#c4b5fd"],
  dataKeys,
  labels = {},
}: ActivityChartProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{description}</p>}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === "area" ? (
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                {colors.map((color, index) => (
                  <linearGradient key={index} id={`colorGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderColor: "#E5E7EB",
                  borderRadius: "0.375rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              {dataKeys.map((dataKey, index) => (
                <Area
                  key={dataKey}
                  type="monotone"
                  dataKey={dataKey}
                  name={labels[dataKey] || dataKey}
                  stroke={colors[index % colors.length]}
                  fillOpacity={1}
                  fill={`url(#colorGradient${index})`}
                />
              ))}
            </AreaChart>
          ) : (
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderColor: "#E5E7EB",
                  borderRadius: "0.375rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              {dataKeys.map((dataKey, index) => (
                <Bar
                  key={dataKey}
                  dataKey={dataKey}
                  name={labels[dataKey] || dataKey}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

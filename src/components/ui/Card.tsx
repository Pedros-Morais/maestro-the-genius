"use client";

import React from 'react';

type CardProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export default function Card({ children, title, className = '' }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 ${className}`}>
      {title && <h3 className="text-lg font-medium mb-3">{title}</h3>}
      {children}
    </div>
  );
}

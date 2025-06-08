"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import IntegrationCard from '../../../components/integrations/IntegrationCard';

export default function IntegracoesPage() {
  const [loading, setLoading] = useState(false);
  
  const integrations = [
    {
      id: 'aws',
      name: 'Amazon Web Services',
      description: 'Conecte sua conta AWS para gerenciar recursos e pipelines de infraestrutura.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-8 h-8">
          <path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.5-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"/>
        </svg>
      ),
      connected: false,
      color: '#FF9900'
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Integre com Jira para gerenciar tarefas, sprints e acompanhar progresso.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M11.5 19.14L4.5 12.5l7-6.64"></path>
          <path d="M11.5 19.14l.357-.38c.975-1.026.722-1.675 0-2.39l-4.975-4.975L11.5 6.758"></path>
          <path d="M11.5 19.14l7-6.64-7-6.64"></path>
        </svg>
      ),
      connected: true,
      color: '#0052CC'
    },
    {
      id: 'trello',
      name: 'Trello',
      description: 'Conecte quadros Trello para visualizar e gerenciar tarefas de projeto.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <rect x="7" y="7" width="3" height="9"></rect>
          <rect x="14" y="7" width="3" height="5"></rect>
        </svg>
      ),
      connected: false,
      color: '#0079BF'
    },
    {
      id: 'linear',
      name: 'Linear',
      description: 'Integre com Linear para gerenciamento de projetos e acompanhamento de bugs.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M12 3L4 9l8 6 8-6-8-6z"></path>
          <path d="M4 9v6l8 6 8-6V9"></path>
          <path d="M4 15l8 6 8-6"></path>
        </svg>
      ),
      connected: false,
      color: '#5E6AD2'
    }
  ];

  return (
    <div className="p-6">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold tracking-tight">Integrações</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Conecte suas ferramentas de desenvolvimento externas para uma experiência unificada.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {integrations.map((integration, index) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            delay={index * 0.1}
          />
        ))}
      </div>

      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">Benefícios das integrações</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-lg bg-[#f28500] bg-opacity-20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#f28500]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2v10l4.5 4.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8v1" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.51 7.35l-.71.71" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.35 16.51l.71-.71" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.35 7.35l.71.71" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.51 16.51l-.71-.71" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Fluxo de trabalho otimizado</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Automatize tarefas entre plataformas e reduza o trabalho manual
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-lg bg-[#f28500] bg-opacity-20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#f28500]" viewBox="0 0 24 24" fill="none">
                <path d="M16 9V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V9M5 9H19L20 21H4L5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8" cy="13" r="1" fill="currentColor"/>
                <circle cx="16" cy="13" r="1" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Segurança aprimorada</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Conexões seguras com autenticação OAuth e tokens criptografados
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-lg bg-[#f28500] bg-opacity-20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#f28500]" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="2" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="8" y1="3" x2="8" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="3" x2="16" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="5" y="12" width="4" height="3" rx="0.5" fill="currentColor"/>
                <rect x="10" y="12" width="4" height="6" rx="0.5" fill="currentColor"/>
                <rect x="15" y="12" width="4" height="9" rx="0.5" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Métricas consolidadas</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Visualize dados de todas as ferramentas em um único dashboard
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

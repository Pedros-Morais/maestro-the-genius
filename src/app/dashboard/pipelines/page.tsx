"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PipelineCard from '../../../components/pipelines/PipelineCard';

// Mock data for pipelines
const MOCK_PIPELINES = [
  {
    id: 'data-ingestion-lambda-01',
    name: 'Data Ingestion Pipeline',
    status: 'success',
    lastRunTime: '1 hora atrás',
    lastRunBy: 'Pedro Morais',
    type: 'ETL',
    description: 'Pipeline responsável pela ingestão de dados brutos de fontes externas para processamento posterior.',
    averageRuntime: '5m 23s',
    successRate: 98,
    qaStatus: {
      passed: 24,
      failed: 1,
      skipped: 3
    }
  },
  {
    id: 'ml-training-lambda-02',
    name: 'Machine Learning Training Pipeline',
    status: 'running',
    lastRunTime: '27 minutos atrás',
    lastRunBy: 'Ana Silva',
    type: 'Machine Learning',
    description: 'Pipeline de treinamento de modelos de machine learning para previsão de tendências.',
    averageRuntime: '27m 12s',
    successRate: 92,
    qaStatus: {
      passed: 18,
      failed: 2,
      skipped: 4
    }
  },
  {
    id: 'data-validation-lambda-03',
    name: 'Data Validation Pipeline',
    status: 'failed',
    lastRunTime: '2 horas atrás',
    lastRunBy: 'Carlos Eduardo',
    type: 'Validação',
    description: 'Pipeline para validação da integridade e qualidade dos dados processados.',
    averageRuntime: '3m 45s',
    successRate: 85,
    qaStatus: {
      passed: 15,
      failed: 7,
      skipped: 2
    }
  },
  {
    id: 'api-integration-lambda-04',
    name: 'API Integration Pipeline',
    status: 'success',
    lastRunTime: '30 minutos atrás',
    lastRunBy: 'Julia Costa',
    type: 'Integração',
    description: 'Pipeline de integração com APIs externas para obtenção de dados em tempo real.',
    averageRuntime: '2m 10s',
    successRate: 99,
    qaStatus: {
      passed: 32,
      failed: 0,
      skipped: 1
    }
  },
  {
    id: 'report-generation-lambda-05',
    name: 'Report Generation Pipeline',
    status: 'warning',
    lastRunTime: '5 horas atrás',
    lastRunBy: 'Marcos Souza',
    type: 'Relatório',
    description: 'Pipeline responsável pela geração automatizada de relatórios comerciais e dashboards.',
    averageRuntime: '8m 37s',
    successRate: 90,
    qaStatus: {
      passed: 28,
      failed: 3,
      skipped: 5
    }
  },
  {
    id: 'data-transformation-lambda-06',
    name: 'Data Transformation Pipeline',
    status: 'success',
    lastRunTime: '12 horas atrás',
    lastRunBy: 'Felipe Martins',
    type: 'ETL',
    description: 'Pipeline para transformação e enriquecimento de dados antes da carga em datawarehouse.',
    averageRuntime: '15m 22s',
    successRate: 95,
    qaStatus: {
      passed: 42,
      failed: 2,
      skipped: 0
    }
  }
];

export default function PipelinesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  
  // Toggle card open/closed
  const toggleCardDetails = (id: string) => {
    setOpenCardId(openCardId === id ? null : id);
  };

  // Filter pipelines based on search term and filters
  const filteredPipelines = MOCK_PIPELINES.filter(pipeline => {
    const matchesSearch = 
      pipeline.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      pipeline.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pipeline.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || pipeline.status === statusFilter;
    const matchesType = typeFilter === 'all' || pipeline.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get unique pipeline types for filter
  const pipelineTypes = ['all', ...new Set(MOCK_PIPELINES.map(pipeline => pipeline.type))];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-1">Pipelines</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie e monitore seus pipelines de dados e integração
        </p>
      </motion.div>

      <motion.div 
        className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto">
          <div className="relative">
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f28500] text-sm"
              placeholder="Buscar pipelines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div>
            <select
              className="w-full py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f28500] text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos os Status</option>
              <option value="success">Sucesso</option>
              <option value="running">Em Execução</option>
              <option value="failed">Falhou</option>
              <option value="warning">Aviso</option>
            </select>
          </div>

          <div>
            <select
              className="w-full py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f28500] text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Todos os Tipos</option>
              {pipelineTypes
                .filter(type => type !== 'all')
                .map(type => (
                  <option key={type} value={type}>{type}</option>
                ))
              }
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 items-center text-sm">
          <span className="text-gray-500 dark:text-gray-400">Status:</span>
          
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-green-400 dark:bg-green-500 mr-1"></span>
            <span>Sucesso</span>
          </div>
          
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-400 dark:bg-blue-500 mr-1"></span>
            <span>Em Execução</span>
          </div>
          
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-400 dark:bg-red-500 mr-1"></span>
            <span>Falhou</span>
          </div>
          
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-500 mr-1"></span>
            <span>Aviso</span>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-6">
        {filteredPipelines.length > 0 ? (
          filteredPipelines.map((pipeline, index) => (
            <div key={pipeline.id} className="w-full lg:w-[calc(50%-12px)] flex-grow-0 flex-shrink-0">
              <PipelineCard
                id={pipeline.id}
                name={pipeline.name}
                status={pipeline.status as 'success' | 'running' | 'failed' | 'warning'}
                lastRunTime={pipeline.lastRunTime}
                lastRunBy={pipeline.lastRunBy}
                type={pipeline.type}
                description={pipeline.description}
                averageRuntime={pipeline.averageRuntime}
                successRate={pipeline.successRate}
                qaStatus={pipeline.qaStatus}
                delay={index}
                showDetails={openCardId === pipeline.id}
                onToggleDetails={() => toggleCardDetails(pipeline.id)}
              />
            </div>
          ))
        ) : (
          <motion.div 
            className="lg:col-span-2 text-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h3 className="text-lg font-semibold mb-1">Nenhum pipeline encontrado</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Tente ajustar seus filtros ou criar um novo pipeline.
            </p>
            <button 
              className="mt-4 px-4 py-2 bg-[#f28500] hover:bg-[#ff9d37] text-white rounded-lg text-sm font-medium transition-colors"
            >
              Criar Novo Pipeline
            </button>
          </motion.div>
        )}
      </div>
      
      {filteredPipelines.length > 0 && (
        <motion.div 
          className="mt-6 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {filteredPipelines.length} de {MOCK_PIPELINES.length} pipelines
          </div>
          
          <button 
            className="px-4 py-2 bg-[#f28500] hover:bg-[#ff9d37] text-white rounded-lg text-sm font-medium transition-colors"
          >
            Criar Novo Pipeline
          </button>
        </motion.div>
      )}
    </div>
  );
}

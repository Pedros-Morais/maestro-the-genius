"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PipelineCardProps {
  id: string;
  name: string;
  status: 'success' | 'running' | 'failed' | 'warning';
  lastRunTime: string;
  lastRunBy: string;
  type: string;
  description: string;
  averageRuntime: string;
  successRate: number;
  qaStatus: {
    passed: number;
    failed: number;
    skipped: number;
  };
  delay?: number;
  showDetails: boolean;
  onToggleDetails: () => void;
}

export default function PipelineCard({
  id,
  name,
  status,
  lastRunTime,
  lastRunBy,
  type,
  description,
  averageRuntime,
  successRate,
  qaStatus,
  delay = 0,
  showDetails,
  onToggleDetails
}: PipelineCardProps) {

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'success': return 'bg-green-400 dark:bg-green-500';
      case 'running': return 'bg-blue-400 dark:bg-blue-500';
      case 'failed': return 'bg-red-400 dark:bg-red-500';
      case 'warning': return 'bg-yellow-400 dark:bg-yellow-500';
      default: return 'bg-gray-400 dark:bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'success': return 'Sucesso';
      case 'running': return 'Em Execução';
      case 'failed': return 'Falhou';
      case 'warning': return 'Aviso';
      default: return 'Desconhecido';
    }
  };

  const renderQAChart = () => {
    const total = qaStatus.passed + qaStatus.failed + qaStatus.skipped;
    const passedPercentage = total > 0 ? (qaStatus.passed / total) * 100 : 0;
    const failedPercentage = total > 0 ? (qaStatus.failed / total) * 100 : 0;
    const skippedPercentage = total > 0 ? (qaStatus.skipped / total) * 100 : 0;
    
    return (
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span>QA Status</span>
          <span>{qaStatus.passed} passaram, {qaStatus.failed} falharam, {qaStatus.skipped} ignorados</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          <div className="flex h-full">
            <div 
              className="bg-green-400 dark:bg-green-500 h-full" 
              style={{ width: `${passedPercentage}%` }}
            ></div>
            <div 
              className="bg-red-400 dark:bg-red-500 h-full" 
              style={{ width: `${failedPercentage}%` }}
            ></div>
            <div 
              className="bg-yellow-400 dark:bg-yellow-500 h-full" 
              style={{ width: `${skippedPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-auto flex flex-col`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{name}</h3>
          <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {type} • ID: {id}
        </div>
        
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
            <p className="font-semibold text-sm mt-1">{getStatusText(status)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Último uso</p>
            <p className="font-semibold text-sm mt-1">{lastRunTime}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Taxa de sucesso</p>
            <p className="font-semibold text-sm mt-1">{successRate}%</p>
          </div>
        </div>
        
        {renderQAChart()}
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              <span className="text-gray-700 dark:text-gray-300 font-medium">{lastRunBy}</span> • {averageRuntime} tempo médio
            </span>
            
            <div className="flex space-x-2">
              <button
                onClick={onToggleDetails}
                className="text-xs font-medium text-[#f28500] hover:text-[#ff9d37] transition-colors"
              >
                {showDetails ? 'Menos Detalhes' : 'Mais Detalhes'}
              </button>

              <a
                href={`https://console.aws.amazon.com/lambda/home#/functions/function:${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#f28500] hover:text-[#ff9d37] transition-colors"
              >
                Abrir Lambda
              </a>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showDetails && (
          <motion.div 
            className="p-5 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-sm mb-3 text-[#f28500]">Detalhes do Pipeline</h4>
              <ul className="text-sm space-y-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <li className="flex justify-between items-center py-1.5 px-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-gray-500 dark:text-gray-400">ID:</span> 
                  <span className="font-medium">{id}</span>
                </li>
                <li className="flex justify-between items-center py-1.5 px-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-gray-500 dark:text-gray-400">Tipo:</span> 
                  <span className="font-medium">{type}</span>
                </li>
                <li className="flex justify-between items-center py-1.5 px-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-gray-500 dark:text-gray-400">Tempo médio:</span> 
                  <span className="font-medium">{averageRuntime}</span>
                </li>
                <li className="flex justify-between items-center py-1.5 px-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-gray-500 dark:text-gray-400">Taxa de sucesso:</span> 
                  <span className="font-medium text-green-600 dark:text-green-400">{successRate}%</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-3 text-[#f28500]">Recursos Lambda</h4>
              <ul className="text-sm space-y-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <li className="mb-2">
                  <a href={`https://console.aws.amazon.com/lambda/home#/functions/function:${id}`} target="_blank" rel="noopener noreferrer" 
                    className="bg-white dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 p-2 rounded-lg flex items-center transition-colors border border-gray-100 dark:border-gray-700">
                    <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-md mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#f28500]">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Ver função Lambda</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Gerenciar código e configuração</p>
                    </div>
                  </a>
                </li>
                <li className="mb-2">
                  <a href={`https://console.aws.amazon.com/cloudwatch/home#logsV2:log-groups/log-group/%2Faws%2Flambda%2F${id}`} target="_blank" rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 p-2 rounded-lg flex items-center transition-colors border border-gray-100 dark:border-gray-700">
                    <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-md mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#f28500]">
                        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                        <path d="M17 21h-10a2 2 0 0 1-2-2v-14a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
                        <line x1="9" y1="9" x2="10" y2="9"></line>
                        <line x1="9" y1="13" x2="15" y2="13"></line>
                        <line x1="9" y1="17" x2="15" y2="17"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Ver CloudWatch Logs</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Monitorar registros de execução</p>
                    </div>
                  </a>
                </li>
                <li className="mb-2">
                  <a href={`https://console.aws.amazon.com/cloudwatch/home#dashboards:name=${id}`} target="_blank" rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 p-2 rounded-lg flex items-center transition-colors border border-gray-100 dark:border-gray-700">
                    <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-md mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#f28500]">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Ver Dashboard</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Análise de métricas e performance</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-sm text-[#f28500]">Resultados de QA</h4>
              <button 
                onClick={() => alert('Iniciando testes TDD...')}
                className="bg-[#f28500] hover:bg-[#ff9d37] text-white px-4 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 mr-1.5">
                  <path d="m5 3 14 9-14 9V3z"></path>
                </svg>
                  Baixar TDD
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Teste</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Resultado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">Verificação de Schema</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Passou
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">Validação de Dados</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Passou
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">Teste de Performance</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Ignorado
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">Validação de Segurança</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        Falhou
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
}

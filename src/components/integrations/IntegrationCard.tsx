"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  color: string;
}

interface IntegrationCardProps {
  integration: Integration;
  delay?: number;
}

export default function IntegrationCard({ integration, delay = 0 }: IntegrationCardProps) {
  const [connected, setConnected] = useState(integration.connected);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const handleToggleConnection = () => {
    if (!connected) {
      setShowModal(true);
    } else {
      handleDisconnect();
    }
  };

  const handleConnect = () => {
    setLoading(true);
    
    // Simulate API connection
    setTimeout(() => {
      setConnected(true);
      setLoading(false);
      setShowModal(false);
    }, 1500);
  };
  
  const handleDisconnect = () => {
    setLoading(true);
    
    // Simulate API disconnection
    setTimeout(() => {
      setConnected(false);
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="p-2 rounded-lg" 
                style={{ backgroundColor: `${integration.color}20` }}
              >
                <div className="text-gray-800 dark:text-white">{integration.icon}</div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{integration.name}</h3>
                {connected && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                    Conectado
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">{integration.description}</p>
          
          <div className="mt-4">
            <motion.button
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                connected 
                  ? 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-gray-500' 
                  : `bg-[${integration.color}] hover:bg-opacity-90 text-white focus:ring-${integration.id}`
              }`}
              style={!connected ? { backgroundColor: integration.color } : {}}
              onClick={handleToggleConnection}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </div>
              ) : connected ? (
                'Desconectar'
              ) : (
                'Conectar'
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Auth Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-5">
              <div 
                className="p-2 rounded-lg" 
                style={{ backgroundColor: `${integration.color}20` }}
              >
                <div className="text-gray-800 dark:text-white">{integration.icon}</div>
              </div>
              <h3 className="text-lg font-bold">Conectar {integration.name}</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email ou Nome de usuário
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f28500] focus:border-transparent dark:bg-gray-700"
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f28500] focus:border-transparent dark:bg-gray-700"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-[#f28500] focus:ring-[#f28500] border-gray-300 rounded"
                />
                <label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300">
                  Lembrar sessão
                </label>
              </div>
            </div>

            <div className="flex space-x-3">
              <motion.button
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium"
                onClick={() => setShowModal(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancelar
              </motion.button>
              <motion.button
                className="flex-1 px-4 py-2 rounded-lg font-medium text-white"
                style={{ backgroundColor: integration.color }}
                onClick={handleConnect}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Conectando...
                  </div>
                ) : (
                  'Conectar'
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

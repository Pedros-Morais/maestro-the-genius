"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock user data
const MOCK_USERS = [
  {
    id: 'user-001',
    name: 'Pedro Morais',
    email: 'pedro@empresa.com',
    role: 'Admin',
    department: 'Engenharia',
    lastActive: '10 minutos atrás',
    status: 'active'
  },
  {
    id: 'user-002',
    name: 'Ana Silva',
    email: 'ana.silva@empresa.com',
    role: 'Desenvolvedor',
    department: 'Engenharia',
    lastActive: '1 hora atrás',
    status: 'active'
  },
  {
    id: 'user-003',
    name: 'João Ferreira',
    email: 'joao@empresa.com',
    role: 'DevOps',
    department: 'Infraestrutura',
    lastActive: '3 horas atrás',
    status: 'active'
  },
  {
    id: 'user-004',
    name: 'Mariana Costa',
    email: 'mariana@empresa.com',
    role: 'Product Manager',
    department: 'Produto',
    lastActive: 'Ontem',
    status: 'away'
  },
  {
    id: 'user-005',
    name: 'Roberto Santos',
    email: 'roberto@empresa.com',
    role: 'QA Analyst',
    department: 'Qualidade',
    lastActive: '3 dias atrás',
    status: 'inactive'
  },
  {
    id: 'user-006',
    name: 'Juliana Lima',
    email: 'juliana@empresa.com',
    role: 'Desenvolvedor',
    department: 'Mobile',
    lastActive: 'Agora mesmo',
    status: 'active'
  },
  {
    id: 'user-007',
    name: 'Carlos Mendes',
    email: 'carlos@empresa.com',
    role: 'Arquiteto',
    department: 'Engenharia',
    lastActive: '1 semana atrás',
    status: 'inactive'
  },
  {
    id: 'user-008',
    name: 'Fernanda Almeida',
    email: 'fernanda@empresa.com',
    role: 'Tech Lead',
    department: 'Engenharia',
    lastActive: '5 horas atrás',
    status: 'active'
  }
];

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Extract unique roles for filter dropdown
  const uniqueRoles = useMemo(() => {
    const roles = MOCK_USERS.map(user => user.role);
    return ['all', ...Array.from(new Set(roles))];
  }, []);

  // Filter users based on search term and filters
  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRoleFilter = roleFilter === 'all' || user.role === roleFilter;
      
      const matchesStatusFilter = 
        statusFilter === 'all' || 
        (statusFilter === 'active' && user.status === 'active') ||
        (statusFilter === 'inactive' && user.status !== 'active');
      
      return matchesSearch && matchesRoleFilter && matchesStatusFilter;
    });
  }, [searchTerm, roleFilter, statusFilter]);

  // Paginate
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle page navigation
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Get status badge styling
  const getStatusBadgeStyle = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'away':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'active':
        return 'Ativo';
      case 'away':
        return 'Ausente';
      case 'inactive':
        return 'Inativo';
      default:
        return status;
    }
  };

  // Generate avatar placeholder for users without avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Usuários</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Gerencie os usuários e defina permissões
        </p>
      </motion.div>

      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar por nome, email ou departamento..."
                className="pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f28500] focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Add User Button */}
            <div className="">
              <motion.button
                className="px-5 py-3 bg-gradient-to-r from-[#f28500] to-[#ff9d37] text-white rounded-lg font-medium flex items-center justify-center w-full md:w-auto shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(242, 133, 0, 0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Adicionar usuário
              </motion.button>
            </div>
          </div>

          {/* Filter section with improved UI */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-1">Filtros:</span>
            
            {/* Role Filter Dropdown - Styled with a more modern look */}
            <div className="relative inline-block">
              <select
                className="appearance-none px-4 py-2 pr-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f28500] focus:border-transparent cursor-pointer transition-all"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">Todos os cargos</option>
                <option value="Admin">Admin</option>
                <option value="Desenvolvedor">Desenvolvedor</option>
                <option value="DevOps">DevOps</option>
                <option value="Product Manager">Product Manager</option>
                <option value="QA Analyst">QA Analyst</option>
                <option value="Arquiteto">Arquiteto</option>
                <option value="Tech Lead">Tech Lead</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Status Filter Dropdown - Styled with a more modern look */}
            <div className="relative inline-block">
              <select
                className="appearance-none px-4 py-2 pr-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f28500] focus:border-transparent cursor-pointer transition-all"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos os status</option>
                <option value="active">Ativo</option>
                <option value="away">Ausente</option>
                <option value="inactive">Inativo</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Active filters display */}
            {(roleFilter !== 'all' || statusFilter !== 'all' || searchTerm) && (
              <div className="ml-2 flex flex-wrap gap-2">
                {roleFilter !== 'all' && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                  >
                    Cargo: {roleFilter}
                    <button 
                      onClick={() => setRoleFilter('all')} 
                      className="ml-1 focus:outline-none"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </motion.span>
                )}
                {statusFilter !== 'all' && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    Status: {statusFilter === 'active' ? 'Ativo' : statusFilter === 'away' ? 'Ausente' : 'Inativo'}
                    <button 
                      onClick={() => setStatusFilter('all')} 
                      className="ml-1 focus:outline-none"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </motion.span>
                )}
                {searchTerm && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                  >
                    Busca: {searchTerm}
                    <button 
                      onClick={() => setSearchTerm('')} 
                      className="ml-1 focus:outline-none"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </motion.span>
                )}

                {/* Clear all filters button */}
                {(roleFilter !== 'all' || statusFilter !== 'all' || searchTerm) && (
                  <motion.button
                    onClick={() => {
                      setRoleFilter('all');
                      setStatusFilter('all');
                      setSearchTerm('');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Limpar filtros
                  </motion.button>
                )}
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {filteredUsers.length} usuários encontrados
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">                  
                    <span>Usuário</span>
                    <svg className="ml-1 w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4" />
                    </svg>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Papel / Departamento
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Última Atividade
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm" 
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=f28500&color=ffffff&size=100&font-size=0.4`} 
                            alt={user.name} 
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              e.currentTarget.style.display = 'none';
                              // Add null check and type assertion for nextElementSibling
                              const nextElement = e.currentTarget.nextElementSibling;
                              if (nextElement && nextElement instanceof HTMLElement) {
                                nextElement.style.display = 'flex';
                              }
                            }}
                          />
                          <div 
                            className="h-10 w-10 rounded-full bg-[#f28500]/20 text-[#f28500] flex items-center justify-center font-medium border-2 border-white dark:border-gray-700 shadow-sm" 
                            style={{ display: 'none' }}
                          >
                            {getInitials(user.name)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.role}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{user.department}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${user.status === 'active' ? 'bg-green-500' : user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}`}></span>
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${getStatusBadgeStyle(user.status)}`}>
                          {getStatusLabel(user.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {user.lastActive}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-1.5 bg-orange-50 text-[#f28500] rounded-md hover:bg-orange-100 transition-colors dark:bg-orange-900/20 dark:hover:bg-orange-900/40 dark:text-orange-400"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center py-6">
                      <svg className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="text-base">Nenhum usuário encontrado</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tente ajustar os filtros de busca</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > usersPerPage && (
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-center mt-6 px-1 space-y-3 sm:space-y-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
              <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>
                Mostrando <span className="font-medium">{indexOfFirstUser + 1}</span> a <span className="font-medium">{Math.min(indexOfLastUser, filteredUsers.length)}</span> de{' '}
                <span className="font-medium">{filteredUsers.length}</span> usuários
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                title="Primeira página"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                title="Página anterior"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1;
                // Show only limited number of page buttons to avoid overflow
                if (
                  page === 1 || // Always show first page
                  page === totalPages || // Always show last page
                  (page >= currentPage - 1 && page <= currentPage + 1) // Show pages around current page
                ) {
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-md flex items-center justify-center
                        ${currentPage === page ? 'bg-[#f28500] text-white font-medium' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30'}`}
                    >
                      {page}
                    </motion.button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  // Show ellipsis for page ranges
                  return <span key={i} className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400">...</span>;
                }
                return null;
              })}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                title="Próxima página"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                title="Última página"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

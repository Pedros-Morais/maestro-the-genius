"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const pathname = usePathname();
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };
  
  // Update active item based on current path
  useEffect(() => {
    const path = pathname || '/';
    const matchedItem = navItems.find((item) => {
      if (item.href === '/') {
        return path === '/';
      }
      return path.startsWith(item.href);
    });
    if (matchedItem) {
      setActiveItem(matchedItem.name);
    }
  }, [pathname]);

  const navItems = [
    {
      name: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
          <rect x="3" y="3" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="2" />
          <rect x="14" y="3" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="2" />
          <rect x="14" y="12" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="2" />
          <rect x="3" y="16" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      href: '/'
    },
    {
      name: 'Repos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      href: '/dashboard/repos'
    },
    {
      name: 'Usuarios',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      href: '/usuarios'
    },
    {
      name: 'Pipelines',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      href: '/pipelines'
    },
    {
      name: 'Integracoes',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      href: '/integracoes'
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <motion.aside 
        initial={{ width: collapsed ? 80 : 256 }}
        animate={{ width: collapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`bg-white dark:bg-gray-800 shadow-lg flex flex-col overflow-hidden backdrop-blur-sm bg-white/70 dark:bg-black/30 border border-white/20`}
      >
        {/* Logo and collapse button */}
        <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div 
                key="expanded-logo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-2"
              >
                <motion.div 
                  className="h-8 w-8 rounded-md bg-[#f28500] flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white font-bold text-lg">D</span>
                </motion.div>
                <motion.h1 
                  className="font-bold text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                Maestro 
                </motion.h1>
              </motion.div>
            ) : (
              <motion.div 
                key="collapsed-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="mx-auto"
              >
                <motion.div 
                  className="h-8 w-8 rounded-md bg-[#f28500] flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-white font-bold text-lg">D</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-orange-50 dark:hover:bg-orange-900/30"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 237, 213, 0.7)", boxShadow: "0 0 5px rgba(242, 133, 0, 0.3)" }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence mode="wait">
              {collapsed ? (
                <motion.svg 
                  key="expand-icon"
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  className="w-5 h-5"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </motion.svg>
              ) : (
                <motion.svg 
                  key="collapse-icon"
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  className="w-5 h-5"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <motion.ul 
            className="space-y-1 px-3"
            variants={{
              open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 }
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
              }
            }}
            initial="closed"
            animate="open"
          >
            {navItems.map((item, index) => (
              <motion.li 
                key={item.name}
                variants={{
                  open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      y: { stiffness: 1000, velocity: -100 }
                    }
                  },
                  closed: {
                    y: 50,
                    opacity: 0,
                    transition: {
                      y: { stiffness: 1000 }
                    }
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <motion.div role="button"
                    className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} p-3 rounded-lg ${activeItem === item.name ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : ''}`}
                    whileHover={{
                      backgroundColor: activeItem === item.name ? '' : 'rgba(255, 237, 213, 0.5)', // Light orange background
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.2 },
                      ...(item.name === 'Dashboard' && {
                        rotate: [0, -15, 15, -15, 0],
                        transition: { duration: 0.5, repeat: 1 }
                      }),
                      ...(item.name === 'Repos' && {
                        y: [0, -5, 0, -5, 0],
                        transition: { duration: 0.6, repeat: 1 }
                      }),
                      ...(item.name === 'Usuarios' && {
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.2, 1.1, 1.2, 1.1],
                        transition: { duration: 0.7 }
                      }),
                      ...(item.name === 'Pipelines' && {
                        scale: [1, 1.3, 1, 1.3, 1],
                        transition: { duration: 0.5, repeat: 1 }
                      }),
                      ...(item.name === 'Integracoes' && {
                        rotateY: 180,
                        transition: { duration: 0.6 }
                      })
                    }}
                    animate={activeItem === item.name ? { 
                      scale: [1, 1.2, 1],
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    } : {}}
                  >
                    {item.icon}
                  </motion.div>
                  
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span 
                        className="ml-3 font-medium"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  </motion.div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* User profile/settings */}
        <motion.div 
          className={`border-t dark:border-gray-700 p-4 ${collapsed ? 'flex justify-center' : ''}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="flex items-center justify-between w-full"
          >
            <motion.div className="flex items-center space-x-3"
              whileHover={{ x: 3, transition: { duration: 0.2 } }}
            >
            <motion.div 
              className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center overflow-hidden relative"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 12px rgba(242, 133, 0, 0.7)", /* Orange shadow */
                rotate: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-orange-400 dark:bg-orange-700 opacity-0"  
                whileHover={{ 
                  opacity: 0.3, 
                  scale: 1.5,
                  rotate: 45,
                  transition: { duration: 0.5 } 
                }}
              />
              <motion.span 
                className="text-[#f28500] dark:text-orange-300 font-medium relative z-10"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                whileHover={{ 
                  scale: 1.3,
                  rotate: [0, 10, -10, 10, -10, 0],
                  transition: { duration: 0.6 }
                }}
              >
                U
              </motion.span>
            </motion.div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div 
                  className="flex-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p 
                    className="text-sm font-medium truncate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    User Name
                  </motion.p>
                  <motion.p 
                    className="text-xs text-gray-500 dark:text-gray-400 truncate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    user@example.com
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
            </motion.div>
            
            {!collapsed && (
              <motion.button
                onClick={handleLogout}
                className="p-2 rounded-md hover:bg-[#FFF8E1]/70 dark:hover:bg-gray-700/50 text-gray-500 hover:text-[#f28500] dark:text-gray-400 dark:hover:text-orange-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.aside>

      {/* Main content */}
      <motion.main 
        className="flex-1 p-8 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {children}
      </motion.main>
    </div>
  );
}

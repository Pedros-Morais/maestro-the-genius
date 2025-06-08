import { users } from './users';

export interface Repo {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  createdAt: string;
  updatedAt: string;
  owner: string; // User ID
  contributors: string[]; // User IDs
  private: boolean;
  tags: string[];
  url: string;
  connected: boolean; // Whether the repo is connected to our system
  issues?: number; // Number of open issues
}

export const repos: Repo[] = [
  {
    id: 'r1',
    name: 'frontend-app',
    description: 'Main frontend application using React and TypeScript',
    language: 'TypeScript',
    stars: 48,
    forks: 12,
    createdAt: '2024-01-20T10:15:22Z',
    updatedAt: '2025-06-06T14:45:33Z',
    owner: 'u1',
    contributors: ['u1', 'u2', 'u4'],
    private: false,
    tags: ['react', 'typescript', 'frontend'],
    url: 'https://github.com/org/frontend-app',
    connected: true,
    issues: 15
  },
  {
    id: 'r2',
    name: 'api-service',
    description: 'Backend API service with Node.js and Express',
    language: 'JavaScript',
    stars: 32,
    forks: 8,
    createdAt: '2024-01-22T09:12:34Z',
    updatedAt: '2025-06-07T11:22:45Z',
    owner: 'u1',
    contributors: ['u1', 'u3', 'u4'],
    private: true,
    tags: ['nodejs', 'express', 'api', 'backend'],
    url: 'https://github.com/org/api-service',
    connected: true,
    issues: 8
  },
  {
    id: 'r3',
    name: 'mobile-app',
    description: 'Mobile application with React Native',
    language: 'TypeScript',
    stars: 28,
    forks: 6,
    createdAt: '2024-01-28T14:35:22Z',
    updatedAt: '2025-06-05T09:34:12Z',
    owner: 'u2',
    contributors: ['u1', 'u2', 'u5'],
    private: false,
    tags: ['react-native', 'mobile', 'typescript'],
    url: 'https://github.com/org/mobile-app',
    connected: true,
    issues: 7
  },
  {
    id: 'r4',
    name: 'data-pipeline',
    description: 'Data processing pipeline using Apache Airflow',
    language: 'Python',
    stars: 15,
    forks: 3,
    createdAt: '2024-02-10T11:22:33Z',
    updatedAt: '2025-06-04T10:12:56Z',
    owner: 'u3',
    contributors: ['u3', 'u4'],
    private: true,
    tags: ['python', 'airflow', 'data', 'pipeline'],
    url: 'https://github.com/org/data-pipeline',
    connected: true,
    issues: 12
  },
  {
    id: 'r5',
    name: 'ui-components',
    description: 'Shared UI component library',
    language: 'TypeScript',
    stars: 25,
    forks: 7,
    createdAt: '2024-02-15T08:45:12Z',
    updatedAt: '2025-06-06T16:22:33Z',
    owner: 'u4',
    contributors: ['u1', 'u2', 'u5'],
    private: false,
    tags: ['ui', 'components', 'react', 'typescript'],
    url: 'https://github.com/org/ui-components',
    connected: true,
    issues: 3
  },
  {
    id: 'r6',
    name: 'db-service',
    description: 'Database management service with MongoDB',
    language: 'JavaScript',
    stars: 18,
    forks: 5,
    createdAt: '2024-03-05T13:42:15Z',
    updatedAt: '2025-06-02T11:33:42Z',
    owner: 'u3',
    contributors: ['u3', 'u5'],
    private: false,
    tags: ['mongodb', 'database', 'javascript'],
    url: 'https://github.com/org/db-service',
    connected: false,
    issues: 22
  },
  {
    id: 'r7',
    name: 'analytics-service',
    description: 'User analytics and reporting service',
    language: 'Go',
    stars: 12,
    forks: 2,
    createdAt: '2024-04-10T09:22:45Z',
    updatedAt: '2025-05-28T16:44:12Z',
    owner: 'u5',
    contributors: ['u3', 'u5'],
    private: true,
    tags: ['analytics', 'go', 'reporting'],
    url: 'https://github.com/org/analytics-service',
    connected: false,
    issues: 9
  }
];

export const branches = [
  { id: 'b1', repoId: 'r1', name: 'main', isDefault: true },
  { id: 'b2', repoId: 'r1', name: 'develop', isDefault: false },
  { id: 'b3', repoId: 'r1', name: 'feature/new-auth', isDefault: false },
  { id: 'b4', repoId: 'r2', name: 'main', isDefault: true },
  { id: 'b5', repoId: 'r2', name: 'develop', isDefault: false },
  { id: 'b6', repoId: 'r3', name: 'main', isDefault: true },
  { id: 'b7', repoId: 'r4', name: 'main', isDefault: true },
  { id: 'b8', repoId: 'r4', name: 'feature/stream-processing', isDefault: false },
  { id: 'b9', repoId: 'r5', name: 'main', isDefault: true },
  { id: 'b10', repoId: 'r5', name: 'v2-components', isDefault: false }
];

// Calculate some statistics based on the mock data
export const getRepoStatistics = () => {
  return {
    totalRepos: repos.length,
    totalPublicRepos: repos.filter(repo => !repo.private).length,
    totalPrivateRepos: repos.filter(repo => repo.private).length,
    languageDistribution: repos.reduce((acc, repo) => {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    mostActiveRepo: repos.reduce((most, repo) => 
      new Date(repo.updatedAt) > new Date(most.updatedAt) ? repo : most, repos[0]),
    mostPopularRepo: repos.reduce((most, repo) => 
      repo.stars > most.stars ? repo : most, repos[0]),
  };
};

// Get repos a specific user has access to
export const getReposForUser = (userId: string) => {
  return repos.filter(repo => 
    repo.owner === userId || repo.contributors.includes(userId)
  );
};

/**
 * Get all repositories
 * @returns All repositories in the system
 */
export const getAllRepos = () => {
  return repos;
};

/**
 * Get all connected repositories
 * @returns All repositories that are connected to the system
 */
export const getConnectedRepos = () => {
  return repos.filter(repo => repo.connected);
};

/**
 * Get all repositories available for connection
 * @returns All repositories that are not yet connected to the system
 */
export const getAvailableRepos = () => {
  return repos.filter(repo => !repo.connected);
};

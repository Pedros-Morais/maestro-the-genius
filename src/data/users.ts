export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'developer' | 'manager' | 'guest';
  createdAt: string;
  lastActive: string;
  teams: string[];
  repoAccess: string[]; 
}

export const users: User[] = [
  {
    id: 'u1',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    role: 'admin',
    createdAt: '2024-01-15T09:24:38Z',
    lastActive: '2025-06-07T15:30:22Z',
    teams: ['core', 'infrastructure'],
    repoAccess: ['r1', 'r2', 'r3', 'r4', 'r5']
  },
  {
    id: 'u2',
    name: 'Jamie Chen',
    email: 'jamie@example.com',
    avatar: 'https://i.pravatar.cc/150?u=jamie',
    role: 'developer',
    createdAt: '2024-02-10T14:38:12Z',
    lastActive: '2025-06-07T16:45:18Z',
    teams: ['frontend', 'mobile'],
    repoAccess: ['r1', 'r3', 'r5']
  },
  {
    id: 'u3',
    name: 'Taylor Swift',
    email: 'taylor@example.com',
    avatar: 'https://i.pravatar.cc/150?u=taylor',
    role: 'developer',
    createdAt: '2024-03-05T11:12:45Z',
    lastActive: '2025-06-06T12:15:32Z',
    teams: ['backend', 'data'],
    repoAccess: ['r2', 'r4']
  },
  {
    id: 'u4',
    name: 'Robin Das',
    email: 'robin@example.com',
    avatar: 'https://i.pravatar.cc/150?u=robin',
    role: 'manager',
    createdAt: '2024-01-20T08:34:19Z',
    lastActive: '2025-06-07T14:22:56Z',
    teams: ['infrastructure', 'security'],
    repoAccess: ['r1', 'r2', 'r3', 'r4', 'r5']
  },
  {
    id: 'u5',
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    avatar: 'https://i.pravatar.cc/150?u=jordan',
    role: 'guest',
    createdAt: '2024-05-12T16:48:33Z',
    lastActive: '2025-06-05T09:11:47Z',
    teams: ['frontend'],
    repoAccess: ['r3']
  }
];

export const roles = [
  {
    id: 'admin',
    name: 'Administrator',
    permissions: ['read', 'write', 'deploy', 'settings', 'billing', 'user-management']
  },
  {
    id: 'developer',
    name: 'Developer',
    permissions: ['read', 'write', 'deploy']
  },
  {
    id: 'manager',
    name: 'Project Manager',
    permissions: ['read', 'settings', 'billing']
  },
  {
    id: 'guest',
    name: 'Guest User',
    permissions: ['read']
  }
];

export const teams = [
  { id: 'core', name: 'Core Team', members: ['u1', 'u4'] },
  { id: 'frontend', name: 'Frontend Team', members: ['u2', 'u5'] },
  { id: 'backend', name: 'Backend Team', members: ['u3'] },
  { id: 'mobile', name: 'Mobile Team', members: ['u2'] },
  { id: 'infrastructure', name: 'Infrastructure Team', members: ['u1', 'u4'] },
  { id: 'data', name: 'Data Team', members: ['u3'] },
  { id: 'security', name: 'Security Team', members: ['u4'] }
];

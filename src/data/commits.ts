import { users } from './users';
import { repos, branches } from './repos';

export interface Commit {
  id: string;
  hash: string;
  message: string;
  authorId: string; // User ID
  repoId: string; // Repository ID
  branchId: string; // Branch ID
  createdAt: string;
  filesChanged: number;
  additions: number;
  deletions: number;
  status: 'success' | 'failed' | 'pending';
  pipeline?: string; // Pipeline ID that was triggered (if any)
}

export const commits: Commit[] = [
  {
    id: 'c1',
    hash: 'a1b2c3d4e5f6g7h8i9j0',
    message: 'Fix authentication bug in login flow',
    authorId: 'u2',
    repoId: 'r1',
    branchId: 'b1',
    createdAt: '2025-06-07T14:22:34Z',
    filesChanged: 3,
    additions: 24,
    deletions: 12,
    status: 'success',
    pipeline: 'p1'
  },
  {
    id: 'c2',
    hash: 'b2c3d4e5f6g7h8i9j0k1',
    message: 'Update README with new installation instructions',
    authorId: 'u1',
    repoId: 'r1',
    branchId: 'b1',
    createdAt: '2025-06-06T11:45:22Z',
    filesChanged: 1,
    additions: 15,
    deletions: 7,
    status: 'success'
  },
  {
    id: 'c3',
    hash: 'c3d4e5f6g7h8i9j0k1l2',
    message: 'Add new API endpoint for user profiles',
    authorId: 'u3',
    repoId: 'r2',
    branchId: 'b4',
    createdAt: '2025-06-07T09:33:11Z',
    filesChanged: 5,
    additions: 87,
    deletions: 12,
    status: 'success',
    pipeline: 'p2'
  },
  {
    id: 'c4',
    hash: 'd4e5f6g7h8i9j0k1l2m3',
    message: 'Fix unit tests for data processing module',
    authorId: 'u3',
    repoId: 'r4',
    branchId: 'b7',
    createdAt: '2025-06-06T16:44:55Z',
    filesChanged: 2,
    additions: 34,
    deletions: 28,
    status: 'failed',
    pipeline: 'p4'
  },
  {
    id: 'c5',
    hash: 'e5f6g7h8i9j0k1l2m3n4',
    message: 'Optimize rendering performance in list views',
    authorId: 'u2',
    repoId: 'r3',
    branchId: 'b6',
    createdAt: '2025-06-05T13:12:44Z',
    filesChanged: 4,
    additions: 56,
    deletions: 43,
    status: 'success',
    pipeline: 'p3'
  },
  {
    id: 'c6',
    hash: 'f6g7h8i9j0k1l2m3n4o5',
    message: 'Add new button component with loading state',
    authorId: 'u5',
    repoId: 'r5',
    branchId: 'b9',
    createdAt: '2025-06-06T10:23:55Z',
    filesChanged: 2,
    additions: 74,
    deletions: 12,
    status: 'success',
    pipeline: 'p5'
  },
  {
    id: 'c7',
    hash: 'g7h8i9j0k1l2m3n4o5p6',
    message: 'Refactor authentication middleware',
    authorId: 'u1',
    repoId: 'r2',
    branchId: 'b5',
    createdAt: '2025-06-05T09:55:33Z',
    filesChanged: 3,
    additions: 45,
    deletions: 39,
    status: 'success',
    pipeline: 'p6'
  },
  {
    id: 'c8',
    hash: 'h8i9j0k1l2m3n4o5p6q7',
    message: 'Update dependencies and fix security vulnerabilities',
    authorId: 'u4',
    repoId: 'r1',
    branchId: 'b2',
    createdAt: '2025-06-05T14:44:22Z',
    filesChanged: 1,
    additions: 12,
    deletions: 12,
    status: 'pending',
    pipeline: 'p7'
  },
  {
    id: 'c9',
    hash: 'i9j0k1l2m3n4o5p6q7r8',
    message: 'Add dark mode support to UI components',
    authorId: 'u2',
    repoId: 'r5',
    branchId: 'b10',
    createdAt: '2025-06-04T11:34:12Z',
    filesChanged: 12,
    additions: 156,
    deletions: 23,
    status: 'success',
    pipeline: 'p8'
  },
  {
    id: 'c10',
    hash: 'j0k1l2m3n4o5p6q7r8s9',
    message: 'Implement real-time notification system',
    authorId: 'u3',
    repoId: 'r4',
    branchId: 'b8',
    createdAt: '2025-06-03T15:22:45Z',
    filesChanged: 8,
    additions: 234,
    deletions: 45,
    status: 'failed',
    pipeline: 'p9'
  }
];

export const getCommitsForRepo = (repoId: string) => {
  return commits.filter(commit => commit.repoId === repoId);
};

export const getCommitsForUser = (userId: string) => {
  return commits.filter(commit => commit.authorId === userId);
};

export const getRecentCommits = (limit = 5) => {
  return [...commits]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

export const getCommitStatistics = () => {
  return {
    totalCommits: commits.length,
    successfulCommits: commits.filter(commit => commit.status === 'success').length,
    failedCommits: commits.filter(commit => commit.status === 'failed').length,
    pendingCommits: commits.filter(commit => commit.status === 'pending').length,
    commitsByRepo: commits.reduce((acc, commit) => {
      acc[commit.repoId] = (acc[commit.repoId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    commitsByUser: commits.reduce((acc, commit) => {
      acc[commit.authorId] = (acc[commit.authorId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    commitsOverTime: commits.reduce((acc, commit) => {
      const date = new Date(commit.createdAt).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
};

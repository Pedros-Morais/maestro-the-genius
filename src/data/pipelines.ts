import { commits } from './commits';
import { repos } from './repos';

export interface Pipeline {
  id: string;
  name: string;
  repoId: string;
  commitId?: string;
  status: 'running' | 'success' | 'failed' | 'canceled';
  startedAt: string;
  finishedAt?: string;
  duration: number; // in seconds
  triggeredBy: string; // User ID
  environment: 'development' | 'staging' | 'production';
  stages: PipelineStage[];
}

export interface PipelineStage {
  id: string;
  name: string;
  status: 'running' | 'success' | 'failed' | 'canceled';
  startedAt: string;
  finishedAt?: string;
  duration: number; // in seconds
}

export const pipelines: Pipeline[] = [
  {
    id: 'p1',
    name: 'Build and Test Frontend',
    repoId: 'r1',
    commitId: 'c1',
    status: 'success',
    startedAt: '2025-06-07T14:23:00Z',
    finishedAt: '2025-06-07T14:28:45Z',
    duration: 345,
    triggeredBy: 'u2',
    environment: 'development',
    stages: [
      {
        id: 'ps1_1',
        name: 'Install Dependencies',
        status: 'success',
        startedAt: '2025-06-07T14:23:00Z',
        finishedAt: '2025-06-07T14:24:30Z',
        duration: 90
      },
      {
        id: 'ps1_2',
        name: 'Lint Code',
        status: 'success',
        startedAt: '2025-06-07T14:24:31Z',
        finishedAt: '2025-06-07T14:25:45Z',
        duration: 74
      },
      {
        id: 'ps1_3',
        name: 'Run Tests',
        status: 'success',
        startedAt: '2025-06-07T14:25:46Z',
        finishedAt: '2025-06-07T14:27:15Z',
        duration: 89
      },
      {
        id: 'ps1_4',
        name: 'Build',
        status: 'success',
        startedAt: '2025-06-07T14:27:16Z',
        finishedAt: '2025-06-07T14:28:45Z',
        duration: 89
      }
    ]
  },
  {
    id: 'p2',
    name: 'API Service Pipeline',
    repoId: 'r2',
    commitId: 'c3',
    status: 'success',
    startedAt: '2025-06-07T09:33:45Z',
    finishedAt: '2025-06-07T09:38:22Z',
    duration: 277,
    triggeredBy: 'u3',
    environment: 'development',
    stages: [
      {
        id: 'ps2_1',
        name: 'Install Dependencies',
        status: 'success',
        startedAt: '2025-06-07T09:33:45Z',
        finishedAt: '2025-06-07T09:34:30Z',
        duration: 45
      },
      {
        id: 'ps2_2',
        name: 'Run Tests',
        status: 'success',
        startedAt: '2025-06-07T09:34:31Z',
        finishedAt: '2025-06-07T09:36:45Z',
        duration: 134
      },
      {
        id: 'ps2_3',
        name: 'Build',
        status: 'success',
        startedAt: '2025-06-07T09:36:46Z',
        finishedAt: '2025-06-07T09:38:22Z',
        duration: 96
      }
    ]
  },
  {
    id: 'p3',
    name: 'Mobile App Pipeline',
    repoId: 'r3',
    commitId: 'c5',
    status: 'success',
    startedAt: '2025-06-05T13:13:00Z',
    finishedAt: '2025-06-05T13:22:35Z',
    duration: 575,
    triggeredBy: 'u2',
    environment: 'staging',
    stages: [
      {
        id: 'ps3_1',
        name: 'Install Dependencies',
        status: 'success',
        startedAt: '2025-06-05T13:13:00Z',
        finishedAt: '2025-06-05T13:15:45Z',
        duration: 165
      },
      {
        id: 'ps3_2',
        name: 'Run Tests',
        status: 'success',
        startedAt: '2025-06-05T13:15:46Z',
        finishedAt: '2025-06-05T13:18:22Z',
        duration: 156
      },
      {
        id: 'ps3_3',
        name: 'Build iOS',
        status: 'success',
        startedAt: '2025-06-05T13:18:23Z',
        finishedAt: '2025-06-05T13:20:15Z',
        duration: 112
      },
      {
        id: 'ps3_4',
        name: 'Build Android',
        status: 'success',
        startedAt: '2025-06-05T13:20:16Z',
        finishedAt: '2025-06-05T13:22:35Z',
        duration: 139
      }
    ]
  },
  {
    id: 'p4',
    name: 'Data Pipeline Build',
    repoId: 'r4',
    commitId: 'c4',
    status: 'failed',
    startedAt: '2025-06-06T16:45:10Z',
    finishedAt: '2025-06-06T16:48:30Z',
    duration: 200,
    triggeredBy: 'u3',
    environment: 'development',
    stages: [
      {
        id: 'ps4_1',
        name: 'Install Dependencies',
        status: 'success',
        startedAt: '2025-06-06T16:45:10Z',
        finishedAt: '2025-06-06T16:46:25Z',
        duration: 75
      },
      {
        id: 'ps4_2',
        name: 'Run Tests',
        status: 'failed',
        startedAt: '2025-06-06T16:46:26Z',
        finishedAt: '2025-06-06T16:48:30Z',
        duration: 124
      }
    ]
  },
  {
    id: 'p5',
    name: 'UI Components Build',
    repoId: 'r5',
    commitId: 'c6',
    status: 'success',
    startedAt: '2025-06-06T10:24:10Z',
    finishedAt: '2025-06-06T10:28:55Z',
    duration: 285,
    triggeredBy: 'u5',
    environment: 'development',
    stages: [
      {
        id: 'ps5_1',
        name: 'Install Dependencies',
        status: 'success',
        startedAt: '2025-06-06T10:24:10Z',
        finishedAt: '2025-06-06T10:25:30Z',
        duration: 80
      },
      {
        id: 'ps5_2',
        name: 'Lint Code',
        status: 'success',
        startedAt: '2025-06-06T10:25:31Z',
        finishedAt: '2025-06-06T10:26:45Z',
        duration: 74
      },
      {
        id: 'ps5_3',
        name: 'Run Tests',
        status: 'success',
        startedAt: '2025-06-06T10:26:46Z',
        finishedAt: '2025-06-06T10:28:05Z',
        duration: 79
      },
      {
        id: 'ps5_4',
        name: 'Build Storybook',
        status: 'success',
        startedAt: '2025-06-06T10:28:06Z',
        finishedAt: '2025-06-06T10:28:55Z',
        duration: 49
      }
    ]
  },
  {
    id: 'p6',
    name: 'API Service Deployment',
    repoId: 'r2',
    commitId: 'c7',
    status: 'success',
    startedAt: '2025-06-05T09:56:00Z',
    finishedAt: '2025-06-05T10:02:35Z',
    duration: 395,
    triggeredBy: 'u1',
    environment: 'production',
    stages: [
      {
        id: 'ps6_1',
        name: 'Install Dependencies',
        status: 'success',
        startedAt: '2025-06-05T09:56:00Z',
        finishedAt: '2025-06-05T09:57:15Z',
        duration: 75
      },
      {
        id: 'ps6_2',
        name: 'Run Tests',
        status: 'success',
        startedAt: '2025-06-05T09:57:16Z',
        finishedAt: '2025-06-05T09:59:30Z',
        duration: 134
      },
      {
        id: 'ps6_3',
        name: 'Build',
        status: 'success',
        startedAt: '2025-06-05T09:59:31Z',
        finishedAt: '2025-06-05T10:01:15Z',
        duration: 104
      },
      {
        id: 'ps6_4',
        name: 'Deploy',
        status: 'success',
        startedAt: '2025-06-05T10:01:16Z',
        finishedAt: '2025-06-05T10:02:35Z',
        duration: 79
      }
    ]
  },
  {
    id: 'p7',
    name: 'Frontend CI',
    repoId: 'r1',
    commitId: 'c8',
    status: 'running',
    startedAt: '2025-06-05T14:44:30Z',
    duration: 0,
    triggeredBy: 'u4',
    environment: 'development',
    stages: [
      {
        id: 'ps7_1',
        name: 'Install Dependencies',
        status: 'success',
        startedAt: '2025-06-05T14:44:30Z',
        finishedAt: '2025-06-05T14:46:00Z',
        duration: 90
      },
      {
        id: 'ps7_2',
        name: 'Run Tests',
        status: 'running',
        startedAt: '2025-06-05T14:46:01Z',
        duration: 0
      }
    ]
  },
  {
    id: 'p8',
    name: 'UI Components Dark Mode',
    repoId: 'r5',
    commitId: 'c9',
    status: 'success',
    startedAt: '2025-06-04T11:34:30Z',
    finishedAt: '2025-06-04T11:41:22Z',
    duration: 412,
    triggeredBy: 'u2',
    environment: 'staging',
    stages: [
      {
        id: 'ps8_1',
        name: 'Install Dependencies',
        status: 'success',
        startedAt: '2025-06-04T11:34:30Z',
        finishedAt: '2025-06-04T11:36:00Z',
        duration: 90
      },
      {
        id: 'ps8_2',
        name: 'Lint Code',
        status: 'success',
        startedAt: '2025-06-04T11:36:01Z',
        finishedAt: '2025-06-04T11:37:30Z',
        duration: 89
      },
      {
        id: 'ps8_3',
        name: 'Run Tests',
        status: 'success',
        startedAt: '2025-06-04T11:37:31Z',
        finishedAt: '2025-06-04T11:39:15Z',
        duration: 104
      },
      {
        id: 'ps8_4',
        name: 'Build',
        status: 'success',
        startedAt: '2025-06-04T11:39:16Z',
        finishedAt: '2025-06-04T11:41:22Z',
        duration: 126
      }
    ]
  },
  {
    id: 'p9',
    name: 'Data Pipeline Deployment',
    repoId: 'r4',
    commitId: 'c10',
    status: 'failed',
    startedAt: '2025-06-03T15:23:10Z',
    finishedAt: '2025-06-03T15:28:45Z',
    duration: 335,
    triggeredBy: 'u3',
    environment: 'production',
    stages: [
      {
        id: 'ps9_1',
        name: 'Install Dependencies',
        status: 'success',
        startedAt: '2025-06-03T15:23:10Z',
        finishedAt: '2025-06-03T15:24:45Z',
        duration: 95
      },
      {
        id: 'ps9_2',
        name: 'Run Tests',
        status: 'success',
        startedAt: '2025-06-03T15:24:46Z',
        finishedAt: '2025-06-03T15:26:30Z',
        duration: 104
      },
      {
        id: 'ps9_3',
        name: 'Build',
        status: 'success',
        startedAt: '2025-06-03T15:26:31Z',
        finishedAt: '2025-06-03T15:28:00Z',
        duration: 89
      },
      {
        id: 'ps9_4',
        name: 'Deploy',
        status: 'failed',
        startedAt: '2025-06-03T15:28:01Z',
        finishedAt: '2025-06-03T15:28:45Z',
        duration: 44
      }
    ]
  }
];

// Calculate pipeline statistics
export const getPipelineStatistics = () => {
  return {
    totalPipelines: pipelines.length,
    successfulPipelines: pipelines.filter(pipeline => pipeline.status === 'success').length,
    failedPipelines: pipelines.filter(pipeline => pipeline.status === 'failed').length,
    runningPipelines: pipelines.filter(pipeline => pipeline.status === 'running').length,
    averageDuration: pipelines.reduce((total, pipeline) => total + pipeline.duration, 0) / pipelines.length,
    pipelinesByRepo: pipelines.reduce((acc, pipeline) => {
      acc[pipeline.repoId] = (acc[pipeline.repoId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    pipelinesByEnvironment: pipelines.reduce((acc, pipeline) => {
      acc[pipeline.environment] = (acc[pipeline.environment] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    pipelinesByStatus: pipelines.reduce((acc, pipeline) => {
      acc[pipeline.status] = (acc[pipeline.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
};

// Get pipelines related to a specific repository
export const getPipelinesForRepo = (repoId: string) => {
  return pipelines.filter(pipeline => pipeline.repoId === repoId);
};

// Get pipelines triggered by a specific user
export const getPipelinesTriggeredByUser = (userId: string) => {
  return pipelines.filter(pipeline => pipeline.triggeredBy === userId);
};

// Get all pipelines
export const getAllPipelines = () => {
  return pipelines;
};

// Get most recent pipelines
export const getRecentPipelines = (limit = 5) => {
  return [...pipelines]
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    .slice(0, limit);
};

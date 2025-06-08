export interface Integration {
  id: string;
  name: string;
  type: 'monitoring' | 'ci-cd' | 'communication' | 'analytics' | 'cloud' | 'security';
  status: 'active' | 'inactive' | 'error';
  connectedAt: string;
  lastSyncAt: string;
  connectionStrength: number; // 0 to 100
  logo: string; // Icon identifier
  connectedRepos: string[]; // IDs of repos connected to this integration
  connectedBy: string; // User ID
  settings: Record<string, any>;
}

export const integrations: Integration[] = [
  {
    id: 'i1',
    name: 'GitHub',
    type: 'ci-cd',
    status: 'active',
    connectedAt: '2024-01-22T10:15:32Z',
    lastSyncAt: '2025-06-07T15:30:22Z',
    connectionStrength: 95,
    logo: 'github',
    connectedRepos: ['r1', 'r2', 'r3', 'r4', 'r5'],
    connectedBy: 'u1',
    settings: {
      webhooksEnabled: true,
      autoSync: true,
      syncInterval: 300 // seconds
    }
  },
  {
    id: 'i2',
    name: 'AWS',
    type: 'cloud',
    status: 'active',
    connectedAt: '2024-01-25T14:22:45Z',
    lastSyncAt: '2025-06-07T12:45:18Z',
    connectionStrength: 92,
    logo: 'aws',
    connectedRepos: ['r2', 'r4'],
    connectedBy: 'u1',
    settings: {
      region: 'us-west-2',
      services: ['ec2', 's3', 'lambda', 'rds']
    }
  },
  {
    id: 'i3',
    name: 'Slack',
    type: 'communication',
    status: 'active',
    connectedAt: '2024-02-10T11:30:15Z',
    lastSyncAt: '2025-06-07T16:15:33Z',
    connectionStrength: 98,
    logo: 'slack',
    connectedRepos: ['r1', 'r2', 'r3', 'r4', 'r5'],
    connectedBy: 'u4',
    settings: {
      channels: ['#deployments', '#alerts', '#general'],
      notifyOnSuccess: true,
      notifyOnFailure: true
    }
  },
  {
    id: 'i4',
    name: 'Datadog',
    type: 'monitoring',
    status: 'active',
    connectedAt: '2024-03-05T09:45:22Z',
    lastSyncAt: '2025-06-07T14:10:45Z',
    connectionStrength: 87,
    logo: 'datadog',
    connectedRepos: ['r1', 'r2'],
    connectedBy: 'u4',
    settings: {
      metricsEnabled: true,
      logsEnabled: true,
      apmEnabled: true,
      alertingEnabled: true
    }
  },
  {
    id: 'i5',
    name: 'Snyk',
    type: 'security',
    status: 'error',
    connectedAt: '2024-04-10T13:22:45Z',
    lastSyncAt: '2025-06-05T10:15:33Z',
    connectionStrength: 45,
    logo: 'docker',
    connectedRepos: ['r1', 'r3', 'r5'],
    connectedBy: 'u1',
    settings: {
      scanOnPush: true,
      vulnerabilityThreshold: 'medium',
      autoFix: false
    }
  },
  {
    id: 'i6',
    name: 'Google Analytics',
    type: 'analytics',
    status: 'inactive',
    connectedAt: '2024-02-20T15:30:12Z',
    lastSyncAt: '2025-05-20T11:45:22Z',
    connectionStrength: 0,
    logo: 'analytics',
    connectedRepos: ['r1', 'r3'],
    connectedBy: 'u2',
    settings: {
      trackingId: 'UA-12345678-1',
      anonymizeIp: true
    }
  },
  {
    id: 'i7',
    name: 'Docker Hub',
    type: 'ci-cd',
    status: 'active',
    connectedAt: '2024-03-15T10:25:33Z',
    lastSyncAt: '2025-06-06T13:45:22Z',
    connectionStrength: 89,
    logo: 'docker-hub',
    connectedRepos: ['r2', 'r4'],
    connectedBy: 'u3',
    settings: {
      autoPublish: true,
      tagFormat: '{version}'
    }
  }
];

// Get integrations by status
export const getIntegrationsByStatus = (status: 'active' | 'inactive' | 'error') => {
  return integrations.filter(integration => integration.status === status);
};

// Get integrations connected to a specific repository
export const getIntegrationsForRepo = (repoId: string) => {
  return integrations.filter(integration => 
    integration.connectedRepos.includes(repoId)
  );
};

// Get integration statistics
export const getIntegrationStatistics = () => {
  return {
    totalIntegrations: integrations.length,
    activeIntegrations: integrations.filter(i => i.status === 'active').length,
    inactiveIntegrations: integrations.filter(i => i.status === 'inactive').length,
    errorIntegrations: integrations.filter(i => i.status === 'error').length,
    integrationsByType: integrations.reduce((acc, integration) => {
      acc[integration.type] = (acc[integration.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    averageConnectionStrength: integrations.reduce((sum, i) => sum + i.connectionStrength, 0) / integrations.length
  };
};

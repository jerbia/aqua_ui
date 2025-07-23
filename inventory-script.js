// Inventory Page JavaScript

// Mock data for different resource types
const mockData = {
    images: [
        {
            id: 1,
            name: '066635153087.dkr.ecr.us-east-1.amazonaws.com/nginx:1.21.6',
            securityFindings: { critical: 0, high: 1, medium: 2, low: 1, negligible: 0 },
            compliance: 'Compliant',
            registry: 'Host Images',
            registryType: 'API',
            architecture: 'amd64',
            aquaLabels: '',
            dockerId: 'sha256:71e920abf...',
            registryName: 'docker.io',
            repositoryName: 'nginx'
        },
        {
            id: 2,
            name: '066635153087.dkr.ecr.us-east-1.amazonaws.com/alpine:3.15',
            securityFindings: { critical: 0, high: 0, medium: 1, low: 2, negligible: 1 },
            compliance: 'Compliant',
            registry: 'Host Images',
            registryType: 'API',
            architecture: 'amd64',
            aquaLabels: '',
            dockerId: 'sha256:a695beb72...',
            registryName: 'docker.io',
            repositoryName: 'alpine'
        },
        {
            id: 3,
            name: '066635153087.dkr.ecr.us-east-1.amazonaws.com/ubuntu:20.04',
            securityFindings: { critical: 0, high: 7, medium: 11, low: 1, negligible: 0 },
            compliance: 'Compliant',
            registry: 'Host Images',
            registryType: 'API',
            architecture: 'amd64',
            aquaLabels: '',
            dockerId: 'sha256:9f5f094039...',
            registryName: 'docker.io',
            repositoryName: 'ubuntu'
        },
        {
            id: 4,
            name: '066635153087.dkr.ecr.us-east-1.amazonaws.com/postgres:13',
            securityFindings: { critical: 0, high: 7, medium: 11, low: 1, negligible: 0 },
            compliance: 'Compliant',
            registry: 'Host Images',
            registryType: 'API',
            architecture: 'amd64',
            aquaLabels: '',
            dockerId: 'sha256:61e1a92f2...',
            registryName: 'docker.io',
            repositoryName: 'postgres'
        },
        {
            id: 5,
            name: '066635153087.dkr.ecr.us-east-1.amazonaws.com/redis:6.2',
            securityFindings: { critical: 0, high: 12, medium: 21, low: 58, negligible: 1 },
            compliance: 'Compliant',
            registry: 'Host Images',
            registryType: 'API',
            architecture: 'amd64',
            aquaLabels: '',
            dockerId: 'sha256:86800e253...',
            registryName: 'docker.io',
            repositoryName: 'redis'
        },
        {
            id: 6,
            name: '066635153087.dkr.ecr.us-east-1.amazonaws.com/node:16-alpine',
            securityFindings: { critical: 0, high: 2, medium: 6, low: 38, negligible: 0 },
            compliance: 'Compliant',
            registry: 'Host Images',
            registryType: 'API',
            architecture: 'amd64',
            aquaLabels: '',
            dockerId: 'sha256:59728c6d6...',
            registryName: 'docker.io',
            repositoryName: 'node'
        },
        {
            id: 7,
            name: 'gcr.io/my-project/web-app:v1.2.3',
            securityFindings: { critical: 1, high: 3, medium: 8, low: 12, negligible: 2 },
            compliance: 'Non-Compliant',
            registry: 'Google Registry',
            registryType: 'Registry',
            architecture: 'amd64',
            aquaLabels: 'production',
            dockerId: 'sha256:abc123def...',
            registryName: 'gcr.io',
            repositoryName: 'web-app'
        },
        {
            id: 8,
            name: 'quay.io/company/microservice:latest',
            securityFindings: { critical: 0, high: 1, medium: 3, low: 5, negligible: 1 },
            compliance: 'Compliant',
            registry: 'Quay Registry',
            registryType: 'Registry',
            architecture: 'arm64',
            aquaLabels: 'development',
            dockerId: 'sha256:xyz789abc...',
            registryName: 'quay.io',
            repositoryName: 'microservice'
        }
    ],
    containers: [
        {
            id: 1,
            name: 'nginx-deployment-7d8c6d8f9b-xyz12',
            status: 'Running',
            namespace: 'default',
            image: 'nginx:1.21.6',
            node: 'worker-node-1',
            created: '2024-01-15T10:30:00Z'
        },
        {
            id: 2,
            name: 'postgres-db-5f7c8d9e2a-abc34',
            status: 'Running',
            namespace: 'production',
            image: 'postgres:13',
            node: 'worker-node-2',
            created: '2024-01-14T15:22:00Z'
        }
    ],
    vms: [
        {
            id: 1,
            name: 'web-server-01',
            os: 'Ubuntu 20.04',
            status: 'Running',
            ipAddress: '10.0.1.100',
            region: 'us-east-1',
            instanceType: 't3.medium'
        },
        {
            id: 2,
            name: 'db-server-01',
            os: 'Amazon Linux 2',
            status: 'Running',
            ipAddress: '10.0.1.101',
            region: 'us-east-1',
            instanceType: 't3.large'
        }
    ],
    packages: [
        {
            id: 1,
            name: 'OpenSSL',
            version: '1.1.1f',
            type: 'System Package',
            language: 'C/C++',
            ecosystem: 'Ubuntu APT',
            vulnerabilities: { critical: 2, high: 3, medium: 1, low: 0 },
            usedInResources: 45,
            resourceTypes: ['Images', 'Containers', 'VMs'],
            license: 'Apache-2.0',
            lastUpdated: '2024-01-15',
            fixAvailable: true,
            latestVersion: '3.0.8'
        },
        {
            id: 2,
            name: 'Express.js',
            version: '4.17.1',
            type: 'Dependency',
            language: 'JavaScript',
            ecosystem: 'npm',
            vulnerabilities: { critical: 0, high: 1, medium: 2, low: 1 },
            usedInResources: 12,
            resourceTypes: ['Images', 'Functions'],
            license: 'MIT',
            lastUpdated: '2024-01-10',
            fixAvailable: true,
            latestVersion: '4.18.2'
        },
        {
            id: 3,
            name: 'requests',
            version: '2.25.1',
            type: 'Dependency',
            language: 'Python',
            ecosystem: 'PyPI',
            vulnerabilities: { critical: 0, high: 0, medium: 1, low: 3 },
            usedInResources: 28,
            resourceTypes: ['Images', 'Functions', 'Containers'],
            license: 'Apache-2.0',
            lastUpdated: '2024-01-12',
            fixAvailable: true,
            latestVersion: '2.31.0'
        },
        {
            id: 4,
            name: 'Log4j',
            version: '2.14.1',
            type: 'Dependency',
            language: 'Java',
            ecosystem: 'Maven',
            vulnerabilities: { critical: 1, high: 0, medium: 0, low: 0 },
            usedInResources: 8,
            resourceTypes: ['Images', 'Containers'],
            license: 'Apache-2.0',
            lastUpdated: '2024-01-08',
            fixAvailable: true,
            latestVersion: '2.22.1'
        },
        {
            id: 5,
            name: 'curl',
            version: '7.68.0',
            type: 'System Package',
            language: 'C',
            ecosystem: 'Ubuntu APT',
            vulnerabilities: { critical: 0, high: 2, medium: 1, low: 1 },
            usedInResources: 67,
            resourceTypes: ['Images', 'Containers', 'VMs'],
            license: 'MIT',
            lastUpdated: '2024-01-14',
            fixAvailable: true,
            latestVersion: '8.5.0'
        },
        {
            id: 6,
            name: 'lodash',
            version: '4.17.20',
            type: 'Dependency',
            language: 'JavaScript',
            ecosystem: 'npm',
            vulnerabilities: { critical: 0, high: 0, medium: 1, low: 0 },
            usedInResources: 15,
            resourceTypes: ['Images', 'Functions'],
            license: 'MIT',
            lastUpdated: '2024-01-11',
            fixAvailable: true,
            latestVersion: '4.17.21'
        }
    ],
    aimodels: [
        {
            id: 1,
            name: 'GPT-3.5-turbo',
            version: 'gpt-3.5-turbo-0613',
            provider: 'OpenAI',
            type: 'Language Model',
            deploymentMode: 'Remote API',
            securityRisks: { high: 2, medium: 3, low: 1 },
            usedByApplications: 8,
            applications: ['ChatBot Service', 'Content Generator', 'Code Assistant'],
            publishDate: '2023-06-13',
            lastScanned: '2024-01-15',
            dataPrivacy: 'External Processing',
            complianceStatus: 'Requires Review',
            costPerMonth: '$450',
            requestsPerDay: 12500
        },
        {
            id: 2,
            name: 'BERT-base-uncased',
            version: 'v1.0',
            provider: 'Hugging Face',
            type: 'Language Model',
            deploymentMode: 'Local',
            securityRisks: { high: 0, medium: 1, low: 2 },
            usedByApplications: 3,
            applications: ['Sentiment Analysis', 'Document Classifier'],
            publishDate: '2023-08-20',
            lastScanned: '2024-01-14',
            dataPrivacy: 'Local Processing',
            complianceStatus: 'Compliant',
            costPerMonth: '$0',
            requestsPerDay: 2800
        },
        {
            id: 3,
            name: 'Claude-2',
            version: 'claude-2.1',
            provider: 'Anthropic',
            type: 'Language Model',
            deploymentMode: 'Remote API',
            securityRisks: { high: 1, medium: 2, low: 1 },
            usedByApplications: 4,
            applications: ['Research Assistant', 'Code Review', 'Documentation'],
            publishDate: '2023-11-21',
            lastScanned: '2024-01-13',
            dataPrivacy: 'External Processing',
            complianceStatus: 'Approved',
            costPerMonth: '$280',
            requestsPerDay: 5600
        },
        {
            id: 4,
            name: 'ResNet-50',
            version: 'v2.0',
            provider: 'Facebook Research',
            type: 'Computer Vision',
            deploymentMode: 'Local',
            securityRisks: { high: 0, medium: 0, low: 1 },
            usedByApplications: 2,
            applications: ['Image Classification', 'Quality Control'],
            publishDate: '2023-05-15',
            lastScanned: '2024-01-12',
            dataPrivacy: 'Local Processing',
            complianceStatus: 'Compliant',
            costPerMonth: '$0',
            requestsPerDay: 1200
        },
        {
            id: 5,
            name: 'Llama-2-7B',
            version: '7b-chat-hf',
            provider: 'Meta',
            type: 'Language Model',
            deploymentMode: 'Local',
            securityRisks: { high: 0, medium: 2, low: 3 },
            usedByApplications: 6,
            applications: ['Internal Chat', 'Content Generation', 'Translation'],
            publishDate: '2023-07-18',
            lastScanned: '2024-01-10',
            dataPrivacy: 'Local Processing',
            complianceStatus: 'Compliant',
            costPerMonth: '$120',
            requestsPerDay: 8900
        }
    ],
    repositories: [
        {
            id: 1,
            name: 'frontend-dashboard',
            fullName: 'aquasec/frontend-dashboard',
            branch: 'main',
            scmProvider: 'GitHub',
            url: 'https://github.com/aquasec/frontend-dashboard',
            language: 'TypeScript',
            secrets: { critical: 0, high: 2, medium: 1, low: 0 },
            securityFindings: { critical: 1, high: 3, medium: 5, low: 2 },
            vulnerabilities: 11,
            compliance: 'Compliant',
            lastCommit: '2024-01-15',
            committer: 'john.doe@company.com',
            commitMessage: 'Fix authentication vulnerability in login component',
            size: '45.2 MB',
            collaborators: 8,
            openPRs: 3,
            branches: 12,
            tags: 25,
            visibility: 'Private'
        },
        {
            id: 2,
            name: 'api-gateway',
            fullName: 'aquasec/api-gateway',
            branch: 'develop',
            scmProvider: 'GitHub',
            url: 'https://github.com/aquasec/api-gateway',
            language: 'Go',
            secrets: { critical: 1, high: 0, medium: 2, low: 1 },
            securityFindings: { critical: 0, high: 2, medium: 8, low: 4 },
            vulnerabilities: 14,
            compliance: 'Non-Compliant',
            lastCommit: '2024-01-14',
            committer: 'jane.smith@company.com',
            commitMessage: 'Add rate limiting middleware for API endpoints',
            size: '28.7 MB',
            collaborators: 12,
            openPRs: 7,
            branches: 18,
            tags: 15,
            visibility: 'Private'
        },
        {
            id: 3,
            name: 'database-schemas',
            fullName: 'aquasec/database-schemas',
            branch: 'master',
            scmProvider: 'GitLab',
            url: 'https://gitlab.com/aquasec/database-schemas',
            language: 'SQL',
            secrets: { critical: 2, high: 1, medium: 0, low: 1 },
            securityFindings: { critical: 2, high: 1, medium: 3, low: 1 },
            vulnerabilities: 7,
            compliance: 'Requires Review',
            lastCommit: '2024-01-13',
            committer: 'mike.wilson@company.com',
            commitMessage: 'Update user permissions table schema',
            size: '12.3 MB',
            collaborators: 5,
            openPRs: 1,
            branches: 8,
            tags: 10,
            visibility: 'Private'
        },
        {
            id: 4,
            name: 'mobile-app',
            fullName: 'aquasec/mobile-app',
            branch: 'feature/oauth-integration',
            scmProvider: 'GitHub',
            url: 'https://github.com/aquasec/mobile-app',
            language: 'React Native',
            secrets: { critical: 0, high: 1, medium: 3, low: 2 },
            securityFindings: { critical: 0, high: 4, medium: 6, low: 3 },
            vulnerabilities: 13,
            compliance: 'Compliant',
            lastCommit: '2024-01-12',
            committer: 'sarah.johnson@company.com',
            commitMessage: 'Implement OAuth 2.0 authentication flow',
            size: '67.8 MB',
            collaborators: 15,
            openPRs: 12,
            branches: 25,
            tags: 8,
            visibility: 'Private'
        },
        {
            id: 5,
            name: 'infrastructure',
            fullName: 'aquasec/infrastructure',
            branch: 'main',
            scmProvider: 'Azure DevOps',
            url: 'https://dev.azure.com/aquasec/infrastructure',
            language: 'Terraform',
            secrets: { critical: 3, high: 2, medium: 1, low: 0 },
            securityFindings: { critical: 1, high: 1, medium: 2, low: 1 },
            vulnerabilities: 5,
            compliance: 'Non-Compliant',
            lastCommit: '2024-01-10',
            committer: 'david.brown@company.com',
            commitMessage: 'Add security groups for new production environment',
            size: '23.1 MB',
            collaborators: 6,
            openPRs: 2,
            branches: 10,
            tags: 20,
            visibility: 'Private'
        },
        {
            id: 6,
            name: 'machine-learning-models',
            fullName: 'aquasec/ml-models',
            branch: 'experiment/new-algorithm',
            scmProvider: 'GitLab',
            url: 'https://gitlab.com/aquasec/ml-models',
            language: 'Python',
            secrets: { critical: 0, high: 0, medium: 1, low: 3 },
            securityFindings: { critical: 0, high: 2, medium: 7, low: 5 },
            vulnerabilities: 14,
            compliance: 'Compliant',
            lastCommit: '2024-01-09',
            committer: 'alex.garcia@company.com',
            commitMessage: 'Optimize neural network training pipeline',
            size: '156.4 MB',
            collaborators: 9,
            openPRs: 5,
            branches: 15,
            tags: 12,
            visibility: 'Private'
        }
    ],
    kubernetes: [
        {
            id: 1,
            name: 'nginx-deployment',
            resourceType: 'Deployment',
            namespace: 'production',
            cluster: 'us-east-1-prod',
            status: 'Running',
            securityRisk: { critical: 0, high: 1, medium: 2, low: 1 },
            replicas: '3/3',
            age: '15d',
            image: 'nginx:1.21.6',
            created: '2024-01-01',
            labels: { app: 'nginx', version: 'v1.21' },
            annotations: { 'deployment.kubernetes.io/revision': '1' },
            nodeSelector: 'linux',
            resources: { cpu: '100m', memory: '128Mi' }
        },
        {
            id: 2,
            name: 'redis-master',
            resourceType: 'StatefulSet',
            namespace: 'production',
            cluster: 'us-east-1-prod',
            status: 'Running',
            securityRisk: { critical: 1, high: 0, medium: 1, low: 0 },
            replicas: '1/1',
            age: '30d',
            image: 'redis:6.2',
            created: '2023-12-17',
            labels: { app: 'redis', role: 'master' },
            annotations: { 'statefulset.kubernetes.io/pod-name': 'redis-master-0' },
            nodeSelector: 'linux',
            resources: { cpu: '200m', memory: '256Mi' }
        },
        {
            id: 3,
            name: 'fluentd-logger',
            resourceType: 'DaemonSet',
            namespace: 'kube-system',
            cluster: 'us-east-1-prod',
            status: 'Running',
            securityRisk: { critical: 0, high: 2, medium: 3, low: 2 },
            replicas: '3/3',
            age: '45d',
            image: 'fluentd:v1.14',
            created: '2023-12-02',
            labels: { app: 'fluentd', tier: 'logging' },
            annotations: { 'daemonset.kubernetes.io/defaulted': 'true' },
            nodeSelector: 'linux',
            resources: { cpu: '150m', memory: '200Mi' }
        },
        {
            id: 4,
            name: 'api-server-pod',
            resourceType: 'Pod',
            namespace: 'production',
            cluster: 'us-west-2-prod',
            status: 'Running',
            securityRisk: { critical: 0, high: 1, medium: 1, low: 0 },
            replicas: '1/1',
            age: '7d',
            image: 'api-server:v2.1.0',
            created: '2024-01-09',
            labels: { app: 'api-server', version: 'v2.1.0' },
            annotations: { 'pod.kubernetes.io/hostname': 'node-1' },
            nodeSelector: 'linux',
            resources: { cpu: '500m', memory: '512Mi' }
        },
        {
            id: 5,
            name: 'database-config',
            resourceType: 'ConfigMap',
            namespace: 'production',
            cluster: 'us-east-1-prod',
            status: 'Active',
            securityRisk: { critical: 0, high: 0, medium: 1, low: 0 },
            replicas: '-',
            age: '20d',
            image: '-',
            created: '2023-12-27',
            labels: { app: 'database' },
            annotations: {},
            nodeSelector: '-',
            resources: { cpu: '-', memory: '-' }
        },
        {
            id: 6,
            name: 'tls-secret',
            resourceType: 'Secret',
            namespace: 'production',
            cluster: 'us-east-1-prod',
            status: 'Active',
            securityRisk: { critical: 2, high: 1, medium: 0, low: 0 },
            replicas: '-',
            age: '60d',
            image: '-',
            created: '2023-11-17',
            labels: { type: 'tls' },
            annotations: { 'kubernetes.io/tls': 'true' },
            nodeSelector: '-',
            resources: { cpu: '-', memory: '-' }
        },
        {
            id: 7,
            name: 'postgres-service',
            resourceType: 'Service',
            namespace: 'production',
            cluster: 'us-west-2-prod',
            status: 'Active',
            securityRisk: { critical: 0, high: 0, medium: 1, low: 1 },
            replicas: '-',
            age: '25d',
            image: '-',
            created: '2023-12-22',
            labels: { app: 'postgres', tier: 'database' },
            annotations: { 'service.kubernetes.io/type': 'ClusterIP' },
            nodeSelector: '-',
            resources: { cpu: '-', memory: '-' }
        },
        {
            id: 8,
            name: 'monitoring-job',
            resourceType: 'Job',
            namespace: 'monitoring',
            cluster: 'us-east-1-staging',
            status: 'Completed',
            securityRisk: { critical: 0, high: 0, medium: 0, low: 1 },
            replicas: '1/1',
            age: '3d',
            image: 'monitoring:latest',
            created: '2024-01-13',
            labels: { app: 'monitoring', type: 'batch' },
            annotations: { 'job.kubernetes.io/completions': '1' },
            nodeSelector: 'linux',
            resources: { cpu: '100m', memory: '64Mi' }
        },
        {
            id: 9,
            name: 'backup-cronjob',
            resourceType: 'CronJob',
            namespace: 'system',
            cluster: 'us-east-1-prod',
            status: 'Active',
            securityRisk: { critical: 0, high: 1, medium: 0, low: 0 },
            replicas: '-',
            age: '90d',
            image: 'backup-tool:v1.0',
            created: '2023-10-18',
            labels: { app: 'backup', schedule: 'daily' },
            annotations: { 'cronjob.kubernetes.io/schedule': '0 2 * * *' },
            nodeSelector: 'linux',
            resources: { cpu: '50m', memory: '32Mi' }
        },
        {
            id: 10,
            name: 'web-ingress',
            resourceType: 'Ingress',
            namespace: 'production',
            cluster: 'us-west-2-prod',
            status: 'Active',
            securityRisk: { critical: 0, high: 2, medium: 1, low: 0 },
            replicas: '-',
            age: '40d',
            image: '-',
            created: '2023-12-07',
            labels: { app: 'web', tier: 'frontend' },
            annotations: { 'nginx.ingress.kubernetes.io/rewrite-target': '/' },
            nodeSelector: '-',
            resources: { cpu: '-', memory: '-' }
        },
        {
            id: 11,
            name: 'elasticsearch-pv',
            resourceType: 'PersistentVolume',
            namespace: 'logging',
            cluster: 'us-east-1-staging',
            status: 'Bound',
            securityRisk: { critical: 0, high: 0, medium: 2, low: 1 },
            replicas: '-',
            age: '120d',
            image: '-',
            created: '2023-09-18',
            labels: { app: 'elasticsearch', storage: 'ssd' },
            annotations: { 'volume.kubernetes.io/storage-class': 'fast' },
            nodeSelector: '-',
            resources: { cpu: '-', memory: '-' }
        },
        {
            id: 12,
            name: 'app-hpa',
            resourceType: 'HorizontalPodAutoscaler',
            namespace: 'production',
            cluster: 'us-west-2-prod',
            status: 'Active',
            securityRisk: { critical: 0, high: 0, medium: 1, low: 0 },
            replicas: '2-10',
            age: '10d',
            image: '-',
            created: '2024-01-06',
            labels: { app: 'web-app', autoscaling: 'enabled' },
            annotations: { 'autoscaling.kubernetes.io/currentReplicas': '3' },
            nodeSelector: '-',
            resources: { cpu: '70%', memory: '-' }
        }
    ],
    cloudresources: [
        {
            id: 1,
            name: 'production-app-bucket',
            resourceType: 'S3 Bucket',
            cloudProvider: 'AWS',
            cloudAccount: 'prod-account-123456789',
            region: 'us-east-1',
            status: 'Active',
            securityFindings: { critical: 1, high: 2, medium: 3, low: 1 },
            compliance: 'Non-Compliant',
            created: '2023-08-15',
            lastModified: '2024-01-14',
            labels: { environment: 'production', team: 'backend', criticality: 'high' },
            resourceArn: 'arn:aws:s3:::production-app-bucket',
            encryption: 'Enabled',
            publicAccess: false,
            versioning: 'Enabled'
        },
        {
            id: 2,
            name: 'user-database-primary',
            resourceType: 'RDS Instance',
            cloudProvider: 'AWS',
            cloudAccount: 'prod-account-123456789',
            region: 'us-west-2',
            status: 'Available',
            securityFindings: { critical: 0, high: 1, medium: 2, low: 3 },
            compliance: 'Compliant',
            created: '2023-06-20',
            lastModified: '2024-01-12',
            labels: { environment: 'production', team: 'backend', dbtype: 'postgresql' },
            resourceArn: 'arn:aws:rds:us-west-2:123456789:db:user-database-primary',
            encryption: 'Enabled',
            publicAccess: false,
            backupEnabled: true
        },
        {
            id: 3,
            name: 'message-queue-prod',
            resourceType: 'SQS Queue',
            cloudProvider: 'AWS',
            cloudAccount: 'prod-account-123456789',
            region: 'us-east-1',
            status: 'Active',
            securityFindings: { critical: 0, high: 0, medium: 1, low: 2 },
            compliance: 'Compliant',
            created: '2023-09-10',
            lastModified: '2024-01-13',
            labels: { environment: 'production', team: 'messaging', purpose: 'async-processing' },
            resourceArn: 'arn:aws:sqs:us-east-1:123456789:message-queue-prod',
            encryption: 'Enabled',
            dlqEnabled: true,
            visibilityTimeout: '30s'
        },
        {
            id: 4,
            name: 'app-storage-account',
            resourceType: 'Storage Account',
            cloudProvider: 'Azure',
            cloudAccount: 'azure-subscription-abc123',
            region: 'East US',
            status: 'Available',
            securityFindings: { critical: 2, high: 1, medium: 1, low: 0 },
            compliance: 'Requires Review',
            created: '2023-07-30',
            lastModified: '2024-01-11',
            labels: { environment: 'production', team: 'frontend', tier: 'storage' },
            resourceId: '/subscriptions/abc123/resourceGroups/prod-rg/providers/Microsoft.Storage/storageAccounts/appstorageaccount',
            encryption: 'Enabled',
            publicAccess: true,
            replication: 'LRS'
        },
        {
            id: 5,
            name: 'web-app-service',
            resourceType: 'App Service',
            cloudProvider: 'Azure',
            cloudAccount: 'azure-subscription-abc123',
            region: 'West US 2',
            status: 'Running',
            securityFindings: { critical: 0, high: 2, medium: 4, low: 2 },
            compliance: 'Compliant',
            created: '2023-10-05',
            lastModified: '2024-01-10',
            labels: { environment: 'production', team: 'frontend', framework: 'nodejs' },
            resourceId: '/subscriptions/abc123/resourceGroups/prod-rg/providers/Microsoft.Web/sites/web-app-service',
            httpsOnly: true,
            scalingEnabled: true,
            tier: 'Standard'
        },
        {
            id: 6,
            name: 'analytics-dataset',
            resourceType: 'BigQuery Dataset',
            cloudProvider: 'GCP',
            cloudAccount: 'gcp-project-prod-789',
            region: 'us-central1',
            status: 'Active',
            securityFindings: { critical: 0, high: 1, medium: 2, low: 1 },
            compliance: 'Compliant',
            created: '2023-11-12',
            lastModified: '2024-01-09',
            labels: { environment: 'production', team: 'analytics', datatype: 'customer-insights' },
            resourceId: 'projects/gcp-project-prod-789/datasets/analytics_dataset',
            encryption: 'Google-managed',
            accessLevel: 'Private',
            tables: 15
        },
        {
            id: 7,
            name: 'microservice-cluster',
            resourceType: 'GKE Cluster',
            cloudProvider: 'GCP',
            cloudAccount: 'gcp-project-prod-789',
            region: 'us-west1',
            status: 'Running',
            securityFindings: { critical: 1, high: 3, medium: 2, low: 1 },
            compliance: 'Non-Compliant',
            created: '2023-05-18',
            lastModified: '2024-01-08',
            labels: { environment: 'production', team: 'platform', workload: 'microservices' },
            resourceId: 'projects/gcp-project-prod-789/locations/us-west1/clusters/microservice-cluster',
            nodeCount: 6,
            autopilot: false,
            version: '1.28.3-gke.1286000'
        },
        {
            id: 8,
            name: 'lambda-image-processor',
            resourceType: 'Lambda Function',
            cloudProvider: 'AWS',
            cloudAccount: 'staging-account-987654321',
            region: 'us-east-2',
            status: 'Active',
            securityFindings: { critical: 0, high: 1, medium: 1, low: 0 },
            compliance: 'Compliant',
            created: '2023-12-01',
            lastModified: '2024-01-07',
            labels: { environment: 'staging', team: 'media', runtime: 'python39' },
            resourceArn: 'arn:aws:lambda:us-east-2:987654321:function:lambda-image-processor',
            runtime: 'python3.9',
            memorySize: '512MB',
            timeout: '30s'
        },
        {
            id: 9,
            name: 'data-warehouse-cluster',
            resourceType: 'Redshift Cluster',
            cloudProvider: 'AWS',
            cloudAccount: 'analytics-account-456789123',
            region: 'us-west-1',
            status: 'Available',
            securityFindings: { critical: 2, high: 2, medium: 1, low: 0 },
            compliance: 'Requires Review',
            created: '2023-04-22',
            lastModified: '2024-01-06',
            labels: { environment: 'production', team: 'analytics', purpose: 'data-warehouse' },
            resourceArn: 'arn:aws:redshift:us-west-1:456789123:cluster:data-warehouse-cluster',
            nodeType: 'dc2.large',
            numberOfNodes: 4,
            encrypted: true
        },
        {
            id: 10,
            name: 'cdn-distribution',
            resourceType: 'CloudFront Distribution',
            cloudProvider: 'AWS',
            cloudAccount: 'prod-account-123456789',
            region: 'Global',
            status: 'Deployed',
            securityFindings: { critical: 0, high: 0, medium: 2, low: 1 },
            compliance: 'Compliant',
            created: '2023-08-30',
            lastModified: '2024-01-05',
            labels: { environment: 'production', team: 'frontend', purpose: 'content-delivery' },
            resourceArn: 'arn:aws:cloudfront::123456789:distribution/E1234567890ABC',
            priceClass: 'PriceClass_All',
            enabled: true,
            defaultTtl: 86400
        },
        {
            id: 11,
            name: 'secrets-vault',
            resourceType: 'Key Vault',
            cloudProvider: 'Azure',
            cloudAccount: 'azure-subscription-def456',
            region: 'North Europe',
            status: 'Active',
            securityFindings: { critical: 1, high: 0, medium: 0, low: 1 },
            compliance: 'Compliant',
            created: '2023-03-15',
            lastModified: '2024-01-04',
            labels: { environment: 'production', team: 'security', purpose: 'secrets-management' },
            resourceId: '/subscriptions/def456/resourceGroups/security-rg/providers/Microsoft.KeyVault/vaults/secrets-vault',
            softDeleteEnabled: true,
            purgeProtection: true,
            accessPolicies: 8
        },
        {
            id: 12,
            name: 'ml-training-bucket',
            resourceType: 'Cloud Storage',
            cloudProvider: 'GCP',
            cloudAccount: 'gcp-project-ml-456',
            region: 'us-east4',
            status: 'Active',
            securityFindings: { critical: 0, high: 1, medium: 3, low: 2 },
            compliance: 'Compliant',
            created: '2023-09-28',
            lastModified: '2024-01-03',
            labels: { environment: 'production', team: 'ml-ops', purpose: 'model-training' },
            resourceId: 'projects/gcp-project-ml-456/buckets/ml-training-bucket',
            storageClass: 'STANDARD',
            uniformBucketLevelAccess: true,
            lifecycle: 'Enabled'
        }
    ]
};

// Current state
let currentResourceType = 'images';
let currentFilters = {};
let currentSearchTerm = '';
let filteredData = [];
let currentGroupBy = '';
let expandedGroups = new Set();

// Initialize the inventory page
document.addEventListener('DOMContentLoaded', function() {
    initializeInventoryPage();
});

function initializeInventoryPage() {
    // Load initial data
    loadResourceData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize search functionality
    setupSearch();
    
    // Initialize group by options
    updateGroupByOptions();
    
    // Initialize filter options
    updateFilterOptions();
    
    // Initialize sort by options
    updateSortByOptions();
    
    // Initialize save buttons visibility (hide initially)
    updateSaveButtonsVisibility();
    
    // Recheck save buttons visibility after a short delay in case filters are loaded dynamically
    setTimeout(() => {
        updateSaveButtonsVisibility();
    }, 100);
}

function setupEventListeners() {
    // Resource type change
    const resourceTypeSelect = document.getElementById('resourceTypeSelect');
    if (resourceTypeSelect) {
        resourceTypeSelect.addEventListener('change', handleResourceTypeChange);
    }
    
    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', handleSelectAll);
    }
    
    // Filter section toggles
    const filterSections = document.querySelectorAll('.filter-section h4');
    filterSections.forEach(section => {
        section.addEventListener('click', toggleFilterSection);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('inventorySearch');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}

function handleResourceTypeChange(event) {
    currentResourceType = event.target.value;
    currentFilters = {};
    currentSearchTerm = '';
    currentGroupBy = '';
    expandedGroups.clear();
    
    // Clear search input
    const searchInput = document.getElementById('inventorySearch');
    if (searchInput) {
        searchInput.value = '';
        searchInput.placeholder = `Search by ${getResourceTypeName()}`;
    }
    
        // Clear group by selection and update options
    const groupBySelect = document.getElementById('groupBySelect');
    if (groupBySelect) {
        groupBySelect.value = '';
        updateGroupByOptions();
    }
    
    // Update filter options
    updateFilterOptions();
    
    // Update sort by options
    updateSortByOptions();

    // Clear active filters
    clearActiveFilters();
    
    // Load new data
    loadResourceData();
    
    // Update total count
    updateTotalCount();
}

function handleGroupByChange() {
    const groupBySelect = document.getElementById('groupBySelect');
    currentGroupBy = groupBySelect.value;
    expandedGroups.clear();
    
    // If grouping is enabled, expand the first group by default
    if (currentGroupBy) {
        const groups = getGroupedData();
        if (groups.length > 0) {
            expandedGroups.add(groups[0].key);
        }
    }
    
    renderTable();
    updateSaveButtonsVisibility();
}

function getResourceTypeName() {
    const typeNames = {
        'images': 'Image Name',
        'containers': 'Container Name',
        'vms': 'VM Name',
        'functions': 'Function Name',
        'repositories': 'Repository Name',
        'kubernetes': 'Resource Name',
        'packages': 'Package Name',
        'aimodels': 'Model Name',
        'cloudresources': 'Resource Name'
    };
    return typeNames[currentResourceType] || 'Name';
}

function updateGroupByOptions() {
    const groupBySelect = document.getElementById('groupBySelect');
    if (!groupBySelect) return;
    
    // Store current value
    const currentValue = groupBySelect.value;
    
    // Clear existing options
    groupBySelect.innerHTML = '<option value="">No Grouping</option>';
    
    // Add options based on resource type
    let options = [];
    
    switch (currentResourceType) {
        case 'images':
            options = [
                { value: 'registry', text: 'Registry' },
                { value: 'repositoryName', text: 'Repository Name' },
                { value: 'registryType', text: 'Registry Type' },
                { value: 'architecture', text: 'Architecture' },
                { value: 'compliance', text: 'Compliance' }
            ];
            break;
        case 'containers':
            options = [
                { value: 'status', text: 'Status' },
                { value: 'namespace', text: 'Namespace' },
                { value: 'node', text: 'Node' }
            ];
            break;
        case 'vms':
            options = [
                { value: 'os', text: 'Operating System' },
                { value: 'status', text: 'Status' },
                { value: 'region', text: 'Region' },
                { value: 'instanceType', text: 'Instance Type' }
            ];
            break;
        case 'packages':
            options = [
                { value: 'type', text: 'Package Type' },
                { value: 'language', text: 'Language' },
                { value: 'ecosystem', text: 'Ecosystem' },
                { value: 'license', text: 'License' },
                { value: 'fixAvailable', text: 'Fix Available' }
            ];
            break;
        case 'aimodels':
            options = [
                { value: 'provider', text: 'Provider' },
                { value: 'type', text: 'Model Type' },
                { value: 'deploymentMode', text: 'Deployment Mode' },
                { value: 'complianceStatus', text: 'Compliance Status' },
                { value: 'dataPrivacy', text: 'Data Privacy' }
            ];
            break;
        case 'repositories':
            options = [
                { value: 'scmProvider', text: 'Provider' },
                { value: 'language', text: 'Language' },
                { value: 'compliance', text: 'Compliance' },
                { value: 'visibility', text: 'Visibility' },
                { value: 'branch', text: 'Branch' }
            ];
            break;
        case 'kubernetes':
            options = [
                { value: 'k8sCluster', text: 'Cluster' },
                { value: 'k8sNamespace', text: 'Namespace' },
                { value: 'k8sResourceType', text: 'Resource Type' },
                { value: 'k8sStatus', text: 'Status' }
            ];
            break;
        case 'cloudresources':
            options = [
                { value: 'cloudAccount', text: 'Cloud Account' },
                { value: 'cloudProvider', text: 'Cloud Provider' },
                { value: 'cloudRegion', text: 'Region' },
                { value: 'cloudResourceType', text: 'Resource Type' }
            ];
            break;
        default:
            options = [
                { value: 'registry', text: 'Registry' },
                { value: 'compliance', text: 'Compliance' }
            ];
    }
    
    // Add options to select
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        groupBySelect.appendChild(optionElement);
    });
    
    // Restore previous value if it still exists
    if (currentValue && Array.from(groupBySelect.options).some(opt => opt.value === currentValue)) {
        groupBySelect.value = currentValue;
    }
}

function updateFilterOptions() {
    const filtersContent = document.getElementById('filtersContent');
    if (!filtersContent) return;
    
    let filterHTML = '';
    
    switch (currentResourceType) {
        case 'images':
            filterHTML = `
                <div class="filter-section">
                    <h4><i class="fas fa-chevron-down"></i> Image Details</h4>
                    <div class="filter-options">
                        <div class="filter-field">
                            <label>Registry Name</label>
                            <select class="form-select" onchange="applyFilter('registryName', this.value)">
                                <option value="">Select Registry Name</option>
                                <option value="docker.io">docker.io</option>
                                <option value="gcr.io">gcr.io</option>
                                <option value="quay.io">quay.io</option>
                            </select>
                        </div>
                        <div class="filter-field">
                            <label>Architecture</label>
                            <select class="form-select" onchange="applyFilter('architecture', this.value)">
                                <option value="">Select Architecture</option>
                                <option value="amd64">amd64</option>
                                <option value="arm64">arm64</option>
                                <option value="386">386</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'kubernetes':
            filterHTML = `
                <div class="filter-section">
                    <h4><i class="fas fa-chevron-down"></i> Kubernetes Filters</h4>
                    <div class="filter-options">
                        <div class="filter-field">
                            <label>Cluster</label>
                            <select class="form-select" onchange="applyFilter('cluster', this.value)">
                                <option value="">Select Cluster</option>
                                <option value="us-east-1-prod">us-east-1-prod</option>
                                <option value="us-west-2-prod">us-west-2-prod</option>
                                <option value="us-east-1-staging">us-east-1-staging</option>
                            </select>
                        </div>
                        <div class="filter-field">
                            <label>Namespace</label>
                            <select class="form-select" onchange="applyFilter('namespace', this.value)">
                                <option value="">Select Namespace</option>
                                <option value="production">production</option>
                                <option value="kube-system">kube-system</option>
                                <option value="monitoring">monitoring</option>
                                <option value="system">system</option>
                                <option value="logging">logging</option>
                            </select>
                        </div>
                        <div class="filter-field">
                            <label>Resource Type</label>
                            <select class="form-select" onchange="applyFilter('resourceType', this.value)">
                                <option value="">Select Resource Type</option>
                                <option value="Pod">Pod</option>
                                <option value="Deployment">Deployment</option>
                                <option value="StatefulSet">StatefulSet</option>
                                <option value="DaemonSet">DaemonSet</option>
                                <option value="Service">Service</option>
                                <option value="ConfigMap">ConfigMap</option>
                                <option value="Secret">Secret</option>
                                <option value="Ingress">Ingress</option>
                                <option value="Job">Job</option>
                                <option value="CronJob">CronJob</option>
                                <option value="PersistentVolume">PersistentVolume</option>
                                <option value="HorizontalPodAutoscaler">HorizontalPodAutoscaler</option>
                            </select>
                        </div>
                        <div class="filter-field">
                            <label>Status</label>
                            <select class="form-select" onchange="applyFilter('status', this.value)">
                                <option value="">Select Status</option>
                                <option value="Running">Running</option>
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                                <option value="Bound">Bound</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'repositories':
            filterHTML = `
                <div class="filter-section">
                    <h4><i class="fas fa-chevron-down"></i> Repository Filters</h4>
                    <div class="filter-options">
                        <div class="filter-field">
                            <label>SCM Provider</label>
                            <select class="form-select" onchange="applyFilter('scmProvider', this.value)">
                                <option value="">Select SCM Provider</option>
                                <option value="GitHub">GitHub</option>
                                <option value="GitLab">GitLab</option>
                                <option value="Azure DevOps">Azure DevOps</option>
                            </select>
                        </div>
                        <div class="filter-field">
                            <label>Language</label>
                            <select class="form-select" onchange="applyFilter('language', this.value)">
                                <option value="">Select Language</option>
                                <option value="TypeScript">TypeScript</option>
                                <option value="Go">Go</option>
                                <option value="Python">Python</option>
                                <option value="Terraform">Terraform</option>
                                <option value="SQL">SQL</option>
                                <option value="React Native">React Native</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'cloudresources':
            filterHTML = `
                <div class="filter-section">
                    <h4><i class="fas fa-chevron-down"></i> Cloud Resources Filters</h4>
                    <div class="filter-options">
                        <div class="filter-field">
                            <label>Cloud Provider</label>
                            <select class="form-select" onchange="applyFilter('cloudProvider', this.value)">
                                <option value="">Select Cloud Provider</option>
                                <option value="AWS">AWS</option>
                                <option value="Azure">Azure</option>
                                <option value="GCP">GCP</option>
                            </select>
                        </div>
                        <div class="filter-field">
                            <label>Cloud Account</label>
                            <select class="form-select" onchange="applyFilter('cloudAccount', this.value)">
                                <option value="">Select Cloud Account</option>
                                <option value="prod-account-123456789">prod-account-123456789</option>
                                <option value="azure-subscription-abc123">azure-subscription-abc123</option>
                                <option value="gcp-project-prod-789">gcp-project-prod-789</option>
                                <option value="staging-account-987654321">staging-account-987654321</option>
                                <option value="analytics-account-456789123">analytics-account-456789123</option>
                            </select>
                        </div>
                        <div class="filter-field">
                            <label>Region</label>
                            <select class="form-select" onchange="applyFilter('region', this.value)">
                                <option value="">Select Region</option>
                                <option value="us-east-1">us-east-1</option>
                                <option value="us-west-2">us-west-2</option>
                                <option value="us-east-2">us-east-2</option>
                                <option value="us-west-1">us-west-1</option>
                                <option value="East US">East US</option>
                                <option value="West US 2">West US 2</option>
                                <option value="North Europe">North Europe</option>
                                <option value="us-central1">us-central1</option>
                                <option value="us-west1">us-west1</option>
                                <option value="us-east4">us-east4</option>
                                <option value="Global">Global</option>
                            </select>
                        </div>
                        <div class="filter-field">
                            <label>Resource Type</label>
                            <select class="form-select" onchange="applyFilter('resourceType', this.value)">
                                <option value="">Select Resource Type</option>
                                <option value="S3 Bucket">S3 Bucket</option>
                                <option value="RDS Instance">RDS Instance</option>
                                <option value="SQS Queue">SQS Queue</option>
                                <option value="Lambda Function">Lambda Function</option>
                                <option value="Storage Account">Storage Account</option>
                                <option value="App Service">App Service</option>
                                <option value="BigQuery Dataset">BigQuery Dataset</option>
                                <option value="GKE Cluster">GKE Cluster</option>
                                <option value="Key Vault">Key Vault</option>
                                <option value="Cloud Storage">Cloud Storage</option>
                                <option value="Redshift Cluster">Redshift Cluster</option>
                                <option value="CloudFront Distribution">CloudFront Distribution</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
            break;
        default:
            filterHTML = `
                <div class="filter-section">
                    <h4><i class="fas fa-chevron-down"></i> General Filters</h4>
                    <div class="filter-options">
                        <div class="filter-field">
                            <label>Status</label>
                            <select class="form-select" onchange="applyFilter('status', this.value)">
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Running">Running</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
    }
    
    filtersContent.innerHTML = filterHTML;
}

function updateSortByOptions() {
    const sortBySelect = document.getElementById('sortBySelect');
    if (!sortBySelect) return;
    
    // Store current value
    const currentValue = sortBySelect.value;
    
    // Clear existing options
    sortBySelect.innerHTML = '';
    
    // Add options based on resource type
    let options = [];
    
    switch (currentResourceType) {
        case 'images':
            options = ['Image Name', 'Last Scanned', 'Security Findings', 'Compliance'];
            break;
        case 'containers':
            options = ['Container Name', 'Status', 'Namespace', 'Created'];
            break;
        case 'vms':
            options = ['VM Name', 'OS', 'Status', 'Instance Type'];
            break;
        case 'packages':
            options = ['Package Name', 'Version', 'Vulnerabilities', 'Used in Resources'];
            break;
        case 'aimodels':
            options = ['Model Name', 'Provider', 'Type', 'Security Risks'];
            break;
        case 'cloudresources':
            options = ['Resource Name', 'Cloud Provider', 'Resource Type', 'Security Findings', 'Region'];
            break;
        default:
            options = ['Name', 'Status'];
    }
    
    // Add options to select
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.toLowerCase().replace(/\s+/g, '');
        optionElement.textContent = option;
        sortBySelect.appendChild(optionElement);
    });
    
    // Set first option as default if current value doesn't exist
    if (options.length > 0) {
        const firstOptionValue = options[0].toLowerCase().replace(/\s+/g, '');
        if (currentValue && Array.from(sortBySelect.options).some(opt => opt.value === currentValue)) {
            sortBySelect.value = currentValue;
        } else {
            sortBySelect.value = firstOptionValue;
        }
    }
}

function loadResourceData() {
    const data = mockData[currentResourceType] || [];
    filteredData = [...data];
    applyFiltersAndSearch();
}

function applyFiltersAndSearch() {
    let data = [...mockData[currentResourceType] || []];
    
    // Apply search filter
    if (currentSearchTerm) {
        data = data.filter(item => {
            const searchField = currentResourceType === 'images' ? 'name' : 'name';
            return item[searchField].toLowerCase().includes(currentSearchTerm.toLowerCase());
        });
    }
    
    // Apply other filters
    Object.keys(currentFilters).forEach(filterKey => {
        const filterValue = currentFilters[filterKey];
        if (filterValue) {
            data = data.filter(item => {
                switch (filterKey) {
                    case 'registryName':
                        return item.registryName === filterValue;
                    case 'repositoryName':
                        return item.repositoryName === filterValue;
                    case 'architecture':
                        return item.architecture === filterValue;
                    default:
                        return true;
                }
            });
        }
    });
    
    filteredData = data;
    renderTable();
    updateTotalCount();
}

function renderTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    const table = document.querySelector('.inventory-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Toggle grouped class based on grouping
    if (currentGroupBy) {
        table.classList.add('grouped');
        renderGroupedTable();
    } else {
        table.classList.remove('grouped');
        if (currentResourceType === 'images') {
            renderImagesTable();
        } else if (currentResourceType === 'containers') {
            renderContainersTable();
        } else if (currentResourceType === 'vms') {
            renderVMsTable();
        } else if (currentResourceType === 'packages') {
            renderPackagesTable();
        } else if (currentResourceType === 'aimodels') {
            renderAIModelsTable();
        } else if (currentResourceType === 'repositories') {
            renderRepositoriesTable();
        } else if (currentResourceType === 'kubernetes') {
            renderKubernetesTable();
        } else if (currentResourceType === 'cloudresources') {
            renderCloudResourcesTable();
        } else {
            renderGenericTable();
        }
    }
}

function getGroupedData() {
    if (!currentGroupBy) return [];
    
    const groups = {};
    
    filteredData.forEach(item => {
        let groupValue;
        switch (currentGroupBy) {
            case 'registry':
                groupValue = item.registry || 'Unknown Registry';
                break;
            case 'repositoryName':
                groupValue = item.repositoryName || 'Unknown Repository';
                break;
            case 'registryType':
                groupValue = item.registryType || 'Unknown Type';
                break;
            case 'architecture':
                groupValue = item.architecture || 'Unknown Architecture';
                break;
            case 'compliance':
                groupValue = item.compliance || 'Unknown';
                break;
            // VM grouping
            case 'os':
                groupValue = item.os || 'Unknown OS';
                break;
            case 'status':
                groupValue = item.status || 'Unknown Status';
                break;
            case 'region':
                groupValue = item.region || 'Unknown Region';
                break;
            case 'instanceType':
                groupValue = item.instanceType || 'Unknown Type';
                break;
            case 'namespace':
                groupValue = item.namespace || 'Unknown Namespace';
                break;
            case 'node':
                groupValue = item.node || 'Unknown Node';
                break;
            // Package grouping
            case 'type':
                groupValue = item.type || 'Unknown Type';
                break;
            case 'language':
                groupValue = item.language || 'Unknown Language';
                break;
            case 'ecosystem':
                groupValue = item.ecosystem || 'Unknown Ecosystem';
                break;
            case 'license':
                groupValue = item.license || 'Unknown License';
                break;
            case 'fixAvailable':
                groupValue = item.fixAvailable ? 'Fix Available' : 'No Fix Available';
                break;
            // AI Models grouping
            case 'provider':
                groupValue = item.provider || 'Unknown Provider';
                break;
            case 'deploymentMode':
                groupValue = item.deploymentMode || 'Unknown Mode';
                break;
            case 'complianceStatus':
                groupValue = item.complianceStatus || 'Unknown Status';
                break;
            case 'dataPrivacy':
                groupValue = item.dataPrivacy || 'Unknown Privacy';
                break;
            // Repository grouping
            case 'scmProvider':
                groupValue = item.scmProvider || 'Unknown Provider';
                break;
            case 'visibility':
                groupValue = item.visibility || 'Unknown Visibility';
                break;
            case 'branch':
                groupValue = item.branch || 'Unknown Branch';
                break;
            // Kubernetes grouping
            case 'k8sCluster':
                groupValue = item.cluster || 'Unknown Cluster';
                break;
            case 'k8sNamespace':
                groupValue = item.namespace || 'Unknown Namespace';
                break;
            case 'k8sResourceType':
                groupValue = item.resourceType || 'Unknown Resource Type';
                break;
            case 'k8sStatus':
                groupValue = item.status || 'Unknown Status';
                break;
            // Cloud resources grouping
            case 'cloudAccount':
                groupValue = item.cloudAccount || 'Unknown Account';
                break;
            case 'cloudProvider':
                groupValue = item.cloudProvider || 'Unknown Provider';
                break;
            case 'cloudRegion':
                groupValue = item.region || 'Unknown Region';
                break;
            case 'cloudResourceType':
                groupValue = item.resourceType || 'Unknown Resource Type';
                break;
            default:
                groupValue = 'Other';
        }
        
        if (!groups[groupValue]) {
            groups[groupValue] = [];
        }
        groups[groupValue].push(item);
    });
    
    // Convert to array and sort by group name
    return Object.keys(groups)
        .sort()
        .map(key => ({
            key,
            items: groups[key],
            count: groups[key].length
        }));
}

function renderGroupedTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    const groups = getGroupedData();
    
    // Ensure table headers are correct for the current resource type
    if (currentResourceType === 'containers') {
        updateTableHeaders([
            '', 'Name', 'Status', 'Namespace', 'Image', 'Node', 'Created'
        ]);
    } else if (currentResourceType === 'vms') {
        updateTableHeaders([
            '', 'Name', 'OS', 'Status', 'IP Address', 'Region', 'Instance Type'
        ]);
    } else if (currentResourceType === 'packages') {
        updateTableHeaders([
            '', 'Package Name', 'Version', 'Type', 'Language/Ecosystem', 'Vulnerabilities', 'Used in Resources', 'Fix Available', 'License'
        ]);
    } else if (currentResourceType === 'aimodels') {
        updateTableHeaders([
            '', 'Model Name', 'Version', 'Provider', 'Type', 'Deployment Mode', 'Security Risks', 'Used by Apps', 'Compliance Status'
        ]);
    } else if (currentResourceType === 'repositories') {
        updateTableHeaders([
            '', 'Repository Name', 'Branch', 'SCM Provider', 'Language', 'Secrets', 'Security Findings', 'Compliance', 'Last Commit'
        ]);
    } else if (currentResourceType === 'kubernetes') {
        updateTableHeaders([
            '', 'Resource Name', 'Type', 'Namespace', 'Cluster', 'Status', 'Security Risk', 'Age', 'Replicas'
        ]);
    } else if (currentResourceType === 'cloudresources') {
        updateTableHeaders([
            '', 'Resource Name', 'Resource Type', 'Cloud Provider', 'Cloud Account', 'Region', 'Security Findings', 'Compliance', 'Status'
        ]);
    } else {
        // Default to images headers
        updateTableHeaders([
            '', 'Name', 'Security Findings', 'Compliance', 'Registry', 'Registry Type', 'Architecture', 'Aqua Labels', 'Docker Id'
        ]);
    }
    
    groups.forEach(group => {
        // Create group header
        const groupRow = document.createElement('tr');
        groupRow.className = `group-header ${expandedGroups.has(group.key) ? '' : 'collapsed'}`;
        groupRow.onclick = () => toggleGroup(group.key);
        
        groupRow.innerHTML = `
            <td colspan="9">
                <div class="group-header-content">
                    <div class="group-title">
                        <i class="fas fa-chevron-down group-icon"></i>
                        <span>${getGroupDisplayName(currentGroupBy)}: ${group.key}</span>
                    </div>
                    <div class="group-stats">
                        <span class="group-count">${group.count} items</span>
                        ${getGroupSummary(group.items)}
                    </div>
                </div>
            </td>
        `;
        
        tableBody.appendChild(groupRow);
        
        // Add items directly to the main tbody instead of creating separate tbody
        group.items.forEach(item => {
            const row = document.createElement('tr');
            row.className = `group-items ${expandedGroups.has(group.key) ? '' : 'collapsed'}`;
            row.dataset.groupKey = group.key.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
            row.style.cursor = 'pointer';
            row.onclick = (e) => {
                if (e.target.type !== 'checkbox') {
                    openDetailPanel(item);
                }
            };
            
            if (currentResourceType === 'images') {
                row.innerHTML = getImageRowHTML(item);
            } else if (currentResourceType === 'containers') {
                row.innerHTML = getContainerRowHTML(item);
            } else if (currentResourceType === 'vms') {
                row.innerHTML = getVMRowHTML(item);
            } else if (currentResourceType === 'packages') {
                row.innerHTML = getPackageRowHTML(item);
            } else if (currentResourceType === 'aimodels') {
                row.innerHTML = getAIModelRowHTML(item);
            } else if (currentResourceType === 'repositories') {
                row.innerHTML = getRepositoryRowHTML(item);
            } else if (currentResourceType === 'kubernetes') {
                row.innerHTML = getKubernetesRowHTML(item);
            } else if (currentResourceType === 'cloudresources') {
                row.innerHTML = getCloudResourceRowHTML(item);
            }
            
            tableBody.appendChild(row);
        });
    });
}

function getGroupDisplayName(groupBy) {
    const displayNames = {
        // Images
        'registry': 'Registry',
        'repositoryName': 'Repository Name',
        'registryType': 'Registry Type',
        'architecture': 'Architecture',
        'compliance': 'Compliance',
        // Containers & VMs
        'status': 'Status',
        'namespace': 'Namespace',
        'node': 'Node',
        'os': 'Operating System',
        'region': 'Region',
        'instanceType': 'Instance Type',
        // Packages
        'type': 'Package Type',
        'language': 'Language',
        'ecosystem': 'Ecosystem',
        'license': 'License',
        'fixAvailable': 'Fix Available',
        // AI Models
        'provider': 'Provider',
        'deploymentMode': 'Deployment Mode',
        'complianceStatus': 'Compliance Status',
        'dataPrivacy': 'Data Privacy',
        // Repositories
        'scmProvider': 'Provider',
        'visibility': 'Visibility',
        'branch': 'Branch',
        // Kubernetes
        'k8sCluster': 'Cluster',
        'k8sNamespace': 'Namespace',
        'k8sResourceType': 'Resource Type',
        'k8sStatus': 'Status',
        // Cloud Resources
        'cloudAccount': 'Cloud Account',
        'cloudProvider': 'Cloud Provider',
        'cloudRegion': 'Region',
        'cloudResourceType': 'Resource Type'
    };
    return displayNames[groupBy] || groupBy;
}

function getGroupSummary(items) {
    if (currentResourceType === 'images') {
        let totalFindings = { critical: 0, high: 0, medium: 0, low: 0, negligible: 0 };
        items.forEach(item => {
            totalFindings.critical += item.securityFindings.critical;
            totalFindings.high += item.securityFindings.high;
            totalFindings.medium += item.securityFindings.medium;
            totalFindings.low += item.securityFindings.low;
            totalFindings.negligible += item.securityFindings.negligible;
        });
        
        const badges = [];
        if (totalFindings.critical > 0) badges.push(`<span class="finding-badge finding-critical">${totalFindings.critical}</span>`);
        if (totalFindings.high > 0) badges.push(`<span class="finding-badge finding-high">${totalFindings.high}</span>`);
        if (totalFindings.medium > 0) badges.push(`<span class="finding-badge finding-medium">${totalFindings.medium}</span>`);
        if (totalFindings.low > 0) badges.push(`<span class="finding-badge finding-low">${totalFindings.low}</span>`);
        if (totalFindings.negligible > 0) badges.push(`<span class="finding-badge finding-negligible">${totalFindings.negligible}</span>`);
        
        return badges.length > 0 ? badges.join(' ') : '<span style="color: #22c55e;">No issues</span>';
    }
    
    return '';
}

function toggleGroup(groupKey) {
    // Close all other groups (only one open at a time)
    const wasExpanded = expandedGroups.has(groupKey);
    expandedGroups.clear();
    
    // If it wasn't expanded, expand it now
    if (!wasExpanded) {
        expandedGroups.add(groupKey);
    }
    
    // Update all group headers
    document.querySelectorAll('.group-header').forEach(header => {
        header.classList.add('collapsed');
    });
    
    // Hide all group items
    document.querySelectorAll('tr.group-items').forEach(row => {
        row.classList.add('collapsed');
    });
    
    // Expand the selected group if it should be expanded
    if (expandedGroups.has(groupKey)) {
        const groupId = groupKey.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        
        // Find and expand the header
        const headers = document.querySelectorAll('.group-header');
        headers.forEach(header => {
            if (header.onclick && header.onclick.toString().includes(groupKey)) {
                header.classList.remove('collapsed');
            }
        });
        
        // Show the group items
        document.querySelectorAll(`tr.group-items[data-group-key="${groupId}"]`).forEach(row => {
            row.classList.remove('collapsed');
        });
    }
}

function renderImagesTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.style.cursor = 'pointer';
        row.onclick = (e) => {
            // Don't open panel if clicking on checkbox
            if (e.target.type !== 'checkbox') {
                openDetailPanel(item);
            }
        };
        row.innerHTML = getImageRowHTML(item);
        tableBody.appendChild(row);
    });
}

function getImageRowHTML(item) {
    return `
        <td><input type="checkbox" data-id="${item.id}"></td>
        <td>
            <div class="image-name" title="${item.name}">${item.name}</div>
        </td>
        <td>
            <div class="security-findings">
                ${item.securityFindings.critical > 0 ? `<span class="finding-badge finding-critical">${item.securityFindings.critical}</span>` : ''}
                ${item.securityFindings.high > 0 ? `<span class="finding-badge finding-high">${item.securityFindings.high}</span>` : ''}
                ${item.securityFindings.medium > 0 ? `<span class="finding-badge finding-medium">${item.securityFindings.medium}</span>` : ''}
                ${item.securityFindings.low > 0 ? `<span class="finding-badge finding-low">${item.securityFindings.low}</span>` : ''}
                ${item.securityFindings.negligible > 0 ? `<span class="finding-badge finding-negligible">${item.securityFindings.negligible}</span>` : ''}
            </div>
        </td>
        <td>
            <div class="compliance-status">
                <span class="compliance-compliant">Compliant</span>
            </div>
        </td>
        <td>${item.registry}</td>
        <td><span class="registry-type">${item.registryType}</span></td>
        <td><span class="architecture-badge">${item.architecture}</span></td>
        <td>${item.aquaLabels || '-'}</td>
        <td><div class="docker-id" title="${item.dockerId}">${item.dockerId}</div></td>
    `;
}

function renderContainersTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    // Update table headers for containers
    updateTableHeaders([
        '', 'Name', 'Status', 'Namespace', 'Image', 'Node', 'Created'
    ]);
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = getContainerRowHTML(item);
        tableBody.appendChild(row);
    });
}

function getContainerRowHTML(item) {
    return `
        <td><input type="checkbox" data-id="${item.id}"></td>
        <td><div class="image-name">${item.name}</div></td>
        <td><span class="compliance-compliant">${item.status}</span></td>
        <td>${item.namespace}</td>
        <td><div class="image-name">${item.image}</div></td>
        <td>${item.node}</td>
        <td>${new Date(item.created).toLocaleDateString()}</td>
    `;
}

function renderVMsTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    // Update table headers for VMs
    updateTableHeaders([
        '', 'Name', 'OS', 'Status', 'IP Address', 'Region', 'Instance Type'
    ]);
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = getVMRowHTML(item);
        tableBody.appendChild(row);
    });
}

function getVMRowHTML(item) {
    return `
        <td><input type="checkbox" data-id="${item.id}"></td>
        <td><div class="image-name">${item.name}</div></td>
        <td>${item.os}</td>
        <td><span class="compliance-compliant">${item.status}</span></td>
        <td><div class="docker-id">${item.ipAddress}</div></td>
        <td>${item.region}</td>
        <td><span class="registry-type">${item.instanceType}</span></td>
    `;
}

function renderPackagesTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    // Update table headers for packages
    updateTableHeaders([
        '', 'Package Name', 'Version', 'Type', 'Language/Ecosystem', 'Vulnerabilities', 'Used in Resources', 'Fix Available', 'License'
    ]);
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = getPackageRowHTML(item);
        tableBody.appendChild(row);
    });
}

function getPackageRowHTML(item) {
    const totalVulns = item.vulnerabilities.critical + item.vulnerabilities.high + item.vulnerabilities.medium + item.vulnerabilities.low;
    
    return `
        <td><input type="checkbox" data-id="${item.id}"></td>
        <td>
            <div class="image-name">${item.name}</div>
            <div class="docker-id">Latest: ${item.latestVersion}</div>
        </td>
        <td><span class="registry-type">${item.version}</span></td>
        <td><span class="architecture-badge">${item.type}</span></td>
        <td>
            <div class="image-name">${item.language}</div>
            <div class="docker-id">${item.ecosystem}</div>
        </td>
        <td>
            <div class="vulnerabilities">
                ${item.vulnerabilities.critical > 0 ? `<span class="severity-badge critical">${item.vulnerabilities.critical}</span>` : ''}
                ${item.vulnerabilities.high > 0 ? `<span class="severity-badge high">${item.vulnerabilities.high}</span>` : ''}
                ${item.vulnerabilities.medium > 0 ? `<span class="severity-badge medium">${item.vulnerabilities.medium}</span>` : ''}
                ${item.vulnerabilities.low > 0 ? `<span class="severity-badge low">${item.vulnerabilities.low}</span>` : ''}
                ${totalVulns === 0 ? '<span class="severity-badge none">0</span>' : ''}
            </div>
        </td>
        <td>
            <div class="image-name">${item.usedInResources} resources</div>
        </td>
        <td><span class="${item.fixAvailable ? 'compliance-compliant' : 'compliance-non-compliant'}">${item.fixAvailable ? 'Available' : 'None'}</span></td>
        <td><span class="registry-type">${item.license}</span></td>
    `;
}

function renderAIModelsTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    // Update table headers for AI models
    updateTableHeaders([
        '', 'Model Name', 'Version', 'Provider', 'Type', 'Deployment Mode', 'Security Risks', 'Used by Apps', 'Compliance Status'
    ]);
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = getAIModelRowHTML(item);
        tableBody.appendChild(row);
    });
}

function getAIModelRowHTML(item) {
    const totalRisks = item.securityRisks.high + item.securityRisks.medium + item.securityRisks.low;
    
    return `
        <td><input type="checkbox" data-id="${item.id}"></td>
        <td>
            <div class="image-name">${item.name}</div>
            <div class="docker-id">Published: ${new Date(item.publishDate).toLocaleDateString()}</div>
        </td>
        <td><span class="registry-type">${item.version}</span></td>
        <td><span class="architecture-badge">${item.provider}</span></td>
        <td><span class="registry-type">${item.type}</span></td>
        <td><span class="${item.deploymentMode === 'Local' ? 'compliance-compliant' : 'deployment-remote'}">${item.deploymentMode}</span></td>
        <td>
            <div class="vulnerabilities">
                ${item.securityRisks.high > 0 ? `<span class="severity-badge high">${item.securityRisks.high}</span>` : ''}
                ${item.securityRisks.medium > 0 ? `<span class="severity-badge medium">${item.securityRisks.medium}</span>` : ''}
                ${item.securityRisks.low > 0 ? `<span class="severity-badge low">${item.securityRisks.low}</span>` : ''}
                ${totalRisks === 0 ? '<span class="severity-badge none">0</span>' : ''}
            </div>
        </td>
        <td>
            <div class="image-name">${item.usedByApplications} applications</div>
            <div class="docker-id">${item.requestsPerDay.toLocaleString()} req/day</div>
        </td>
        <td><span class="${item.complianceStatus === 'Compliant' || item.complianceStatus === 'Approved' ? 'compliance-compliant' : 'compliance-warning'}">${item.complianceStatus}</span></td>
    `;
}

function renderRepositoriesTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    // Update table headers for repositories
    updateTableHeaders([
        '', 'Repository Name', 'Branch', 'SCM Provider', 'Language', 'Secrets', 'Security Findings', 'Compliance', 'Last Commit'
    ]);
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = getRepositoryRowHTML(item);
        tableBody.appendChild(row);
    });
}

function getRepositoryRowHTML(item) {
    // Calculate total secrets and vulnerabilities
    const totalSecrets = Object.values(item.secrets).reduce((sum, count) => sum + count, 0);
    const totalFindings = Object.values(item.securityFindings).reduce((sum, count) => sum + count, 0);
    
    // Create secrets summary badges
    const secretsBadges = [];
    if (item.secrets.critical > 0) secretsBadges.push(`<span class="severity-badge critical">${item.secrets.critical}C</span>`);
    if (item.secrets.high > 0) secretsBadges.push(`<span class="severity-badge high">${item.secrets.high}H</span>`);
    if (item.secrets.medium > 0) secretsBadges.push(`<span class="severity-badge medium">${item.secrets.medium}M</span>`);
    if (item.secrets.low > 0) secretsBadges.push(`<span class="severity-badge low">${item.secrets.low}L</span>`);
    
    // Create security findings summary badges
    const findingsBadges = [];
    if (item.securityFindings.critical > 0) findingsBadges.push(`<span class="severity-badge critical">${item.securityFindings.critical}C</span>`);
    if (item.securityFindings.high > 0) findingsBadges.push(`<span class="severity-badge high">${item.securityFindings.high}H</span>`);
    if (item.securityFindings.medium > 0) findingsBadges.push(`<span class="severity-badge medium">${item.securityFindings.medium}M</span>`);
    if (item.securityFindings.low > 0) findingsBadges.push(`<span class="severity-badge low">${item.securityFindings.low}L</span>`);
    
    const complianceClass = item.compliance === 'Compliant' ? 'compliant' : 
                           item.compliance === 'Non-Compliant' ? 'non-compliant' : 'requires-review';
    
    return `
        <td><input type="checkbox" data-id="${item.id}"></td>
        <td>
            <div class="repo-info">
                <div class="repo-name">${item.name}</div>
                <div class="repo-fullname">${item.fullName}</div>
            </div>
        </td>
        <td>
            <div class="branch-info">
                <i class="fas fa-code-branch"></i>
                ${item.branch}
            </div>
        </td>
        <td>
            <div class="scm-provider">
                <i class="fab fa-${item.scmProvider.toLowerCase()}"></i>
                ${item.scmProvider}
            </div>
        </td>
        <td>
            <span class="language-badge">${item.language}</span>
        </td>
        <td>
            <div class="secrets-summary">
                ${secretsBadges.length > 0 ? secretsBadges.join(' ') : '<span class="no-secrets">None</span>'}
            </div>
        </td>
        <td>
            <div class="findings-summary">
                ${findingsBadges.length > 0 ? findingsBadges.join(' ') : '<span class="no-findings">None</span>'}
            </div>
        </td>
        <td><span class="compliance-${complianceClass}">${item.compliance}</span></td>
        <td>
            <div class="commit-info">
                <div class="commit-date">${new Date(item.lastCommit).toLocaleDateString()}</div>
                <div class="committer">${item.committer.split('@')[0]}</div>
            </div>
        </td>
    `;
}

function renderKubernetesTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    // Update table headers for kubernetes resources
    updateTableHeaders([
        '', 'Resource Name', 'Type', 'Namespace', 'Cluster', 'Status', 'Security Risk', 'Age', 'Replicas'
    ]);
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = getKubernetesRowHTML(item);
        tableBody.appendChild(row);
    });
}

function getKubernetesRowHTML(item) {
    // Calculate total security risks
    const totalRisks = Object.values(item.securityRisk).reduce((sum, count) => sum + count, 0);
    
    // Create security risk summary badges
    const riskBadges = [];
    if (item.securityRisk.critical > 0) riskBadges.push(`<span class="severity-badge critical">${item.securityRisk.critical}C</span>`);
    if (item.securityRisk.high > 0) riskBadges.push(`<span class="severity-badge high">${item.securityRisk.high}H</span>`);
    if (item.securityRisk.medium > 0) riskBadges.push(`<span class="severity-badge medium">${item.securityRisk.medium}M</span>`);
    if (item.securityRisk.low > 0) riskBadges.push(`<span class="severity-badge low">${item.securityRisk.low}L</span>`);
    
    // Determine status color class
    const statusClass = item.status === 'Running' || item.status === 'Active' ? 'compliant' : 
                       item.status === 'Failed' || item.status === 'Error' ? 'non-compliant' : 'requires-review';
    
    // Get resource type icon
    const getResourceTypeIcon = (type) => {
        const icons = {
            'Pod': 'fas fa-cube',
            'Deployment': 'fas fa-layer-group',
            'StatefulSet': 'fas fa-database',
            'DaemonSet': 'fas fa-server',
            'Service': 'fas fa-network-wired',
            'ConfigMap': 'fas fa-cog',
            'Secret': 'fas fa-key',
            'Ingress': 'fas fa-globe',
            'Job': 'fas fa-play',
            'CronJob': 'fas fa-clock',
            'PersistentVolume': 'fas fa-hdd',
            'HorizontalPodAutoscaler': 'fas fa-expand-arrows-alt'
        };
        return icons[type] || 'fas fa-cube';
    };
    
    return `
        <td><input type="checkbox" data-id="${item.id}"></td>
        <td>
            <div class="k8s-resource-info">
                <div class="resource-name">${item.name}</div>
                <div class="resource-image">${item.image !== '-' ? item.image : ''}</div>
            </div>
        </td>
        <td>
            <div class="resource-type">
                <i class="${getResourceTypeIcon(item.resourceType)}"></i>
                ${item.resourceType}
            </div>
        </td>
        <td>
            <span class="namespace-badge">${item.namespace}</span>
        </td>
        <td>
            <div class="cluster-info">
                <i class="fas fa-cloud"></i>
                ${item.cluster}
            </div>
        </td>
        <td><span class="compliance-${statusClass}">${item.status}</span></td>
        <td>
            <div class="risk-summary">
                ${riskBadges.length > 0 ? riskBadges.join(' ') : '<span class="no-risks">None</span>'}
            </div>
        </td>
        <td>
            <span class="age-info">${item.age}</span>
        </td>
        <td>
            <span class="replicas-info">${item.replicas}</span>
        </td>
    `;
}

function renderCloudResourcesTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    // Update table headers for cloud resources
    updateTableHeaders([
        '', 'Resource Name', 'Resource Type', 'Cloud Provider', 'Cloud Account', 'Region', 'Security Findings', 'Compliance', 'Status'
    ]);
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = getCloudResourceRowHTML(item);
        tableBody.appendChild(row);
    });
}

function getCloudResourceRowHTML(item) {
    // Create security findings summary badges
    const findingsBadges = [];
    if (item.securityFindings.critical > 0) findingsBadges.push(`<span class="severity-badge critical">${item.securityFindings.critical}C</span>`);
    if (item.securityFindings.high > 0) findingsBadges.push(`<span class="severity-badge high">${item.securityFindings.high}H</span>`);
    if (item.securityFindings.medium > 0) findingsBadges.push(`<span class="severity-badge medium">${item.securityFindings.medium}M</span>`);
    if (item.securityFindings.low > 0) findingsBadges.push(`<span class="severity-badge low">${item.securityFindings.low}L</span>`);
    
    const complianceClass = item.compliance === 'Compliant' ? 'compliant' : 
                           item.compliance === 'Non-Compliant' ? 'non-compliant' : 'requires-review';
    
    const statusClass = item.status === 'Active' || item.status === 'Available' || item.status === 'Running' ? 'compliant' : 
                       item.status === 'Failed' || item.status === 'Error' ? 'non-compliant' : 'requires-review';
    
    // Get cloud provider icon
    const getCloudProviderIcon = (provider) => {
        const icons = {
            'AWS': 'fab fa-aws',
            'Azure': 'fab fa-microsoft',
            'GCP': 'fab fa-google'
        };
        return icons[provider] || 'fas fa-cloud';
    };
    
    // Get resource type icon
    const getResourceTypeIcon = (type) => {
        const icons = {
            'S3 Bucket': 'fas fa-database',
            'RDS Instance': 'fas fa-server',
            'SQS Queue': 'fas fa-stream',
            'Lambda Function': 'fas fa-bolt',
            'Storage Account': 'fas fa-hdd',
            'App Service': 'fas fa-globe',
            'BigQuery Dataset': 'fas fa-chart-bar',
            'GKE Cluster': 'fas fa-cubes',
            'Key Vault': 'fas fa-key',
            'Cloud Storage': 'fas fa-folder',
            'Redshift Cluster': 'fas fa-database',
            'CloudFront Distribution': 'fas fa-network-wired'
        };
        return icons[type] || 'fas fa-cube';
    };
    
    return `
        <td><input type="checkbox" data-id="${item.id}"></td>
        <td>
            <div class="cloud-resource-info">
                <div class="resource-name">${item.name}</div>
                <div class="resource-id">${item.resourceArn || item.resourceId || '-'}</div>
            </div>
        </td>
        <td>
            <div class="resource-type">
                <i class="${getResourceTypeIcon(item.resourceType)}"></i>
                ${item.resourceType}
            </div>
        </td>
        <td>
            <div class="cloud-provider">
                <i class="${getCloudProviderIcon(item.cloudProvider)}"></i>
                ${item.cloudProvider}
            </div>
        </td>
        <td>
            <div class="cloud-account">
                ${item.cloudAccount}
            </div>
        </td>
        <td>
            <span class="region-badge">${item.region}</span>
        </td>
        <td>
            <div class="findings-summary">
                ${findingsBadges.length > 0 ? findingsBadges.join(' ') : '<span class="no-findings">None</span>'}
            </div>
        </td>
        <td><span class="compliance-${complianceClass}">${item.compliance}</span></td>
        <td><span class="compliance-${statusClass}">${item.status}</span></td>
    `;
}

function renderGenericTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    // Show empty state or placeholder
    const row = document.createElement('tr');
    row.innerHTML = `
        <td colspan="9" style="text-align: center; padding: 2rem; color: #6b7280;">
            <i class="fas fa-box-open" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
            No ${currentResourceType} data available
        </td>
    `;
    tableBody.appendChild(row);
}

function updateTableHeaders(headers) {
    const tableHeader = document.querySelector('.inventory-table thead tr');
    if (tableHeader) {
        tableHeader.innerHTML = headers.map(header => `<th>${header}</th>`).join('');
    }
}

function handleSearch(event) {
    currentSearchTerm = event.target.value;
    applyFiltersAndSearch();
    updateSaveButtonsVisibility();
}

function handleSelectAll(event) {
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = event.target.checked;
    });
}

function toggleFilterSection(event) {
    const section = event.currentTarget.closest('.filter-section');
    section.classList.toggle('collapsed');
}

// Filter panel functions
function toggleFiltersPanel() {
    const panel = document.getElementById('filtersPanel');
    const overlay = getOrCreateOverlay();
    
    if (panel.classList.contains('open')) {
        panel.classList.remove('open');
        overlay.classList.remove('active');
    } else {
        panel.classList.add('open');
        overlay.classList.add('active');
    }
}

function getOrCreateOverlay() {
    let overlay = document.querySelector('.filters-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'filters-overlay';
        overlay.addEventListener('click', toggleFiltersPanel);
        document.body.appendChild(overlay);
    }
    return overlay;
}

function applyFilter(filterKey, filterValue) {
    if (filterValue) {
        currentFilters[filterKey] = filterValue;
        addFilterChip(filterKey, filterValue);
    } else {
        delete currentFilters[filterKey];
        removeFilterChip(filterKey);
    }
    
    applyFiltersAndSearch();
    updateSaveButtonsVisibility();
}

function addFilterChip(filterKey, filterValue) {
    const activeFilters = document.getElementById('activeFilters');
    if (!activeFilters) return;
    
    // Remove existing chip for this filter
    removeFilterChip(filterKey);
    
    const chip = document.createElement('div');
    chip.className = 'filter-chip';
    chip.dataset.filterKey = filterKey;
    chip.innerHTML = `
        ${getFilterDisplayName(filterKey)}: ${filterValue}
        <span class="remove-chip" onclick="removeFilterChip('${filterKey}')">&times;</span>
    `;
    
    activeFilters.appendChild(chip);
    updateSaveButtonsVisibility();
}

function removeFilterChip(filterKey) {
    const existingChip = document.querySelector(`[data-filter-key="${filterKey}"]`);
    if (existingChip) {
        existingChip.remove();
        updateSaveButtonsVisibility();
    }
    
    delete currentFilters[filterKey];
    
    // Reset the corresponding select
    const select = document.querySelector(`select[onchange*="${filterKey}"]`);
    if (select) {
        select.value = '';
    }
    
    applyFiltersAndSearch();
}

function getFilterDisplayName(filterKey) {
    const displayNames = {
        'registryName': 'Registry Name',
        'repositoryName': 'Repository Name',
        'lastScanned': 'Last Scanned',
        'suppressionRule': 'Suppression Rule',
        'architecture': 'Architecture'
    };
    return displayNames[filterKey] || filterKey;
}

function clearAllFilters() {
    currentFilters = {};
    
    // Clear all chips
    const activeFilters = document.getElementById('activeFilters');
    if (activeFilters) {
        activeFilters.innerHTML = '';
    }
    
    // Reset all filter selects
    const filterSelects = document.querySelectorAll('.filter-field select');
    filterSelects.forEach(select => {
        select.value = '';
    });
    
    applyFiltersAndSearch();
    updateSaveButtonsVisibility();
    toggleFiltersPanel();
}

function resetFilters() {
    clearAllFilters();
}

function applyAllFilters() {
    // Filters are already applied in real-time, just close the panel
    toggleFiltersPanel();
}

function updateTotalCount() {
    const totalCountElement = document.getElementById('totalCount');
    if (totalCountElement) {
        const count = filteredData.length;
        if (count >= 1000) {
            totalCountElement.textContent = `${(count / 1000).toFixed(1)}k`;
        } else {
            totalCountElement.textContent = count.toString();
        }
    }
}

function clearActiveFilters() {
    const activeFilters = document.getElementById('activeFilters');
    if (activeFilters) {
        activeFilters.innerHTML = '';
    }
}

function toggleSavedFilters() {
    // Placeholder for saved filters functionality
    console.log('Toggle saved filters dropdown');
}

// Add some sample filters on page load for demonstration
function addSampleFilter() {
    // This would be called from the filters panel when a filter is applied
    setTimeout(() => {
        applyFilter('registryName', 'docker.io');
    }, 1000);
}

// Initialize with sample data
setTimeout(() => {
    updateTotalCount();
}, 100);

// Detail Panel Functions
let currentDetailItem = null;
let currentTab = 'risk';

function openDetailPanel(item) {
    currentDetailItem = item;
    currentTab = 'risk';
    
    const panel = document.getElementById('detailPanel');
    const overlay = document.getElementById('detailOverlay');
    const imageNameEl = document.getElementById('detailImageName');
    const createdEl = document.getElementById('detailCreated');
    
    // Update header info
    imageNameEl.textContent = item.name;
    createdEl.textContent = `Created 7 months ago`;
    
    // Reset active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-tab="risk"]').classList.add('active');
    
    // Show content for risk tab
    updateDetailContent();
    
    // Show panel
    panel.classList.add('open');
    overlay.classList.add('active');
    
    // Add event listeners for tabs
    setupTabListeners();
}

function closeDetailPanel() {
    const panel = document.getElementById('detailPanel');
    const overlay = document.getElementById('detailOverlay');
    
    panel.classList.remove('open');
    overlay.classList.remove('active');
    
    currentDetailItem = null;
}

function setupTabListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => switchTab(btn.dataset.tab);
    });
}

function switchTab(tabName) {
    currentTab = tabName;
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update content
    updateDetailContent();
}

function updateDetailContent() {
    const contentEl = document.getElementById('detailContent');
    
    switch (currentTab) {
        case 'risk':
            contentEl.innerHTML = getRiskTabContent();
            break;
        case 'vulnerabilities':
            contentEl.innerHTML = getVulnerabilitiesTabContent();
            break;
        case 'resources':
            contentEl.innerHTML = getResourcesTabContent();
            break;
        case 'sensitive':
            contentEl.innerHTML = getSensitiveDataTabContent();
            break;
        case 'information':
            contentEl.innerHTML = getInformationTabContent();
            break;
        case 'scan-history':
            contentEl.innerHTML = getScanHistoryTabContent();
            break;
        default:
            contentEl.innerHTML = getEmptyTabContent(currentTab);
            break;
    }
}

function getRiskTabContent() {
    return `
        <div class="compliance-header">
            <i class="fas fa-check-circle compliance-icon"></i>
            <div class="compliance-info">
                <h3>Image Is Compliant</h3>
                <p>Image scanned on 2025-05-18 | 04:37 PM</p>
            </div>
            <button class="rescan-btn">
                <i class="fas fa-sync"></i> Rescan Image
            </button>
        </div>

        <div class="assurance-section">
            <h3>Image Assurance</h3>
            <div class="assurance-policies">
                <div class="policy-item">
                    <i class="fas fa-check-circle policy-status"></i>
                    <div class="policy-info">
                        <div class="policy-name">Policy: Manasi-demo</div>
                    </div>
                    <span class="policy-badge">Passed</span>
                </div>
                <div class="policy-item">
                    <i class="fas fa-check-circle policy-status"></i>
                    <div class="policy-info">
                        <div class="policy-name">Policy: Malware-Default-Policy</div>
                    </div>
                    <span class="policy-badge">Passed</span>
                </div>
                <div class="policy-item">
                    <i class="fas fa-check-circle policy-status"></i>
                    <div class="policy-info">
                        <div class="policy-name">Policy: Sensitive-Data-Default-Policy</div>
                    </div>
                    <span class="policy-badge">Passed</span>
                </div>
            </div>
        </div>

        <div class="scan-results">
            <div class="scan-card">
                <div class="scan-icon scan">
                    <i class="fas fa-search"></i>
                </div>
                <div class="scan-title">Image Scan</div>
                <div class="scan-status completed">Completed</div>
            </div>
            <div class="scan-card">
                <div class="scan-icon blocked">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="scan-title">Packages Blocked</div>
                <div class="scan-status passed">Passed</div>
            </div>
            <div class="scan-card">
                <div class="scan-icon compliance">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="scan-title">Custom Compliance Checks</div>
                <div class="scan-status passed">Passed</div>
            </div>
            <div class="scan-card">
                <div class="scan-icon cves">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="scan-title">CVEs Blocked</div>
                <div class="scan-status passed">Passed</div>
            </div>
            <div class="scan-card">
                <div class="scan-icon exploit">
                    <i class="fas fa-bug"></i>
                </div>
                <div class="scan-title">Vulnerability Exploitability and Severity</div>
                <div class="scan-status passed">Passed</div>
            </div>
            <div class="scan-card">
                <div class="scan-icon malware">
                    <i class="fas fa-virus"></i>
                </div>
                <div class="scan-title">Malware</div>
                <div class="scan-status passed">Passed</div>
            </div>
            <div class="scan-card">
                <div class="scan-icon sensitive">
                    <i class="fas fa-eye-slash"></i>
                </div>
                <div class="scan-title">Sensitive Data</div>
                <div class="scan-status passed">Passed</div>
            </div>
        </div>
    `;
}

function getVulnerabilitiesTabContent() {
    if (!currentDetailItem) return '';
    
    const findings = currentDetailItem.securityFindings;
    const total = findings.critical + findings.high + findings.medium + findings.low + findings.negligible;
    
    return `
        <div class="vulnerability-overview">
            <span class="vuln-summary-text">Vulnerabilities:</span>
            <div class="vuln-summary-badges">
                ${findings.critical > 0 ? `<span class="finding-badge finding-critical">${findings.critical} Critical</span>` : ''}
                ${findings.high > 0 ? `<span class="finding-badge finding-high">${findings.high} High</span>` : ''}
                ${findings.medium > 0 ? `<span class="finding-badge finding-medium">${findings.medium} Medium</span>` : ''}
                ${findings.low > 0 ? `<span class="finding-badge finding-low">${findings.low} Low</span>` : ''}
                ${findings.negligible > 0 ? `<span class="finding-badge finding-negligible">${findings.negligible} Negligible</span>` : ''}
                ${total === 0 ? `<span style="color: #22c55e; font-weight: 500;">No vulnerabilities found</span>` : ''}
            </div>
        </div>

        <div class="table-container">
            <table class="inventory-table">
                <thead>
                    <tr>
                        <th>Vulnerability Name</th>
                        <th>Severity</th>
                        <th>Custom Severity</th>
                        <th>Resource</th>
                        <th>Exploit Availability</th>
                        <th>Vendor Fix</th>
                        <th>vShield</th>
                        <th>Qualys IDs</th>
                        <th>Acknowledged Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ALAS2-2024-2521</td>
                        <td><span class="finding-badge finding-high">High</span></td>
                        <td>-</td>
                        <td>glibc</td>
                        <td>-</td>
                        <td><i class="fas fa-check" style="color: #22c55e;"></i></td>
                        <td>-</td>
                        <td>-</td>
                        <td><a href="#" style="color: #3b82f6;">Suppress</a></td>
                    </tr>
                    <tr>
                        <td>ALAS2-2024-2718</td>
                        <td><span class="finding-badge finding-medium">Medium</span></td>
                        <td>-</td>
                        <td>glibc</td>
                        <td>-</td>
                        <td><i class="fas fa-check" style="color: #22c55e;"></i></td>
                        <td>-</td>
                        <td>-</td>
                        <td><a href="#" style="color: #3b82f6;">Suppress</a></td>
                    </tr>
                    <tr>
                        <td>ALAS2-2025-2828</td>
                        <td><span class="finding-badge finding-medium">Medium</span></td>
                        <td>-</td>
                        <td>glibc</td>
                        <td>-</td>
                        <td><i class="fas fa-check" style="color: #22c55e;"></i></td>
                        <td>-</td>
                        <td>-</td>
                        <td><a href="#" style="color: #3b82f6;">Suppress</a></td>
                    </tr>
                    <tr>
                        <td>ALAS2-2024-2607</td>
                        <td><span class="finding-badge finding-low">Low</span></td>
                        <td>-</td>
                        <td>ca-certificates</td>
                        <td>-</td>
                        <td><i class="fas fa-check" style="color: #22c55e;"></i></td>
                        <td>-</td>
                        <td>-</td>
                        <td><a href="#" style="color: #3b82f6;">Suppress</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function getResourcesTabContent() {
    return `
        <div style="margin-bottom: 1rem;">
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <span class="finding-badge finding-critical">0 Critical</span>
                <span class="finding-badge finding-high">1 High</span>
                <span class="finding-badge finding-medium">2 Medium</span>
                <span class="finding-badge finding-low">1 Low</span>
                <span class="finding-badge finding-negligible">0 Negligible</span>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" checked> Show Files
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox"> Hide Base Image Vulnerabilities (0)
                </label>
                <button class="btn btn-primary" style="margin-left: auto;">
                    <i class="fas fa-download"></i> SBOM
                </button>
            </div>
        </div>

        <div class="table-container">
            <table class="inventory-table">
                <thead>
                    <tr>
                        <th>Resource</th>
                        <th>Type</th>
                        <th>Version</th>
                        <th>Fix Version</th>
                        <th>License</th>
                        <th>Vulnerabilities</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="cursor: pointer;">
                        <td>glibc</td>
                        <td><i class="fas fa-cube" style="color: #6b7280;"></i> RPM Package</td>
                        <td>2.26-63.amzn2.0.1</td>
                        <td>2.26-64.amzn2.0.4</td>
                        <td>GPL2, LGPL2</td>
                        <td>
                            <span class="finding-badge finding-high">1</span>
                            <span class="finding-badge finding-medium">2</span>
                        </td>
                    </tr>
                    <tr style="cursor: pointer;">
                        <td>ca-certificates</td>
                        <td><i class="fas fa-cube" style="color: #6b7280;"></i> RPM Package</td>
                        <td>2021.2.50-72.amzn2.0.8</td>
                        <td>2023.2.68-1.amzn...</td>
                        <td>PD</td>
                        <td>
                            <span class="finding-badge finding-low">1</span>
                        </td>
                    </tr>
                    <tr style="cursor: pointer;">
                        <td>system-release</td>
                        <td><i class="fas fa-cube" style="color: #6b7280;"></i> RPM Package</td>
                        <td>1:2-14.amzn2</td>
                        <td>None</td>
                        <td>GPL2</td>
                        <td><span style="color: #22c55e;">No Issues</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function getSensitiveDataTabContent() {
    return `
        <div class="empty-state">
            <i class="fas fa-eye-slash"></i>
            <h3>No sensitive information was found in the image.</h3>
        </div>
    `;
}

function getInformationTabContent() {
    if (!currentDetailItem) return '';
    
    return `
        <h3 style="margin-bottom: 1.5rem;">General Information</h3>
        <div class="info-grid">
            <div class="info-label">Architecture:</div>
            <div class="info-value">${currentDetailItem.architecture}</div>
            
            <div class="info-label">Author:</div>
            <div class="info-value">N/A</div>
            
            <div class="info-label">Content Digest:</div>
            <div class="info-value">sha256:0475f03f7e1ed5bb018a7ed9003c9faf1531f8d1c3257cb120d46c39aa1bf8a8</div>
            
            <div class="info-label">Created:</div>
            <div class="info-value">12/13/2023 09:41 PM</div>
            
            <div class="info-label">Docker Version:</div>
            <div class="info-value">-</div>
            
            <div class="info-label">Environment:</div>
            <div class="info-value">N/A</div>
            
            <div class="info-label">Image ID:</div>
            <div class="info-value">sha256:0475f03f7e1ed5bb018a7ed9003c9faf1531f8d1c3257cb120d46c39aa1bf8a8</div>
            
            <div class="info-label">Image Labels:</div>
            <div class="info-value">-</div>
            
            <div class="info-label">Operating System:</div>
            <div class="info-value">Linux (amzn 2)</div>
            
            <div class="info-label">Repo Digest:</div>
            <div class="info-value">-</div>
        </div>
    `;
}

function getScanHistoryTabContent() {
    return `
        <div class="table-container">
            <table class="inventory-table">
                <thead>
                    <tr>
                        <th>Scan Date</th>
                        <th>Image ID</th>
                        <th>Security Status</th>
                        <th>Image Creation Date</th>
                        <th>Assigned Enforcer</th>
                        <th>Assigned Scanner</th>
                        <th>Scan results</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>05/18/2025 04:37 PM</td>
                        <td>sha256:0475f03f7e1ed5b...</td>
                        <td><span style="color: #22c55e;"><i class="fas fa-check-circle"></i> Passed</span></td>
                        <td>12/13/2023 09:41 PM</td>
                        <td>-</td>
                        <td>-</td>
                        <td>
                            <span class="finding-badge finding-high">1</span>
                            <span class="finding-badge finding-medium">2</span>
                            <span class="finding-badge finding-low">1</span>
                        </td>
                    </tr>
                    <tr>
                        <td>03/24/2025 03:35 PM</td>
                        <td>sha256:0475f03f7e1ed5b...</td>
                        <td><span style="color: #ea580c;"><i class="fas fa-exclamation-circle"></i> Non-compliant</span></td>
                        <td>12/13/2023 09:41 PM</td>
                        <td>-</td>
                        <td>-</td>
                        <td>
                            <span class="finding-badge finding-high">1</span>
                            <span class="finding-badge finding-medium">1</span>
                            <span class="finding-badge finding-low">1</span>
                        </td>
                    </tr>
                    <tr>
                        <td>01/29/2025 03:32 PM</td>
                        <td>sha256:0475f03f7e1ed5b...</td>
                        <td><span style="color: #22c55e;"><i class="fas fa-check-circle"></i> Passed</span></td>
                        <td>12/13/2023 09:41 PM</td>
                        <td>-</td>
                        <td>-</td>
                        <td>
                            <span class="finding-badge finding-high">1</span>
                            <span class="finding-badge finding-medium">1</span>
                            <span class="finding-badge finding-low">1</span>
                        </td>
                    </tr>
                    <tr>
                        <td>12/18/2024 03:32 PM</td>
                        <td>sha256:0475f03f7e1ed5b...</td>
                        <td><span style="color: #22c55e;"><i class="fas fa-check-circle"></i> Passed</span></td>
                        <td>12/13/2023 09:41 PM</td>
                        <td>-</td>
                        <td>-</td>
                        <td>
                            <span class="finding-badge finding-high">1</span>
                            <span class="finding-badge finding-low">1</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}


function getEmptyTabContent(tabName) {
    return `
        <div class="empty-state">
            <i class="fas fa-info-circle"></i>
            <h3>${tabName.replace('-', ' ')} content coming soon</h3>
            <p>This section is currently under development.</p>
        </div>
    `;
}

// Save buttons functionality
function updateSaveButtonsVisibility() {
    const saveButtons = document.querySelector('.action-buttons');
    const hasFilters = hasActiveFilters();
    
    if (saveButtons) {
        saveButtons.style.display = hasFilters ? 'flex' : 'none';
    }
}

function hasActiveFilters() {
    // Check if any filters are applied
    const hasFiltersFromObject = Object.keys(currentFilters).length > 0;
    const hasSearchTerm = currentSearchTerm !== '';
    const hasGrouping = currentGroupBy !== '';
    
    // Also check if there are any filter chips displayed
    const activeFiltersContainer = document.getElementById('activeFilters');
    const hasFilterChips = activeFiltersContainer && activeFiltersContainer.children.length > 0;
    
    return hasFiltersFromObject || hasSearchTerm || hasGrouping || hasFilterChips;
} 
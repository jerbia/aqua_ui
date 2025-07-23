// Findings Page JavaScript

// Global variables
let currentFindingType = 'vulnerabilities';
let currentFilters = {};
let currentSearchTerm = '';
let currentGroupBy = '';
let expandedGroups = new Set();
let filteredData = [];
let currentDetailItem = null;
let currentTab = 'overview';

// Mock Data for different finding types
const mockData = {
    vulnerabilities: [
        {
            id: 'CVE-2021-36159',
            name: 'CVE-2021-36159',
            description: 'libfetch before 2021-07-26, as used in apk-tools, xbps, and other products, mishandles numeric strings for the FTP and HTTP protocols.',
            severity: 'Critical',
            customSeverity: 'Critical',
            status: 'Open',
            resource: 'e2e_automation_us_east_1',
            resourceType: 'Image',
            workloads: 'No Running Workloads',
            exploitAvailable: true,
            vendorFix: 'Available',
            vshield: 'vShield',
            acknowledgedDate: null,
            dateFound: '2023-06-28',
            cvss: '9.1',
            cwe: 'CWE-125'
        },
        {
            id: 'CVE-2022-37434',
            name: 'CVE-2022-37434',
            description: 'zlib through 1.2.12 has a heap-based buffer over-read or buffer overflow in inflate in inflate.c via a large gzip header extra field.',
            severity: 'Critical',
            customSeverity: 'High',
            status: 'Acknowledged',
            resource: 'repo2/repo2_php_file_vuln',
            resourceType: 'Image',
            workloads: 'nginx-deployment',
            exploitAvailable: false,
            vendorFix: 'Available',
            vshield: 'vShield',
            acknowledgedDate: '2023-07-15',
            dateFound: '2023-06-25',
            cvss: '9.8',
            cwe: 'CWE-787'
        },
        {
            id: 'CVE-2023-4911',
            name: 'CVE-2023-4911',
            description: 'A buffer overflow was discovered in the GNU C Library\'s dynamic loader ld.so while processing the GLIBC_TUNABLES environment variable.',
            severity: 'High',
            customSeverity: 'High',
            status: 'Fixed',
            resource: 'alpine-base',
            resourceType: 'Image',
            workloads: 'web-server',
            exploitAvailable: true,
            vendorFix: 'Available',
            vshield: 'Enforce',
            acknowledgedDate: null,
            dateFound: '2023-09-12',
            cvss: '7.8',
            cwe: 'CWE-122'
        },
        {
            id: 'CVE-2023-38545',
            name: 'CVE-2023-38545',
            description: 'This flaw makes curl overflow a heap based buffer in the SOCKS5 proxy handshake.',
            severity: 'High',
            customSeverity: 'Medium',
            status: 'Suppressed',
            resource: 'ubuntu-latest',
            resourceType: 'Container',
            workloads: 'api-service',
            exploitAvailable: false,
            vendorFix: 'Pending',
            vshield: 'vShield',
            acknowledgedDate: '2023-08-20',
            dateFound: '2023-08-10',
            cvss: '7.5',
            cwe: 'CWE-119'
        },
        {
            id: 'CVE-2023-29383',
            name: 'CVE-2023-29383',
            description: 'In Shadow 4.13, it is possible to inject control characters into fields provided to the SUID program chfn.',
            severity: 'Medium',
            customSeverity: 'Low',
            status: 'Open',
            resource: 'node-app',
            resourceType: 'Image',
            workloads: 'backend-service',
            exploitAvailable: false,
            vendorFix: 'Available',
            vshield: 'vShield',
            acknowledgedDate: null,
            dateFound: '2023-09-05',
            cvss: '5.3',
            cwe: 'CWE-74'
        }
    ],
    secrets: [
        {
            id: 'SECRET-001',
            name: 'AWS Access Key Detected',
            description: 'AWS Access Key ID found in application configuration files.',
            severity: 'High',
            customSeverity: 'Critical',
            status: 'Open',
            resource: 'web-app-config',
            resourceType: 'Image',
            workloads: 'web-deployment',
            secretType: 'AWS Access Key',
            location: '/app/config/aws.json',
            entropy: 'High',
            dateFound: '2023-10-15'
        },
        {
            id: 'SECRET-002',
            name: 'Database Password Exposed',
            description: 'Database password found in plaintext environment variables.',
            severity: 'Critical',
            customSeverity: 'Critical',
            status: 'Acknowledged',
            resource: 'database-connector',
            resourceType: 'Container',
            workloads: 'db-service',
            secretType: 'Database Password',
            location: '/etc/environment',
            entropy: 'Medium',
            dateFound: '2023-10-12',
            acknowledgedDate: '2023-10-14'
        },
        {
            id: 'SECRET-003',
            name: 'GitHub Token Leaked',
            description: 'GitHub personal access token found in source code.',
            severity: 'High',
            customSeverity: 'High',
            status: 'Fixed',
            resource: 'source-scanner',
            resourceType: 'Image',
            workloads: 'ci-cd-pipeline',
            secretType: 'GitHub Token',
            location: '/src/scripts/deploy.sh',
            entropy: 'High',
            dateFound: '2023-10-08'
        },
        {
            id: 'SECRET-004',
            name: 'API Key in Logs',
            description: 'Third-party API key detected in application logs.',
            severity: 'Medium',
            customSeverity: 'Medium',
            status: 'Open',
            resource: 'log-processor',
            resourceType: 'Container',
            workloads: 'logging-service',
            secretType: 'API Key',
            location: '/var/log/app.log',
            entropy: 'Medium',
            dateFound: '2023-10-10'
        }
    ],
    misconfiguration: [
        {
            id: 'MISC-001',
            name: 'Container Running as Root',
            description: 'Container is configured to run as root user, violating security best practices.',
            severity: 'High',
            customSeverity: 'High',
            status: 'Open',
            resource: 'nginx-container',
            resourceType: 'Container',
            workloads: 'web-frontend',
            category: 'Privilege Escalation',
            compliance: 'CIS Docker Benchmark',
            recommendation: 'Configure container to run as non-root user',
            dateFound: '2023-10-16'
        },
        {
            id: 'MISC-002',
            name: 'Privileged Container Detected',
            description: 'Container running with privileged flag enabled.',
            severity: 'Critical',
            customSeverity: 'Critical',
            status: 'Acknowledged',
            resource: 'system-monitor',
            resourceType: 'Container',
            workloads: 'monitoring-stack',
            category: 'Container Security',
            compliance: 'Kubernetes Security',
            recommendation: 'Remove privileged flag unless absolutely necessary',
            dateFound: '2023-10-14',
            acknowledgedDate: '2023-10-15'
        },
        {
            id: 'MISC-003',
            name: 'Insecure Network Policy',
            description: 'Network policy allows all ingress traffic without restrictions.',
            severity: 'Medium',
            customSeverity: 'High',
            status: 'Open',
            resource: 'default-namespace',
            resourceType: 'Namespace',
            workloads: 'multiple-services',
            category: 'Network Security',
            compliance: 'Kubernetes Security',
            recommendation: 'Implement restrictive network policies',
            dateFound: '2023-10-13'
        },
        {
            id: 'MISC-004',
            name: 'Missing Resource Limits',
            description: 'Container deployed without CPU and memory limits.',
            severity: 'Low',
            customSeverity: 'Medium',
            status: 'Fixed',
            resource: 'api-backend',
            resourceType: 'Container',
            workloads: 'api-deployment',
            category: 'Resource Management',
            compliance: 'Kubernetes Best Practices',
            recommendation: 'Set appropriate CPU and memory limits',
            dateFound: '2023-10-11'
        }
    ],
    malware: [
        {
            id: 'MAL-001',
            name: 'Cryptocurrency Miner Detected',
            description: 'Suspicious cryptocurrency mining binary found in container.',
            severity: 'Critical',
            customSeverity: 'Critical',
            status: 'Open',
            resource: 'compromised-worker',
            resourceType: 'Container',
            workloads: 'worker-node',
            malwareType: 'Cryptocurrency Miner',
            signature: 'XMRig Mining Pool Connection',
            location: '/tmp/xmrig',
            quarantined: false,
            dateFound: '2023-10-17'
        },
        {
            id: 'MAL-002',
            name: 'Backdoor Shell Script',
            description: 'Malicious shell script providing backdoor access detected.',
            severity: 'Critical',
            customSeverity: 'Critical',
            status: 'Quarantined',
            resource: 'web-server-prod',
            resourceType: 'Image',
            workloads: 'production-web',
            malwareType: 'Backdoor',
            signature: 'Reverse Shell Pattern',
            location: '/usr/local/bin/update.sh',
            quarantined: true,
            dateFound: '2023-10-16'
        },
        {
            id: 'MAL-003',
            name: 'Suspicious Network Scanner',
            description: 'Network scanning tool commonly used by attackers detected.',
            severity: 'High',
            customSeverity: 'High',
            status: 'Acknowledged',
            resource: 'security-tools',
            resourceType: 'Image',
            workloads: 'security-testing',
            malwareType: 'Network Scanner',
            signature: 'Nmap Binary',
            location: '/usr/bin/nmap',
            quarantined: false,
            dateFound: '2023-10-15',
            acknowledgedDate: '2023-10-16'
        },
        {
            id: 'MAL-004',
            name: 'Keylogger Binary',
            description: 'Keylogging software detected in system binaries.',
            severity: 'High',
            customSeverity: 'Medium',
            status: 'Removed',
            resource: 'desktop-container',
            resourceType: 'Container',
            workloads: 'user-workspace',
            malwareType: 'Keylogger',
            signature: 'Keylogger Signature v2.1',
            location: '/opt/system/keylog',
            quarantined: true,
            dateFound: '2023-10-12'
        }
    ],
    aifindings: [
        {
            id: 'AI-2024-001',
            name: 'Prompt Injection Attack Detected',
            description: 'Malicious prompt injection attempting to manipulate the AI model behavior and extract sensitive information.',
            severity: 'Critical',
            status: 'Open',
            resource: 'GPT-3.5-turbo',
            resourceType: 'AI Model',
            owaspLlmTop10: 'LLM01: Prompt Injection',
            aiService: 'OpenAI ChatGPT',
            riskCategory: 'Model Manipulation',
            impact: 'High',
            confidenceScore: 95,
            detectionMethod: 'Pattern Analysis',
            dateFound: '2024-01-15'
        },
        {
            id: 'AI-2024-002',
            name: 'Unauthorized Model Usage',
            description: 'Detection of unauthorized AI model being used without proper security validation and compliance approval.',
            severity: 'High',
            status: 'Acknowledged',
            resource: 'Llama-2-7B',
            resourceType: 'AI Model',
            owaspLlmTop10: 'LLM03: Training Data Poisoning',
            aiService: 'Meta Llama',
            riskCategory: 'Unauthorized Access',
            impact: 'Medium',
            confidenceScore: 87,
            detectionMethod: 'Policy Violation',
            dateFound: '2024-01-12'
        },
        {
            id: 'AI-2024-003',
            name: 'Sensitive Data Leakage',
            description: 'AI model inadvertently exposing sensitive training data through generated responses.',
            severity: 'Critical',
            status: 'Open',
            resource: 'Claude-2',
            resourceType: 'AI Model',
            owaspLlmTop10: 'LLM02: Insecure Output Handling',
            aiService: 'Anthropic Claude',
            riskCategory: 'Data Exposure',
            impact: 'Critical',
            confidenceScore: 92,
            detectionMethod: 'Output Analysis',
            dateFound: '2024-01-14'
        },
        {
            id: 'AI-2024-004',
            name: 'Model Denial of Service',
            description: 'Excessive resource consumption attack targeting AI model infrastructure causing service degradation.',
            severity: 'Medium',
            status: 'Fixed',
            resource: 'BERT-base-uncased',
            resourceType: 'AI Model',
            owaspLlmTop10: 'LLM04: Model Denial of Service',
            aiService: 'Hugging Face Transformers',
            riskCategory: 'Resource Exhaustion',
            impact: 'Medium',
            confidenceScore: 78,
            detectionMethod: 'Resource Monitoring',
            dateFound: '2024-01-10'
        },
        {
            id: 'AI-2024-005',
            name: 'Supply Chain Vulnerability',
            description: 'Compromised third-party AI model component detected with potential backdoor functionality.',
            severity: 'High',
            status: 'Open',
            resource: 'Custom-YOLO-v8',
            resourceType: 'AI Model',
            owaspLlmTop10: 'LLM05: Supply Chain Vulnerabilities',
            aiService: 'Custom Vision Model',
            riskCategory: 'Supply Chain',
            impact: 'High',
            confidenceScore: 89,
            detectionMethod: 'Integrity Check',
            dateFound: '2024-01-13'
        },
        {
            id: 'AI-2024-006',
            name: 'Insecure Plugin Usage',
            description: 'AI model plugin with insufficient input validation allowing code execution vulnerabilities.',
            severity: 'High',
            status: 'Acknowledged',
            resource: 'ChatGPT-Plugin-Suite',
            resourceType: 'AI Plugin',
            owaspLlmTop10: 'LLM07: Insecure Plugin Design',
            aiService: 'OpenAI Plugins',
            riskCategory: 'Plugin Security',
            impact: 'High',
            confidenceScore: 85,
            detectionMethod: 'Code Analysis',
            dateFound: '2024-01-11'
        }
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeFindingsPage();
});

function initializeFindingsPage() {
    loadFindingData();
    setupEventListeners();
    updateGroupByOptions(); // Initialize group by options for the default finding type
    renderTable();
    updateTotalCount();
    updateSaveButtonsVisibility(); // Hide save buttons initially since no filters are applied
}

function setupEventListeners() {
    // Finding type change
    document.getElementById('findingTypeSelect').addEventListener('change', handleFindingTypeChange);
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Group by change
    document.getElementById('groupBySelect').addEventListener('change', handleGroupByChange);
    
    // Filter inputs
    const filterInputs = document.querySelectorAll('.filter-input');
    filterInputs.forEach(input => {
        input.addEventListener('change', () => {
            const filterType = input.getAttribute('data-filter');
            const filterValue = input.value;
            if (filterValue) {
                addFilterChip(filterType, filterValue);
            }
        });
    });
}

function handleFindingTypeChange() {
    const findingTypeSelect = document.getElementById('findingTypeSelect');
    currentFindingType = findingTypeSelect.value;
    
    // Reset filters and search
    currentFilters = {};
    currentSearchTerm = '';
    currentGroupBy = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('groupBySelect').value = '';
    clearActiveFilters();
    
    // Update search placeholder and group by options
    updateSearchPlaceholder();
    updateGroupByOptions();
    
    // Load new data and render
    loadFindingData();
    renderTable();
    updateTotalCount();
}

function updateSearchPlaceholder() {
    const searchInput = document.getElementById('searchInput');
    const placeholders = {
        'vulnerabilities': 'Search by CVE or vulnerability name',
        'secrets': 'Search by secret type or location',
        'misconfiguration': 'Search by configuration issue',
        'malware': 'Search by malware type or signature',
        'aifindings': 'Search by AI finding name or service'
    };
    searchInput.placeholder = placeholders[currentFindingType] || 'Search findings';
}

function updateGroupByOptions() {
    const groupBySelect = document.getElementById('groupBySelect');
    const currentValue = groupBySelect.value;
    
    // Define options for each finding type
    const optionsByType = {
        'vulnerabilities': [
            { value: '', text: 'No Grouping' },
            { value: 'severity', text: 'Severity' },
            { value: 'resource', text: 'Resource' },
            { value: 'type', text: 'Type' },
            { value: 'status', text: 'Status' }
        ],
        'secrets': [
            { value: '', text: 'No Grouping' },
            { value: 'severity', text: 'Severity' },
            { value: 'resource', text: 'Resource' },
            { value: 'type', text: 'Type' },
            { value: 'status', text: 'Status' }
        ],
        'misconfiguration': [
            { value: '', text: 'No Grouping' },
            { value: 'severity', text: 'Severity' },
            { value: 'resource', text: 'Resource' },
            { value: 'type', text: 'Type' },
            { value: 'status', text: 'Status' }
        ],
        'malware': [
            { value: '', text: 'No Grouping' },
            { value: 'severity', text: 'Severity' },
            { value: 'resource', text: 'Resource' },
            { value: 'type', text: 'Type' },
            { value: 'status', text: 'Status' }
        ],
        'aifindings': [
            { value: '', text: 'No Grouping' },
            { value: 'severity', text: 'Severity' },
            { value: 'aiservice', text: 'AI Service' },
            { value: 'type', text: 'Type' },
            { value: 'status', text: 'Status' }
        ]
    };
    
    const options = optionsByType[currentFindingType] || optionsByType['vulnerabilities'];
    
    // Clear existing options
    groupBySelect.innerHTML = '';
    
    // Add new options
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        groupBySelect.appendChild(optionElement);
    });
    
    // Restore previous value if it still exists in new options
    const validOptions = options.map(opt => opt.value);
    if (validOptions.includes(currentValue)) {
        groupBySelect.value = currentValue;
    } else {
        groupBySelect.value = '';
        currentGroupBy = '';
    }
}

function loadFindingData() {
    filteredData = [...mockData[currentFindingType]];
}

function applyFiltersAndSearch() {
    filteredData = mockData[currentFindingType].filter(item => {
        // Apply search filter
        if (currentSearchTerm) {
            const searchFields = [item.name, item.description, item.id];
            if (currentFindingType === 'secrets') {
                searchFields.push(item.secretType, item.location);
            } else if (currentFindingType === 'misconfiguration') {
                searchFields.push(item.category, item.compliance);
            } else if (currentFindingType === 'malware') {
                searchFields.push(item.malwareType, item.signature);
            } else if (currentFindingType === 'aifindings') {
                searchFields.push(item.aiService, item.riskCategory, item.owaspLlmTop10);
            }
            
            const matchesSearch = searchFields.some(field => 
                field && field.toLowerCase().includes(currentSearchTerm.toLowerCase())
            );
            if (!matchesSearch) return false;
        }
        
        // Apply other filters
        for (const [filterType, filterValue] of Object.entries(currentFilters)) {
            switch (filterType) {
                case 'severity':
                    if (item.severity !== filterValue) return false;
                    break;
                case 'status':
                    if (item.status !== filterValue) return false;
                    break;
                case 'resourceType':
                    if (item.resourceType !== filterValue) return false;
                    break;
            }
        }
        
        return true;
    });
    updateSaveButtonsVisibility();
}

function renderTable() {
    applyFiltersAndSearch();
    
    if (currentGroupBy) {
        renderGroupedTable();
    } else {
        renderRegularTable();
    }
    
    updateTableHeaders();
}

function updateTableHeaders() {
    const headers = document.getElementById('tableHeaders');
    let headerHtml = '<th><input type="checkbox" id="selectAll" onchange="handleSelectAll()"></th>';
    
    switch (currentFindingType) {
        case 'vulnerabilities':
            headerHtml += `
                <th>Vulnerability Name</th>
                <th>Severity</th>
                <th>Resource</th>
                <th>Status</th>
                <th>CVSS Score</th>
                <th>Exploit Available</th>
                <th>Actions</th>
            `;
            break;
        case 'secrets':
            headerHtml += `
                <th>Secret Type</th>
                <th>Severity</th>
                <th>Resource</th>
                <th>Status</th>
                <th>Location</th>
                <th>Entropy</th>
                <th>Actions</th>
            `;
            break;
        case 'misconfiguration':
            headerHtml += `
                <th>Configuration Issue</th>
                <th>Severity</th>
                <th>Resource</th>
                <th>Status</th>
                <th>Category</th>
                <th>Compliance</th>
                <th>Actions</th>
            `;
            break;
        case 'malware':
            headerHtml += `
                <th>Malware Type</th>
                <th>Severity</th>
                <th>Resource</th>
                <th>Status</th>
                <th>Location</th>
                <th>Quarantined</th>
                <th>Actions</th>
            `;
            break;
        case 'aifindings':
            headerHtml += `
                <th>AI Finding Name</th>
                <th>Severity</th>
                <th>AI Service</th>
                <th>Status</th>
                <th>OWASP LLM Top 10</th>
                <th>Risk Category</th>
                <th>Actions</th>
            `;
            break;
    }
    
    headers.innerHTML = headerHtml;
}

function renderRegularTable() {
    const tbody = document.getElementById('findingsTableBody');
    const table = document.getElementById('findingsTable');
    table.classList.remove('grouped');
    
    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No findings found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    filteredData.forEach(item => {
        html += generateRowHtml(item);
    });
    
    tbody.innerHTML = html;
}

function generateRowHtml(item) {
    let specificColumns = '';
    
    switch (currentFindingType) {
        case 'vulnerabilities':
            specificColumns = `
                <td class="finding-name">
                    <div>${item.name}</div>
                    <div class="finding-id">${item.id}</div>
                </td>
                <td><span class="severity-badge severity-${item.severity.toLowerCase()}">${item.severity}</span></td>
                <td>
                    <div class="resource-info">
                        <div class="resource-name">${item.resource}</div>
                        <div class="resource-type">${item.resourceType}</div>
                    </div>
                </td>
                <td><span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
                <td>${item.cvss}</td>
                <td>${item.exploitAvailable ? '<span style="color: #dc2626;">Yes</span>' : '<span style="color: #059669;">No</span>'}</td>
            `;
            break;
        case 'secrets':
            specificColumns = `
                <td class="finding-name">
                    <div>${item.name}</div>
                    <div class="finding-id">${item.secretType}</div>
                </td>
                <td><span class="severity-badge severity-${item.severity.toLowerCase()}">${item.severity}</span></td>
                <td>
                    <div class="resource-info">
                        <div class="resource-name">${item.resource}</div>
                        <div class="resource-type">${item.resourceType}</div>
                    </div>
                </td>
                <td><span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
                <td class="finding-name">${item.location}</td>
                <td>${item.entropy}</td>
            `;
            break;
        case 'misconfiguration':
            specificColumns = `
                <td class="finding-name">
                    <div>${item.name}</div>
                    <div class="finding-id">${item.id}</div>
                </td>
                <td><span class="severity-badge severity-${item.severity.toLowerCase()}">${item.severity}</span></td>
                <td>
                    <div class="resource-info">
                        <div class="resource-name">${item.resource}</div>
                        <div class="resource-type">${item.resourceType}</div>
                    </div>
                </td>
                <td><span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
                <td>${item.category}</td>
                <td>${item.compliance}</td>
            `;
            break;
        case 'malware':
            specificColumns = `
                <td class="finding-name">
                    <div>${item.name}</div>
                    <div class="finding-id">${item.malwareType}</div>
                </td>
                <td><span class="severity-badge severity-${item.severity.toLowerCase()}">${item.severity}</span></td>
                <td>
                    <div class="resource-info">
                        <div class="resource-name">${item.resource}</div>
                        <div class="resource-type">${item.resourceType}</div>
                    </div>
                </td>
                <td><span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
                <td class="finding-name">${item.location}</td>
                <td>${item.quarantined ? '<span style="color: #059669;">Yes</span>' : '<span style="color: #dc2626;">No</span>'}</td>
            `;
            break;
        case 'aifindings':
            specificColumns = `
                <td class="finding-name">
                    <div>${item.name}</div>
                    <div class="finding-id">${item.id}</div>
                </td>
                <td><span class="severity-badge severity-${item.severity.toLowerCase()}">${item.severity}</span></td>
                <td>
                    <div class="resource-info">
                        <div class="resource-name">${item.aiService}</div>
                        <div class="resource-type">${item.resourceType}</div>
                    </div>
                </td>
                <td><span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
                <td class="finding-name">${item.owaspLlmTop10}</td>
                <td><span class="risk-category-badge ${item.riskCategory.toLowerCase().replace(' ', '-')}">${item.riskCategory}</span></td>
            `;
            break;
    }
    
    return `
        <tr data-item-id="${item.id}" onclick="openDetailPanelById('${item.id}')">
            <td><input type="checkbox"></td>
            ${specificColumns}
            <td>
                <div class="action-buttons-cell">
                    <button class="btn-action primary" onclick="event.stopPropagation(); openAcknowledgeModal('${item.id}')">Acknowledge</button>
                </div>
            </td>
        </tr>
    `;
}

function handleGroupByChange() {
    const groupBySelect = document.getElementById('groupBySelect');
    currentGroupBy = groupBySelect.value;
    expandedGroups.clear(); // Ensure no groups are expanded when changing grouping
    
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

function getGroupedData() {
    if (!currentGroupBy) return [];
    
    const groups = {};
    
    filteredData.forEach(item => {
        let groupValue;
        switch (currentGroupBy) {
            case 'severity':
                groupValue = item.severity;
                break;
            case 'resource':
                groupValue = item.resource;
                break;
            case 'type':
                if (currentFindingType === 'secrets') {
                    groupValue = item.secretType;
                } else if (currentFindingType === 'misconfiguration') {
                    groupValue = item.category;
                } else if (currentFindingType === 'malware') {
                    groupValue = item.malwareType;
                } else {
                    groupValue = 'Vulnerability';
                }
                break;
            case 'status':
                groupValue = item.status;
                break;
            case 'aiservice':
                groupValue = item.aiService;
                break;
            default:
                groupValue = 'Other';
        }
        
        if (!groups[groupValue]) {
            groups[groupValue] = [];
        }
        groups[groupValue].push(item);
    });
    
    return Object.keys(groups)
        .sort()
        .map(key => ({
            key,
            items: groups[key]
        }));
}

function renderGroupedTable() {
    const tbody = document.getElementById('findingsTableBody');
    const table = document.getElementById('findingsTable');
    table.classList.add('grouped');
    
    // Ensure table headers are correct for the current finding type
    updateTableHeaders();
    
    const groups = getGroupedData();
    
    // Clear existing content
    tbody.innerHTML = '';
    
    if (groups.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="8" class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No findings found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </td>
        `;
        tbody.appendChild(emptyRow);
        return;
    }
    
    groups.forEach(group => {
        // Create group header
        const groupRow = document.createElement('tr');
        groupRow.className = `group-header ${expandedGroups.has(group.key) ? '' : 'collapsed'}`;
        groupRow.onclick = () => toggleGroup(group.key);
        
        groupRow.innerHTML = `
            <td colspan="8">
                <div class="group-header-content">
                    <div class="group-title">
                        <i class="fas fa-chevron-right group-icon"></i>
                        <span>${getGroupDisplayName(currentGroupBy)}: ${group.key}</span>
                    </div>
                    <div class="group-stats">
                        <span class="group-count">${group.items.length} items</span>
                        ${getGroupSummary(group.items)}
                    </div>
                </div>
            </td>
        `;
        
        tbody.appendChild(groupRow);
        
        // Add items directly to the main tbody
        group.items.forEach(item => {
            const row = document.createElement('tr');
            const isExpanded = expandedGroups.has(group.key);
            row.className = `group-items ${isExpanded ? '' : 'collapsed'}`;
            row.dataset.groupKey = group.key.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
            row.dataset.itemId = item.id;
            row.style.cursor = 'pointer';
            row.onclick = (e) => {
                if (e.target.type !== 'checkbox') {
                    openDetailPanelById(item.id);
                }
            };
            
            // Generate the row content directly
            let specificColumns = '';
            
            switch (currentFindingType) {
                case 'vulnerabilities':
                    specificColumns = `
                        <td class="finding-name">
                            <div>${item.name}</div>
                            <div class="finding-id">${item.id}</div>
                        </td>
                        <td><span class="severity-badge severity-${item.severity.toLowerCase()}">${item.severity}</span></td>
                        <td>
                            <div class="resource-info">
                                <div class="resource-name">${item.resource}</div>
                                <div class="resource-type">${item.resourceType}</div>
                            </div>
                        </td>
                        <td><span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
                        <td>${item.cvss}</td>
                        <td>${item.exploitAvailable ? '<span style="color: #dc2626;">Yes</span>' : '<span style="color: #059669;">No</span>'}</td>
                    `;
                    break;
                case 'secrets':
                    specificColumns = `
                        <td class="finding-name">
                            <div>${item.name}</div>
                            <div class="finding-id">${item.secretType}</div>
                        </td>
                        <td><span class="severity-badge severity-${item.severity.toLowerCase()}">${item.severity}</span></td>
                        <td>
                            <div class="resource-info">
                                <div class="resource-name">${item.resource}</div>
                                <div class="resource-type">${item.resourceType}</div>
                            </div>
                        </td>
                        <td><span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
                        <td class="finding-name">${item.location}</td>
                        <td>${item.entropy}</td>
                    `;
                    break;
                case 'misconfiguration':
                    specificColumns = `
                        <td class="finding-name">
                            <div>${item.name}</div>
                            <div class="finding-id">${item.id}</div>
                        </td>
                        <td><span class="severity-badge severity-${item.severity.toLowerCase()}">${item.severity}</span></td>
                        <td>
                            <div class="resource-info">
                                <div class="resource-name">${item.resource}</div>
                                <div class="resource-type">${item.resourceType}</div>
                            </div>
                        </td>
                        <td><span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
                        <td>${item.category}</td>
                        <td>${item.compliance}</td>
                    `;
                    break;
                case 'malware':
                    specificColumns = `
                        <td class="finding-name">
                            <div>${item.name}</div>
                            <div class="finding-id">${item.malwareType}</div>
                        </td>
                        <td><span class="severity-badge severity-${item.severity.toLowerCase()}">${item.severity}</span></td>
                        <td>
                            <div class="resource-info">
                                <div class="resource-name">${item.resource}</div>
                                <div class="resource-type">${item.resourceType}</div>
                            </div>
                        </td>
                        <td><span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
                        <td class="finding-name">${item.location}</td>
                        <td>${item.quarantined ? '<span style="color: #059669;">Yes</span>' : '<span style="color: #dc2626;">No</span>'}</td>
                    `;
                    break;
                case 'aifindings':
                    specificColumns = `
                        <td class="finding-name">
                            <div>${item.name}</div>
                            <div class="finding-id">${item.id}</div>
                        </td>
                        <td><span class="severity-badge severity-${item.severity.toLowerCase()}">${item.severity}</span></td>
                        <td>
                            <div class="resource-info">
                                <div class="resource-name">${item.aiService}</div>
                                <div class="resource-type">${item.resourceType}</div>
                            </div>
                        </td>
                        <td><span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span></td>
                        <td class="finding-name">${item.owaspLlmTop10}</td>
                        <td><span class="risk-category-badge ${item.riskCategory.toLowerCase().replace(' ', '-')}">${item.riskCategory}</span></td>
                    `;
                    break;
            }
            
            row.innerHTML = `
                <td><input type="checkbox"></td>
                ${specificColumns}
                <td>
                    <div class="action-buttons-cell">
                        <button class="btn-action primary" onclick="event.stopPropagation(); openAcknowledgeModal('${item.id}')">Acknowledge</button>
                    </div>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    });
}

function getGroupDisplayName(groupBy) {
    const displayNames = {
        'severity': 'Severity',
        'resource': 'Resource',
        'type': 'Type',
        'status': 'Status'
    };
    return displayNames[groupBy] || groupBy;
}

function getGroupSummary(items) {
    // Count severity distribution
    const severityCount = {};
    items.forEach(item => {
        const severity = item.severity;
        severityCount[severity] = (severityCount[severity] || 0) + 1;
    });
    
    const badges = [];
    ['Critical', 'High', 'Medium', 'Low'].forEach(severity => {
        if (severityCount[severity] > 0) {
            badges.push(`<span class="severity-badge ${severity.toLowerCase()}">${severityCount[severity]}</span>`);
        }
    });
    
    return badges.length > 0 ? badges.join(' ') : '';
}

function toggleGroup(groupKey) {
    if (expandedGroups.has(groupKey)) {
        // If clicking the expanded group, collapse it
        expandedGroups.delete(groupKey);
    } else {
        // If clicking a collapsed group, close all others and open this one
        expandedGroups.clear();
        expandedGroups.add(groupKey);
    }
    renderTable();
}

function handleSearch() {
    currentSearchTerm = document.getElementById('searchInput').value;
    renderTable();
    updateTotalCount();
    updateSaveButtonsVisibility();
}

function handleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.findings-table tbody input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

// Filter functionality
function toggleFiltersPanel() {
    const panel = document.getElementById('filtersPanel');
    const overlay = getOrCreateOverlay();
    
    if (panel.classList.contains('open')) {
        panel.classList.remove('open');
        if (overlay) overlay.remove();
    } else {
        panel.classList.add('open');
        document.body.appendChild(overlay);
    }
}

function getOrCreateOverlay() {
    let overlay = document.querySelector('.filters-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'filters-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        `;
        overlay.addEventListener('click', toggleFiltersPanel);
    }
    return overlay;
}

function addFilterChip(filterType, filterValue) {
    currentFilters[filterType] = filterValue;
    
    const activeFilters = document.getElementById('activeFilters');
    const existingChip = activeFilters.querySelector(`[data-filter="${filterType}"]`);
    
    if (existingChip) {
        existingChip.remove();
    }
    
    const chip = document.createElement('div');
    chip.className = 'filter-chip';
    chip.setAttribute('data-filter', filterType);
    chip.innerHTML = `
        ${getFilterDisplayName(filterType)}: ${filterValue}
        <button onclick="removeFilterChip('${filterType}')" type="button">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    activeFilters.appendChild(chip);
    renderTable();
    updateTotalCount();
}

function removeFilterChip(filterType) {
    delete currentFilters[filterType];
    const chip = document.querySelector(`[data-filter="${filterType}"]`);
    if (chip) {
        chip.remove();
    }
    
    // Reset the filter input
    const filterInput = document.querySelector(`[data-filter="${filterType}"]`);
    if (filterInput) {
        filterInput.value = '';
    }
    
    renderTable();
    updateTotalCount();
}

function getFilterDisplayName(filterType) {
    const displayNames = {
        'severity': 'Severity',
        'status': 'Status',
        'resourceType': 'Resource Type'
    };
    return displayNames[filterType] || filterType;
}

function clearActiveFilters() {
    document.getElementById('activeFilters').innerHTML = '';
    currentFilters = {};
}

function resetFilters() {
    clearActiveFilters();
    
    // Reset filter inputs
    const filterInputs = document.querySelectorAll('.filter-input');
    filterInputs.forEach(input => {
        input.value = '';
    });
    
    renderTable();
    updateTotalCount();
    toggleFiltersPanel();
}

function applyAllFilters() {
    renderTable();
    updateTotalCount();
    toggleFiltersPanel();
}

function updateTotalCount() {
    document.getElementById('totalCount').textContent = filteredData.length;
}

// Detail Panel Functions
function openDetailPanelById(itemId) {
    // Find the item by ID in the current filtered data
    const item = filteredData.find(item => item.id === itemId);
    if (item) {
        openDetailPanel(item);
    }
}

function openDetailPanel(item) {
    currentDetailItem = item;
    currentTab = 'overview';
    
    const panel = document.getElementById('detailPanel');
    const overlay = getOrCreateDetailOverlay();
    
    // Update panel content
    document.getElementById('detailTitle').textContent = item.name;
    document.getElementById('detailSubtitle').textContent = `${item.id} - ${item.severity} Severity`;
    
    // Set active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-tab="overview"]').classList.add('active');
    
    // Update content
    updateDetailContent();
    
    // Show panel
    panel.classList.add('open');
    document.body.appendChild(overlay);
    
    // Add event listeners
    setupTabListeners();
}

function closeDetailPanel() {
    const panel = document.getElementById('detailPanel');
    const overlay = document.querySelector('.detail-overlay');
    
    panel.classList.remove('open');
    if (overlay) overlay.remove();
}

function getOrCreateDetailOverlay() {
    let overlay = document.querySelector('.detail-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'detail-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        `;
        overlay.addEventListener('click', closeDetailPanel);
    }
    return overlay;
}

function setupTabListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            switchTab(tabName);
        });
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
        case 'overview':
            contentEl.innerHTML = getOverviewTabContent();
            break;
        case 'remediation':
            contentEl.innerHTML = getRemediationTabContent();
            break;
        case 'affected':
            contentEl.innerHTML = getAffectedResourcesTabContent();
            break;
        case 'history':
            contentEl.innerHTML = getHistoryTabContent();
            break;
        default:
            contentEl.innerHTML = getEmptyTabContent(currentTab);
            break;
    }
}

function getOverviewTabContent() {
    if (!currentDetailItem) return '';
    
    const item = currentDetailItem;
    let specificContent = '';
    
    switch (currentFindingType) {
        case 'vulnerabilities':
            specificContent = `
                <div class="overview-grid">
                    <div class="overview-item">
                        <div class="overview-label">CVE ID</div>
                        <div class="overview-value">${item.id}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">CVSS Score</div>
                        <div class="overview-value">${item.cvss}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">CWE</div>
                        <div class="overview-value">${item.cwe || 'N/A'}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">Exploit Available</div>
                        <div class="overview-value">${item.exploitAvailable ? 'Yes' : 'No'}</div>
                    </div>
                </div>
            `;
            break;
        case 'secrets':
            specificContent = `
                <div class="overview-grid">
                    <div class="overview-item">
                        <div class="overview-label">Secret Type</div>
                        <div class="overview-value">${item.secretType}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">Location</div>
                        <div class="overview-value">${item.location}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">Entropy</div>
                        <div class="overview-value">${item.entropy}</div>
                    </div>
                </div>
            `;
            break;
        case 'misconfiguration':
            specificContent = `
                <div class="overview-grid">
                    <div class="overview-item">
                        <div class="overview-label">Category</div>
                        <div class="overview-value">${item.category}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">Compliance</div>
                        <div class="overview-value">${item.compliance}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">Recommendation</div>
                        <div class="overview-value">${item.recommendation}</div>
                    </div>
                </div>
            `;
            break;
        case 'malware':
            specificContent = `
                <div class="overview-grid">
                    <div class="overview-item">
                        <div class="overview-label">Malware Type</div>
                        <div class="overview-value">${item.malwareType}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">Signature</div>
                        <div class="overview-value">${item.signature}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">Location</div>
                        <div class="overview-value">${item.location}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">Quarantined</div>
                        <div class="overview-value">${item.quarantined ? 'Yes' : 'No'}</div>
                    </div>
                </div>
            `;
            break;
    }
    
    return `
        <div class="overview-section">
            <h3>General Information</h3>
            <div class="overview-grid">
                <div class="overview-item">
                    <div class="overview-label">Severity</div>
                    <div class="overview-value">
                        <span class="severity-badge severity-${item.severity.toLowerCase()}">${item.severity}</span>
                    </div>
                </div>
                <div class="overview-item">
                    <div class="overview-label">Status</div>
                    <div class="overview-value">
                        <span class="status-badge status-${item.status.toLowerCase().replace(' ', '-')}">${item.status}</span>
                    </div>
                </div>
                <div class="overview-item">
                    <div class="overview-label">Resource</div>
                    <div class="overview-value">${item.resource}</div>
                </div>
                <div class="overview-item">
                    <div class="overview-label">Resource Type</div>
                    <div class="overview-value">${item.resourceType}</div>
                </div>
                <div class="overview-item">
                    <div class="overview-label">Date Found</div>
                    <div class="overview-value">${item.dateFound}</div>
                </div>
                ${item.acknowledgedDate ? `
                <div class="overview-item">
                    <div class="overview-label">Acknowledged Date</div>
                    <div class="overview-value">${item.acknowledgedDate}</div>
                </div>
                ` : ''}
            </div>
            
            ${specificContent}
            
            <div class="overview-description">
                <p><strong>Description:</strong> ${item.description}</p>
            </div>
        </div>
    `;
}

function getRemediationTabContent() {
    return `
        <div class="overview-section">
            <h3>Remediation Steps</h3>
            <div class="overview-description">
                <p>Remediation information and steps will be displayed here based on the finding type and specific vulnerability details.</p>
            </div>
        </div>
    `;
}

function getAffectedResourcesTabContent() {
    return `
        <div class="overview-section">
            <h3>Affected Resources</h3>
            <div class="overview-description">
                <p>List of all resources affected by this finding will be displayed here.</p>
            </div>
        </div>
    `;
}

function getHistoryTabContent() {
    return `
        <div class="overview-section">
            <h3>Finding History</h3>
            <div class="overview-description">
                <p>History and timeline of this finding will be displayed here.</p>
            </div>
        </div>
    `;
}

function getEmptyTabContent(tabName) {
    return `
        <div class="empty-state">
            <i class="fas fa-info-circle"></i>
            <h3>${tabName.charAt(0).toUpperCase() + tabName.slice(1)} content coming soon</h3>
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
    return Object.keys(currentFilters).length > 0 || 
           currentSearchTerm !== '' ||
           currentGroupBy !== '';
}

// Acknowledge Modal functionality
let currentAcknowledgeItem = null;

function openAcknowledgeModal(itemId) {
    currentAcknowledgeItem = filteredData.find(item => item.id === itemId);
    if (!currentAcknowledgeItem) return;
    
    const modal = document.getElementById('acknowledgeModal');
    modal.style.display = 'block';
    
    // Reset form
    document.querySelector('input[name="acknowledgeType"][value="specific"]').checked = true;
    document.getElementById('acknowledgeReason').value = '';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeAcknowledgeModal() {
    const modal = document.getElementById('acknowledgeModal');
    modal.style.display = 'none';
    currentAcknowledgeItem = null;
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function confirmAcknowledge() {
    if (!currentAcknowledgeItem) return;
    
    const acknowledgeType = document.querySelector('input[name="acknowledgeType"]:checked').value;
    const reason = document.getElementById('acknowledgeReason').value;
    
    // Show confirmation based on type
    let message = '';
    switch (acknowledgeType) {
        case 'specific':
            message = `Finding "${currentAcknowledgeItem.name}" has been acknowledged for resource "${currentAcknowledgeItem.resource}".`;
            break;
        case 'criteria':
            message = `Finding "${currentAcknowledgeItem.name}" has been acknowledged for all resources matching similar criteria.`;
            break;
        case 'all':
            message = `Finding "${currentAcknowledgeItem.name}" has been acknowledged globally across all resources.`;
            break;
    }
    
    if (reason) {
        message += `\nReason: ${reason}`;
    }
    
    // Update the item status
    currentAcknowledgeItem.status = 'Acknowledged';
    
    // Close modal
    closeAcknowledgeModal();
    
    // Show success message
    alert(message);
    
    // Re-render table to reflect changes
    renderTable();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('acknowledgeModal');
    if (event.target === modal) {
        closeAcknowledgeModal();
    }
}

// Update save buttons visibility when filters change
function updateFiltersAndSaveButtons() {
    updateSaveButtonsVisibility();
} 
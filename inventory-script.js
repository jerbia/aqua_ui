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
    ]
};

// Current state
let currentResourceType = 'images';
let currentFilters = {};
let currentSearchTerm = '';
let filteredData = [];

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
    
    // Clear search input
    const searchInput = document.getElementById('inventorySearch');
    if (searchInput) {
        searchInput.value = '';
        searchInput.placeholder = `Search by ${getResourceTypeName()}`;
    }
    
    // Clear active filters
    clearActiveFilters();
    
    // Load new data
    loadResourceData();
    
    // Update total count
    updateTotalCount();
}

function getResourceTypeName() {
    const typeNames = {
        'images': 'Image Name',
        'containers': 'Container Name',
        'vms': 'VM Name',
        'functions': 'Function Name',
        'repositories': 'Repository Name',
        'kubernetes': 'Resource Name'
    };
    return typeNames[currentResourceType] || 'Name';
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
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (currentResourceType === 'images') {
        renderImagesTable();
    } else if (currentResourceType === 'containers') {
        renderContainersTable();
    } else if (currentResourceType === 'vms') {
        renderVMsTable();
    } else {
        renderGenericTable();
    }
}

function renderImagesTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
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
        tableBody.appendChild(row);
    });
}

function renderContainersTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    // Update table headers for containers
    updateTableHeaders([
        '', 'Name', 'Status', 'Namespace', 'Image', 'Node', 'Created'
    ]);
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" data-id="${item.id}"></td>
            <td><div class="image-name">${item.name}</div></td>
            <td><span class="compliance-compliant">${item.status}</span></td>
            <td>${item.namespace}</td>
            <td><div class="image-name">${item.image}</div></td>
            <td>${item.node}</td>
            <td>${new Date(item.created).toLocaleDateString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

function renderVMsTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    
    // Update table headers for VMs
    updateTableHeaders([
        '', 'Name', 'OS', 'Status', 'IP Address', 'Region', 'Instance Type'
    ]);
    
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" data-id="${item.id}"></td>
            <td><div class="image-name">${item.name}</div></td>
            <td>${item.os}</td>
            <td><span class="compliance-compliant">${item.status}</span></td>
            <td><div class="docker-id">${item.ipAddress}</div></td>
            <td>${item.region}</td>
            <td><span class="registry-type">${item.instanceType}</span></td>
        `;
        tableBody.appendChild(row);
    });
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
}

function removeFilterChip(filterKey) {
    const existingChip = document.querySelector(`[data-filter-key="${filterKey}"]`);
    if (existingChip) {
        existingChip.remove();
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
// Runtime Policy Management - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    initializeUI();
    initializeScrollEffects();
});

function initializeUI() {
    // Initialize category states
    initializeCategories();
    
    // Add event listeners
    addEventListeners();
    
    // Set initial values
    setInitialValues();
}

function initializeCategories() {
    // Expand the first category by default
    const firstCategory = document.querySelector('.control-category');
    if (firstCategory) {
        const categoryId = firstCategory.querySelector('.category-content').id;
        toggleCategory(categoryId);
    }
}

function addEventListeners() {
    // Form validation
    const policyNameInput = document.getElementById('policyName');
    if (policyNameInput) {
        policyNameInput.addEventListener('input', validatePolicyName);
    }
    
    // Enforcement mode change
    const enforcementRadios = document.querySelectorAll('input[name="enforcement"]');
    enforcementRadios.forEach(radio => {
        radio.addEventListener('change', handleEnforcementChange);
    });
    
    // Control toggles
    const controlSwitches = document.querySelectorAll('.control-item input[type="checkbox"]');
    controlSwitches.forEach(toggle => {
        toggle.addEventListener('change', handleControlToggle);
    });
    
    // Scope selector
    const scopeSelect = document.getElementById('scopeSelect');
    if (scopeSelect) {
        scopeSelect.addEventListener('change', handleScopeChange);
    }
    
    // Controls search
    const searchInput = document.getElementById('controlsSearch');
    if (searchInput) {
        searchInput.addEventListener('input', handleControlsSearch);
        searchInput.addEventListener('focus', handleSearchFocus);
        searchInput.addEventListener('blur', handleSearchBlur);
    }
    
    // Label input keyboard handlers
    const labelKeyInput = document.getElementById('labelKey');
    const labelValueInput = document.getElementById('labelValue');
    
    if (labelKeyInput) {
        labelKeyInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addLabel();
            }
        });
    }
    
    if (labelValueInput) {
        labelValueInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addLabel();
            }
        });
    }
}

function setInitialValues() {
    // Set initial checked states for radio buttons
    const checkedEnforcementRadio = document.querySelector('input[name="enforcement"]:checked');
    if (checkedEnforcementRadio) {
        checkedEnforcementRadio.closest('.radio-option').classList.add('checked');
    }
    
    const checkedScopeRadio = document.querySelector('input[name="scopeType"]:checked');
    if (checkedScopeRadio) {
        checkedScopeRadio.closest('.scope-radio-option').classList.add('checked');
    }
    
    // Enable some controls by default for demonstration
    const defaultControls = [
        'block-non-compliant-images',
        'block-unregistered-images',
        'forensics',
        'file-integrity'
    ];
    
    defaultControls.forEach(controlId => {
        const control = document.getElementById(controlId);
        if (control) {
            control.checked = true;
        }
    });
    
    updateControlCounts();
}

// Label management functions
function addLabel() {
    const keyInput = document.getElementById('labelKey');
    const valueInput = document.getElementById('labelValue');
    const selectedLabels = document.getElementById('selectedLabels');
    
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();
    
    if (!key) {
        showNotification('Please enter a label key', 'error');
        return;
    }
    
    // Check if label already exists
    const existingLabels = selectedLabels.querySelectorAll('.label-tag');
    for (let label of existingLabels) {
        const existingKey = label.querySelector('.label-key').textContent;
        if (existingKey === key) {
            showNotification('Label key already exists', 'error');
            return;
        }
    }
    
    // Create label tag
    const labelTag = document.createElement('div');
    labelTag.className = 'label-tag';
    labelTag.innerHTML = `
        <span class="label-key">${key}</span>
        ${value ? `<span class="label-separator">:</span><span class="label-value">${value}</span>` : ''}
        <span class="remove-label" onclick="removeLabel(this)">×</span>
    `;
    
    selectedLabels.appendChild(labelTag);
    
    // Clear inputs
    keyInput.value = '';
    valueInput.value = '';
    
    showNotification(`Label "${key}${value ? ':' + value : ''}" added`, 'success');
}

function removeLabel(removeBtn) {
    const labelTag = removeBtn.closest('.label-tag');
    const key = labelTag.querySelector('.label-key').textContent;
    const value = labelTag.querySelector('.label-value')?.textContent || '';
    
    labelTag.remove();
    showNotification(`Label "${key}${value ? ':' + value : ''}" removed`, 'info');
}

function toggleAdvancedSettings() {
    const advancedSettings = document.getElementById('advancedSettings');
    const toggleButton = document.querySelector('.advanced-toggle');
    
    if (advancedSettings.style.display === 'none') {
        advancedSettings.style.display = 'block';
        toggleButton.classList.add('expanded');
    } else {
        advancedSettings.style.display = 'none';
        toggleButton.classList.remove('expanded');
    }
}

function toggleCategory(categoryId) {
    const categoryContent = document.getElementById(categoryId);
    const categoryHeader = categoryContent.previousElementSibling;
    const toggleIcon = categoryHeader.querySelector('.toggle-icon');
    
    if (categoryContent.classList.contains('expanded')) {
        // Collapse
        categoryContent.classList.remove('expanded');
        categoryHeader.classList.remove('expanded');
        categoryContent.style.display = 'none';
    } else {
        // Expand
        categoryContent.classList.add('expanded');
        categoryHeader.classList.add('expanded');
        categoryContent.style.display = 'block';
    }
}

function validatePolicyName() {
    const input = document.getElementById('policyName');
    const value = input.value.trim();
    
    if (value.length === 0) {
        input.style.borderColor = '#ef4444';
        showValidationMessage(input, 'Policy name is required');
    } else if (value.length < 3) {
        input.style.borderColor = '#f59e0b';
        showValidationMessage(input, 'Policy name should be at least 3 characters');
    } else {
        input.style.borderColor = '#10b981';
        hideValidationMessage(input);
    }
}

function showValidationMessage(input, message) {
    // Remove existing message
    hideValidationMessage(input);
    
    const messageEl = document.createElement('div');
    messageEl.className = 'validation-message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
        color: #ef4444;
        font-size: 0.75rem;
        margin-top: 0.25rem;
        font-weight: 500;
    `;
    
    input.parentNode.appendChild(messageEl);
}

function hideValidationMessage(input) {
    const existingMessage = input.parentNode.querySelector('.validation-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

function handleEnforcementChange(event) {
    const mode = event.target.value;
    
    // Update checked state classes for radio options (if using old radio style)
    const allRadioOptions = document.querySelectorAll('.radio-option');
    allRadioOptions.forEach(option => option.classList.remove('checked'));
    const radioOption = event.target.closest('.radio-option');
    if (radioOption) {
        radioOption.classList.add('checked');
        
        // Add visual feedback
        radioOption.style.transform = 'scale(1.02)';
        setTimeout(() => {
            if (event.target.checked) {
                radioOption.style.transform = 'scale(1)';
            }
        }, 150);
    }
    
    // Show notification
    showNotification(`Enforcement mode set to: ${mode.toUpperCase()}`, 'info');
}

function handleControlToggle(event) {
    const controlId = event.target.id;
    const controlItem = event.target.closest('.control-item');
    
    // Visual feedback
    if (event.target.checked) {
        controlItem.style.background = '#f0f9ff';
    } else {
        controlItem.style.background = '';
    }
    
    // Update control counts
    updateControlCounts();
    
    // Reset background after animation
    setTimeout(() => {
        controlItem.style.background = '';
    }, 1000);
}

function handleScopeTypeChange() {
    const checkedRadio = document.querySelector('input[name="scopeType"]:checked');
    const scopeType = checkedRadio.value;
    const scopeSelector = document.getElementById('scopeSelector'); // Old one in advanced settings
    const scopeSelectorInline = document.getElementById('scopeSelectorInline'); // New inline one
    
    // Update checked state classes for scope radio options
    const allScopeOptions = document.querySelectorAll('.scope-radio-option');
    allScopeOptions.forEach(option => option.classList.remove('checked'));
    const radioOption = checkedRadio.closest('.scope-radio-option');
    if (radioOption) {
        radioOption.classList.add('checked');
    }
    
    if (scopeType === 'specific') {
        // Show the new inline scope selector
        if (scopeSelectorInline) {
            scopeSelectorInline.style.display = 'block';
        }
        // Also show the old one in advanced settings if it exists
        if (scopeSelector) {
            scopeSelector.style.display = 'flex';
            scopeSelector.classList.add('visible');
        }
        showNotification('Specific scope selected - configure your targeting below', 'info');
    } else {
        // Hide both scope selectors
        if (scopeSelectorInline) {
            scopeSelectorInline.style.display = 'none';
        }
        if (scopeSelector) {
            scopeSelector.style.display = 'none';
            scopeSelector.classList.remove('visible');
        }
        
        // Clear any selected scopes when switching to "All Resources"
        const scopeSelect = document.getElementById('scopeSelect');
        const namespaceSelect = document.getElementById('namespaceSelect');
        const selectedLabels = document.getElementById('selectedLabels');
        
        if (scopeSelect) {
            Array.from(scopeSelect.options).forEach(option => option.selected = false);
        }
        if (namespaceSelect) {
            Array.from(namespaceSelect.options).forEach(option => option.selected = false);
        }
        if (selectedLabels) {
            selectedLabels.innerHTML = '';
        }
        
        showNotification('Policy will apply to all resources', 'info');
    }
}

function handleScopeChange(event) {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const scopeNames = selectedOptions.map(option => option.textContent).join(', ');
    
    if (selectedOptions.length > 0) {
        showNotification(`Selected scopes: ${scopeNames}`, 'info');
    } else {
        showNotification('No scopes selected - policy will apply to all resources in specific scope mode', 'warning');
    }
}

function updateControlCounts() {
    const categories = document.querySelectorAll('.control-category');
    
    categories.forEach(category => {
        const categoryContent = category.querySelector('.category-content');
        const controlToggles = categoryContent.querySelectorAll('input[type="checkbox"]');
        const enabledCount = Array.from(controlToggles).filter(toggle => toggle.checked).length;
        const totalCount = controlToggles.length;
        
        const countElement = category.querySelector('.control-count');
        countElement.textContent = `${enabledCount}/${totalCount} enabled`;
        
        // Update styling based on enabled count
        countElement.className = 'control-count';
        if (enabledCount === 0) {
            // Default gray styling (no additional class)
        } else if (enabledCount === totalCount) {
            countElement.classList.add('all-enabled');
        } else {
            countElement.classList.add('has-enabled');
        }
    });
}

function addScopeCriteria() {
    showModal('Add Scope Criteria', createScopeCriteriaForm());
}

function createScopeCriteriaForm() {
    return `
        <div class="modal-form">
            <div class="form-group">
                <label for="criteriaType">Criteria Type</label>
                <select id="criteriaType">
                    <option value="namespace">Namespace</option>
                    <option value="label">Label</option>
                    <option value="annotation">Annotation</option>
                    <option value="image">Image</option>
                </select>
            </div>
            <div class="form-group">
                <label for="criteriaValue">Value</label>
                <input type="text" id="criteriaValue" placeholder="Enter criteria value" />
            </div>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="button" class="btn btn-primary" onclick="saveScopeCriteria()">Add Criteria</button>
            </div>
        </div>
    `;
}

function saveScopeCriteria() {
    const type = document.getElementById('criteriaType').value;
    const value = document.getElementById('criteriaValue').value;
    
    if (value.trim()) {
        showNotification(`Added scope criteria: ${type} = ${value}`, 'success');
        closeModal();
    } else {
        showNotification('Please enter a criteria value', 'error');
    }
}

function savePolicy() {
    const policyName = document.getElementById('policyName').value.trim();
    
    if (!policyName) {
        showNotification('Please enter a policy name', 'error');
        document.getElementById('policyName').focus();
        return;
    }
    
    // Collect enabled controls
    const enabledControls = [];
    const controlSwitches = document.querySelectorAll('.control-item input[type="checkbox"]:checked');
    controlSwitches.forEach(toggle => {
        const controlName = toggle.closest('.control-item').querySelector('h4').textContent;
        enabledControls.push(controlName);
    });
    
    // Get enforcement mode
    const enforcementMode = document.querySelector('input[name="enforcement"]:checked').value;
    
    // Get scope configuration
    const scopeType = document.querySelector('input[name="scopeType"]:checked').value;
    let scopeConfiguration;
    
    if (scopeType === 'all') {
        scopeConfiguration = { type: 'all', target: 'All Resources' };
    } else {
        // Get selected application scopes
        const scopeSelect = document.getElementById('scopeSelect');
        const selectedScopes = scopeSelect ? Array.from(scopeSelect.selectedOptions)
            .map(option => option.value) : [];
            
        // Get selected namespaces
        const namespaceSelect = document.getElementById('namespaceSelect');
        const selectedNamespaces = namespaceSelect ? Array.from(namespaceSelect.selectedOptions)
            .map(option => option.value) : [];
            
        // Get labels
        const labelTags = document.querySelectorAll('#selectedLabels .label-tag');
        const labels = Array.from(labelTags).map(tag => {
            const key = tag.querySelector('.label-key').textContent;
            const valueElement = tag.querySelector('.label-value');
            const value = valueElement ? valueElement.textContent : '';
            return value ? `${key}:${value}` : key;
        });
        
        scopeConfiguration = { 
            type: 'specific',
            applicationScopes: selectedScopes,
            namespaces: selectedNamespaces,
            labels: labels,
            summary: `${selectedScopes.length} scopes, ${selectedNamespaces.length} namespaces, ${labels.length} labels`
        };
    }
    
    // Disable save button during save
    const saveButton = document.querySelector('.header .btn-primary');
    const originalText = saveButton.innerHTML;
    saveButton.disabled = true;
    saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    
    // Show saving notification
    showNotification('Saving policy...', 'info');
    
    // Simulate saving
    setTimeout(() => {
        // Re-enable save button
        saveButton.disabled = false;
        saveButton.innerHTML = originalText;
        
        showNotification(`Policy "${policyName}" saved successfully!`, 'success');
        console.log('Policy saved:', {
            name: policyName,
            enforcement: enforcementMode,
            scope: scopeConfiguration,
            controls: enabledControls
        });
        
        // Optional: Add visual feedback to the entire form
        const form = document.querySelector('.policy-form');
        form.style.transform = 'scale(0.99)';
        form.style.opacity = '0.8';
        setTimeout(() => {
            form.style.transform = 'scale(1)';
            form.style.opacity = '1';
        }, 200);
        
    }, 1500);
}

function cancelPolicy() {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
        showNotification('Policy creation cancelled', 'info');
        // In a real app, this would navigate back
        console.log('Policy creation cancelled');
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
        error: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
        warning: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
        info: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' }
    };
    
    const color = colors[type] || colors.info;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color.bg};
        border: 1px solid ${color.border};
        color: ${color.text};
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        font-weight: 500;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.2s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: white;
        border-radius: 1rem;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        animation: slideInUp 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h3 style="margin: 0; color: #1e293b; font-size: 1.25rem; font-weight: 600;">${title}</h3>
            <button type="button" onclick="closeModal()" style="background: none; border: none; font-size: 1.5rem; color: #6b7280; cursor: pointer; padding: 0; margin-left: 1rem;">&times;</button>
        </div>
        <div class="modal-body" style="margin-top: 1.5rem;">
            ${content}
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', handleModalEscape);
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => {
            modal.remove();
            document.removeEventListener('keydown', handleModalEscape);
        }, 200);
    }
}

function handleModalEscape(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideInUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-form .form-group {
        margin-bottom: 1.5rem;
    }
    
    .modal-form .form-group:last-child {
        margin-bottom: 0;
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid #e5e7eb;
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        savePolicy();
    }
    
    // Escape to cancel
    if (e.key === 'Escape' && !document.querySelector('.modal-overlay')) {
        cancelPolicy();
    }
});

// Auto-save draft (simulation)
let autoSaveTimeout;
function scheduleAutoSave() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        console.log('Auto-saving draft...');
        // In a real app, this would save to localStorage or send to server
    }, 30000); // Auto-save every 30 seconds
}

// Listen for form changes to trigger auto-save
document.addEventListener('input', scheduleAutoSave);
document.addEventListener('change', scheduleAutoSave);

// Control Configuration Functions
function configureControl(controlId) {
    const controlName = document.querySelector(`#${controlId}`).closest('.control-item').querySelector('h4').textContent;
    const configurations = getControlConfiguration(controlId);
    showModal(`Configure ${controlName}`, createControlConfigForm(controlId, configurations));
}

function getControlConfiguration(controlId) {
    const configs = {
        'executables-allowed': {
            type: 'list',
            title: 'Allowed Executables',
            placeholder: '/usr/bin/python\n/bin/bash\n/usr/bin/node',
            description: 'Enter one executable path per line'
        },
        'executables-blocked': {
            type: 'list',
            title: 'Blocked Executables',
            placeholder: '/bin/nc\n/usr/bin/wget\n/usr/bin/curl',
            description: 'Enter one executable path per line'
        },
        'registries-allowed': {
            type: 'list',
            title: 'Allowed Registries',
            placeholder: 'docker.io\nregistry.company.com\nquay.io',
            description: 'Enter one registry URL per line'
        },
        'network-ports-allowed': {
            type: 'ports',
            title: 'Allowed Ports',
            placeholder: '80, 443, 8080-8090',
            description: 'Enter ports and port ranges (comma-separated)'
        },
        'packages-allowed': {
            type: 'list',
            title: 'Allowed Packages',
            placeholder: 'python3\nnginx\nnode',
            description: 'Enter one package name per line'
        },
        'file-block': {
            type: 'list',
            title: 'Blocked Files and Directories',
            placeholder: '/etc/passwd\n/etc/shadow\n/proc/*/mem',
            description: 'Enter one file or directory path per line'
        },
        'port-block': {
            type: 'ports',
            title: 'Blocked Ports',
            placeholder: '22, 23, 3389',
            description: 'Enter ports and port ranges (comma-separated)'
        },
        'package-block': {
            type: 'list',
            title: 'Blocked Packages',
            placeholder: 'telnet\nftp\nrsh',
            description: 'Enter one package name per line'
        },
        'readonly-directories': {
            type: 'list',
            title: 'Read-Only Paths',
            placeholder: '/etc\n/usr\n/boot',
            description: 'Enter one directory path per line'
        },
        'dnsip-reputation': {
            type: 'reputation',
            title: 'Reputation Sources',
            description: 'Configure reputation threat intelligence sources'
        }
    };
    
    return configs[controlId] || { type: 'basic', title: 'Configuration', description: 'No additional configuration required' };
}

function createControlConfigForm(controlId, config) {
    if (config.type === 'list') {
        return `
            <div class="config-form">
                <div class="form-group">
                    <label for="configTextarea">${config.title}</label>
                    <textarea id="configTextarea" rows="8" placeholder="${config.placeholder}" style="font-family: monospace; font-size: 0.875rem;"></textarea>
                    <small style="color: #6b7280; font-size: 0.75rem; margin-top: 0.5rem; display: block;">${config.description}</small>
                </div>
                <div class="config-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="saveControlConfig('${controlId}')">Save Configuration</button>
                </div>
            </div>
        `;
    } else if (config.type === 'ports') {
        return `
            <div class="config-form">
                <div class="form-group">
                    <label for="configPorts">${config.title}</label>
                    <input type="text" id="configPorts" placeholder="${config.placeholder}" />
                    <small style="color: #6b7280; font-size: 0.75rem; margin-top: 0.5rem; display: block;">${config.description}</small>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="includeSystemPorts" />
                        Include system ports (1-1023)
                    </label>
                </div>
                <div class="config-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="saveControlConfig('${controlId}')">Save Configuration</button>
                </div>
            </div>
        `;
    } else if (config.type === 'reputation') {
        return `
            <div class="config-form">
                <div class="form-group">
                    <label>Threat Intelligence Sources</label>
                    <div class="checkbox-group">
                        <label class="checkbox-option">
                            <input type="checkbox" id="malwareDb" checked />
                            <span>Malware Domain Database</span>
                        </label>
                        <label class="checkbox-option">
                            <input type="checkbox" id="phishingDb" checked />
                            <span>Phishing URL Database</span>
                        </label>
                        <label class="checkbox-option">
                            <input type="checkbox" id="botnetDb" />
                            <span>Botnet Command & Control</span>
                        </label>
                        <label class="checkbox-option">
                            <input type="checkbox" id="customFeed" />
                            <span>Custom Threat Feed</span>
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="customFeedUrl">Custom Feed URL (optional)</label>
                    <input type="url" id="customFeedUrl" placeholder="https://threat-feed.example.com/feed.json" />
                </div>
                <div class="config-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="saveControlConfig('${controlId}')">Save Configuration</button>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="config-form">
                <p style="color: #6b7280; margin-bottom: 2rem;">${config.description}</p>
                <div class="config-actions">
                    <button type="button" class="btn btn-primary" onclick="closeModal()">OK</button>
                </div>
            </div>
        `;
    }
}

function saveControlConfig(controlId) {
    const controlName = document.querySelector(`#${controlId}`).closest('.control-item').querySelector('h4').textContent;
    const config = getControlConfiguration(controlId);
    
    let configData = {};
    
    if (config.type === 'list') {
        const textarea = document.getElementById('configTextarea');
        configData.items = textarea.value.split('\n').filter(item => item.trim()).map(item => item.trim());
    } else if (config.type === 'ports') {
        const portsInput = document.getElementById('configPorts');
        const includeSystem = document.getElementById('includeSystemPorts').checked;
        configData.ports = portsInput.value;
        configData.includeSystemPorts = includeSystem;
    } else if (config.type === 'reputation') {
        configData.sources = {
            malwareDb: document.getElementById('malwareDb').checked,
            phishingDb: document.getElementById('phishingDb').checked,
            botnetDb: document.getElementById('botnetDb').checked,
            customFeed: document.getElementById('customFeed').checked
        };
        configData.customFeedUrl = document.getElementById('customFeedUrl').value;
    }
    
    // Store configuration (in a real app, this would be sent to the backend)
    console.log(`Configuration for ${controlId}:`, configData);
    
    // Update the control button to show it's configured
    const configButton = document.querySelector(`button[onclick="configureControl('${controlId}')"]`);
    if (configButton && Object.keys(configData).length > 0) {
        configButton.style.background = '#dbeafe';
        configButton.style.color = '#1d4ed8';
        configButton.style.borderColor = '#3b82f6';
        configButton.title = 'Configured - Click to modify';
    }
    
    showNotification(`${controlName} configured successfully`, 'success');
    closeModal();
}

// Mobile sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Scroll Effects for Header and Progress Bar
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    const scrollProgress = document.getElementById('scrollProgress');

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        // Update scroll progress indicator
        scrollProgress.style.transform = `scaleX(${Math.min(scrollPercent / 100, 1)})`;
        
        // Header scroll effect
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Throttled scroll event
    let ticking = false;
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    // Initial check
    handleScroll();
}

// Controls Search Functionality
function handleControlsSearch(event) {
    const query = event.target.value.trim().toLowerCase();
    const searchResults = document.getElementById('searchResults');
    
    if (query.length === 0) {
        searchResults.classList.remove('visible');
        return;
    }
    
    if (query.length < 2) {
        return; // Wait for at least 2 characters
    }
    
    const controls = getAllControls();
    const filteredControls = controls.filter(control => 
        control.name.toLowerCase().includes(query) || 
        control.description.toLowerCase().includes(query) ||
        control.category.toLowerCase().includes(query)
    );
    
    displaySearchResults(filteredControls, query);
}

function getAllControls() {
    const controls = [];
    const controlItems = document.querySelectorAll('.control-item');
    
    controlItems.forEach(item => {
        const nameElement = item.querySelector('h4');
        const descElement = item.querySelector('p');
        const categoryElement = item.closest('.control-category').querySelector('h3');
        const toggleElement = item.querySelector('input[type="checkbox"]');
        
        if (nameElement && descElement && categoryElement && toggleElement) {
            controls.push({
                name: nameElement.textContent,
                description: descElement.textContent,
                category: categoryElement.textContent,
                id: toggleElement.id,
                element: item,
                categoryElement: item.closest('.control-category')
            });
        }
    });
    
    return controls;
}

function displaySearchResults(controls, query) {
    const searchResults = document.getElementById('searchResults');
    
    if (controls.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No controls found matching your search.</div>';
        searchResults.classList.add('visible');
        return;
    }
    
    const resultsHTML = controls.map(control => {
        const highlightedName = highlightText(control.name, query);
        const highlightedDescription = highlightText(control.description, query);
        
        return `
            <div class="search-result-item" onclick="navigateToControl('${control.id}')">
                <div class="search-result-title">${highlightedName}</div>
                <div class="search-result-description">${highlightedDescription}</div>
                <div class="search-result-category">${control.category}</div>
            </div>
        `;
    }).join('');
    
    searchResults.innerHTML = resultsHTML;
    searchResults.classList.add('visible');
}

function highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function navigateToControl(controlId) {
    const control = document.getElementById(controlId);
    if (!control) return;
    
    const controlItem = control.closest('.control-item');
    const category = controlItem.closest('.control-category');
    const categoryContent = category.querySelector('.category-content');
    
    // Expand the category if it's collapsed
    if (!categoryContent.classList.contains('expanded')) {
        const categoryId = categoryContent.id;
        toggleCategory(categoryId);
    }
    
    // Scroll to the control
    setTimeout(() => {
        controlItem.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Highlight the control briefly
        controlItem.style.background = '#eff6ff';
        controlItem.style.border = '2px solid #3b82f6';
        controlItem.style.borderRadius = '0.5rem';
        
        setTimeout(() => {
            controlItem.style.background = '';
            controlItem.style.border = '';
            controlItem.style.borderRadius = '';
        }, 2000);
    }, 300);
    
    // Clear search
    clearSearch();
}

function handleSearchFocus() {
    const searchInput = document.getElementById('controlsSearch');
    const query = searchInput.value.trim();
    
    if (query.length >= 2) {
        handleControlsSearch({ target: searchInput });
    }
}

function handleSearchBlur(event) {
    // Delay hiding results to allow clicks on results
    setTimeout(() => {
        const searchResults = document.getElementById('searchResults');
        if (!event.relatedTarget || !searchResults.contains(event.relatedTarget)) {
            searchResults.classList.remove('visible');
        }
    }, 150);
}

function clearSearch() {
    const searchInput = document.getElementById('controlsSearch');
    const searchResults = document.getElementById('searchResults');
    
    searchInput.value = '';
    searchResults.classList.remove('visible');
    searchInput.focus();
}

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    const searchContainer = e.target.closest('.controls-search');
    if (!searchContainer) {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.classList.remove('visible');
        }
    }
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
    // Close sidebar when clicking outside on mobile
    if (window.innerWidth <= 768 && 
        !e.target.closest('.sidebar') && 
        !e.target.closest('.hamburger-menu') &&
        document.querySelector('.sidebar').classList.contains('open')) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('open');
    }
}); 
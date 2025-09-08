let allResources = [];
let filteredResources = [];
let currentView = 'grid';
let currentCategory = 'all';
let currentCostFilter = 'all';
let currentServiceFilter = 'all';
let currentSearchTerm = '';

async function loadResources() {
    try {
        const response = await fetch('resources.json');
        allResources = await response.json();
        filteredResources = [...allResources];
        renderResources();
    } catch (error) {
        console.error('Error loading resources:', error);
        document.getElementById('resourcesContainer').innerHTML = 
            '<p>Error loading resources. Please try again later.</p>';
    }
}

function renderResources() {
    const container = document.getElementById('resourcesContainer');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');
    
    if (filteredResources.length === 0) {
        container.style.display = 'none';
        noResults.style.display = 'block';
        resultsCount.textContent = 'No resources found';
        return;
    }
    
    container.style.display = currentView === 'grid' ? 'grid' : 'flex';
    container.className = currentView === 'grid' ? 'resources-grid' : 'resources-list';
    noResults.style.display = 'none';
    
    resultsCount.textContent = `Showing ${filteredResources.length} resource${filteredResources.length !== 1 ? 's' : ''}`;
    
    container.innerHTML = filteredResources.map(resource => `
        <div class="resource-card" data-id="${resource.id}">
            <h3>${resource.name}</h3>
            <p class="description">${resource.description}</p>
            
            <div class="resource-tags">
                <span class="tag ${resource.cost}">${resource.cost === 'free' ? 'Free' : resource.cost === 'low-cost' ? 'Low Cost' : 'Paid'}</span>
                ${resource.services.map(service => `<span class="tag">${service}</span>`).join('')}
            </div>
            
            <div class="resource-info">
                ${resource.phone ? `<div class="info-item"><strong>Phone:</strong> ${resource.phone}</div>` : ''}
                ${resource.availability ? `<div class="info-item"><strong>Hours:</strong> ${resource.availability}</div>` : ''}
                ${resource.location ? `<div class="info-item"><strong>Coverage:</strong> ${resource.location}</div>` : ''}
            </div>
            
            <button class="open-btn" onclick="openResource('${resource.url}')">
                Visit Website →
            </button>
        </div>
    `).join('');
}

function openResource(url) {
    if (window.electronAPI && window.electronAPI.openExternal) {
        window.electronAPI.openExternal(url);
    } else {
        window.open(url, '_blank');
    }
}

function filterResources() {
    filteredResources = allResources.filter(resource => {
        let matchesCategory = currentCategory === 'all' || resource.category === currentCategory;
        let matchesCost = currentCostFilter === 'all' || resource.cost === currentCostFilter;
        let matchesService = currentServiceFilter === 'all' || 
            resource.services.some(service => service.toLowerCase().includes(currentServiceFilter.toLowerCase()));
        let matchesSearch = currentSearchTerm === '' || 
            resource.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            resource.description.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            resource.services.some(service => service.toLowerCase().includes(currentSearchTerm.toLowerCase()));
        
        return matchesCategory && matchesCost && matchesService && matchesSearch;
    });
    
    renderResources();
}

document.addEventListener('DOMContentLoaded', () => {
    loadResources();
    
    // Category selection
    document.getElementById('categoryList').addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            document.querySelectorAll('.categories li').forEach(li => li.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            filterResources();
        }
    });
    
    // Cost filter
    document.getElementById('costFilter').addEventListener('change', (e) => {
        currentCostFilter = e.target.value;
        filterResources();
    });
    
    // Service filter
    document.getElementById('serviceFilter').addEventListener('change', (e) => {
        currentServiceFilter = e.target.value;
        filterResources();
    });
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', (e) => {
        currentSearchTerm = e.target.value;
        filterResources();
    });
    
    document.getElementById('searchBtn').addEventListener('click', () => {
        currentSearchTerm = document.getElementById('searchInput').value;
        filterResources();
    });
    
    // View toggle
    document.getElementById('gridView').addEventListener('click', () => {
        currentView = 'grid';
        document.getElementById('gridView').classList.add('active');
        document.getElementById('listView').classList.remove('active');
        renderResources();
    });
    
    document.getElementById('listView').addEventListener('click', () => {
        currentView = 'list';
        document.getElementById('listView').classList.add('active');
        document.getElementById('gridView').classList.remove('active');
        renderResources();
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        document.getElementById('themeToggle').textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        localStorage.setItem('theme', newTheme);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('themeToggle').textContent = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
});
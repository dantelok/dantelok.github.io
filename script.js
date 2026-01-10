// ========================================
// Tab Navigation
// ========================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const internalLinks = document.querySelectorAll('.internal-link');

function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to the corresponding nav link
    const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update URL hash without scrolling
    history.pushState(null, null, `#${sectionId}`);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Handle nav link clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
    });
});

// Handle internal links (like CV link in the about section)
internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
    });
});

// Handle initial hash on page load
function handleInitialHash() {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const hash = window.location.hash.slice(1) || 'home';
    showSection(hash);
});

// ========================================
// Dark Mode Toggle
// ========================================

const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light
function getThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
}

// Initialize theme
setTheme(getThemePreference());

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// ========================================
// Initialize
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    handleInitialHash();
});

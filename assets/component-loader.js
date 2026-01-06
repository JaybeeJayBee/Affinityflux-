document.addEventListener("DOMContentLoaded", function() {
    
    // 1. INJECT NAVIGATION
    fetch("/components/nav.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("nav-overlay-container").innerHTML = data;
            
            // --- ACTIVATE ALL LOGIC ---
            initializeNav();          // Button & Dropdowns
            highlightCurrentPage();   // NEW: Glow Active Link
            initializeScrollLogic();  // NEW: Hide Button on Scroll
        });

    // 2. INJECT FOOTER
    fetch("/components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
            
            // Year Fix
            const yearSpan = document.getElementById('year-display');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        });
});

// --- CORE NAVIGATION LOGIC ---
function initializeNav() {
    const trigger = document.getElementById('nav-trigger');
    const overlay = document.getElementById('nav-overlay');
    const triggerText = trigger ? trigger.querySelector('.trigger-text') : null;

    // A. Main Toggle
    if(trigger && overlay) {
        trigger.addEventListener('click', () => {
            overlay.classList.toggle('visible'); 
            
            if (triggerText) {
                if (overlay.classList.contains('visible')) {
                    triggerText.textContent = '[ X ]';
                    document.body.style.overflow = 'hidden'; 
                } else {
                    triggerText.textContent = '[ /// ]';
                    document.body.style.overflow = ''; 
                }
            }
        });
    }

    // B. Dropdown Logic
    const dropdowns = document.querySelectorAll('.dropdown-btn');
    dropdowns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const submenu = this.nextElementSibling;
            if (submenu) submenu.classList.toggle('hidden');
        });
    });
}

// --- NEW: ACTIVE PAGE TRACKER ---
function highlightCurrentPage() {
    // Get current path (e.g., "/sector-01")
    let path = window.location.pathname;
    
    // Clean up path (remove trailing slash or .html if present)
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    if (path.endsWith('.html')) path = path.slice(0, -5);

    // Check all links
    const allLinks = document.querySelectorAll('.nav-link, .sub-link');
    
    allLinks.forEach(link => {
        let href = link.getAttribute('href');
        if (!href) return;
        
        // Clean href to match path
        if (href.endsWith('.html')) href = href.slice(0, -5);
        if (href.length > 1 && href.endsWith('/')) href = href.slice(0, -1);

        // If they match, light it up
        if (path === href) {
            link.classList.add('active-page');
            
            // If it's a sub-link, auto-open the parent dropdown
            const parentSubmenu = link.closest('.submenu');
            if (parentSubmenu) {
                parentSubmenu.classList.remove('hidden'); 
                const parentBtn = parentSubmenu.previousElementSibling; 
                if (parentBtn) {
                    parentBtn.classList.add('active'); 
                    parentBtn.classList.add('child-active'); 
                }
            }
        }
    });
}

// --- NEW: SMART SCROLL LOGIC ---
function initializeScrollLogic() {
    let lastScrollTop = 0;
    const trigger = document.getElementById('nav-trigger');
    const threshold = 50; // Distance to scroll before hiding

    window.addEventListener('scroll', function() {
        if (!trigger) return;
        
        // Get current scroll position
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Prevent bouncing at the top
        if (currentScroll < 0) return;

        // If scrolling DOWN and not at the top
        if (currentScroll > lastScrollTop && currentScroll > threshold) {
            trigger.classList.add('scroll-hidden');
        } 
        // If scrolling UP
        else {
            trigger.classList.remove('scroll-hidden');
        }
        
        lastScrollTop = currentScroll;
    });
}

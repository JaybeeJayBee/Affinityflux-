document.addEventListener("DOMContentLoaded", function() {
    
    // 1. INJECT NAVIGATION
    fetch("/components/nav.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("nav-overlay-container").innerHTML = data;
            // Once the HTML is there, we start the interactive logic
            initializeNav(); 
        });

    // 2. INJECT FOOTER
    fetch("/components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
            
            // --- THE YEAR FIX ---
            // Finds the year span and updates it to the current year
            const yearSpan = document.getElementById('year-display');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        });
});

// 3. NAVIGATION & DROPDOWN LOGIC
function initializeNav() {
    const trigger = document.getElementById('nav-trigger');
    const overlay = document.getElementById('nav-overlay');
    const triggerText = trigger ? trigger.querySelector('.trigger-text') : null;

    // A. MAIN MENU TOGGLE (Open/Close the full overlay)
    if(trigger && overlay) {
        trigger.addEventListener('click', () => {
            overlay.classList.toggle('visible'); 
            
            // Toggle the Text between [ /// ] and [ X ]
            if (triggerText) {
                if (overlay.classList.contains('visible')) {
                    triggerText.textContent = '[ X ]';
                    // Lock the background page from scrolling while menu is open
                    document.body.style.overflow = 'hidden'; 
                } else {
                    triggerText.textContent = '[ /// ]';
                    // Unlock the background page
                    document.body.style.overflow = ''; 
                }
            }
        });
    }

    // B. DROPDOWN ACCORDION LOGIC (Expand/Collapse Submenus)
    // This finds all buttons we named "dropdown-btn" in the HTML
    const dropdowns = document.querySelectorAll('.dropdown-btn');
    
    dropdowns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 1. Rotate the arrow icon
            this.classList.toggle('active');
            
            // 2. Find the submenu (the <ul> list immediately after the button)
            const submenu = this.nextElementSibling;
            
            // 3. Show or Hide it
            if (submenu) {
                submenu.classList.toggle('hidden');
            }
        });
    });
}

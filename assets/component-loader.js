document.addEventListener("DOMContentLoaded", function() {
    
    // 1. INJECT NAVIGATION
    fetch("/components/nav.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("nav-overlay-container").innerHTML = data;
            initializeNav(); 
        });

    // 2. INJECT FOOTER
    fetch("/components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
            
            // --- 👇 THIS IS THE MISSING FIX 👇 ---
            // We must find the span ID *after* the HTML is loaded and inject the date.
            const yearSpan = document.getElementById('year-display');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        });
});

// 3. NAVIGATION LOGIC
function initializeNav() {
    const trigger = document.getElementById('nav-trigger');
    const overlay = document.getElementById('nav-overlay');
    
    // Note: If you want to change the [ /// ] to [ X ], we need the text element
    const triggerText = trigger ? trigger.querySelector('.trigger-text') : null;

    if(trigger && overlay) {
        trigger.addEventListener('click', () => {
            overlay.classList.toggle('visible'); // Toggle the class
            
            // Update the Icon Text if the element exists
            if (triggerText) {
                if (overlay.classList.contains('visible')) {
                    triggerText.textContent = '[ X ]';
                    triggerText.setAttribute('data-text-current', '[ X ]');
                } else {
                    triggerText.textContent = '[ /// ]';
                    triggerText.setAttribute('data-text-current', '[ /// ]');
                }
            }
        });
    }
}

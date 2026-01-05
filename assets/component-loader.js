document.addEventListener("DOMContentLoaded", function() {
    // 1. Inject Navigation
    fetch("/components/nav.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("nav-overlay-container").innerHTML = data;
            initializeNav(); // Start the interactive scripts
        });

    // 2. Inject Footer
    fetch("/components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        });
});

function initializeNav() {
    const trigger = document.getElementById('nav-trigger');
    const overlay = document.getElementById('nav-overlay');
    const closeBtn = document.getElementById('nav-close');

    if(trigger && overlay) {
        trigger.addEventListener('click', () => {
            overlay.classList.add('visible');
            trigger.style.opacity = '0'; // Hide trigger when open
        });
    }
    if(closeBtn && overlay) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('visible');
            trigger.style.opacity = '1'; // Show trigger when closed
        });
    }
              }

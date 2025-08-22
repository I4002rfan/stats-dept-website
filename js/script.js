document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    // Note: Smooth scrolling for anchor links is not needed for a multi-page site.
    // The browser will handle navigation between pages.
    // If you have anchor links on a long page, you can add that functionality back.
});

// Dropdown for PYQs
document.addEventListener('DOMContentLoaded', function() {
    // Keep the mobile menu toggle code here if it's not already
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    // --- START: New Dropdown Code ---
    const dropdownButtons = document.querySelectorAll('[data-dropdown-toggle]');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            const dropdownId = this.getAttribute('data-dropdown-toggle');
            const dropdown = document.getElementById(dropdownId);
            
            // Close all other open dropdowns first
            document.querySelectorAll('.pyq-dropdown').forEach(d => {
                if (d.id !== dropdownId) {
                    d.classList.add('hidden');
                }
            });

            // Toggle the clicked dropdown
            dropdown.classList.toggle('hidden');
        });
    });

    // Close dropdowns if clicking anywhere else on the page
    window.addEventListener('click', function(event) {
        // Check if the click is outside of any dropdown button
        if (!event.target.closest('[data-dropdown-toggle]')) {
            document.querySelectorAll('.pyq-dropdown').forEach(dropdown => {
                dropdown.classList.add('hidden');
            });
        }
    });
    // --- END: New Dropdown Code ---
});

document.addEventListener('DOMContentLoaded', function() {
    // ... your existing code for mobile menu and PYQ dropdowns should be here ...

    // --- START: New Student Accordion Code ---
    const accordionHeaders = document.querySelectorAll('.student-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class for the icon rotation
            this.classList.toggle('active');

            // Get the content panel
            const content = this.nextElementSibling;

            // Toggle the max-height to show/hide the content
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
    // --- END: New Student Accordion Code ---
});
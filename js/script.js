// Wait for the entire HTML document to be loaded and parsed
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Mobile Menu Toggle ---
    // This code handles the opening and closing of the navigation on mobile devices.
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Check if the button and menu exist on the page before adding the event listener
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggles the 'open' class, which the CSS uses to show or hide the menu
            mobileMenu.classList.toggle('open');
        });
    }

    // --- 2. Dropdown for PYQs (Previous Year Questions) ---
    // This handles any dropdown menus on the site.
    const dropdownButtons = document.querySelectorAll('[data-dropdown-toggle]');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            // Stop the click from bubbling up to the window listener immediately
            event.stopPropagation(); 
            
            const dropdownId = this.getAttribute('data-dropdown-toggle');
            const dropdown = document.getElementById(dropdownId);
            
            // First, close any other dropdowns that might be open
            document.querySelectorAll('.pyq-dropdown').forEach(d => {
                if (d.id !== dropdownId) {
                    d.classList.add('hidden');
                }
            });

            // Then, toggle the visibility of the clicked dropdown
            if(dropdown) {
                dropdown.classList.toggle('hidden');
            }
        });
    });

    // Add a global click listener to close dropdowns when clicking elsewhere
    window.addEventListener('click', function(event) {
        if (!event.target.closest('[data-dropdown-toggle]')) {
            document.querySelectorAll('.pyq-dropdown').forEach(dropdown => {
                dropdown.classList.add('hidden');
            });
        }
    });

    // --- 3. Student List Accordion ---
    // This handles the expandable sections for student lists.
    const accordionHeaders = document.querySelectorAll('.student-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle a class on the header for styling (e.g., rotating an icon)
            this.classList.toggle('active');

            const content = this.nextElementSibling;

            // Check if the content is currently open or closed
            if (content.style.maxHeight) {
                // If it's open, close it
                content.style.maxHeight = null;
            } else {
                // If it's closed, open it by setting max-height to its actual scroll height
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

});

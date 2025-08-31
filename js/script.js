/**
 * ==========================================================================
 * Global Site Script
 * ==========================================================================
 * Version: 1.2
 * Author: Irfan Ukil
 *
 * --- DESCRIPTION ---
 * This script contains all the general-purpose JavaScript functionality
 * used across the entire website. It is loaded on every page to handle
 * shared interactive components.
 *
 * --- FEATURES ---
 * 1. Mobile Menu Toggle: Opens and closes the navigation menu on small screens.
 * 2. Dropdown Logic: Manages the PYQ dropdowns on the programs page.
 * 3. Accordion Logic: Controls collapsible content sections.
 * 4. PDF Modal Control: Handles the pop-up for previewing PDF files.
 * 5. Active Nav Link Highlighting: Automatically styles the link for the current page.
 * 6. Gallery Tabs: Manages the tabbed interface for the image gallery.
 *
 * This script is deferred in the HTML to ensure it runs after the page content
 * has loaded, improving performance.
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle the 'open' class which controls the max-height for the slide animation.
            mobileMenu.classList.toggle('open');
            const isExpanded = mobileMenu.classList.contains('open');
            // Update the aria-expanded attribute for accessibility.
            mobileMenuButton.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- 2. Dropdown for PYQs on Programs Page ---
    const dropdownButtons = document.querySelectorAll('[data-dropdown-toggle]');
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            // Stop the click from bubbling up to the window, which would close the menu immediately.
            event.stopPropagation(); 
            const dropdownId = this.getAttribute('data-dropdown-toggle');
            const dropdown = document.getElementById(dropdownId);
            
            // --- Close all other dropdowns before opening a new one ---
            document.querySelectorAll('.pyq-dropdown').forEach(d => {
                if (d.id !== dropdownId) {
                    d.classList.add('hidden');
                }
            });

            // Toggle the visibility of the clicked dropdown.
            if(dropdown) {
                dropdown.classList.toggle('hidden');
            }
        });
    });

    // --- Add a global click listener to close dropdowns when clicking anywhere else ---
    window.addEventListener('click', function(event) {
        // If the click was not on a dropdown button, hide all dropdowns.
        if (!event.target.closest('[data-dropdown-toggle]')) {
            document.querySelectorAll('.pyq-dropdown').forEach(dropdown => {
                dropdown.classList.add('hidden');
            });
        }
    });

    // --- 3. Accordion Logic for People & Materials Pages ---
    const allAccordionHeaders = document.querySelectorAll('.accordion-header, .student-accordion-header');
    allAccordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Toggle the active class for styling (e.g., rotating the icon).
            item.classList.toggle('active');
            this.setAttribute('aria-expanded', !isExpanded);

            // Animate the opening/closing by changing max-height.
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = '0px';
            }
        });
    });

    // --- 4. PDF Preview Modal Logic for Materials Page ---
    const pdfModal = document.getElementById('pdf-modal');
    if (pdfModal) {
        const closeModalBtn = document.getElementById('close-modal');
        const previewButtons = document.querySelectorAll('.preview-btn');
        const pdfViewer = document.getElementById('pdf-viewer');
        const pdfTitle = document.getElementById('pdf-title');
        const pdfDownloadLink = document.getElementById('pdf-download-link');

        const openModal = (pdfUrl, title) => {
            pdfViewer.src = pdfUrl;
            pdfTitle.textContent = title;
            pdfDownloadLink.href = pdfUrl;
            pdfModal.classList.remove('hidden');
        };

        const closeModal = () => {
            pdfModal.classList.add('hidden');
            // Clear the src to stop the PDF from loading in the background.
            pdfViewer.src = ''; 
        };
        
        previewButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const pdfUrl = button.getAttribute('data-pdf-url');
                const pdfTitleText = button.getAttribute('data-pdf-title');
                openModal(pdfUrl, pdfTitleText);
            });
        });

        // Event listeners for closing the modal
        closeModalBtn.addEventListener('click', closeModal);
        pdfModal.addEventListener('click', (event) => {
            // Close only if the click is on the dark overlay itself, not the content inside.
            if (event.target === pdfModal) {
                closeModal();
            }
        });
    }

    // --- 5. Active Navigation Link Highlighting ---
    // Get the name of the current file (e.g., 'about.html').
    const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header nav a.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPagePath) {
            // Apply the 'current-page' class if the link's href matches the current file.
            link.classList.add('current-page');
        }
    });

    // --- 6. Interactive Gallery Tabs (Home Page) ---
    const galleryTabsContainer = document.getElementById('gallery-tabs');
    // Only run this gallery logic if the gallery tabs container exists on the page.
    if (galleryTabsContainer) {
        const galleryTabs = galleryTabsContainer.querySelectorAll('.gallery-tab-btn');
        const galleryPanes = document.querySelectorAll('.gallery-pane');

        galleryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');

                // Update active state for tab buttons.
                galleryTabs.forEach(btn => btn.classList.remove('active'));
                tab.classList.add('active');

                // Show the corresponding content pane and hide others.
                galleryPanes.forEach(pane => {
                    if (pane.id === `pane-${category}`) {
                        pane.classList.add('active');
                    } else {
                        pane.classList.remove('active');
                    }
                });
            });
        });
    }
});
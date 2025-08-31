/**
 * ==========================================================================
 * Announcements Page Logic
 * ==========================================================================
 * Version: 1.1
 * Author: Irfan Ukil
 *
 * --- DESCRIPTION ---
 * This script manages all the interactive features on the announcements.html page.
 * It dynamically renders, filters, paginates, and displays announcements
 * from the data provided in `announcement-data.js`.
 *
 * --- KEY FEATURES ---
 * - Dynamically renders announcement cards from a central data source.
 * - Sorts all announcements to show the newest ones first.
 * - Provides live search and tag filtering capabilities.
 * - Automatically generates and handles pagination controls.
 * - Displays a pop-up modal for reading full announcement details.
 *
 * --- DEPENDENCIES ---
 * This script must be loaded AFTER `announcement-data.js` in the HTML file.
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. CONFIGURATION ---
    const ITEMS_PER_PAGE = 6; // Set how many announcements to show per page.

    // --- 2. DOM ELEMENT REFERENCES ---
    // This section gets all the necessary HTML elements from the page for manipulation.
    const grid = document.getElementById('announcements-grid');
    const paginationControls = document.getElementById('pagination-controls');
    const noResultsMessage = document.getElementById('no-announcements-message');
    const searchInput = document.getElementById('search-input');
    const tagFilter = document.getElementById('tag-filter');

    // Modal elements for the pop-up
    const modal = document.getElementById('announcement-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalDate = document.getElementById('modal-date');
    const modalTag = document.getElementById('modal-tag');
    const closeModalButton = document.getElementById('close-modal-button');

    // --- 3. DATA INITIALIZATION & STATE MANAGEMENT ---
    // Safety check: Stop the script if data isn't loaded or the main container is missing.
    if (typeof allAnnouncementsData === 'undefined' || !grid) {
        console.error("Announcements data is not loaded or the grid element is missing.");
        return;
    }

    // Sort the original announcement data once by date, newest first.
    let allAnnouncements = allAnnouncementsData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // State variables: These keep track of the current view.
    let currentPage = 1;
    let filteredAnnouncements = [...allAnnouncements]; // Start with all announcements.

    // --- 4. CORE FUNCTIONS ---

    /**
     * Renders the announcements for the currently selected page and filters.
     */
    function renderAnnouncements() {
        grid.innerHTML = ''; // Clear the existing grid content before rendering new items.
        noResultsMessage.classList.add('hidden'); // Hide the "no results" message by default.

        // If the filtered list is empty, show the message and stop.
        if (filteredAnnouncements.length === 0) {
            noResultsMessage.classList.remove('hidden');
            renderPagination(); // Update pagination to show nothing.
            return;
        }

        // Calculate the start and end index for the current page.
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageItems = filteredAnnouncements.slice(startIndex, endIndex);

        // Create and append an HTML card for each announcement on the current page.
        pageItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'announcement-card bg-white border border-gray-200 rounded-xl p-6 flex flex-col';
            card.innerHTML = `
                <div class="flex-grow">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="font-bold text-gray-800 pr-4">${item.title}</h3>
                        ${item.tagHTML}
                    </div>
                    <p class="text-gray-700 text-sm mb-4">${item.summary}</p>
                </div>
                <div class="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <span class="text-xs text-gray-500">Published: ${new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <button class="read-more-btn text-primary-600 text-sm font-medium hover:underline">Read More</button>
                </div>
            `;
            
            // Add a click listener to the "Read More" button to open the modal with this item's data.
            card.querySelector('.read-more-btn').addEventListener('click', () => openModal(item));
            grid.appendChild(card);
        });

        renderPagination(); // After rendering items, update the pagination controls.
    }

    /**
     * Generates and displays the pagination buttons (e.g., << 1 2 3 >>).
     */
    function renderPagination() {
        paginationControls.innerHTML = ''; // Clear old buttons.
        const totalPages = Math.ceil(filteredAnnouncements.length / ITEMS_PER_PAGE);

        if (totalPages <= 1) return; // Don't show pagination if there's only one page.

        // Add 'Previous' button
        paginationControls.appendChild(createPageButton(currentPage - 1, '<i class="fas fa-chevron-left"></i>', currentPage > 1));

        // Add numbered page buttons
        for (let i = 1; i <= totalPages; i++) {
            paginationControls.appendChild(createPageButton(i, i, true, i === currentPage));
        }

        // Add 'Next' button
        paginationControls.appendChild(createPageButton(currentPage + 1, '<i class="fas fa-chevron-right"></i>', currentPage < totalPages));
    }

    /**
     * A helper function to create a single pagination button element.
     * @param {number} page - The page number this button should navigate to.
     * @param {string|number} text - The text or icon to display inside the button.
     * @param {boolean} enabled - Determines if the button is clickable.
     * @param {boolean} isActive - Determines if this is the currently active page button.
     * @returns {HTMLButtonElement} The created button element.
     */
    function createPageButton(page, text, enabled = true, isActive = false) {
        const button = document.createElement('button');
        button.innerHTML = text;
        
        const baseClasses = 'w-10 h-10 rounded-lg transition-colors duration-200';
        if (isActive) {
            button.className = `${baseClasses} bg-primary-600 text-white cursor-default`;
            button.disabled = true;
        } else if (enabled) {
            button.className = `${baseClasses} bg-white text-gray-700 hover:bg-primary-100 border border-gray-200`;
            button.addEventListener('click', () => {
                currentPage = page;
                renderAnnouncements();
            });
        } else {
            button.className = `${baseClasses} bg-gray-100 text-gray-400 cursor-not-allowed`;
            button.disabled = true;
        }
        return button;
    }
    
    /**
     * Applies filters based on the search input and tag dropdown, then re-renders.
     */
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedTag = tagFilter.value;

        filteredAnnouncements = allAnnouncements.filter(item => {
            // Check if the item matches the search term (in title, summary, content, or date).
            const matchesSearch = searchTerm === '' ||
                item.title.toLowerCase().includes(searchTerm) ||
                item.summary.toLowerCase().includes(searchTerm) ||
                item.content.toLowerCase().includes(searchTerm) ||
                item.date.includes(searchTerm);

            // Check if the item has the selected tag.
            const matchesTag = selectedTag === 'all' || item.tags.includes(selectedTag);
            
            return matchesSearch && matchesTag;
        });

        currentPage = 1; // Always reset to the first page after filtering.
        renderAnnouncements();
    }
    
    // --- 5. MODAL FUNCTIONS ---

    /**
     * Opens the modal pop-up and populates it with announcement details.
     * @param {object} item - The full announcement object to display.
     */
    function openModal(item) {
        modalTitle.textContent = item.title;
        modalContent.innerHTML = item.content;
        modalDate.textContent = `Published: ${new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
        modalTag.innerHTML = item.tagHTML;
        modal.classList.remove('hidden');
    }

    /**
     * Closes the modal pop-up.
     */
    function closeModal() {
        modal.classList.add('hidden');
    }

    // --- 6. EVENT LISTENERS ---
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (tagFilter) tagFilter.addEventListener('change', applyFilters);
    if (closeModalButton) closeModalButton.addEventListener('click', closeModal);
    
    // Also close the modal if the user clicks on the dark overlay background.
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // --- 7. INITIAL RENDER ---
    // This is the first call to display the announcements when the page loads.
    renderAnnouncements(); 
});
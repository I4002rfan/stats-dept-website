/**
 * ==========================================================================
 * Home Page Specific Logic
 * ==========================================================================
 * Version: 1.1
 * Author: Irfan Ukil
 *
 * --- DESCRIPTION ---
 * This script handles functionality that is exclusive to the index.html page.
 * Its primary role is to dynamically load the two most recent announcements
 * into the "Latest Announcements" section, ensuring the homepage always
 * displays the most current news.
 *
 * --- DEPENDENCIES ---
 * It relies on the `allAnnouncementsData` array being available from the
 * `announcement-data.js` file, which must be loaded before this script in the HTML.
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', function() {

    /**
     * Fetches, sorts, and displays the latest announcements on the home page.
     */
    function loadLatestAnnouncements() {
        // 1. Find the container element in the HTML where announcements will be placed.
        const grid = document.getElementById('home-announcements-grid');
        
        // 2. Safety check: If the container isn't found or the data hasn't loaded, stop the function.
        if (!grid || typeof allAnnouncementsData === 'undefined') {
            console.error("Home announcements grid not found or announcement data is not available.");
            // Hide the loading skeletons if the grid exists but data doesn't.
            if(grid) grid.innerHTML = '<p class="text-gray-500 col-span-2 text-center">Could not load announcements.</p>';
            return;
        }

        // 3. Sort all announcements by date in descending order (newest first)
        //    and then select only the first two items from the sorted array.
        const latestAnnouncements = allAnnouncementsData
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 2);

        // 4. Clear any placeholder content (like the loading skeletons) from the grid.
        grid.innerHTML = '';

        // 5. Check if any announcements were found.
        if (latestAnnouncements.length > 0) {
            // If yes, loop through the `latestAnnouncements` array.
            latestAnnouncements.forEach(item => {
                // For each announcement, create a new 'div' element for its card.
                const card = document.createElement('div');
                card.className = 'announcement-card bg-white border border-gray-200 rounded-xl p-6 flex flex-col';
                
                // Populate the card's HTML content using data from the announcement object.
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
                        <a href="announcements.html" class="text-primary-600 text-sm font-medium hover:underline">Read More</a>
                    </div>
                `;
                // Add the newly created card to the grid on the page.
                grid.appendChild(card);
            });
        } else {
            // If there are no announcements at all, display a simple message.
            grid.innerHTML = '<p class="text-gray-500 col-span-2 text-center">No recent announcements.</p>';
        }
    }

    // --- INITIALIZATION ---
    // Run the function to load announcements as soon as the page is ready.
    loadLatestAnnouncements();

});
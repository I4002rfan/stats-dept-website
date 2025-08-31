/**
 * ==========================================================================
 * Announcement Data Store
 * ==========================================================================
 * Version: 1.1
 * Author: Irfan Ukil
 *
 * --- DESCRIPTION ---
 * This file acts as a central database for all department announcements.
 * By keeping the data separate from the HTML, the website can be updated
 * easily without touching the main page structure. The scripts `home.js` and
 * `announcements.js` read from this file to display the data.
 *
 * The `allAnnouncementsData` array contains a list of "announcement objects".
 * Each object represents one announcement and has several properties.
 *
 * --- HOW TO ADD A NEW ANNOUNCEMENT ---
 * 1. Copy an entire existing object (from the opening `{` to the closing `},`).
 * 2. Paste it at the VERY TOP of the array, right after the opening `[`.
 * 3. Update the following fields for your new announcement:
 * - `date`: Use "YYYY-MM-DD" format. This is crucial for sorting.
 * - `tags`: A list of categories (e.g., ["Important", "Academic"]).
 * - `title`: The headline of the announcement.
 * - `summary`: A short, one-sentence description.
 * - `content`: The full details. You can use HTML tags like <p>, <strong>, <a> here.
 * - `tagHTML`: The visual tag. The class must match a style in style.css (e.g., 'tag-important').
 * 4. Ensure there is a comma separating your new object from the one below it.
 * ==========================================================================
 */

const allAnnouncementsData = [
    // PASTE NEW ANNOUNCEMENTS HERE. The newest announcement should always be at the top.
    {
        date: "2025-08-26", // Format: YYYY-MM-DD. Critical for sorting.
        tags: ["Important", "Academic"], // A list of relevant tags for filtering.
        title: "Revised UG 2nd Semester Examination Schedule 2025",
        summary: "The revised programme for the B.A/B.Sc./B.Com (Major) 2nd Semester Examination for 2025 has been published.",
        // The 'content' uses backticks (` `) to allow for multi-line HTML.
        // You can add more <p> tags, links <a>, bold text <strong>, etc.
        content: `
            <p>The Controller of Examinations, University of Kalyani, has published the revised schedule for the upcoming 2nd semester examinations for all major undergraduate courses under the NEP 2020 guidelines.</p>
            <p>All students are advised to carefully review the new dates and timings for all theoretical and practical papers. The examinations for various courses are scheduled to take place from <strong>September 16, 2025</strong> to <strong>September 25, 2025</strong>.</p>
            <p class="mt-4">You can view the detailed schedule in the attached PDF document. Please download it for your reference.</p>
            <div class="mt-6">
                <a href="assets/announcements/UG 2ND SEMESTER REVISED EXAMINATIONS SCHEDULE,2025 (NEP)-compressed.pdf" target="_blank" rel="noopener noreferrer" class="inline-flex items-center bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium py-2 px-4 rounded-lg border border-primary-200 transition-colors">
                    <i class="fas fa-eye mr-2"></i> View Schedule (PDF)
                </a>
                <a href="assets/announcements/UG 2ND SEMESTER REVISED EXAMINATIONS SCHEDULE,2025 (NEP)-compressed.pdf" download class="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors ml-2">
                    <i class="fas fa-download mr-2"></i> Download
                </a>
            </div>
        `,
        // The HTML for the tag that will be displayed on the card.
        // Match the class to the tag name (e.g., 'Important' -> 'tag-important').
        tagHTML: '<span class="tag-important">Important</span>'
    }
    // To add another announcement, you would copy the object above,
    // paste it here, and add a comma after the closing brace '}' of the first object.
];

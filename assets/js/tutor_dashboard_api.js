/**
 * API Service for Tutor Dashboard
 * Handles all backend communication
 */

const ApiService = {
    /**
     * Update session details
     * @param {Object} payload - The session data to update
     * @returns {Promise}
     */
    updateSession: async function(payload) {
        const response = await fetch('/api/sessions/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    },

    /**
     * Search sessions by date
     * @param {string} date - Date string (DD/MM/YYYY)
     * @returns {Promise}
     */
    searchSessionsByDate: async function(date) {
        const response = await fetch(`/api/sessions/search?date=${encodeURIComponent(date)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    },

    /**
     * Fetch sessions for a specific page
     * @param {number|string} page - Page number or 'prev'/'next'
     * @returns {Promise}
     */
    fetchSessionsByPage: async function(page) {
        const response = await fetch(`/api/sessions?page=${page}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    }
};

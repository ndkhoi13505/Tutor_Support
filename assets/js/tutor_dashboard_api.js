/**
 * API Service for Tutor Dashboard
 * Handles all backend communication (Mock Data)
 */

const ApiService = {
    // Mock Data
    _defaultSessions: [
        { id: 101, subject: "MT1003 - Giải tích 1", date: "06/12/2025", time: "17:00", isOnline: true, location: "https://meet.google.com/abc-defg-hij" },
        { id: 102, subject: "MT1005 - Giải tích 2", date: "07/12/2025", time: "17:00", isOnline: true, location: "https://meet.google.com/xyz-uvwx-yz" },
        { id: 103, subject: "CO2011 - Mô hình hóa toán học", date: "08/12/2025", time: "17:00", isOnline: true, location: "https://zoom.us/j/123456789" },
        { id: 104, subject: "CO2013 - Hệ cơ sở dữ liệu", date: "09/12/2025", time: "18:00", isOnline: false, location: "H6-210" },
        { id: 105, subject: "CO3093 - Mạng máy tính", date: "10/12/2025", time: "18:00", isOnline: false, location: "H3-301" },
        { id: 106, subject: "CO2003 - Cấu trúc DL và GT", date: "10/12/2025", time: "18:00", isOnline: false, location: "H4-301" },
        { id: 107, subject: "PH1003 - Vật lý 1", date: "11/12/2025", time: "07:00", isOnline: false, location: "H5-201" },
        { id: 108, subject: "PH1005 - Vật lý 2", date: "11/12/2025", time: "09:30", isOnline: true, location: "https://meet.google.com/phy-sics-two" },
        { id: 109, subject: "MT1007 - Đại số tuyến tính", date: "12/12/2025", time: "13:00", isOnline: false, location: "H1-304" },
        { id: 110, subject: "SP1003 - Pháp luật đại cương", date: "12/12/2025", time: "15:30", isOnline: true, location: "https://teams.microsoft.com/l/meetup-join/..." }
    ],

    // Helper to get data from LocalStorage or Default
    _getData: function() {
        const stored = localStorage.getItem('tutor_sessions');
        if (stored) {
            return JSON.parse(stored);
        }
        return [...this._defaultSessions];
    },

    // Helper to save data to LocalStorage
    _saveData: function(data) {
        localStorage.setItem('tutor_sessions', JSON.stringify(data));
    },

    /**
     * Update session details
     * @param {Object} payload - The session data to update
     */
    updateSession: async function(payload) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const sessions = this._getData();

                // Check for conflict (Same Date & Time)
                const isConflict = sessions.some(s => 
                    s.id != payload.id && 
                    s.date === payload.date && 
                    s.time === payload.time
                );

                if (isConflict) {
                    reject(new Error("Xung đột lịch trình: Đã có buổi học khác vào thời gian này!"));
                    return;
                }

                const index = sessions.findIndex(s => s.id == payload.id);
                
                if (index !== -1) {
                    sessions[index] = { ...sessions[index], ...payload };
                    this._saveData(sessions); // Save to LocalStorage
                    resolve({ success: true, data: sessions[index] });
                } else {
                    reject(new Error("Session not found"));
                }
            }, 500);
        });
    },

    /**
     * Search sessions by date
     * @param {string} date - Date string (DD/MM/YYYY)
     */
    searchSessionsByDate: async function(date) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let results = this._getData();
                if (date) {
                    results = results.filter(s => s.date === date);
                }
                resolve({ success: true, data: results });
            }, 300);
        });
    },

    /**
     * Fetch sessions for a specific page
     * @param {number|string} page - Page number or 'prev'/'next'
     */
    fetchSessionsByPage: async function(page) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const sessions = this._getData();
                resolve({ success: true, data: sessions });
            }, 300);
        });
    }
};

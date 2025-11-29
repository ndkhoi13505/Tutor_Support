/**
 * Mock API Service for Student Module
 * Hỗ trợ register_tutor.html và booking.html
 */
const StudentApiService = {
    // DỮ LIỆU TUTOR (Dùng cho register_tutor.html)
    /**
     * @note
     * * Yêu cầu format dữ liệu trả về:
     * - schedule: Mảng string quy định lịch rảnh. Format: "Thứ-Buổi"
     * + Thứ: T2, T3, T4, T5, T6, T7, CN
     * + Buổi: S (Sáng), C (Chiều), T (Tối)
     * => Ví dụ: "T2-S" là Thứ 2 Sáng. Logic FE dùng mảng này để check overlap
     * * - teachingMode: Bắt buộc phải là một trong 3 giá trị chính xác:
     * + "Online"
     * + "Offline" 
     * + "Both"
     * * - subjects: Hiện tại FE đang nhận String. Nếu BE trả về Array, cần báo FE để update.
     */
    _tutors: [
        { 
            id: 1, 
            name: "Nguyễn Văn A", 
            score: "9.8/10",        // String: Điểm AI matching 
            sessions: 15,           // Number: Số buổi đã dạy
            rating: 5,              // Number: Điểm sao (0-5)
            reviews: 9,             // Number: Số lượng đánh giá
            job: "SV Năm 4 KH&KTMT", 
            subjects: "MT1003 - Giải tích 1",   // String: Môn dạy chính 
            teachingMode: "Online",             // String: "Online" | "Offline" | "Both"
            schedule: ["T2-S", "T2-C", "T4-S", "T6-T"]  // Array<String>: Lịch rảnh
        },
        { 
            id: 2, name: "Nguyễn Văn B", score: "9.5/10", sessions: 21, rating: 5, reviews: 10, 
            job: "Trợ giảng Toán", subjects: "MT1007 - Đại số tuyến tính",
            teachingMode: "Offline", 
            schedule: ["T3-S", "T5-C", "T7-S"] 
        },
        { 
            id: 3, name: "Nguyễn Văn C", score: "9.3/10", sessions: 3, rating: null, reviews: 0, 
            job: "SV Năm 3 Điện", subjects: "PH1003 - Vật lý 1",
            teachingMode: "Both", 
            schedule: ["T2-T", "T4-T", "CN-S"] 
        },
        { 
            id: 4, name: "Nguyễn Văn D", score: "9.0/10", sessions: 43, rating: 5, reviews: 20, 
            job: "Cựu sinh viên", subjects: "CO2003 - Cấu trúc dữ liệu",
            teachingMode: "Online", 
            schedule: ["T7-C", "T7-T", "CN-C"] 
        },
        { 
            id: 5, name: "Nguyễn Văn E", score: "9.0/10", sessions: 32, rating: 4.9, reviews: 19, 
            job: "SV Năm 4 CS", subjects: "CO3093 - Mạng máy tính",
            teachingMode: "Offline", 
            schedule: ["T2-S", "T3-S", "T4-S", "T5-S"] 
        },
        { 
            id: 6, name: "Trần Thị F", score: "8.8/10", sessions: 10, rating: 4.5, reviews: 5, 
            job: "SV Năm 3 Hóa", subjects: "CH1003 - Hóa đại cương",
            teachingMode: "Both",
            schedule: ["T2-S", "T3-C", "T5-T"]
        },
        { 
            id: 7, name: "Lê Văn G", score: "8.5/10", sessions: 5, rating: 4.0, reviews: 2, 
            job: "SV Năm 2 Cơ khí", subjects: "ME2003 - Cơ lý thuyết",
            teachingMode: "Offline",
            schedule: ["T6-S", "T7-S", "CN-S"]
        },
        { 
            id: 8, name: "Phạm Thị H", score: "9.9/10", sessions: 50, rating: 5, reviews: 30, 
            job: "GV Trẻ", subjects: "MT1005 - Giải tích 2",
            teachingMode: "Online",
            schedule: ["T2-T", "T3-T", "T4-T", "T5-T"]
        }
    ],
    
    // DỮ LIỆU LỊCH CÓ SẴN (Dùng cho booking.html)
    /**
     * @note
     * * Lưu ý về định dạng ngày giờ:
     * - date: FE đang parse thủ công theo định dạng "DD/MM/YYYY". 
     * => Format date thành String "DD/MM/YYYY" trước khi trả về response.
     * * - time: String dạng "HH:MM - HH:MM" (Giờ bắt đầu - Giờ kết thúc).
     * * - status: Dùng để disable nút đăng ký.
     * + "available": Cho phép đăng ký.
     * + "booked": Đã có người đăng ký (nút xám).
     */
    _sessions: [
        { id: 101, 
            subject: "Giải tích 1",  
            code: "MT1003", 
            date: "06/12/2025",     // String: Bắt buộc format DD/MM/YYYY
            time: "17:00 - 18:30",  // String: Range giờ
            room: "-",              // String: Phòng học hoặc "-" nếu Online
            mode: "Online",         // String: Hình thức
            tutor: "Nguyễn Thị Xuân Anh", 
            status: "available"     // String: "available" | "booked"
        },
        { id: 102, subject: "Giải tích 2", code: "MT1005", date: "07/12/2025", time: "17:00 - 18:30", room: "-", mode: "Online", tutor: "Trần Ngọc Diễm", status: "available" },
        { id: 103, subject: "Mô hình hóa toán học", code: "CO2011", date: "08/12/2025", time: "17:00 - 18:30", room: "-", mode: "Online", tutor: "Trần Hồng Tài", status: "available" },
        { id: 104, subject: "Hệ cơ sở dữ liệu", code: "CO2013", date: "09/12/2025", time: "18:00 - 19:30", room: "H6-210", mode: "Offline", tutor: "Trương Quỳnh Chi", status: "available" },
        { id: 105, subject: "Mạng máy tính", code: "CO3093", date: "10/12/2025", time: "18:00 - 19:30", room: "H3-301", mode: "Offline", tutor: "Nguyễn Phương Duy", status: "available" },
        { id: 106, subject: "Cấu trúc DL và GT", code: "CO2003", date: "10/12/2025", time: "18:00 - 19:30", room: "B4-301", mode: "Offline", tutor: "Lê Thành Sách", status: "booked" },
        { id: 107, subject: "Vật lý 1", code: "PH1003", date: "11/12/2025", time: "07:00 - 09:30", room: "C5-201", mode: "Offline", tutor: "Đỗ Minh Đức", status: "available" },
        { id: 108, subject: "Vật lý 2", code: "PH1005", date: "11/12/2025", time: "09:30 - 11:30", room: "-", mode: "Online", tutor: "Lại Thị Lan", status: "available" },
        { id: 109, subject: "Đại số tuyến tính", code: "MT1007", date: "12/12/2025", time: "13:00 - 15:30", room: "B1-304", mode: "Offline", tutor: "Cao Văn Hạnh", status: "available" },
        { id: 110, subject: "Pháp luật đại cương", code: "SP1003", date: "12/12/2025", time: "15:30 - 17:30", room: "-", mode: "Online", tutor: "Ngô Thanh Vân", status: "available" }
    ],

    // DỮ LIỆU MÔN HỌC (Dùng cho Autocomplete cả 2 trang)
    /**
     * @note 
     * * Dùng để gợi ý khi sinh viên gõ vào ô tìm kiếm.
     * Cần trả về cả 'code' và 'name' để hiển thị dạng "MT1003 - Giải tích 1".
     */
    _subjects: [
        { code: "MT1003", name: "Giải tích 1" },
        { code: "MT1005", name: "Giải tích 2" },
        { code: "MT1007", name: "Đại số tuyến tính" },
        { code: "PH1003", name: "Vật lý 1" },
        { code: "CO1005", name: "Nhập môn điện toán" },
        { code: "CO2003", name: "Cấu trúc dữ liệu và giải thuật" },
        { code: "CO2013", name: "Hệ cơ sở dữ liệu" },
        { code: "CO3093", name: "Mạng máy tính" },
        { code: "CH1003", name: "Hóa đại cương" },
        { code: "ME2003", name: "Cơ lý thuyết" }
    ],

    // --- METHODS ---

    _parseDateTime(dateStr, timeStr) {
        // dateStr: "DD/MM/YYYY", timeStr: "HH:MM - HH:MM" -> lấy giờ bắt đầu
        const [day, month, year] = dateStr.split('/').map(Number);
        const startTime = timeStr.split(' - ')[0]; 
        const [hour, minute] = startTime.split(':').map(Number);
        return new Date(year, month - 1, day, hour, minute);
    },

    getTutors: async function() {
        return new Promise(resolve => setTimeout(() => resolve([...this._tutors]), 300));
    },

    getSessions: async function(filters = {}) {
        return new Promise(resolve => {
            setTimeout(() => {
                let data = this._sessions.map(s => {
                    // Tính toán trạng thái hết hạn
                    const sessionDateObj = this._parseDateTime(s.date, s.time);
                    const now = new Date();
                    return {
                        ...s,
                        isExpired: sessionDateObj < now,
                        timestamp: sessionDateObj.getTime() // Dùng để sort
                    };
                });

                // FILTER
                if (filters.code) {
                    data = data.filter(s => s.code.toLowerCase().includes(filters.code.toLowerCase()) || 
                                            s.subject.toLowerCase().includes(filters.code.toLowerCase()));
                }
                if (filters.date) {
                    data = data.filter(s => s.date === filters.date);
                }
                if (filters.tutor) {
                    data = data.filter(s => s.tutor.toLowerCase().includes(filters.tutor.toLowerCase()));
                }

                // SORT
                data.sort((a, b) => a.timestamp - b.timestamp);

                resolve(data);
            }, 300);
        });
    },

    registerSession: async function(sessionId) {
        return new Promise(resolve => {
            setTimeout(() => {
                const session = this._sessions.find(s => s.id === sessionId);
                if (session) session.status = "booked";
                resolve({ success: true });
            }, 800);
        });
    },

    searchSubjects: async function(keyword) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (!keyword) resolve([]);
                const lowerKey = keyword.toLowerCase();
                const results = this._subjects.filter(s => 
                    s.code.toLowerCase().includes(lowerKey) || s.name.toLowerCase().includes(lowerKey)
                );
                resolve(results);
            }, 200); 
        });
    }
};
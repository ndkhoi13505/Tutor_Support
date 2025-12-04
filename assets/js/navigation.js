document.addEventListener("DOMContentLoaded", function() {
    // Lấy thông tin User & Role
    let userRole = 'student'; 
    
    const userObj = JSON.parse(localStorage.getItem("user"));
    if (userObj && userObj.role) {
        userRole = userObj.role;
    } else {
        const roleRaw = localStorage.getItem("user_role");
        if (roleRaw) userRole = roleRaw;
    }

    userRole = userRole.toLowerCase(); 
    if (userRole.includes('gv') || userRole.includes('tutor')) userRole = 'tutor';
    else userRole = 'student';

    const allMenuItems = [
        { 
            label: "Trang chủ", 
            link: "dashboard.html", 
            icon: "fa-solid fa-house", 
            roles: ["student", "tutor"] 
        },
        { 
            label: "Tìm kiếm Tutor", 
            link: "register_tutor.html", 
            icon: "fa-solid fa-magnifying-glass", 
            roles: ["student"] 
        },
        { 
            label: "Lịch đăng ký", 
            link: "booking.html", 
            icon: "fa-regular fa-calendar-check", 
            roles: ["student"] 
        },
        { 
            label: "Quản lý lịch dạy", 
            link: "managesession.html", 
            icon: "fa-solid fa-chalkboard-user", 
            roles: ["tutor"] 
        },
        { 
            label: "Tài liệu", 
            link: "#", 
            icon: "fa-solid fa-book-open", 
            roles: ["student", "tutor"] 
        },
        { 
            label: "Thông tin cá nhân", 
            link: "#", 
            icon: "fa-regular fa-user", 
            roles: ["student", "tutor"] 
        }
    ];

    const visibleMenu = allMenuItems.filter(item => item.roles.includes(userRole));

    const path = window.location.pathname;
    const currentPage = path.split("/").pop() || "dashboard.html";

    // Render HTML
    const sidebarHTML = `
        <aside class="app-sidebar">
            <div class="sidebar-header">
                <button class="nav-toggle-btn"><i class="fa-solid fa-bars"></i></button>
            </div>
            
            <ul class="sidebar-menu">
                ${visibleMenu.map(item => `
                    <li class="menu-item">
                        <a href="${item.link}" class="menu-link ${currentPage === item.link ? 'active' : ''}">
                            <i class="${item.icon}"></i>
                            <span>${item.label}</span>
                        </a>
                    </li>
                `).join('')}
            </ul>

            <div class="sidebar-footer">
                <a href="index.html" class="menu-link" style="color: #EF4444;" onclick="localStorage.clear()">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>Đăng xuất</span>
                </a>
            </div>
        </aside>
    `;

    if (!document.querySelector('.app-sidebar')) {
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    }
});
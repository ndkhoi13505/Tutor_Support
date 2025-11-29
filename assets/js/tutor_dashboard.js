//for backend read tutor_dashboard_api


let currentSessionId = null;
let successModalTimer = null;



document.addEventListener('DOMContentLoaded', () => {
    loadSessions();
});

async function loadSessions() {
    try {
        const response = await ApiService.fetchSessionsByPage(1);
        renderSessions(response.data);
    } catch (error) {
        console.error("Failed to load sessions:", error);
    }
}

function renderSessions(sessions) {
    const container = document.querySelector('.table-container');
    const header = container.querySelector('.table-header');
    container.innerHTML = '';
    container.appendChild(header);

    sessions.forEach(session => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.dataset.id = session.id;
        row.dataset.subject = session.subject;
        row.dataset.date = session.date;
        row.dataset.time = session.time;
        row.dataset.online = session.isOnline;
        if (session.isOnline) {
            row.dataset.link = session.location;
        } else {
            row.dataset.room = session.location;
        }

        row.innerHTML = `
            <div class="col col-subject">${session.subject}</div>
            <div class="col col-date">${session.date}</div>
            <div class="col col-time">${session.time}</div>
            <div class="col col-room">${session.isOnline ? '-' : session.location}</div>
            <div class="col col-type">${session.isOnline ? 'Online' : 'Offline'}</div>
            <div class="col col-action">
                <button class="btn-edit" onclick="openEditModal(this)">Chỉnh sửa</button>
            </div>
        `;
        container.appendChild(row);
    });
}

function openEditModal(button) {
    const row = button.closest('.table-row');
    if (row) {
        row.style.backgroundColor = '#F3F4F6';
        
        
        currentSessionId = row.dataset.id;
        const date = row.dataset.date;
        const time = row.dataset.time;
        const isOnline = row.dataset.online === 'true';
        const roomOrLink = isOnline ? row.dataset.link : row.dataset.room;

        
        document.getElementById('editDate').value = date;
        
        const [hour, minute] = time.split(':');
        document.getElementById('editHour').value = hour;
        document.getElementById('editMinute').value = minute;

        const onlineSwitch = document.getElementById('onlineSwitch');
        onlineSwitch.checked = isOnline;
        
    
        toggleRoomInput(false); 
        
        const roomInput = document.getElementById('roomInput');
        roomInput.value = roomOrLink || "";
    }

    document.getElementById('editModalOverlay').classList.remove('d-none');
}

function closeEditModal() {
    document.getElementById('editModalOverlay').classList.add('d-none');
    currentSessionId = null;
    const rows = document.querySelectorAll('.table-row');
    rows.forEach(row => {
        row.style.backgroundColor = '';
    });
}

async function saveChanges() {
    const date = document.getElementById('editDate').value;
    const hour = document.getElementById('editHour').value;
    const minute = document.getElementById('editMinute').value;
    const isOnline = document.getElementById('onlineSwitch').checked;
    const roomOrLink = document.getElementById('roomInput').value;

    if (!date) {
        alert("Vui lòng nhập ngày.");
        return;
    }
    
    // Date Format Validation (DD/MM/YYYY)
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if (!dateRegex.test(date)) {
        alert("Định dạng ngày không hợp lệ (DD/MM/YYYY).");
        return;
    }

    const [_, day, month, year] = date.match(dateRegex);
    const dateObj = new Date(`${year}-${month}-${day}`);
    if (
        dateObj.getFullYear() != year ||
        dateObj.getMonth() + 1 != month ||
        dateObj.getDate() != day
    ) {
        alert("Ngày không tồn tại.");
        return;
    }

    if (!hour || isNaN(hour) || hour < 0 || hour > 23) {
        alert("Giờ không hợp lệ (0-23).");
        return;
    }
    if (!minute || isNaN(minute) || minute < 0 || minute > 59) {
        alert("Phút không hợp lệ (0-59).");
        return;
    }
    if (!roomOrLink) {
        alert(isOnline ? "Vui lòng nhập link tham gia." : "Vui lòng nhập phòng học.");
        return;
    }

    const payload = {
        id: currentSessionId,
        date: date,
        time: `${hour}:${minute}`,
        isOnline: isOnline,
        location: roomOrLink
    };

    try {
        await ApiService.updateSession(payload);
        const row = document.querySelector(`.table-row[data-id="${currentSessionId}"]`);
        if (row) {
            row.dataset.date = date;
            row.dataset.time = `${hour}:${minute}`;
            row.dataset.online = isOnline;
            if (isOnline) {
                row.dataset.link = roomOrLink;
            } else {
                row.dataset.room = roomOrLink;
            }

            row.querySelector('.col-date').textContent = date;
            row.querySelector('.col-time').textContent = `${hour}:${minute}`;
            
            if (isOnline) {
                row.querySelector('.col-room').textContent = "-";
                row.querySelector('.col-type').textContent = "Online";
            } else {
                row.querySelector('.col-room').textContent = roomOrLink;
                row.querySelector('.col-type').textContent = "Offline";
            }

            document.getElementById('successSubject').textContent = row.dataset.subject;
            document.getElementById('successDate').textContent = date;
            document.getElementById('successTime').textContent = `${hour}:${minute}`;
            document.getElementById('successType').textContent = isOnline ? "Online" : "Offline";
        }

        closeEditModal();
        document.getElementById('successModal').classList.remove('d-none');
        
        let timeLeft = 5;
        const btnReturn = document.getElementById('btnReturn');
        btnReturn.textContent = `Quay về (${timeLeft}s)`;
        
        if (successModalTimer) clearInterval(successModalTimer);
        
        successModalTimer = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                closeSuccessModal();
            } else {
                btnReturn.textContent = `Quay về (${timeLeft}s)`;
            }
        }, 1000);

    } catch (error) {
        console.error("Failed to save changes:", error);
        alert("Có lỗi xảy ra khi lưu thay đổi.");
    }
}

function closeSuccessModal() {
    if (successModalTimer) {
        clearInterval(successModalTimer);
        successModalTimer = null;
    }
    document.getElementById('successModal').classList.add('d-none');
}

function toggleRoomInput(clearValue = true) {
    const isOnline = document.getElementById('onlineSwitch').checked;
    const roomInput = document.getElementById('roomInput');
    
    if (clearValue) {
        roomInput.value = "";
    }

    if (isOnline) {
        roomInput.placeholder = "Nhập link tham gia";
    } else {
        roomInput.placeholder = "Nhập phòng học";
    }
}

async function searchSessions() {
    const searchDate = document.getElementById('searchInput').value;
    try {
        const response = await ApiService.searchSessionsByDate(searchDate);
        renderSessions(response.data);
    } catch (error) {
        console.error("Search failed:", error);
    }
}

async function changePage(page) {
    try {
        const response = await ApiService.fetchSessionsByPage(page);
        renderSessions(response.data);
    } catch (error) {
        console.error("Pagination failed:", error);
    }
}

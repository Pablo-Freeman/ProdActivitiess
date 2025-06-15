document.addEventListener('DOMContentLoaded', function() {
    // Check if we should show the full screen message
    if (window.innerHeight === screen.height && window.innerWidth === screen.width) {
        document.getElementById('fullscreen-message').classList.remove('hidden');
    }

    // Exit full screen message when Esc is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.getElementById('fullscreen-message').classList.add('hidden');
        }
    });

    // Auth screen toggling
    document.getElementById('show-signup').addEventListener('click', function() {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('signup-screen').classList.remove('hidden');
    });

    document.getElementById('show-login').addEventListener('click', function() {
        document.getElementById('signup-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
    });

    // Mock login functionality
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simple validation
        if (email && password) {
            // In a real app, you would validate with a server
            document.getElementById('auth-container').classList.add('hidden');
            document.getElementById('main-app').classList.remove('hidden');
            document.getElementById('username-display').textContent = email.split('@')[0];
        } else {
            alert('Please enter both email and password');
        }
    });

    // Mock signup functionality
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const password2 = document.getElementById('signup-password2').value;
        
        // Simple validation
        if (!username || !email || !password || !password2) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== password2) {
            alert('Passwords do not match');
            return;
        }
        
        // In a real app, you would send this to a server
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        document.getElementById('username-display').textContent = username;
    });

    // Navigation
    document.getElementById('calendar-btn').addEventListener('click', function() {
        document.getElementById('settings-view').classList.add('hidden');
        document.getElementById('calendar-view').classList.remove('hidden');
    });

    document.getElementById('settings-btn').addEventListener('click', function() {
        document.getElementById('calendar-view').classList.add('hidden');
        document.getElementById('settings-view').classList.remove('hidden');
    });

    document.getElementById('logout-btn').addEventListener('click', function() {
        document.getElementById('main-app').classList.add('hidden');
        document.getElementById('auth-container').classList.remove('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('signup-screen').classList.add('hidden');
    });

    // Calendar functionality
    let currentDate = new Date();
    
    function renderCalendar() {
        const calendarBody = document.getElementById('calendar-body');
        calendarBody.innerHTML = '';
        
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        
        document.getElementById('current-month').textContent = 
            new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInLastMonth = new Date(year, month, 0).getDate();
        
        let date = 1;
        let nextMonthDate = 1;
        
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                
                if (i === 0 && j < firstDay) {
                    // Days from previous month
                    cell.textContent = daysInLastMonth - (firstDay - j - 1);
                    cell.classList.add('other-month');
                } else if (date > daysInMonth) {
                    // Days from next month
                    cell.textContent = nextMonthDate++;
                    cell.classList.add('other-month');
                } else {
                    // Current month days
                    cell.textContent = date;
                    
                    // Highlight today
                    const today = new Date();
                    if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        cell.classList.add('today');
                    }
                    
                    date++;
                }
                
                row.appendChild(cell);
            }
            
            calendarBody.appendChild(row);
            
            if (date > daysInMonth && nextMonthDate > 7) {
                break;
            }
        }
    }
    
    document.getElementById('prev-month').addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('next-month').addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    // Initialize calendar
    renderCalendar();
    
    // Settings functionality
    document.getElementById('upload-btn').addEventListener('click', function() {
        const fileInput = document.getElementById('profile-pic-upload');
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                document.getElementById('profile-pic-preview').style.backgroundImage = 
                    `url(${e.target.result})`;
            };
            
            reader.readAsDataURL(fileInput.files[0]);
        }
    });
    
    document.getElementById('settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newUsername = document.getElementById('new-username').value;
        if (newUsername) {
            document.getElementById('username-display').textContent = newUsername;
        }
        
        alert('Changes saved successfully!');
    });
});
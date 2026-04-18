// 1. Live Time & Date Logic
function updateClock(): void {
    const timeElement = document.getElementById('current-time') as HTMLElement;
    const dateElement = document.getElementById('current-date') as HTMLElement;
    
    const now = new Date();
    
    const timeString = now.toLocaleTimeString('en-US', { hour12: false });
    const dateString = now.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    
    if (timeElement && dateElement) {
        timeElement.textContent = timeString;
        dateElement.textContent = dateString;
    }
}
setInterval(updateClock, 1000);
updateClock();

// 2. Interactive Cursor Logic
const cursor = document.getElementById('custom-cursor') as HTMLElement;

document.addEventListener('mousemove', (e: MouseEvent) => {
    if (cursor) {
        cursor.style.left = ${e.clientX}px;
        cursor.style.top = ${e.clientY}px;
        
        // Dynamic color changes based on screen position (Forza/Valorant theme shift)
        const xRatio = e.clientX / window.innerWidth;
        if (xRatio > 0.5) {
            cursor.style.borderColor = '#d90479'; // Forza Pink on right
        } else {
            cursor.style.borderColor = '#ff4655'; // Valorant Red on left
        }
    }
});

// Cursor hover effects on interactable elements
const interactables = document.querySelectorAll('a, button, input, textarea, .interactive-box');
interactables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        if (cursor) {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(255, 70, 85, 0.2)';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursor) {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
        }
    });
});

// 3. Contact Form Logic (Stay on Page)
const form = document.getElementById('contact-form') as HTMLFormElement;
const notificationArea = document.getElementById('notification-area') as HTMLElement;

if (form) {
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault(); // This is what STOPS the page from opening email apps or refreshing
        
        // In a real scenario, you would send data to a backend here via fetch()
        // For the frontend UI, we hide the form and show the success message.
        
        form.classList.add('hidden');
        notificationArea.classList.remove('hidden');
        
        // Optional: Reset the form so it's blank if they refresh
        form.reset();
    });
}
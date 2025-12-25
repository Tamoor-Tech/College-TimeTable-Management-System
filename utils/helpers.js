/**
 * DOM Utility functions and helpers
 */

// Helper to create elements with attributes and classes
export function createElement(tag, className, attributes = {}) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    
    for (const key in attributes) {
        if (key === 'text') {
            el.textContent = attributes[key];
        } else if (key === 'html') {
            el.innerHTML = attributes[key];
        } else if (key === 'children') {
            attributes[key].forEach(child => el.appendChild(child));
        } else if (typeof attributes[key] === 'function' && key.startsWith('on')) {
            const event = key.substring(2).toLowerCase();
            el.addEventListener(event, attributes[key]);
        } else {
            el.setAttribute(key, attributes[key]);
        }
    }
    
    return el;
}

export function formatTime(timeStr) {
    if (!timeStr) return '';
    
    try {
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    } catch {
        return timeStr;
    }
}

export function getUserInitials(name) {
    if (!name) return 'U';
    return name.split(' ')
        .filter(word => word.length > 0)
        .map(word => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
}

export function getCurrentDateFormatted() {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function formatDate(date, format = 'medium') {
    const options = {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        medium: { year: 'numeric', month: 'long', day: 'numeric' },
        long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    };
    
    return new Date(date).toLocaleDateString('en-US', options[format] || options.medium);
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function getRandomColor(str) {
    // Generate a consistent color based on string input
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
        '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
    ];
    
    return colors[Math.abs(hash) % colors.length];
}

export function truncateText(text, maxLength = 50) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

export function createNotification(type, message, duration = 3000) {
    const notification = createElement('div', `alert alert-${type} alert-dismissible fade show position-fixed`, {
        style: 'top: 20px; right: 20px; z-index: 1060;',
        html: `
            <div class="d-flex align-items-center gap-2">
                <i data-lucide="${type === 'success' ? 'check-circle' : type === 'warning' ? 'alert-circle' : 'info'}" 
                   style="width: 20px; height: 20px;"></i>
                <span>${message}</span>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `
    });
    
    document.body.appendChild(notification);
    lucide.createIcons();
    
    if (duration > 0) {
        setTimeout(() => {
            notification.remove();
        }, duration);
    }
    
    return notification;
}

export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function getDayName(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex] || '';
}
import { menuItems } from '../utils/data.js';

export class Sidebar {
    constructor(role, onNavigate, onLogout, isCollapsed = false) {
        this.role = role;
        this.onNavigate = onNavigate;
        this.onLogout = onLogout;
        this.isCollapsed = isCollapsed;
    }

    collapse() {
        this.isCollapsed = true;
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.add('collapsed');
            sidebar.classList.remove('expanded');
        }
    }

    expand() {
        this.isCollapsed = false;
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('collapsed');
            sidebar.classList.add('expanded');
        }
    }

    collapseForMobile() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('mobile-open');
        }
    }

    render() {
        const items = menuItems[this.role] || [];

        return `
            <aside id="sidebar" class="sidebar ${this.isCollapsed ? 'collapsed' : 'expanded'}">
                <div class="sidebar-header">
                    <div class="logo-container">
                        <div class="logo-icon">
                            <i data-lucide="calendar" style="width: 20px; height: 20px;"></i>
                        </div>
                        <span class="logo-text">Timetable Pro</span>
                    </div>
                </div>

                <nav class="sidebar-nav">
                    <ul class="list-unstyled mb-0">
                        ${items.map((item, index) => `
                            <li class="nav-item">
                                <a href="#" class="nav-link ${index === 0 ? 'active' : ''}" data-view="${item.id}">
                                    <div class="nav-icon">
                                        <i data-lucide="${item.icon}" style="width: 18px; height: 18px;"></i>
                                    </div>
                                    <span class="nav-text">${item.label}</span>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </nav>

                <div class="sidebar-footer">
                    <button id="logout-btn" class="btn btn-light w-100 text-start d-flex align-items-center gap-2 p-2 rounded">
                        <div class="nav-icon">
                            <i data-lucide="log-out" style="width: 18px; height: 18px;"></i>
                        </div>
                        <span class="nav-text">Logout</span>
                    </button>
                </div>
            </aside>
        `;
    }

    postRender() {
        // Bind navigation events
        const navLinks = document.querySelectorAll('.nav-link[data-view]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Navigate to view
                const viewId = link.getAttribute('data-view');
                if (this.onNavigate) this.onNavigate(viewId);
            });
        });

        // Bind logout event
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                if (this.onLogout) this.onLogout();
            }
        });

        // Initialize icons
        lucide.createIcons();
    }
}
import { Sidebar } from './components/Sidebar.js';
import { Navigation } from './components/Navigation.js';
import { Login } from './views/Login.js';
import { AdminDashboard } from './views/AdminDashboard.js';
import { TeacherDashboard } from './views/TeacherDashboard.js';
import { StudentDashboard } from './views/StudentDashboard.js';
import { CRDashboard } from './views/CRDashboard.js';
import { ClassesView, TeachersView, SubjectsView, RoomsView, PeriodsView } from './views/ListViews.js';
import { TimetableView } from './views/TimetableView.js';
import { LiveMonitorView } from './views/LiveMonitorView.js';
import { AnalyticsView } from './views/AnalyticsView.js';


class App {
    constructor() {
        this.appContainer = document.getElementById('app');
        this.state = {
            currentUser: null,
            currentView: 'dashboard',
            isMobile: window.innerWidth < 1200,
            isSidebarOpen: false
        };
        this.init();
        
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        const wasMobile = this.state.isMobile;
        this.state.isMobile = window.innerWidth < 1200;
        
        if (this.state.isMobile !== wasMobile) {
            this.handleLayoutChange();
        }
    }

    handleLayoutChange() {
        if (this.state.isMobile && this.state.isSidebarOpen) {
            this.closeMobileSidebar();
        }
    }

    init() {
        const savedUser = localStorage.getItem('timetable_user');
        if (savedUser) {
            try {
                this.state.currentUser = JSON.parse(savedUser);
                this.renderMainLayout();
            } catch {
                this.renderLogin();
            }
        } else {
            this.renderLogin();
        }
    }

    renderLogin() {
        this.appContainer.innerHTML = '';
        const loginView = new Login((user) => this.handleLogin(user));
        this.appContainer.innerHTML = loginView.render();
        loginView.postRender();
    }

    handleLogin(user) {
        this.state.currentUser = user;
        localStorage.setItem('timetable_user', JSON.stringify(user));
        this.renderMainLayout();
    }

    handleLogout() {
        this.state.currentUser = null;
        localStorage.removeItem('timetable_user');
        this.renderLogin();
    }

    async renderMainLayout() {
        this.appContainer.innerHTML = `
            <div class="main-wrapper">
                <div id="sidebar-container"></div>
                <div id="mobile-overlay" class="mobile-overlay"></div>
                <div id="content-wrapper" class="content-wrapper ${!this.state.isMobile ? 'expanded' : ''}">
                    <div id="header-container"></div>
                    <main id="main-content" class="main-content"></main>
                </div>
            </div>
        `;

        // Render Sidebar
        this.sidebar = new Sidebar(
            this.state.currentUser.role,
            (viewId) => this.navigateTo(viewId),
            () => this.handleLogout(),
            this.state.isMobile
        );
        document.getElementById('sidebar-container').innerHTML = this.sidebar.render();
        this.sidebar.postRender();

        // Render Header
        this.navigation = new Navigation(
            this.state.currentUser,
            () => this.toggleSidebar()
        );
        document.getElementById('header-container').innerHTML = this.navigation.render();
        this.navigation.postRender();

        // Mobile overlay click
        const overlay = document.getElementById('mobile-overlay');
        overlay.addEventListener('click', () => this.closeMobileSidebar());

        // Initial View
        this.navigateTo('dashboard');
    }

    toggleSidebar() {
        if (this.state.isMobile) {
            if (this.state.isSidebarOpen) {
                this.closeMobileSidebar();
            } else {
                this.openMobileSidebar();
            }
        } else {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('collapsed');
        }
    }

    openMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
        document.body.classList.add('no-scroll');
        this.state.isSidebarOpen = true;
    }

    closeMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        this.state.isSidebarOpen = false;
    }

    async navigateTo(viewId) {
        this.state.currentView = viewId;
        const contentEl = document.getElementById('main-content');
        
        // Close mobile sidebar
        if (this.state.isMobile && this.state.isSidebarOpen) {
            this.closeMobileSidebar();
        }

        // Update title
        if (this.navigation) {
            const titles = {
                'dashboard': 'Dashboard',
                'classes': 'Classes & Sections',
                'teachers': 'Teachers',
                'subjects': 'Subjects',
                'rooms': 'Rooms & Labs',
                'periods': 'Bell Schedule',
                'timetable': 'Timetable Engine',
                'live-monitor': 'Live Lecture Monitor',
                'analytics': 'Reports & Analytics',
                'substitutions': 'Substitutions',
                'exams': 'Exams'
            };
            this.navigation.updateTitle(titles[viewId] || viewId.charAt(0).toUpperCase() + viewId.slice(1));
        }

        // Show loading
        contentEl.innerHTML = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card fade-in">
                            <div class="card-body text-center py-5">
                                <div class="spinner-border text-primary mb-3" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <p class="text-muted mb-0">Loading ${viewId}...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Render view
        setTimeout(() => {
            let viewComponent;
            const role = this.state.currentUser.role;

            if (viewId === 'dashboard') {
                switch (role) {
                    case 'admin': viewComponent = new AdminDashboard(); break;
                    case 'teacher': viewComponent = new TeacherDashboard(); break;
                    case 'cr': viewComponent = new CRDashboard(); break;
                    case 'student': viewComponent = new StudentDashboard(); break;
                    default: viewComponent = new AdminDashboard();
                }
            }
            else if (role === 'admin') {
                switch (viewId) {
                    case 'classes': viewComponent = new ClassesView(); break;
                    case 'teachers': viewComponent = new TeachersView(); break;
                    case 'subjects': viewComponent = new SubjectsView(); break;
                    case 'rooms': viewComponent = new RoomsView(); break;
                    case 'periods': viewComponent = new PeriodsView(); break;
                    case 'timetable': viewComponent = new TimetableView(); break;
                    case 'live-monitor': viewComponent = new LiveMonitorView(); break;
                    case 'analytics': viewComponent = new AnalyticsView(); break;
                }
            }

            if (viewComponent) {
                contentEl.innerHTML = viewComponent.render();
                if (viewComponent.postRender) {
                    setTimeout(() => viewComponent.postRender(), 50);
                }
            } else {
                contentEl.innerHTML = `
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body text-center py-5">
                                        <i data-lucide="alert-circle" class="text-warning mb-3" style="width: 48px; height: 48px;"></i>
                                        <h3 class="h5 text-dark mb-2">Module Not Available</h3>
                                        <p class="text-muted mb-0">The "${viewId}" module is not available for your role.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            lucide.createIcons();
            contentEl.scrollTo(0, 0);
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
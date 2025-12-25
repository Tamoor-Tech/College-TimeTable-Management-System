import { getUserInitials } from '../utils/helpers.js';

export class Navigation {
    constructor(user, onSidebarToggle) {
        this.user = user;
        this.onSidebarToggle = onSidebarToggle;
    }

    render() {
        return `
            <header class="top-header">
                <div class="d-flex align-items-center gap-3">
                    <button id="sidebar-toggle" class="btn btn-light border-0 p-2">
                        <i data-lucide="menu" class="text-secondary"></i>
                    </button>
                    <h2 id="page-title" class="h5 mb-0 text-dark font-weight-bold">Dashboard</h2>
                </div>

                <div class="d-flex align-items-center gap-4">
                    <button class="btn btn-light border-0 p-2 position-relative">
                        <i data-lucide="bell" class="text-secondary"></i>
                        <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                            <span class="visually-hidden">New alerts</span>
                        </span>
                    </button>

                    <div class="d-flex align-items-center gap-3 border-start ps-3">
                        <div class="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 36px; height: 36px;">
                            ${getUserInitials(this.user.name)}
                        </div>
                        <div class="d-none d-md-block">
                            <p class="mb-0 text-dark fw-medium small">${this.user.name}</p>
                            <p class="mb-0 text-secondary small" style="font-size: 0.75rem;">${this.user.roleLabel}</p>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    postRender() {
        document.getElementById('sidebar-toggle').addEventListener('click', () => {
            if (this.onSidebarToggle) this.onSidebarToggle();
        });
        lucide.createIcons();
    }

    updateTitle(title) {
        const el = document.getElementById('page-title');
        if (el) el.textContent = title;
    }
}

import { classes, teachers, subjects, rooms, periods } from '../utils/data.js';

class BaseListView {
    constructor(title, description, icon) {
        this.title = title;
        this.description = description;
        this.icon = icon;
    }

    renderShell(content, extraHeaderContent = '') {
        return `
            <div class="container-fluid p-0">
                <!-- Page Header -->
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                    <div>
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <div class="bg-primary-subtle text-primary rounded-circle p-2">
                                <i data-lucide="${this.icon}" style="width: 20px; height: 20px;"></i>
                            </div>
                            <h2 class="h4 fw-bold text-dark mb-0">${this.title}</h2>
                        </div>
                        <p class="text-secondary mb-0">${this.description}</p>
                    </div>
                    
                    <div class="d-flex gap-2">
                        ${extraHeaderContent}
                        <button class="btn btn-primary d-flex align-items-center gap-2">
                            <i data-lucide="plus" style="width: 18px; height: 18px;"></i>
                            <span>Add New</span>
                        </button>
                    </div>
                </div>
                
                <!-- Content Card -->
                <div class="card border-0 shadow-sm">
                    <div class="card-body p-0">
                        <div class="table-container">
                            ${content}
                        </div>
                    </div>
                </div>
                
                <!-- Pagination -->
                <div class="d-flex justify-content-between align-items-center mt-4">
                    <div class="text-muted small">
                        Showing 1 to 10 of ${this.getTotalItems()} entries
                    </div>
                    <nav aria-label="Page navigation">
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        `;
    }

    getTotalItems() {
        // Override in child classes
        return 0;
    }

    postRender() {
        lucide.createIcons();
        
        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

export class ClassesView extends BaseListView {
    constructor() {
        super('Classes & Sections', 'Manage all academic classes and student groups', 'graduation-cap');
    }

    getTotalItems() {
        return classes.length;
    }

    render() {
        const tableLines = classes.map(c => `
            <tr>
                <td class="ps-4">
                    <div class="d-flex align-items-center gap-3">
                        <div class="bg-primary-subtle text-primary rounded-circle p-2">
                            <i data-lucide="users" style="width: 16px; height: 16px;"></i>
                        </div>
                        <div>
                            <div class="fw-bold text-dark">${c.name}</div>
                            <div class="small text-muted">ID: ${c.id}</div>
                        </div>
                    </div>
                </td>
                <td><span class="badge bg-secondary-subtle text-secondary">${c.department}</span></td>
                <td><span class="badge bg-info-subtle text-info">Year ${c.year}</span></td>
                <td>${c.section}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <i data-lucide="users" style="width: 16px; height: 16px;" class="text-muted"></i>
                        <span>${c.strength} students</span>
                    </div>
                </td>
                <td class="pe-4">
                    <div class="d-flex gap-1">
                        <button class="btn btn-sm btn-light border" data-bs-toggle="tooltip" title="Edit">
                            <i data-lucide="edit-2" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="btn btn-sm btn-light border text-danger" data-bs-toggle="tooltip" title="Delete">
                            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="btn btn-sm btn-light border" data-bs-toggle="tooltip" title="View Schedule">
                            <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        const content = `
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="ps-4">Class Name</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Section</th>
                        <th>Strength</th>
                        <th class="pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>${tableLines}</tbody>
            </table>
        `;
        
        const filterContent = `
            <div class="d-flex gap-2">
                <select class="form-select form-select-sm" style="width: 150px;">
                    <option>All Departments</option>
                    <option>CIT</option>
                    <option>Engineering</option>
                </select>
                <select class="form-select form-select-sm" style="width: 120px;">
                    <option>All Years</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                </select>
            </div>
        `;
        
        return this.renderShell(content, filterContent);
    }
}

export class TeachersView extends BaseListView {
    constructor() {
        super('Teachers', 'Faculty directory and management system', 'users');
    }

    getTotalItems() {
        return teachers.length;
    }

    render() {
        const tableLines = teachers.map(t => `
            <tr>
                <td class="ps-4">
                    <div class="d-flex align-items-center gap-3">
                        <div class="position-relative">
                            <div class="rounded-circle bg-primary-subtle text-primary fw-bold d-flex align-items-center justify-content-center" 
                                 style="width: 40px; height: 40px;">
                                ${t.name.charAt(0)}
                            </div>
                            <span class="position-absolute bottom-0 end-0 translate-middle p-1 bg-success border border-2 border-white rounded-circle">
                                <span class="visually-hidden">Online</span>
                            </span>
                        </div>
                        <div>
                            <div class="fw-bold text-dark">${t.name}</div>
                            <div class="small text-muted">${t.email}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge bg-info-subtle text-info">${t.subject}</span>
                </td>
                <td class="font-monospace small">${t.id}</td>
                <td>
                    <div class="progress" style="width: 100px; height: 6px;">
                        <div class="progress-bar bg-success" style="width: ${Math.min(100, (Math.random() * 80) + 20)}%"></div>
                    </div>
                </td>
                <td class="pe-4">
                    <div class="d-flex gap-1">
                        <button class="btn btn-sm btn-light border" data-bs-toggle="tooltip" title="View Schedule">
                            <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="btn btn-sm btn-light border" data-bs-toggle="tooltip" title="Contact">
                            <i data-lucide="mail" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="btn btn-sm btn-light border text-danger" data-bs-toggle="tooltip" title="Delete">
                            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        const content = `
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="ps-4">Teacher</th>
                        <th>Specialization</th>
                        <th>Teacher ID</th>
                        <th>Workload</th>
                        <th class="pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>${tableLines}</tbody>
            </table>
        `;
        
        const filterContent = `
            <div class="d-flex gap-2">
                <div class="input-group input-group-sm" style="width: 250px;">
                    <input type="text" class="form-control" placeholder="Search teachers...">
                    <button class="btn btn-outline-secondary" type="button">
                        <i data-lucide="search" style="width: 16px; height: 16px;"></i>
                    </button>
                </div>
            </div>
        `;
        
        return this.renderShell(content, filterContent);
    }
}

export class SubjectsView extends BaseListView {
    constructor() {
        super('Subjects', 'Course catalog and subject codes management', 'book-open');
    }

    getTotalItems() {
        return subjects.length;
    }

    render() {
        const tableLines = subjects.map(s => `
            <tr>
                <td class="ps-4">
                    <span class="badge bg-light text-dark border font-monospace">${s.code}</span>
                </td>
                <td class="fw-bold text-dark">${s.name}</td>
                <td>
                    <span class="badge bg-primary-subtle text-primary">
                        ${s.code.includes('CIT') ? 'Computer Science' : 
                          s.code.includes('Eng') ? 'English' : 
                          s.code.includes('Math') ? 'Mathematics' : 
                          s.code.includes('CH') ? 'Chemistry' : 
                          s.code.includes('Phy') ? 'Physics' : 'General'}
                    </span>
                </td>
                <td>
                    <div class="d-flex align-items-center gap-1">
                        <i data-lucide="clock" style="width: 14px; height: 14px;" class="text-muted"></i>
                        <span class="small">${Math.floor(Math.random() * 4) + 2} hrs/week</span>
                    </div>
                </td>
                <td class="pe-4">
                    <button class="btn btn-sm btn-light border" data-bs-toggle="tooltip" title="Edit Subject">
                        <i data-lucide="edit-2" style="width: 16px; height: 16px;"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        const content = `
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="ps-4">Subject Code</th>
                        <th>Subject Name</th>
                        <th>Department</th>
                        <th>Weekly Hours</th>
                        <th class="pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>${tableLines}</tbody>
            </table>
        `;
        
        return this.renderShell(content);
    }
}

export class RoomsView extends BaseListView {
    constructor() {
        super('Rooms & Labs', 'Manage physical spaces and laboratory allocations', 'door-open');
    }

    getTotalItems() {
        return rooms.length;
    }

    render() {
        const tableLines = rooms.map(r => {
            const isLab = r.name.toLowerCase().includes('lab');
            const isAvailable = Math.random() > 0.3;
            
            return `
                <tr>
                    <td class="ps-4">
                        <div class="d-flex align-items-center gap-3">
                            <div class="${isLab ? 'bg-indigo-subtle text-indigo' : 'bg-primary-subtle text-primary'} rounded-circle p-2">
                                <i data-lucide="${isLab ? 'flask-conical' : 'square'}" style="width: 16px; height: 16px;"></i>
                            </div>
                            <div>
                                <div class="fw-bold text-dark">${r.name}</div>
                                <div class="small text-muted">ID: ${r.id}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge ${isLab ? 'bg-indigo-subtle text-indigo' : 'bg-secondary-subtle text-secondary'}">
                            ${isLab ? 'Laboratory' : 'Classroom'}
                        </span>
                    </td>
                    <td>
                        <span class="badge ${isAvailable ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}">
                            ${isAvailable ? 'Available' : 'Occupied'}
                        </span>
                    </td>
                    <td>${Math.floor(Math.random() * 50) + 20}</td>
                    <td class="pe-4">
                        <button class="btn btn-sm btn-light border" data-bs-toggle="tooltip" title="View Schedule">
                            <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        const content = `
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="ps-4">Room Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Capacity</th>
                        <th class="pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>${tableLines}</tbody>
            </table>
        `;
        
        const filterContent = `
            <div class="d-flex gap-2">
                <select class="form-select form-select-sm" style="width: 150px;">
                    <option>All Types</option>
                    <option>Classroom</option>
                    <option>Laboratory</option>
                </select>
                <select class="form-select form-select-sm" style="width: 150px;">
                    <option>All Status</option>
                    <option>Available</option>
                    <option>Occupied</option>
                </select>
            </div>
        `;
        
        return this.renderShell(content, filterContent);
    }
}

export class PeriodsView extends BaseListView {
    constructor() {
        super('Bell Schedule', 'Configure class timings and break periods', 'clock');
    }

    getTotalItems() {
        return periods.length;
    }

    render() {
        const tableLines = periods.map(p => {
            const isBreak = p.isBreak;
            const duration = this.calculateDuration(p.startTime, p.endTime);
            
            return `
                <tr class="${isBreak ? 'bg-warning-subtle' : ''}">
                    <td class="ps-4">
                        <div class="d-flex align-items-center gap-3">
                            <div class="${isBreak ? 'bg-warning-subtle text-warning' : 'bg-primary-subtle text-primary'} rounded-circle p-2">
                                <i data-lucide="${isBreak ? 'coffee' : 'clock'}" style="width: 16px; height: 16px;"></i>
                            </div>
                            <div>
                                <div class="fw-bold text-dark">${p.name}</div>
                                <div class="small text-muted">${duration} minutes</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge bg-light text-dark border font-monospace">${p.startTime}</span>
                    </td>
                    <td>
                        <span class="badge bg-light text-dark border font-monospace">${p.endTime}</span>
                    </td>
                    <td>
                        ${isBreak ? 
                            '<span class="badge bg-warning-subtle text-warning">Break</span>' : 
                            '<span class="badge bg-success-subtle text-success">Academic</span>'}
                    </td>
                    <td class="pe-4">
                        <button class="btn btn-sm btn-light border" data-bs-toggle="tooltip" title="Edit Timing">
                            <i data-lucide="edit-2" style="width: 16px; height: 16px;"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        const content = `
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="ps-4">Period</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Type</th>
                        <th class="pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>${tableLines}</tbody>
            </table>
        `;
        
        return this.renderShell(content);
    }

    calculateDuration(start, end) {
        const startTime = new Date(`2000-01-01T${start}`);
        const endTime = new Date(`2000-01-01T${end}`);
        return Math.round((endTime - startTime) / (1000 * 60));
    }
}
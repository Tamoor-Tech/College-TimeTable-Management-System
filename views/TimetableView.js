import { weeklyTimetable, classes, periods, subjects, teachers, rooms } from '../utils/data.js';

export class TimetableView {
    constructor() {
        this.selectedClassId = 'C001';
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }

    render() {
        return `
            <div class="container-fluid p-0">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                    <div>
                        <h2 class="h4 fw-bold text-dark mb-1">Master Timetable</h2>
                        <p class="text-secondary mb-0">View and modify weekly schedules</p>
                    </div>
                    
                    <div class="d-flex gap-2">
                        <select class="form-select shadow-sm" style="max-width: 200px;" id="tt-class-selector">
                            ${classes.map(c => `<option value="${c.id}" ${c.id === this.selectedClassId ? 'selected' : ''}>${c.name}</option>`).join('')}
                        </select>
                        <button class="btn btn-primary d-flex align-items-center gap-2 shadow-sm flex-shrink-0">
                            <i data-lucide="save" style="width: 18px;"></i> Save Changes
                        </button>
                    </div>
                </div>

                <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div class="table-responsive">
                        <table class="table table-bordered mb-0 text-center align-middle">
                            <thead class="bg-light">
                                <tr>
                                    <th class="py-3 text-secondary small fw-bold text-uppercase border-bottom-0" style="width: 100px;">Day / Time</th>
                                    ${periods.map(p => `
                                        <th class="py-3 text-secondary small fw-bold text-uppercase ${p.isBreak ? 'bg-warning-subtle' : ''}" style="min-width: 140px;">
                                            <div class="mb-1">${p.name}</div>
                                            <div class="badge bg-white border text-secondary font-monospace fw-normal">${p.startTime}</div>
                                        </th>
                                    `).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${this.days.map(day => this.renderDayRow(day)).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    renderDayRow(day) {
        return `
            <tr>
                <td class="bg-light fw-bold text-dark text-start ps-3 border-end">
                    ${day}
                </td>
                ${periods.map(period => this.renderCell(day, period)).join('')}
            </tr>
        `;
    }

    renderCell(day, period) {
        if (period.isBreak) {
            return `<td class="bg-warning-subtle p-1"><div class="h-100 w-100 d-flex align-items-center justify-content-center text-warning-emphasis small fw-bold opacity-50">BREAK</div></td>`;
        }

        // Find lecture
        const lecture = weeklyTimetable.find(l =>
            l.classId === this.selectedClassId &&
            l.day === day &&
            l.periodId === period.id
        );

        if (!lecture) {
            return `
                <td class="p-1">
                    <button class="btn btn-light border-0 w-100 h-100 py-4 text-light-emphasis hover-bg-light" style="min-height: 100px;">
                        <i data-lucide="plus" class="mb-1 mx-auto d-block opacity-25" style="width: 20px;"></i>
                        <span class="small opacity-50">Add</span>
                    </button>
                </td>
            `;
        }

        const subject = subjects.find(s => s.id === lecture.subjectId);
        const teacher = teachers.find(t => t.id === lecture.teacherId);
        const room = rooms.find(r => r.id === lecture.roomId);

        return `
            <td class="p-2 position-relative group">
                <div class="bg-white border rounded-3 p-2 text-start h-100 shadow-sm-hover transition-all">
                    <div class="fw-bold text-primary mb-1 text-truncate" title="${subject.name}">${subject.name}</div>
                    <div class="d-flex align-items-center gap-1 text-secondary small mb-1" title="${teacher.name}">
                        <i data-lucide="user" style="width: 12px;"></i> <span class="text-truncate">${teacher.name}</span>
                    </div>
                    <div class="d-flex align-items-center gap-1 text-secondary small" title="${room.name}">
                        <i data-lucide="map-pin" style="width: 12px;"></i> <span class="text-truncate">${room.name}</span>
                    </div>
                </div>
            </td>
        `;
    }

    postRender() {
        lucide.createIcons();
        document.getElementById('tt-class-selector').addEventListener('change', (e) => {
            this.selectedClassId = e.target.value;
            // Hacky re-render
            const contentEl = document.getElementById('main-content');
            contentEl.innerHTML = this.render();
            this.postRender();
        });
    }
}

import { weeklyTimetable, subjects, rooms, classes, periods, teachers } from '../utils/data.js';

export class CRDashboard {
    constructor() {
        this.selectedClassId = 'C001';
    }

    render() {
        const myLectures = weeklyTimetable.filter(l => l.classId === this.selectedClassId && l.day === 'Monday');
        const ongoing = myLectures.filter(l => l.status === 'ongoing');
        const classInfo = classes.find(c => c.id === this.selectedClassId);

        return `
            <div class="container-fluid p-0">
                 <!-- Class Tabs -->
                 <div class="bg-white rounded-pill p-1 shadow-sm d-inline-flex mb-4 border">
                    ${classes.map(c => `
                        <button class="btn btn-sm rounded-pill px-3 py-2 fw-medium ${c.id === this.selectedClassId ? 'btn-dark' : 'btn-white text-secondary'}" data-class="${c.id}">
                            ${c.name}
                        </button>
                    `).join('')}
                 </div>

                 <!-- Welcome Card -->
                 <div class="card border-0 shadow-sm rounded-4 mb-4 bg-black text-white overflow-hidden">
                    <div class="card-body p-4 position-relative">
                        <div class="d-flex justify-content-between align-items-start z-1 position-relative">
                            <div>
                                <span class="badge bg-white bg-opacity-25 mb-2">Class Representative</span>
                                <h2 class="h4 fw-bold mb-1">Overview: ${classInfo.name}</h2>
                            </div>
                        </div>
                         <div class="row g-3 mt-3 pt-3 border-top border-white-50">
                             <div class="col-6">
                                <div class="small text-white-50">Total Classes</div>
                                <div class="fw-bold fs-4">${myLectures.length}</div>
                            </div>
                            <div class="col-6">
                                <div class="small text-white-50">Pending Actions</div>
                                <div class="fw-bold fs-4 text-warning">${myLectures.length - ongoing.length}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Feed -->
                <div class="d-flex flex-column gap-3">
                    <h3 class="h6 fw-bold text-secondary mb-0 px-1">Lecture Confirmations</h3>
                    ${myLectures.length > 0
                ? myLectures.map(l => this.createFeedItem(l)).join('')
                : '<div class="text-center p-5 text-muted">No lectures found.</div>'
            }
                </div>
            </div>
        `;
    }

    createFeedItem(lecture) {
        const subject = subjects.find(s => s.id === lecture.subjectId);
        const teacher = teachers.find(t => t.id === lecture.teacherId);
        const room = rooms.find(r => r.id === lecture.roomId);
        const period = periods.find(p => p.id === lecture.periodId);
        const isOngoing = lecture.status === 'ongoing';

        return `
            <div class="card border-0 shadow-sm rounded-4 ${isOngoing ? 'border-start border-4 border-success' : ''}">
                <div class="card-body p-3">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="d-flex align-items-center gap-2 text-dark fw-bold small">
                            <i data-lucide="clock" style="width: 14px;"></i>
                            ${period.startTime} - ${period.endTime}
                        </div>
                         <span class="badge ${isOngoing ? 'bg-success' : 'bg-secondary'} rounded-pill px-3">
                            ${isOngoing ? 'Ongoing' : 'Scheduled'}
                        </span>
                    </div>

                    <h5 class="fw-bold text-dark mb-1">${subject.name}</h5>
                    <div class="d-flex align-items-center gap-2 text-secondary small mb-3">
                        <i data-lucide="user" style="width: 14px;"></i> ${teacher.name}
                        <span class="mx-1">•</span>
                        <i data-lucide="map-pin" style="width: 14px;"></i> ${room.name}
                    </div>

                    ${!isOngoing ? `
                        <div class="p-3 bg-light rounded-3">
                            <p class="small text-dark fw-medium mb-2">Did this lecture take place?</p>
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm btn-success flex-grow-1 rounded-3 fw-medium">
                                    <i data-lucide="check" style="width: 14px;"></i> Conducted
                                </button>
                                <button class="btn btn-sm btn-danger flex-grow-1 rounded-3 fw-medium">
                                    <i data-lucide="x" style="width: 14px;"></i> Not Conducted
                                </button>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    postRender() {
        lucide.createIcons();

        // Tab switching logic (simple re-render for now)
        const tabs = document.querySelectorAll('[data-class]');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.selectedClassId = tab.dataset.class;
                // Ideally trigger a re-render of the component or pass a parent re-render callback.
                // For now, simple hack:
                const container = document.getElementById('main-content');
                container.innerHTML = this.render();
                this.postRender();
            });
        });
    }
}

import { weeklyTimetable, subjects, rooms, classes, periods, teachers } from '../utils/data.js';

export class StudentDashboard {
    constructor() {
        this.classId = 'C001'; // Mock
        this.myLectures = weeklyTimetable.filter(l => l.classId === this.classId && l.day === 'Monday');
    }

    render() {
        const classInfo = classes.find(c => c.id === this.classId);

        return `
             <div class="container-fluid p-0">
                <!-- Welcome Card -->
                <div class="card border-0 shadow-sm rounded-4 mb-4 bg-primary text-white overflow-hidden">
                    <div class="card-body p-4 position-relative">
                        <div class="d-flex justify-content-between align-items-center z-1 position-relative">
                            <div>
                                <h2 class="h4 fw-bold mb-1">Your Timetable</h2>
                                <p class="text-white-50 mb-0">${classInfo.name}</p>
                            </div>
                            <div class="bg-white bg-opacity-25 rounded-circle p-3">
                                <i data-lucide="calendar" class="text-white" style="width: 24px; height: 24px;"></i>
                            </div>
                        </div>
                         <div class="row g-2 mt-4 pt-3 border-top border-white-50">
                            <div class="col-6">
                                <div class="small text-white-50">Today's Classes</div>
                                <div class="fw-bold fs-5">${this.myLectures.length}</div>
                            </div>
                            <div class="col-6">
                                <div class="small text-white-50">Total Subjects</div>
                                <div class="fw-bold fs-5">7</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Day Selector -->
                <div class="card border-0 shadow-sm rounded-4 mb-4">
                     <div class="card-body p-3">
                        <div class="d-flex gap-2 overflow-auto pb-2" style="scrollbar-width: none;">
                            ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => `
                                <button class="btn ${i === 0 ? 'btn-primary' : 'btn-light text-secondary'} rounded-3 px-4 flex-shrink-0 fw-medium">
                                    ${day}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Timetable -->
                <div class="d-flex flex-column gap-3">
                    ${periods.map(period => this.renderPeriodSlot(period)).join('')}
                </div>
            </div>
        `;
    }

    renderPeriodSlot(period) {
        if (period.isBreak) {
            return `
                <div class="card border-warning border-opacity-25 bg-warning-subtle rounded-4 p-3 border-start border-4">
                    <div class="d-flex align-items-center gap-3">
                        <div class="rounded-circle bg-warning text-white p-2 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                             <i data-lucide="coffee" style="width: 20px;"></i>
                        </div>
                         <div>
                            <h5 class="h6 fw-bold text-dark mb-0">${period.name}</h5>
                            <span class="small text-secondary fw-medium">${period.startTime} - ${period.endTime}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        const lecture = this.myLectures.find(l => l.periodId === period.id);
        if (!lecture) return ''; // Skip empty slots or render free slot

        const subject = subjects.find(s => s.id === lecture.subjectId);
        const teacher = teachers.find(t => t.id === lecture.teacherId);
        const room = rooms.find(r => r.id === lecture.roomId);
        const isLab = room.name.includes('Lab');

        return `
            <div class="card border-0 shadow-sm rounded-4 overflow-hidden border-start border-4 ${isLab ? 'border-indigo' : 'border-primary'}">
                <div class="card-body p-3">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div class="d-flex align-items-center gap-3">
                            <div class="rounded-3 ${isLab ? 'bg-indigo-subtle text-indigo' : 'bg-primary-subtle text-primary'} p-2 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                                <i data-lucide="${isLab ? 'flask-conical' : 'book-open'}" style="width: 24px;"></i>
                            </div>
                            <div>
                                <h5 class="h6 fw-bold text-dark mb-1">${subject.name}</h5>
                                <div class="d-flex gap-2">
                                    <span class="badge ${isLab ? 'bg-indigo-subtle text-indigo' : 'bg-primary-subtle text-primary'} rounded-pill fw-medium border">${subject.code}</span>
                                    ${isLab ? '<span class="badge bg-light text-secondary border rounded-pill">Practical</span>' : ''}
                                </div>
                            </div>
                        </div>
                        <div class="text-end">
                             <div class="d-flex align-items-center gap-1 text-dark fw-bold small">
                                <i data-lucide="clock" style="width: 14px;"></i>
                                ${period.startTime} - ${period.endTime}
                             </div>
                             <div class="small text-secondary mt-1">${period.name}</div>
                        </div>
                    </div>
                    
                    <div class="row g-2 mt-2 pt-2 border-top border-light">
                        <div class="col-6">
                            <div class="d-flex align-items-center gap-2 text-secondary small">
                                <i data-lucide="user" style="width: 14px;"></i>
                                <span class="fw-medium">${teacher.name}</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex align-items-center gap-2 text-secondary small">
                                <i data-lucide="map-pin" style="width: 14px;"></i>
                                <span class="fw-medium">${room.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    postRender() {
        lucide.createIcons();
    }
}

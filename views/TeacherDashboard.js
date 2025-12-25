import { weeklyTimetable, subjects, rooms, classes, periods } from '../utils/data.js';

export class TeacherDashboard {
    constructor() {
        this.currentTeacherId = 'T004'; // Mock logged in teacher
        this.myLectures = weeklyTimetable.filter(l => l.teacherId === this.currentTeacherId);
    }

    render() {
        // Sort lectures by period start time
        this.myLectures.sort((a, b) => a.periodId.localeCompare(b.periodId));

        // Calculate load (total lectures per subject)
        const loadCounts = {};
        this.myLectures.forEach(l => {
            if (!loadCounts[l.subjectId]) loadCounts[l.subjectId] = 0;
            loadCounts[l.subjectId]++;
        });

        return `
            <div class="container-fluid p-0">
                <div class="row g-4 mb-4">
                    <div class="col-md-8">
                         <!-- Welcome Header -->
                        <div class="card border-0 shadow-sm rounded-4 mb-4 bg-teal text-white" style="background: linear-gradient(135deg, #0d9488 0%, #115e59 100%);">
                            <div class="card-body p-4 position-relative">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h2 class="h4 fw-bold mb-1">My Schedule</h2>
                                        <p class="text-white-50 mb-0">Manage your daily lectures and timings</p>
                                    </div>
                                     <div class="bg-white bg-opacity-20 rounded-circle p-3">
                                        <i data-lucide="calendar-check" class="text-white" style="width: 24px; height: 24px;"></i>
                                    </div>
                                </div>
                                <div class="mt-4 pt-3 border-top border-white-50">
                                     <button class="btn btn-danger-subtle text-danger border-0 fw-bold rounded-pill px-4 d-flex align-items-center gap-2" onclick="alert('Absence reported. Substitutes will be notified.')">
                                        <i data-lucide="user-x" style="width: 18px;"></i>
                                        I am Absent Today
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Schedule List -->
                        <h3 class="h6 fw-bold text-secondary mb-3 px-1">Today's Lectures</h3>
                        <div class="vstack gap-3">
                                ${this.myLectures.length === 0 ? '<p class="text-center text-muted p-5">No lectures scheduled for today.</p>' :
                this.myLectures.map(l => this.createLectureCard(l)).join('')}
                        </div>
                    </div>

                    <div class="col-md-4">
                        <!-- Departmental Load -->
                        <div class="card border-0 shadow-sm rounded-4 h-100">
                             <div class="card-header bg-white border-bottom p-4">
                                <h3 class="h6 fw-bold mb-0">Departmental Load</h3>
                                 <p class="text-secondary small mb-0">Your Total Assigned Lectures</p>
                             </div>
                             <div class="card-body p-0">
                                <div class="list-group list-group-flush">
                                    ${Object.entries(loadCounts).map(([subId, count]) => {
                    const subject = subjects.find(s => s.id === subId);
                    return `
                                            <div class="list-group-item p-3 border-0 d-flex align-items-center justify-content-between">
                                                <div class="d-flex align-items-center gap-3">
                                                    <div class="rounded-circle bg-light text-dark fw-bold d-flex align-items-center justify-content-center border" style="width: 40px; height: 40px;">
                                                        ${subject.code}
                                                    </div>
                                                    <div>
                                                        <h6 class="mb-0 fw-bold text-dark small">${subject.name}</h6>
                                                        <span class="text-secondary" style='font-size: 11px;'>${count} Sessions</span>
                                                    </div>
                                                </div>
                                                <div class="progress" style="width: 60px; height: 6px;">
                                                    <div class="progress-bar bg-primary" style="width: ${Math.min(100, (count / 5) * 100)}%"></div>
                                                </div>
                                            </div>
                                        `;
                }).join('')}
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createLectureCard(lecture) {
        const subject = subjects.find(s => s.id === lecture.subjectId);
        const room = rooms.find(r => r.id === lecture.roomId);
        const period = periods.find(p => p.id === lecture.periodId);
        const clss = classes.find(c => c.id === lecture.classId);

        // Determine status style without buttons
        const isOngoing = lecture.status === 'ongoing';
        const statusColor = isOngoing ? 'success' : 'primary';
        const borderClass = isOngoing ? 'border-success border-2' : 'border-0';

        return `
            <div class="card shadow-sm rounded-4 overflow-hidden ${borderClass}">
                <div class="card-body p-0">
                    <div class="d-flex">
                        <!-- Left Time Indicator -->
                        <div class="bg-${statusColor} bg-opacity-10 p-3 d-flex flex-column align-items-center justify-content-center text-${statusColor}" style="min-width: 100px;">
                            <span class="fw-bold h5 mb-0">${period.startTime}</span>
                            <span class="small opacity-75">to ${period.endTime}</span>
                        </div>
                        
                        <!-- Content -->
                        <div class="p-3 flex-grow-1 d-flex flex-column justify-content-center">
                            <h4 class="h6 fw-bold text-dark mb-1">${subject.name}</h4>
                            <div class="d-flex align-items-center gap-2 text-secondary small">
                                <span class="badge bg-light text-dark border">${clss.name}</span>
                                <span class="d-flex align-items-center gap-1"><i data-lucide="map-pin" style="width: 12px;"></i> ${room.name}</span>
                            </div>
                        </div>
                         <div class="pe-3 d-flex align-items-center">
                              ${isOngoing ? '<span class="badge bg-success-subtle text-success rounded-pill px-2 py-1">Live</span>' : ''}
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

import { weeklyTimetable, classes, rooms, subjects, teachers, periods } from '../utils/data.js';

export class LiveMonitorView {
    constructor() {
        this.stats = {
            active: 12,
            empty: 5,
            attendance: '94%'
        };
    }

    render() {
        // Mock current lectures based on "Live" context (first 5 of timetable for demo)
        const liveLectures = weeklyTimetable.slice(0, 5);

        return `
            <div class="container-fluid p-0">
                <div class="d-flex justify-content-between align-items-center mb-4">
                     <div>
                        <h2 class="h4 fw-bold text-dark mb-1">Live Lecture Monitor</h2>
                        <p class="text-secondary mb-0">Real-time campus activity tracking</p>
                    </div>
                    <div class="d-flex gap-2">
                        <span class="badge bg-success-subtle text-success d-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-success-subtle">
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            System Online
                        </span>
                    </div>
                </div>

                <!-- Top Stats -->
                <div class="row g-4 mb-4">
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm rounded-4 bg-primary text-white">
                            <div class="card-body p-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="mb-1 text-primary-light small fw-bold text-uppercase opacity-75">Active Sessions</p>
                                    <h3 class="display-6 fw-bold mb-0">${this.stats.active}</h3>
                                </div>
                                <i data-lucide="activity" style="width: 32px; height: 32px;" class="opacity-50"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm rounded-4 bg-white">
                            <div class="card-body p-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="mb-1 text-secondary small fw-bold text-uppercase">Empty Rooms</p>
                                    <h3 class="display-6 fw-bold mb-0 text-dark">${this.stats.empty}</h3>
                                </div>
                                <div class="bg-light rounded-circle p-3">
                                    <i data-lucide="door-open" style="width: 24px; height: 24px;" class="text-secondary"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                         <div class="card border-0 shadow-sm rounded-4 bg-white">
                            <div class="card-body p-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="mb-1 text-secondary small fw-bold text-uppercase">Check-in Rate</p>
                                    <h3 class="display-6 fw-bold mb-0 text-dark">${this.stats.attendance}</h3>
                                </div>
                                <div class="bg-success-subtle rounded-circle p-3">
                                    <i data-lucide="check-circle" style="width: 24px; height: 24px;" class="text-success"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Room Grid -->
                <h3 class="h6 fw-bold text-secondary mb-3 px-1">Room Status</h3>
                <div class="row g-3">
                    ${liveLectures.map(l => this.createRoomCard(l)).join('')}
                    ${this.createEmptyRoomCard('R008', 'Electronics Lab')}
                    ${this.createEmptyRoomCard('R005', 'Besic Lab-ET')}
                </div>
            </div>
        `;
    }

    createRoomCard(lecture) {
        const subject = subjects.find(s => s.id === lecture.subjectId);
        const teacher = teachers.find(t => t.id === lecture.teacherId);
        const room = rooms.find(r => r.id === lecture.roomId);
        const clss = classes.find(c => c.id === lecture.classId);

        return `
            <div class="col-md-4 col-xl-3">
                <div class="card border-0 shadow-sm rounded-4 h-100 border-start border-4 border-success">
                    <div class="card-body p-3">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                             <span class="badge bg-light text-dark border">${room.name}</span>
                             <span class="badge bg-success-subtle text-success rounded-pill px-2">Occupied</span>
                        </div>
                        <h5 class="fw-bold text-dark mb-1 text-truncate">${clss.name}</h5>
                        <p class="text-primary fw-medium mb-2 text-truncate">${subject.name}</p>
                        
                        <div class="d-flex align-items-center gap-2 mt-3 pt-3 border-top text-secondary small">
                             <img src="https://ui-avatars.com/api/?name=${teacher.name}&background=random" class="rounded-circle" width="24" height="24" alt="">
                             <span class="text-truncate">${teacher.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createEmptyRoomCard(roomId, roomName) {
        return `
            <div class="col-md-4 col-xl-3">
                <div class="card border-0 shadow-sm rounded-4 h-100 opacity-75 bg-light border-start border-4 border-secondary">
                    <div class="card-body p-3">
                         <div class="d-flex justify-content-between align-items-center mb-2">
                             <span class="badge bg-white text-dark border">${roomName}</span>
                             <span class="badge bg-secondary-subtle text-secondary rounded-pill px-2">Vacant</span>
                        </div>
                        <div class="py-4 text-center text-secondary">
                             <i data-lucide="coffee" class="opacity-25 mb-2" style="width: 24px; height: 24px;"></i>
                             <p class="small mb-0">No active session</p>
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

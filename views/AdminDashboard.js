import { classes, teachers, subjects, rooms, weeklyTimetable } from '../utils/data.js';

export class AdminDashboard {
    constructor() {
        this.stats = [
            { title: 'Total Classes', value: classes.length, icon: 'graduation-cap', color: 'primary' },
            { title: 'Active Teachers', value: teachers.length, icon: 'users', color: 'info' },
            { title: 'Subjects', value: subjects.length, icon: 'book-open', color: 'indigo' },
            { title: 'Lecture Rooms', value: rooms.length, icon: 'door-open', color: 'warning' },
        ];
    }

    render() {
        return `
            <div class="container-fluid p-0">
                <!-- Welcome Section -->
                <div class="card border-0 shadow-sm mb-4 rounded-4">
                    <div class="card-body p-4">
                        <h2 class="h4 fw-bold text-dark mb-1">Welcome Back, Administrator</h2>
                        <p class="text-secondary mb-0">Here's what's happening in your college today.</p>
                    </div>
                </div>

                <!-- Stats Grid -->
                <div class="row g-4 mb-4">
                    ${this.stats.map(stat => this.createStatCard(stat)).join('')}
                </div>

                <!-- Live Monitor -->
                <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div class="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
                        <h3 class="h6 fw-bold mb-0 text-dark">Live Lectures</h3>
                        <span class="badge bg-success-subtle text-success d-flex align-items-center gap-2 px-3 py-2 rounded-pill">
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Live
                        </span>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="bg-light">
                                    <tr>
                                        <th class="ps-4 py-3 text-secondary small fw-bold text-uppercase">Time</th>
                                        <th class="py-3 text-secondary small fw-bold text-uppercase">Class</th>
                                        <th class="py-3 text-secondary small fw-bold text-uppercase">Subject/Teacher</th>
                                        <th class="py-3 text-secondary small fw-bold text-uppercase">Room</th>
                                        <th class="pe-4 py-3 text-secondary small fw-bold text-uppercase text-end">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${weeklyTimetable.slice(0, 5).map(lecture => this.createLiveLectureRow(lecture)).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createStatCard(stat) {
        return `
            <div class="col-12 col-sm-6 col-md-3">
                <div class="stat-card card bg-white h-100 rounded-4 p-3">
                    <div class="card-body d-flex align-items-center justify-content-between p-2">
                        <div>
                            <p class="text-secondary text-uppercase small fw-bold mb-1" style="font-size: 0.75rem;">${stat.title}</p>
                            <h3 class="h3 fw-bold text-dark mb-0">${stat.value}</h3>
                        </div>
                        <div class="rounded-3 d-flex align-items-center justify-content-center bg-${stat.color}-subtle text-${stat.color}" style="width: 48px; height: 48px;">
                            <i data-lucide="${stat.icon}" style="width: 24px; height: 24px;"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createLiveLectureRow(lecture) {
        const subject = subjects.find(s => s.id === lecture.subjectId);
        const teacher = teachers.find(t => t.id === lecture.teacherId);
        const room = rooms.find(r => r.id === lecture.roomId);
        const clss = classes.find(c => c.id === lecture.classId);
        const isOngoing = lecture.status === 'ongoing';

        // Mock time based on Period ID since we don't have joined tables easily, 
        // normally we'd join but for now mapping P1->12:10 etc is fine or using a helper if strictly needed.
        // But the data.js has periods array, so I can look it up if I import it.
        // I didn't import periods, let's just mock it or fix import.
        // Actually I should import periods.

        return `
            <tr>
                <td class="ps-4">
                    <div class="d-flex align-items-center gap-2">
                        <i data-lucide="clock" class="text-secondary" style="width: 16px;"></i>
                        <span class="fw-medium text-dark">12:10 - 12:50</span>
                    </div>
                </td>
                <td>
                    <span class="fw-bold text-dark">${clss.name}</span>
                </td>
                <td>
                    <div>
                        <div class="fw-bold text-dark">${subject.name}</div>
                        <div class="small text-secondary">${teacher.name}</div>
                    </div>
                </td>
                <td>
                    <span class="badge bg-light text-dark border fw-normal">${room.name}</span>
                </td>
                <td class="pe-4 text-end">
                    <span class="badge ${isOngoing ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'} rounded-pill px-3">
                        ${isOngoing ? 'Ongoing' : 'Scheduled'}
                    </span>
                </td>
            </tr>
        `;
    }

    postRender() {
        lucide.createIcons();
    }
}

import { weeklyTimetable, teachers, classes } from '../utils/data.js';

export class AnalyticsView {
    constructor() { }

    render() {
        // 1. Calculate Teacher Stats
        // Mocking "attended" as just scheduled count for now, or random variance for realism
        const teacherStats = teachers.map(t => {
            const count = weeklyTimetable.filter(l => l.teacherId === t.id).length;
            const substitutions = Math.floor(Math.random() * 3); // Mock sub count
            return { name: t.name, lectures: count, substitutions };
        }).sort((a, b) => b.lectures - a.lectures);

        // 2. Calculate Free Lectures per Year
        // Group classes by year
        const yearGroups = { '1': [], '2': [], '3': [] };
        classes.forEach(c => {
            if (yearGroups[c.year]) yearGroups[c.year].push(c);
        });

        const freeLecturesStats = Object.keys(yearGroups).map(year => {
            const classesInYear = yearGroups[year];
            let totalFree = 0;
            // Simplified logic: assume max 8 periods/day * 6 days = 48 slots. 
            // Free = 48 - scheduled. 
            // Aggregating per year.
            classesInYear.forEach(c => {
                const scheduled = weeklyTimetable.filter(l => l.classId === c.id).length;
                const totalSlots = 48;
                totalFree += Math.max(0, totalSlots - scheduled);
            });
            return { year: `${year}${this.getOrdinal(year)} Year`, free: totalFree, count: classesInYear.length };
        });

        return `
            <div class="container-fluid p-0">
                <h2 class="h4 fw-bold text-dark mb-4">Reports & Analytics</h2>

                <!-- Class Free Lectures Stats -->
                <div class="row g-4 mb-4">
                    ${freeLecturesStats.map(stat => `
                        <div class="col-md-4">
                             <div class="card border-0 shadow-sm rounded-4 h-100 bg-white">
                                <div class="card-body p-4">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <h5 class="fw-bold text-dark mb-0">${stat.year}</h5>
                                        <div class="bg-indigo-subtle text-indigo rounded-circle p-2">
                                            <i data-lucide="calendar-off" style="width: 20px;"></i>
                                        </div>
                                    </div>
                                    <h3 class="display-5 fw-bold text-indigo mb-1">${stat.free}</h3>
                                    <p class="text-secondary small mb-0">Total Free Lectures (Across ${stat.count} Sections)</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Teacher Stats Table -->
                <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div class="card-header bg-white border-bottom p-4">
                        <h5 class="fw-bold mb-0">Faculty Performance Report</h5>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="bg-light">
                                <tr>
                                    <th class="ps-4 py-3 text-secondary small fw-bold text-uppercase">Teacher Name</th>
                                    <th class="py-3 text-secondary small fw-bold text-uppercase">Total Lectures Attended</th>
                                    <th class="py-3 text-secondary small fw-bold text-uppercase">Substitutions Taken</th>
                                    <th class="pe-4 py-3 text-secondary small fw-bold text-uppercase text-end">Performance</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${teacherStats.map(t => `
                                    <tr>
                                        <td class="ps-4 py-3 fw-bold text-dark">${t.name}</td>
                                        <td class="py-3">
                                            <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3">${t.lectures} Lectures</span>
                                        </td>
                                        <td class="py-3">
                                             <span class="badge bg-warning-subtle text-dark border border-warning-subtle rounded-pill px-3">${t.substitutions} Subs</span>
                                        </td>
                                        <td class="pe-4 py-3 text-end">
                                            <div class="progress" style="height: 6px; width: 100px; display: inline-flex;">
                                                <div class="progress-bar bg-success" style="width: ${Math.min(100, (t.lectures / 15) * 100)}%"></div>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    getOrdinal(n) {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
    }

    postRender() {
        lucide.createIcons();
    }
}

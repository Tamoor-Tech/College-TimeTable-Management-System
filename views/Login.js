// Login View - Enhanced with better UI

export class Login {
    constructor(onLogin) {
        this.onLogin = onLogin;
        this.selectedRole = 'admin';
        this.roles = [
            { id: 'admin', label: 'Administrator', icon: 'shield', desc: 'Full system access', color: '#3b82f6' },
            { id: 'teacher', label: 'Teacher', icon: 'graduation-cap', desc: 'Manage schedule & classes', color: '#14b8a6' },
            { id: 'student', label: 'Student', icon: 'user', desc: 'View timetable & exams', color: '#f59e0b' },
            { id: 'cr', label: 'Class Representative', icon: 'users', desc: 'Class operations & feedback', color: '#8b5cf6' }
        ];
    }

    render() {
        return `
            <div class="login-page">
                <div class="login-card">
                    <!-- Left Side: Illustration -->
                    <div class="login-illustration">
                        <div class="mb-4">
                            <div class="logo-icon" style="width: 64px; height: 64px; margin-bottom: 1.5rem;">
                                <i data-lucide="calendar" style="width: 32px; height: 32px;"></i>
                            </div>
                            <h1 class="display-5 fw-bold text-white mb-3">College Timetable System</h1>
                            <p class="lead text-white-50">Streamline academic scheduling, track attendance, and manage campus resources efficiently.</p>
                        </div>
                        <div class="mt-auto">
                            <div class="d-flex align-items-center text-white-50 mb-2">
                                <i data-lucide="check-circle" class="me-2" style="width: 16px; height: 16px;"></i>
                                <span>Real-time schedule updates</span>
                            </div>
                            <div class="d-flex align-items-center text-white-50 mb-2">
                                <i data-lucide="check-circle" class="me-2" style="width: 16px; height: 16px;"></i>
                                <span>Comprehensive analytics</span>
                            </div>
                            <div class="d-flex align-items-center text-white-50">
                                <i data-lucide="check-circle" class="me-2" style="width: 16px; height: 16px;"></i>
                                <span>Mobile-friendly interface</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Side: Login Form -->
                    <div class="login-content">
                        <div class="mb-4">
                            <h1 class="login-title">Welcome Back</h1>
                            <p class="login-subtitle">Sign in to continue to your dashboard</p>
                        </div>

                        <!-- Role Selection -->
                        <div class="mb-4">
                            <label class="form-label">Select Your Role</label>
                            <div class="role-selector">
                                ${this.roles.map(role => `
                                    <div class="role-card ${this.selectedRole === role.id ? 'selected' : ''}" 
                                         onclick="window.selectRole('${role.id}')"
                                         id="role-${role.id}">
                                        <div class="role-icon" style="background-color: ${role.color}15; color: ${role.color};">
                                            <i data-lucide="${role.icon}" style="width: 24px; height: 24px;"></i>
                                        </div>
                                        <div class="role-name">${role.label}</div>
                                        <div class="role-desc">${role.desc}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Login Form -->
                        <form id="login-form">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email Address</label>
                                <input type="email" 
                                       class="form-control" 
                                       id="email" 
                                       placeholder="name@college.edu"
                                       value="admin@college.edu"
                                       required>
                            </div>
                            
                            <div class="mb-4">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" 
                                       class="form-control" 
                                       id="password" 
                                       placeholder="Enter your password"
                                       value="password"
                                       required>
                                <div class="form-text mt-2">
                                    <a href="#" class="text-decoration-none">Forgot password?</a>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary w-100 py-3 mb-3 fw-semibold">
                                <i data-lucide="log-in" class="me-2" style="width: 18px; height: 18px;"></i>
                                Sign In to Dashboard
                            </button>
                            
                            <div class="text-center">
                                <p class="text-muted mb-0">
                                    Need help? 
                                    <a href="#" class="text-decoration-none fw-medium">Contact Support</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    postRender() {
        // Initialize icons
        lucide.createIcons();

        // Global role selection handler
        window.selectRole = (roleId) => {
            this.selectedRole = roleId;
            
            // Update UI
            document.querySelectorAll('.role-card').forEach(card => {
                card.classList.remove('selected');
            });
            document.getElementById(`role-${roleId}`).classList.add('selected');
        };

        // Form submission
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const user = {
                id: 'U1',
                name: this.roles.find(r => r.id === this.selectedRole).label + ' User',
                role: this.selectedRole,
                email: document.getElementById('email').value,
                roleLabel: this.roles.find(r => r.id === this.selectedRole).label
            };
            
            // Add loading state
            const submitBtn = document.querySelector('#login-form button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing in...
            `;
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.onLogin(user);
            }, 800);
        });
    }
}
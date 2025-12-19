<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTransfer - Complete File Transfer Solution</title>
    <style>
        :root {
            --primary-color: #3498db;
            --secondary-color: #2ecc71;
            --danger-color: #e74c3c;
            --warning-color: #f39c12;
            --dark-color: #2c3e50;
            --light-color: #ecf0f1;
            --gray-color: #7f8c8d;
            --border-radius: 8px;
            --box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            --transition: all 0.3s ease;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.7;
            color: #333;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .container {
            background: white;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            padding: 40px;
            margin-bottom: 30px;
            overflow: hidden;
        }
        
        /* Header Styles */
        .main-header {
            text-align: center;
            padding: 40px 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border-radius: var(--border-radius);
            margin-bottom: 40px;
            position: relative;
            overflow: hidden;
        }
        
        .main-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 30px 30px;
            animation: float 20s linear infinite;
        }
        
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(-30px, -30px) rotate(360deg); }
        }
        
        .project-title {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            position: relative;
            z-index: 1;
        }
        
        .project-subtitle {
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 800px;
            margin: 0 auto 25px;
            position: relative;
            z-index: 1;
        }
        
        .tech-badges {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
            position: relative;
            z-index: 1;
        }
        
        .tech-badge {
            background: rgba(255,255,255,0.2);
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.3);
        }
        
        /* Section Styles */
        section {
            margin-bottom: 50px;
            padding-bottom: 30px;
            border-bottom: 2px solid var(--light-color);
        }
        
        section:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        h2 {
            color: var(--dark-color);
            font-size: 2.2rem;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 3px solid var(--primary-color);
            display: inline-block;
        }
        
        h3 {
            color: var(--primary-color);
            font-size: 1.5rem;
            margin: 25px 0 15px;
        }
        
        h4 {
            color: var(--dark-color);
            font-size: 1.2rem;
            margin: 20px 0 10px;
        }
        
        p {
            margin-bottom: 15px;
            font-size: 1.05rem;
        }
        
        /* Lists */
        ul, ol {
            margin-left: 25px;
            margin-bottom: 20px;
        }
        
        li {
            margin-bottom: 12px;
            position: relative;
            padding-left: 10px;
        }
        
        ul li::before {
            content: "▶";
            color: var(--primary-color);
            font-size: 0.8rem;
            position: absolute;
            left: -20px;
            top: 5px;
        }
        
        /* Feature Cards */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 25px;
            margin: 30px 0;
        }
        
        .feature-card {
            background: white;
            border-radius: var(--border-radius);
            padding: 25px;
            border-top: 5px solid var(--primary-color);
            box-shadow: 0 3px 10px rgba(0,0,0,0.08);
            transition: var(--transition);
            height: 100%;
        }
        
        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        
        .feature-card.admin {
            border-top-color: var(--danger-color);
        }
        
        .feature-card.security {
            border-top-color: var(--warning-color);
        }
        
        .feature-card.user {
            border-top-color: var(--secondary-color);
        }
        
        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 15px;
            color: var(--primary-color);
        }
        
        .feature-card.admin .feature-icon {
            color: var(--danger-color);
        }
        
        .feature-card.security .feature-icon {
            color: var(--warning-color);
        }
        
        .feature-card.user .feature-icon {
            color: var(--secondary-color);
        }
        
        /* Workflow Diagram */
        .workflow-container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: var(--border-radius);
            padding: 30px;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
        }
        
        .workflow-steps {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            position: relative;
            z-index: 1;
        }
        
        .workflow-step {
            background: white;
            border-radius: 50%;
            width: 100px;
            height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: var(--dark-color);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            position: relative;
            transition: var(--transition);
        }
        
        .workflow-step:hover {
            transform: scale(1.1);
        }
        
        .step-number {
            font-size: 2rem;
            color: var(--primary-color);
            font-weight: 800;
        }
        
        .step-name {
            font-size: 0.8rem;
            margin-top: 5px;
            text-align: center;
        }
        
        /* Database Schema */
        .schema-container {
            background: var(--light-color);
            border-radius: var(--border-radius);
            padding: 25px;
            margin: 25px 0;
        }
        
        .table-schema {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            background: white;
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }
        
        .table-schema th {
            background: var(--primary-color);
            color: white;
            padding: 15px;
            text-align: left;
        }
        
        .table-schema td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
        }
        
        .table-schema tr:last-child td {
            border-bottom: none;
        }
        
        .table-schema tr:hover {
            background: #f9f9f9;
        }
        
        /* Code Blocks */
        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 25px;
            border-radius: var(--border-radius);
            margin: 20px 0;
            overflow-x: auto;
            font-family: 'Consolas', 'Monaco', monospace;
            line-height: 1.6;
            position: relative;
        }
        
        .code-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #333;
        }
        
        .code-title {
            color: #569cd6;
            font-weight: bold;
        }
        
        .copy-btn {
            background: #007acc;
            color: white;
            border: none;
            padding: 5px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: var(--transition);
        }
        
        .copy-btn:hover {
            background: #005a9e;
        }
        
        .comment {
            color: #6a9955;
        }
        
        .keyword {
            color: #569cd6;
        }
        
        .string {
            color: #ce9178;
        }
        
        .number {
            color: #b5cea8;
        }
        
        /* File Structure */
        .file-tree {
            background: #f8f9fa;
            border-radius: var(--border-radius);
            padding: 25px;
            margin: 25px 0;
            font-family: 'Consolas', monospace;
        }
        
        .folder {
            color: #007acc;
            font-weight: bold;
        }
        
        .file {
            color: var(--gray-color);
            margin-left: 20px;
        }
        
        /* Note and Warning Boxes */
        .note-box {
            background: #e3f2fd;
            border-left: 5px solid #2196f3;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }
        
        .warning-box {
            background: #fff3e0;
            border-left: 5px solid #ff9800;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }
        
        .important-box {
            background: #ffebee;
            border-left: 5px solid #f44336;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }
        
        /* Footer */
        footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid #ddd;
            color: var(--gray-color);
        }
        
        .footer-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
            .container {
                padding: 25px;
            }
            
            .project-title {
                font-size: 2.8rem;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            
            .container {
                padding: 20px;
            }
            
            .project-title {
                font-size: 2.2rem;
            }
            
            h2 {
                font-size: 1.8rem;
            }
            
            .workflow-steps {
                flex-direction: column;
                align-items: center;
            }
        }
        
        /* Animation for sections */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        section {
            animation: fadeIn 0.6s ease-out;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <header class="main-header">
            <h1 class="project-title">YouTransfer</h1>
            <p class="project-subtitle">A Comprehensive File Transfer Platform with Advanced User Management, Admin Controls, and Secure File Sharing</p>
            
            <div class="tech-badges">
                <span class="tech-badge">Node.js</span>
                <span class="tech-badge">Express.js</span>
                <span class="tech-badge">MySQL</span>
                <span class="tech-badge">Sequelize ORM</span>
                <span class="tech-badge">JWT Authentication</span>
                <span class="tech-badge">Multer</span>
                <span class="tech-badge">Cloudinary</span>
                <span class="tech-badge">Nodemailer</span>
                <span class="tech-badge">bcryptjs</span>
                <span class="tech-badge">REST API</span>
            </div>
        </header>

        <!-- Project Overview -->
        <section id="overview">
            <h2>📋 Project Overview</h2>
            <p>YouTransfer is a full-stack web application designed for secure file sharing between users. The platform provides a seamless experience for users to send files via email links or shareable URLs, while administrators have complete control over user management and system monitoring.</p>
            
            <div class="note-box">
                <strong>Core Concept:</strong> YouTransfer bridges the gap between simple file sharing and enterprise-level security, offering both user-friendly interfaces and robust administrative controls in a single platform.
            </div>
        </section>

        <!-- Complete User Journey -->
        <section id="user-journey">
            <h2>👤 Complete User Journey</h2>
            
            <div class="workflow-container">
                <div class="workflow-steps">
                    <div class="workflow-step">
                        <div class="step-number">1</div>
                        <div class="step-name">Registration</div>
                    </div>
                    <div class="workflow-step">
                        <div class="step-number">2</div>
                        <div class="step-name">Email Verification</div>
                    </div>
                    <div class="workflow-step">
                        <div class="step-number">3</div>
                        <div class="step-name">Login</div>
                    </div>
                    <div class="workflow-step">
                        <div class="step-number">4</div>
                        <div class="step-name">Dashboard</div>
                    </div>
                    <div class="workflow-step">
                        <div class="step-number">5</div>
                        <div class="step-name">Send Files</div>
                    </div>
                    <div class="workflow-step">
                        <div class="step-number">6</div>
                        <div class="step-name">Track Transfers</div>
                    </div>
                </div>
            </div>
            
            <h3>Detailed User Flow:</h3>
            <ol>
                <li><strong>Registration Process:</strong>
                    <ul>
                        <li>User visits registration page and fills in details (name, email, password)</li>
                        <li>Email verification link is sent to the provided email address</li>
                        <li>User clicks verification link to activate account</li>
                        <li>Account is created in database with 'active' status</li>
                    </ul>
                </li>
                
                <li><strong>Login Authentication:</strong>
                    <ul>
                        <li>User enters credentials on login page</li>
                        <li>System validates email/password combination</li>
                        <li>JWT token is generated for authenticated sessions</li>
                        <li>Token is stored in HTTP-only cookies for security</li>
                        <li>User is redirected to main dashboard</li>
                    </ul>
                </li>
                
                <li><strong>File Sending Process:</strong>
                    <ul>
                        <li>User navigates to "Send Files" page from dashboard</li>
                        <li>Form requires:
                            <ul>
                                <li>Recipient email address (if sending via email)</li>
                                <li>Optional: Recipient name</li>
                                <li>Message/description for the transfer</li>
                                <li>File selection (multiple files supported)</li>
                                <li>Expiration period selection (24 hours, 7 days, 30 days, custom)</li>
                                <li>Delivery method (Email Link or Shareable Link)</li>
                            </ul>
                        </li>
                        <li>Files are uploaded to Cloudinary for secure storage</li>
                        <li>Unique share token is generated for the transfer</li>
                        <li>System creates transfer record in database</li>
                    </ul>
                </li>
                
                <li><strong>Recipient Experience:</strong>
                    <ul>
                        <li><strong>Email Method:</strong> Recipient receives email with download link and instructions</li>
                        <li><strong>Shareable Link Method:</strong> User copies link to share via any platform</li>
                        <li>Recipient clicks link and is taken to download page</li>
                        <li>System validates link expiration and authenticity</li>
                        <li>Files are downloaded securely</li>
                        <li>Download activity is logged in the system</li>
                    </ul>
                </li>
            </ol>
        </section>

        <!-- Core Features -->
        <section id="features">
            <h2>🌟 Core Features</h2>
            
            <div class="features-grid">
                <!-- User Features -->
                <div class="feature-card user">
                    <div class="feature-icon">👤</div>
                    <h3>User Management</h3>
                    <ul>
                        <li>Secure registration with email verification</li>
                        <li>Profile management and update capabilities</li>
                        <li>Password change functionality</li>
                        <li>Account deactivation option</li>
                        <li>Session management across devices</li>
                    </ul>
                </div>
                
                <!-- File Transfer Features -->
                <div class="feature-card">
                    <div class="feature-icon">📤</div>
                    <h3>File Transfer System</h3>
                    <ul>
                        <li>Multi-file upload with progress indicators</li>
                        <li>Customizable expiration periods</li>
                        <li>Two delivery methods: Email & Direct Link</li>
                        <li>File size limits and type restrictions</li>
                        <li>Real-time upload status updates</li>
                    </ul>
                </div>
                
                <!-- Admin Features -->
                <div class="feature-card admin">
                    <div class="feature-icon">⚙️</div>
                    <h3>Admin Dashboard</h3>
                    <ul>
                        <li>Complete user management interface</li>
                        <li>Real-time system statistics</li>
                        <li>Transfer monitoring and analytics</li>
                        <li>User activity logs</li>
                        <li>System configuration settings</li>
                    </ul>
                </div>
                
                <!-- Security Features -->
                <div class="feature-card security">
                    <div class="feature-icon">🔒</div>
                    <h3>Security & Privacy</h3>
                    <ul>
                        <li>End-to-end file encryption</li>
                        <li>Secure token-based authentication</li>
                        <li>Automatic file expiration</li>
                        <li>Download limits and access controls</li>
                        <li>IP-based security measures</li>
                    </ul>
                </div>
                
                <!-- Tracking Features -->
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h3>Tracking & Analytics</h3>
                    <ul>
                        <li>Detailed transfer history</li>
                        <li>Download statistics and reports</li>
                        <li>User activity monitoring</li>
                        <li>System performance metrics</li>
                        <li>Exportable data reports</li>
                    </ul>
                </div>
                
                <!-- Recovery Features -->
                <div class="feature-card">
                    <div class="feature-icon">🔄</div>
                    <h3>Password Recovery</h3>
                    <ul>
                        <li>Secure forgot password flow</li>
                        <li>Email-based reset tokens</li>
                        <li>Time-limited reset links</li>
                        <li>Password strength validation</li>
                        <li>Previous password prevention</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Admin Panel Details -->
        <section id="admin-panel">
            <h2>🛠️ Admin Panel - Complete Functionality</h2>
            
            <div class="important-box">
                <strong>Admin Access:</strong> Only users with admin privileges can access the admin panel. Admin account is seeded during initial setup.
            </div>
            
            <h3>Admin Capabilities:</h3>
            
            <h4>1. User Management Module</h4>
            <ul>
                <li><strong>View All Users:</strong> Complete list of registered users with pagination</li>
                <li><strong>User Details:</strong> View complete user profile including registration date, last login, and status</li>
                <li><strong>Account Control:</strong>
                    <ul>
                        <li>Activate/Deactivate user accounts</li>
                        <li>Reset user passwords</li>
                        <li>Delete user accounts (with confirmation)</li>
                        <li>Export user data to CSV</li>
                    </ul>
                </li>
                <li><strong>Search & Filter:</strong> Search users by name, email, or status</li>
                <li><strong>Bulk Actions:</strong> Perform actions on multiple users simultaneously</li>
            </ul>
            
            <h4>2. Transfer Management Module</h4>
            <ul>
                <li><strong>Monitor All Transfers:</strong> Real-time view of all file transfers in the system</li>
                <li><strong>Transfer Details:</strong> View sender, recipient, files, expiration, and status</li>
                <li><strong>Transfer Control:</strong>
                    <ul>
                        <li>Cancel active transfers</li>
                        <li>Extend expiration dates</li>
                        <li>Regenerate download links</li>
                        <li>View download statistics</li>
                    </ul>
                </li>
                <li><strong>Analytics:</strong> Transfer volume, popular file types, user activity patterns</li>
            </ul>
            
            <h4>3. System Management</h4>
            <ul>
                <li><strong>System Settings:</strong> Configure application parameters</li>
                <li><strong>Storage Management:</strong> Monitor Cloudinary storage usage</li>
                <li><strong>Email Templates:</strong> Customize email content for various notifications</li>
                <li><strong>Backup & Restore:</strong> Database backup functionality</li>
                <li><strong>Activity Logs:</strong> Comprehensive audit trail of all admin actions</li>
            </ul>
            
            <h4>4. Dashboard Analytics</h4>
            <ul>
                <li><strong>Real-time Statistics:</strong> Active users, ongoing transfers, system load</li>
                <li><strong>Charts & Graphs:</strong> Visual representation of data</li>
                <li><strong>Reports:</strong> Daily, weekly, monthly performance reports</li>
                <li><strong>Alerts:</strong> Notifications for unusual activities</li>
            </ul>
        </section>

        <!-- Password Recovery System -->
        <section id="password-recovery">
            <h2>🔐 Password Recovery System</h2>
            
            <h3>Complete Recovery Flow:</h3>
            <ol>
                <li><strong>Request Initiation:</strong>
                    <ul>
                        <li>User clicks "Forgot Password" on login page</li>
                        <li>Enters registered email address</li>
                        <li>System validates email exists in database</li>
                    </ul>
                </li>
                
                <li><strong>Token Generation:</strong>
                    <ul>
                        <li>Unique reset token is generated with 1-hour expiration</li>
                        <li>Token is hashed and stored in database</li>
                        <li>Original token is included in reset link</li>
                    </ul>
                </li>
                
                <li><strong>Email Dispatch:</strong>
                    <ul>
                        <li>Password reset email is sent via Nodemailer</li>
                        <li>Email contains secure reset link</li>
                        <li>Link includes token as URL parameter</li>
                        <li>Email has professional template with instructions</li>
                    </ul>
                </li>
                
                <li><strong>Password Reset:</strong>
                    <ul>
                        <li>User clicks link and is taken to reset page</li>
                        <li>System validates token expiration and authenticity</li>
                        <li>User enters new password (with confirmation)</li>
                        <li>Password is validated for strength requirements</li>
                        <li>New password is hashed with bcrypt and stored</li>
                        <li>Reset token is invalidated after use</li>
                    </ul>
                </li>
                
                <li><strong>Security Measures:</strong>
                    <ul>
                        <li>Rate limiting on reset requests</li>
                        <li>Token single-use only</li>
                        <li>Password history prevention</li>
                        <li>Email confirmation of successful reset</li>
                    </ul>
                </li>
            </ol>
        </section>

        <!-- Database Schema -->
        <section id="database">
            <h2>🗄️ Database Schema Design</h2>
            
            <div class="schema-container">
                <h3>Core Database Tables:</h3>
                
                <table class="table-schema">
                    <thead>
                        <tr>
                            <th>Table Name</th>
                            <th>Description</th>
                            <th>Key Fields</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>users</strong></td>
                            <td>Stores all user information</td>
                            <td>id, email, password_hash, role, status, created_at</td>
                        </tr>
                        <tr>
                            <td><strong>transfers</strong></td>
                            <td>Main transfers table</td>
                            <td>id, user_id, token, expires_at, delivery_method, status</td>
                        </tr>
                        <tr>
                            <td><strong>transfer_files</strong></td>
                            <td>Files associated with transfers</td>
                            <td>id, transfer_id, filename, original_name, size, cloudinary_url</td>
                        </tr>
                        <tr>
                            <td><strong>transfer_recipients</strong></td>
                            <td>Recipient information for transfers</td>
                            <td>id, transfer_id, email, name, download_count</td>
                        </tr>
                        <tr>
                            <td><strong>password_resets</strong></td>
                            <td>Password reset tokens</td>
                            <td>id, user_id, token, expires_at, used</td>
                        </tr>
                        <tr>
                            <td><strong>activity_logs</strong></td>
                            <td>User activity tracking</td>
                            <td>id, user_id, action, ip_address, timestamp</td>
                        </tr>
                        <tr>
                            <td><strong>admin_logs</strong></td>
                            <td>Admin action records</td>
                            <td>id, admin_id, action, target, details, timestamp</td>
                        </tr>
                    </tbody>
                </table>
                
                <h3>Relationships:</h3>
                <ul>
                    <li><strong>One-to-Many:</strong> One user can have multiple transfers</li>
                    <li><strong>One-to-Many:</strong> One transfer can have multiple files</li>
                    <li><strong>One-to-Many:</strong> One transfer can have multiple recipients (BCC functionality)</li>
                    <li><strong>One-to-One:</strong> Each password reset token belongs to one user</li>
                </ul>
            </div>
        </section>

        <!-- Technical Implementation -->
        <section id="technical">
            <h2>💻 Technical Implementation</h2>
            
            <h3>Backend Architecture:</h3>
            
            <div class="file-tree">
                <div class="folder">backend/</div>
                <div class="folder">├── src/</div>
                <div class="file">│   ├── server.js <span class="comment"># Main application entry point</span></div>
                <div class="folder">│   ├── config/</div>
                <div class="file">│   │   ├── database.js <span class="comment"># Database configuration</span></div>
                <div class="file">│   │   ├── cloudinary.js <span class="comment"># Cloudinary setup</span></div>
                <div class="file">│   │   └── mailer.js <span class="comment"># Email configuration</span></div>
                <div class="folder">│   ├── models/</div>
                <div class="file">│   │   ├── User.js <span class="comment"># User model with methods</span></div>
                <div class="file">│   │   ├── Transfer.js <span class="comment"># Transfer model</span></div>
                <div class="file">│   │   ├── TransferFile.js <span class="comment"># File model</span></div>
                <div class="file">│   │   └── index.js <span class="comment"># Model associations</span></div>
                <div class="folder">│   ├── controllers/</div>
                <div class="file">│   │   ├── authController.js <span class="comment"># Authentication logic</span></div>
                <div class="file">│   │   ├── transferController.js <span class="comment"># File transfer logic</span></div>
                <div class="file">│   │   ├── userController.js <span class="comment"># User management</span></div>
                <div class="file">│   │   └── adminController.js <span class="comment"># Admin operations</span></div>
                <div class="folder">│   ├── middleware/</div>
                <div class="file">│   │   ├── auth.js <span class="comment"># JWT authentication</span></div>
                <div class="file">│   │   ├── admin.js <span class="comment"># Admin verification</span></div>
                <div class="file">│   │   └── upload.js <span class="comment"># File upload handling</span></div>
                <div class="folder">│   ├── routes/</div>
                <div class="file">│   │   ├── authRoutes.js <span class="comment"># Authentication routes</span></div>
                <div class="file">│   │   ├── transferRoutes.js <span class="comment"># Transfer routes</span></div>
                <div class="file">│   │   ├── userRoutes.js <span class="comment"># User routes</span></div>
                <div class="file">│   │   └── adminRoutes.js <span class="comment"># Admin routes</span></div>
                <div class="folder">│   ├── utils/</div>
                <div class="file">│   │   ├── tokenGenerator.js <span class="comment"># Token generation</span></div>
                <div class="file">│   │   ├── validators.js <span class="comment"># Input validation</span></div>
                <div class="file">│   │   ├── emailTemplates.js <span class="comment"># Email templates</span></div>
                <div class="file">│   │   └── helpers.js <span class="comment"># Utility functions</span></div>
                <div class="folder">│   └── seeders/</div>
                <div class="file">│       └── adminSeeder.js <span class="comment"># Creates initial admin user</span></div>
                <div class="file">├── package.json <span class="comment"># Dependencies and scripts</span></div>
                <div class="file">├── .env <span class="comment"># Environment variables</span></div>
                <div class="file">└── README.md <span class="comment"># Project documentation</span></div>
            </div>
            
            <h3>Key Code Examples:</h3>
            
            <div class="code-block">
                <div class="code-header">
                    <span class="code-title">server.js - Main Server Configuration</span>
                    <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                </div>
<pre>
<span class="keyword">const</span> express = <span class="keyword">require</span>(<span class="string">'express'</span>);
<span class="keyword">const</span> cors = <span class="keyword">require</span>(<span class="string">'cors'</span>);
<span class="keyword">const</span> helmet = <span class="keyword">require</span>(<span class="string">'helmet'</span>);
<span class="keyword">const</span> dotenv = <span class="keyword">require</span>(<span class="string">'dotenv'</span>);
<span class="keyword">const</span> sequelize = <span class="keyword">require</span>(<span class="string">'./src/config/database'</span>);

<span class="comment">// Load environment variables</span>
dotenv.config();

<span class="keyword">const</span> app = express();

<span class="comment">// Middleware</span>
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: <span class="keyword">true</span>
}));
app.use(express.json());
app.use(express.urlencoded({ extended: <span class="keyword">true</span> }));

<span class="comment">// Database Connection</span>
sequelize.authenticate()
    .then(() => console.log(<span class="string">'Database connected successfully'</span>))
    .catch(err => console.error(<span class="string">'Database connection failed:'</span>, err));

<span class="comment">// Routes</span>
app.use(<span class="string">'/api/auth'</span>, <span class="keyword">require</span>(<span class="string">'./src/routes/authRoutes'</span>));
app.use(<span class="string">'/api/transfers'</span>, <span class="keyword">require</span>(<span class="string">'./src/routes/transferRoutes'</span>));
app.use(<span class="string">'/api/admin'</span>, <span class="keyword">require</span>(<span class="string">'./src/routes/adminRoutes'</span>));

<span class="comment">// Error Handling Middleware</span>
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || <span class="number">500</span>

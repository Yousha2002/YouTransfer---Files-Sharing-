

const nodemailer = require('nodemailer');

// Create transporter with Gmail configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
    debug: true,
    logger: true
  });
};

// Test email configuration
exports.testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    
    await transporter.verify();
    console.log('✅ Email server is ready to send messages');
    
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error);
    return false;
  }
};

// Send password reset email
exports.sendResetEmail = async (email, resetToken) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    // const mailOptions = {
    //   from: `"WEPRESENT File Sharing" <${process.env.EMAIL_USER}>`,
    //   to: email,
    //   subject: 'Password Reset Request - WEPRESENT',
    //   html: `
    //     <!DOCTYPE html>
    //     <html>
    //     <head>
    //         <style>
    //             body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
    //             .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    //             .header { text-align: center; color: #7c3aed; }
    //             .button { display: inline-block; padding: 12px 24px; background-color: #7c3aed; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    //             .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; text-align: center; }
    //         </style>
    //     </head>
    //     <body>
    //         <div class="container">
    //             <div class="header">
    //                 <h1>WEPRESENT</h1>
    //                 <h2>Password Reset Request</h2>
    //             </div>
    //             <p>Hello,</p>
    //             <p>You requested to reset your password for your WEPRESENT account.</p>
    //             <p>Click the button below to reset your password:</p>
    //             <div style="text-align: center;">
    //                 <a href="${resetUrl}" class="button">Reset Password</a>
    //             </div>
    //             <p>Or copy and paste this link in your browser:</p>
    //             <p style="word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 5px;">${resetUrl}</p>
    //             <p>This link will expire in 1 hour.</p>
    //             <p>If you didn't request this password reset, please ignore this email.</p>
    //             <div class="footer">
    //                 <p>WEPRESENT - Secure File Sharing Platform</p>
    //                 <p>This is an automated message, please do not reply to this email.</p>
    //             </div>
    //         </div>
    //     </body>
    //     </html>
    //   `,
    //   text: `Password Reset Request\n\nYou requested to reset your password for your WEPRESENT account.\n\nReset Link: ${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, please ignore this email.`
    // };
const mailOptions = {
  from: `"YouTransfer File Sharing" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: 'Password Reset Request - YouTransfer',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* Base Styles */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                background-color: #f8f9fa; 
                margin: 0; 
                padding: 20px;
                line-height: 1.6;
                color: #333;
            }
            
            /* Container */
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white; 
                border-radius: 12px; 
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(27, 60, 83, 0.1);
            }
            
            /* Header */
            .header { 
                background: linear-gradient(135deg, #1B3C53 0%, #234C6A 50%, #456882 100%);
                color: white; 
                padding: 30px 20px;
                text-align: center;
            }
            
            .logo { 
                font-size: 32px; 
                font-weight: 700;
                margin-bottom: 10px;
                letter-spacing: 1px;
                color: #D2C1B6;
            }
            
            .header h2 { 
                font-size: 22px; 
                font-weight: 400;
                margin-top: 10px;
                opacity: 0.95;
            }
            
            /* Content */
            .content { 
                padding: 35px 30px; 
            }
            
            .content p { 
                margin-bottom: 20px; 
                font-size: 16px;
                color: #555;
            }
            
            /* Reset Button */
            .button-container { 
                text-align: center; 
                margin: 30px 0;
            }
            
            .reset-button { 
                display: inline-block; 
                padding: 15px 35px; 
                background: linear-gradient(to right, #234C6A, #456882);
                color: white !important;
                text-decoration: none; 
                border-radius: 8px; 
                font-weight: 600;
                font-size: 16px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(35, 76, 106, 0.2);
                border: none;
                cursor: pointer;
            }
            
            .reset-button:hover {
                background: linear-gradient(to right, #1B3C53, #234C6A);
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(27, 60, 83, 0.25);
            }
            
            /* Link Box */
            .link-box { 
                background-color: #f8f9fa; 
                padding: 15px; 
                border-radius: 8px;
                margin: 25px 0;
                border-left: 4px solid #D2C1B6;
                word-break: break-all;
                font-size: 14px;
                color: #456882;
                font-family: monospace;
            }
            
            /* Warning */
            .warning { 
                background-color: #fff9f0; 
                padding: 15px; 
                border-radius: 8px;
                margin: 25px 0;
                border-left: 4px solid #D2C1B6;
                font-size: 14px;
                color: #856404;
            }
            
            /* Footer */
            .footer { 
                margin-top: 30px; 
                padding-top: 25px; 
                border-top: 1px solid #eee; 
                color: #666; 
                font-size: 13px; 
                text-align: center;
            }
            
            .footer p { 
                margin-bottom: 8px; 
            }
            
            .company-name {
                color: #234C6A;
                font-weight: 600;
            }
            
            /* Responsive */
            @media (max-width: 480px) {
                .content { padding: 25px 20px; }
                .header { padding: 25px 15px; }
                .logo { font-size: 28px; }
                .reset-button { padding: 14px 28px; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header Section -->
            <div class="header">
                <div class="logo">YouTransfer</div>
                <h2>Password Reset Request</h2>
            </div>
            
            <!-- Content Section -->
            <div class="content">
                <p>Hello,</p>
                
                <p>You recently requested to reset your password for your <strong>YouTransfer</strong> account. Click the button below to proceed with resetting your password.</p>
                
                <!-- Reset Button -->
                <div class="button-container">
                    <a href="${resetUrl}" class="reset-button">Reset Your Password</a>
                </div>
                
                <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
                
                <!-- Reset Link -->
                <div class="link-box">
                    ${resetUrl}
                </div>
                
                <!-- Security Warning -->
                <div class="warning">
                    <strong>Important:</strong> This password reset link will expire in <strong>1 hour</strong> for security reasons. If you did not request a password reset, please ignore this email or contact our support team if you have concerns.
                </div>
                
                <p>For security reasons, this link can only be used once. If you need to reset your password again, please visit the password reset page and request another link.</p>
            </div>
            
            <!-- Footer Section -->
            <div class="footer">
                <p><span class="company-name">YouTransfer</span> - Secure File Sharing Platform</p>
                <p>This is an automated message. Please do not reply to this email.</p>
                <p>If you need assistance, contact our support team at support@youtransfer.com</p>
                <p>&copy; ${new Date().getFullYear()} YouTransfer. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `,
  text: `PASSWORD RESET REQUEST - YouTransfer\n\nHello,\n\nYou requested to reset your password for your YouTransfer account.\n\nPlease click the following link to reset your password:\n${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this password reset, please ignore this email or contact our support team if you have concerns.\n\nBest regards,\nYouTransfer Team`
};
    console.log('📧 Attempting to send email to:', email);
    
    const transporter = createTransporter();
    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ Reset email sent successfully to:', email);
    console.log('📨 Message ID:', result.messageId);
    
    return true;
  } catch (error) {
    console.error('❌ Error sending reset email:', error);
    return false;
  }
};

// Send transfer notification email
exports.sendTransferEmail = async (recipientEmail, downloadUrl, title, message) => {
  try {
  const mailOptions = {
  from: `"YouTransfer File Sharing" <${process.env.EMAIL_USER}>`,
  to: recipientEmail,
  subject: `📁 File Transfer: ${title || 'Files from YouTransfer'}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>File Transfer - YouTransfer</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f8fafc; padding: 20px; }
            .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(27, 60, 83, 0.12); }
            .header { background: linear-gradient(135deg, #1B3C53 0%, #234C6A 100%); padding: 40px 30px; text-align: center; color: white; position: relative; overflow: hidden; }
            .logo { font-size: 36px; font-weight: 700; letter-spacing: 1px; margin-bottom: 10px; color: #D2C1B6; position: relative; z-index: 1; }
            .subtitle { font-size: 18px; opacity: 0.9; font-weight: 400; margin-top: 8px; position: relative; z-index: 1; }
            .content { padding: 40px 35px; }
            .icon-section { text-align: center; margin-bottom: 30px; }
            .file-icon { font-size: 48px; color: #456882; margin-bottom: 15px; }
            .greeting { font-size: 18px; color: #1B3C53; margin-bottom: 20px; font-weight: 500; }
            .message-box { background-color: #f8f9fa; border-left: 4px solid #D2C1B6; padding: 20px; margin: 25px 0; border-radius: 8px; }
            .message-label { font-weight: 600; color: #234C6A; margin-bottom: 8px; font-size: 15px; }
            .message-content { color: #456882; font-size: 16px; line-height: 1.5; }
            .download-section { background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%); border: 2px dashed #D2C1B6; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
            .download-title { color: #1B3C53; font-size: 20px; font-weight: 600; margin-bottom: 20px; }
            .download-button { display: inline-block; background: linear-gradient(to right, #1B3C53, #234C6A); color: white !important;; text-decoration: none; padding: 16px 40px; border-radius: 10px; font-weight: 600; font-size: 16px; transition: all 0.3s ease; box-shadow: 0 6px 20px rgba(35, 76, 106, 0.2); }
            .download-button:hover { background: linear-gradient(to right, #1B3C53, #234C6A); transform: translateY(-2px); box-shadow: 0 8px 25px rgba(27, 60, 83, 0.25); }
            .warning-box { background-color: #fff8f0; border: 1px solid #ffe9cc; border-left: 4px solid #D2C1B6; border-radius: 8px; padding: 20px; margin-top: 30px; }
            .warning-text { color: #856404; font-size: 14px; line-height: 1.5; }
            .expiry-note { background-color: #f0f7ff; border-radius: 8px; padding: 15px; margin-top: 20px; text-align: center; color: #234C6A; font-size: 14px; border: 1px solid #e3f2fd; }
            .footer { background-color: #f8fafc; padding: 25px 35px; text-align: center; border-top: 1px solid #eaeaea; }
            .footer-logo { color: #234C6A; font-weight: 700; font-size: 18px; margin-bottom: 10px; }
            .footer-text { color: #666; font-size: 13px; line-height: 1.5; margin-bottom: 8px; }
            .contact-info { color: #456882; font-size: 13px; margin-top: 15px; }
            @media (max-width: 480px) {
                .content { padding: 30px 20px; }
                .header { padding: 30px 20px; }
                .logo { font-size: 32px; }
                .download-section { padding: 20px 15px; }
                .download-button { padding: 14px 30px; width: 100%; display: block; }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <div class="logo">YouTransfer</div>
                <div class="subtitle">Secure File Sharing Platform</div>
            </div>
            
            <div class="content">
                <div class="icon-section">
                    <div class="file-icon">📁</div>
                    <h1 style="color: #1B3C53; margin-bottom: 10px;">File Transfer</h1>
                </div>
                
                <p class="greeting">Hello,</p>
                
                <p style="color: #456882; margin-bottom: 20px; font-size: 16px;">
                    You have received files via <strong>YouTransfer</strong>. 
                    ${tittle ? `Shared by: <strong>${title}</strong>` : 'Someone has shared files with you.'}
                </p>
                
                ${message ? `
                <div class="message-box">
                    <div class="message-label">📝 Message from sender:</div>
                    <div class="message-content">${message}</div>
                </div>
                ` : ''}
                
                <div class="download-section">
                    <div class="download-title">Ready to Download Your Files</div>
                    <p style="color: #666; margin-bottom: 25px; font-size: 15px;">
                        Click the button below to access your shared files
                    </p>
                    <a href="${downloadUrl}" class="download-button">
                        ⬇️ Download Files Now
                    </a>
                </div>
                
                <div class="warning-box">
                    <div class="warning-text">
                        <span style="color: #e6a700; font-weight: bold; margin-right: 8px;">⚠️</span>
                        <strong>Important:</strong> Download your files promptly as they will be automatically deleted for security and storage management.
                    </div>
                </div>
                
                <div class="expiry-note">
                    <strong>Note:</strong> This download link is temporary and will expire. Please ensure you download the files as soon as possible.
                </div>
            </div>
            
            <div class="footer">
                <div class="footer-logo">YouTransfer</div>
                <p class="footer-text">Secure, Fast, and Reliable File Sharing</p>
                <p class="footer-text">This is an automated message. Please do not reply to this email.</p>
                <p class="contact-info">Need help? Contact support@YouTransfer.com</p>
                <p class="footer-text" style="margin-top: 20px; font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} YouTransfer. All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>
  `,
  text: `FILE TRANSFER - YouTransfer\n\nHello,\n\nYou have received files via YouTransfer.\n${message ? `Message from sender: ${message}\n\n` : ''}Download your files using this link:\n${downloadUrl}\n\nImportant: Download your files promptly as they will be automatically deleted.\n\nBest regards,\nYouTransfer Team`
};

    const transporter = createTransporter();
    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ Transfer email sent to:', recipientEmail);
    return true;
  } catch (error) {
    console.error('❌ Error sending transfer email:', error);
    return false;
  }
};
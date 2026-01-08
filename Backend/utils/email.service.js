/**
 * Mock Email Service
 * In a real production environment, use SendGrid, Nodemailer (Gmail), or AWS SES.
 * For this "Professional" demo, we log tokens to the console to ensure
 * the flow works without requiring the user to set up SMTP credentials immediately.
 */

export const sendVerificationEmail = async (email, token) => {
    console.log("==========================================");
    console.log(`[EMAIL SERVICE] Sending Verification Email to: ${email}`);
    console.log(`[EMAIL SERVICE] Token: ${token}`);
    console.log(`[EMAIL SERVICE] Verify Link: http://localhost:5173/verify-email?token=${token}`);
    console.log("==========================================");
    return true;
};

export const sendPasswordResetEmail = async (email, token) => {
    console.log("==========================================");
    console.log(`[EMAIL SERVICE] Sending Password Reset Email to: ${email}`);
    console.log(`[EMAIL SERVICE] Token: ${token}`);
    console.log(`[EMAIL SERVICE] Reset Link: http://localhost:5173/reset-password?token=${token}`);
    console.log("==========================================");
    return true;
};

import 'dotenv/config';

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS?.slice(0,4) + "****");
// Load 
// .env variables
  // <-- automatically loads process.env from .env

// Import your email service
import sendReminderEmail from './emailService.js'; // <-- note the .js

// Send a test email
sendReminderEmail('ahamedshafeel007@gmail.com', 'Test Task', '2026-02-16 10:00 AM')
  .then(() => console.log("Test email sent!"))
  .catch(err => console.error("Test email error:", err));

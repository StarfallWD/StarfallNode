// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'privacy.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Contact form API endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, company, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Check if email credentials are configured
    const emailUser = process.env.EMAIL_USER || 'info@starfallwebdesign.ca';
    const emailPass = process.env.EMAIL_PASS;

    if (!emailPass) {
      console.error('EMAIL_PASS environment variable not set');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured. Please set EMAIL_PASS environment variable.'
      });
    }

    // Create transporter with Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      },
      port: 587,
      secure: false,
      requireTLS: true,
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter configuration
    await transporter.verify();

    // Email content (matching original .NET format)
    const mailOptions = {
      from: emailUser,
      to: emailUser,
      subject: `Contact Request from ${name}`,
      html: `
        Contact Request From Website. Please reply to the client by copying the email and creating a new message.<br/>Details;<br/><br/><br/>
        Client Name : ${name}<br/><br/>
        E-Mail : ${email}<br/><br/>
        Phone: ${phone || 'Not provided'}<br/><br/>
        Message: ${message}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Email error:', error);
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      message: error.message
    });

    // Provide more specific error messages
    let errorMessage = 'Failed to send email';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check email credentials.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Could not connect to email server.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Email server connection timed out.';
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Handle 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

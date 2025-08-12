# Starfall Web Design - Node.js Version

This is the Node.js conversion of the original .NET Web Forms Starfall website. The website provides web design, branding, and social media marketing services.

## Features

- **Responsive Design**: Modern, mobile-friendly layout
- **Contact Form**: Functional contact form with email integration
- **Animations**: Preserved all original animations and effects
- **SEO Optimized**: Proper meta tags and structure
- **Fast Loading**: Optimized static assets

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd StarfallNode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure email settings** (optional)
   
   Create a `.env` file in the root directory:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```
   
   **Note**: For Gmail, you'll need to use an App Password instead of your regular password. You can generate one in your Google Account settings.

4. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Access the website**
   
   Open your browser and go to: `http://localhost:3000`

## Project Structure

```
StarfallNode/
├── public/                 # Static files
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── images/            # Images and graphics
│   ├── fonts/             # Font files
│   ├── index.html         # Main homepage
│   └── privacy.html       # Privacy policy page
├── server.js              # Node.js server
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## API Endpoints

- `GET /` - Homepage
- `GET /privacy` - Privacy policy page
- `POST /api/contact` - Contact form submission
- `GET /api/health` - Health check endpoint

## Contact Form

The contact form sends emails using Nodemailer. To configure email sending:

1. Set up environment variables for email credentials
2. The form validates:
   - Required fields (name, email, message)
   - Email format validation
   - Prevents spam submissions

## Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables
- `PORT` - Server port (default: 3000)
- `EMAIL_USER` - Email address for sending emails
- `EMAIL_PASS` - Email password or app password

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Email**: Nodemailer
- **Styling**: Bootstrap, Custom CSS
- **Animations**: WOW.js, Custom animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## License

This project is proprietary to Starfall Web Design.

## Support

For technical support or questions, contact: info@starfallwebdesign.ca

---

**Note**: This is a conversion from the original .NET Web Forms application. All animations, styling, and functionality have been preserved while modernizing the backend to use Node.js.

# Personal Portfolio

A full-stack personal portfolio website built to showcase my software projects, technical skills, background, and experience.

The application includes a public portfolio, project showcase, contact form, and a protected admin dashboard for managing portfolio content.

## Live Demo

**Portfolio:** https://kamranbhatdev.netlify.app/

## Features

### Public Portfolio

- Home page with introduction and education
- About section
- Technical skills
- Project showcase
- Individual project detail pages
- Project images and media
- Contact form
- Resume access

### Admin Dashboard

- Secure admin authentication
- Project management
- Skill management
- Home page content management
- About page management
- Protected admin routes
- Create, update, and delete portfolio content

### Backend

- REST API built with Express.js
- MongoDB database using Mongoose
- Request validation with Zod
- JWT-based authentication
- HttpOnly authentication cookies
- CORS configuration for production
- Centralized error handling
- Email delivery through Resend

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod
- JWT
- Resend

### Deployment

- Frontend — Netlify
- Backend — Render
- Database — MongoDB Atlas
- Images — Cloudinary

## Architecture

The project uses a separate frontend and backend architecture.

```text
                    ┌─────────────────────┐
                    │      Netlify        │
                    │   React + Vite      │
                    └──────────┬──────────┘
                               │
                         REST API / HTTPS
                               │
                    ┌──────────▼──────────┐
                    │       Render        │
                    │ Express + Node.js   │
                    └──────┬───────┬──────┘
                           │       │
                  ┌────────▼───┐   │
                  │  MongoDB   │   │
                  │   Atlas    │   │
                  └────────────┘   │
                                   │
                              ┌────▼────┐
                              │ Resend  │
                              └─────────┘
```

## Project Structure

```text
portfolio/
├── frontend/
│   ├── public/
│   │   ├── image.jpeg
│   │   └── resume.pdf
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── modules/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

## Local Development

### Prerequisites

Make sure you have:

- Node.js
- npm
- MongoDB Atlas account
- Resend account if you want to test the contact form

### Clone the repository

```bash
git clone <your-github-repository-url>
cd portfolio
```

### Backend setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key

FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend setup

Open another terminal:

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Backend Scripts

From `server/`:

```bash
npm run dev
```

Runs the development server with automatic reload.

```bash
npm run build
```

Compiles the TypeScript backend.

```bash
npm start
```

Runs the compiled production server.

```bash
npm run seed
```

Seeds the initial admin account.

## Authentication

The admin dashboard uses JWT-based authentication.

The JWT is stored in an **HttpOnly cookie** rather than browser local storage.

This helps prevent client-side JavaScript from directly accessing the authentication token.

The production cookie uses:

```text
HttpOnly
Secure
SameSite=None
```

because the frontend and backend are deployed on separate domains.

## Deployment

### Frontend

The React frontend is deployed using Netlify.

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

The Netlify deployment also includes an SPA redirect so React Router routes work when accessed directly.

### Backend

The Express backend is deployed using Render.

Build command:

```bash
npm install && npm run build
```

Start command:

```bash
npm start
```

Production environment variables are configured through Render's environment settings.

### Database

The application uses MongoDB Atlas for persistent data storage.

### Images

Project images are stored using Cloudinary rather than inside the Git repository.

## Environment Variables

Never commit real credentials or API keys to the repository.

The following environment variables are required by the backend:

```text
PORT
MONGODB_URI
ADMIN_EMAIL
ADMIN_PASSWORD
JWT_SECRET
RESEND_API_KEY
FRONTEND_URL
```

The frontend uses:

```text
VITE_API_URL
```

A `.env.example` file can be used to document required variables without exposing their values.

## Security Considerations

- Authentication tokens are stored in HttpOnly cookies.
- Secrets and API keys are kept in environment variables.
- `.env` files are excluded from Git.
- Admin routes require authentication.
- API input is validated using Zod.
- CORS is restricted to the configured frontend origin.
- User-provided contact information is validated before processing.

## Future Improvements

- Add more advanced project filtering
- Improve analytics and dashboard functionality
- Add automated tests
- Improve accessibility
- Add additional security hardening
- Add CI/CD checks
- Improve performance and image optimization
- Expand project media support

## Author

**Kamran Bhat**

Computer Science and Engineering
National Institute of Technology, Warangal

- GitHub: https://github.com/kamranbb-29
- LinkedIn: https://www.linkedin.com/in/kamran-bilal-bhat-7472b03a
- Portfolio: https://kamranbhatdev.netlify.app/

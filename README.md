# Techible Interview Prep Hub

## Overview

Techible Interview Prep Hub is a full-stack web application designed to help students and job seekers prepare for company-specific technical interviews. The platform provides interview processes, frequently asked questions, recent interview experiences, compensation insights, preparation tips, success stories, and curated resources for top companies.

## Features

### Company Listing

* Search companies
* Filter by industry
* Filter by interview difficulty
* Sort by popularity, alphabetical order, and recent additions
* Pagination support

### Company Details

* Company overview
* Interview process timeline
* Interview questions
* Recent interview questions
* Success stories
* Preparation tips
* Compensation insights
* Learning resources

### Questions Module

* Category filtering
* Difficulty filtering
* Upvote tracking
* Pattern-based interview questions
* Things to keep in mind section
* Recent question badges

### Compensation Module

* Average salary insights
* Compensation table
* Fresher and experienced role data

### Resources Module

* DSA preparation resources
* System design resources
* Behavioral interview preparation resources

### Responsive Design

* Desktop support
* Tablet support
* Mobile support

---

## Tech Stack

### Frontend

* React.js
* React Router
* TanStack Query
* Tailwind CSS
* Axios
* Vite

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

---

## Project Structure

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   └── routes/

backend/
├── models/
├── routes/
├── middleware/
├── scripts/
└── utils/
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside backend:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## Database Seeding

```bash
node scripts/seed.js
```

---

## Key Modules

### Interview Process

Provides round-wise interview information and preparation guidance.

### Interview Questions

Contains categorized company-specific interview questions with patterns and preparation tips.

### Success Stories

Real interview experiences and preparation strategies.

### Compensation

Salary insights across different levels and companies.

### Resources

Curated learning resources for interview preparation.

---

## Future Enhancements

* User authentication
* Community submissions
* Admin dashboard
* Bookmark questions
* Interview analytics
* AI-powered interview preparation
* Mock interview system

---

## Contributors

* Vijay Kiran Yarra
* Team Members

---

## License

This project is developed for educational and learning purposes.

# Techible Interview Prep Hub

## Overview

Techible Interview Prep Hub is a full-stack web application designed to help students and job seekers prepare for company-specific technical interviews. The platform provides interview processes, interview questions, recent interview experiences, compensation insights, preparation tips, success stories, and curated learning resources for top product and service-based companies.

The application is built using a scalable MERN architecture with a modern React frontend and RESTful backend APIs, making it easy to maintain and extend with additional companies and interview content.

---

## Features

### Company Listing

- Search companies
- Filter by industry
- Filter by interview difficulty
- Sort companies by popularity
- Sort companies alphabetically
- Sort by recently added
- Pagination support

### Company Details

Each company includes:

- Company overview
- Interview process timeline
- Interview questions
- Recent interview questions
- Success stories
- Preparation tips
- Compensation insights
- Learning resources

### Questions Module

- Category filtering
- Difficulty filtering
- Upvote tracking
- Pattern-based interview questions
- Things to keep in mind section
- Recent question badges

### Compensation Module

- Average salary insights
- Compensation table
- Fresher salary data
- Experienced role salary data

### Resources Module

- Data Structures and Algorithms resources
- System Design resources
- Low Level Design resources
- Behavioral interview resources
- Interview preparation materials

### Responsive Design

- Desktop support
- Tablet support
- Mobile support

---

## Tech Stack

### Frontend

- React.js
- React Router
- TanStack Query (React Query)
- Tailwind CSS
- Axios
- Vite

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

---

## Project Structure

```text
Techible/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── routes/
│   │   └── assets/
│   └── public/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── scripts/
│   ├── utils/
│   └── config/
│
└── README.md
```

---

## Installation

### Clone the Repository

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

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## Database Seeding

Populate the database with sample company and interview data.

```bash
node scripts/seed.js
```

---

## Key Modules

### Interview Process

Provides complete round-wise interview information, including technical rounds, online assessments, managerial rounds, HR rounds, and preparation guidance.

### Interview Questions

Contains company-specific interview questions categorized by difficulty, topic, and interview pattern along with preparation tips.

### Success Stories

Includes real interview experiences shared by candidates, preparation strategies, and lessons learned.

### Compensation

Displays salary insights for internships, fresher roles, and experienced software engineering positions across different companies.

### Resources

Provides curated learning resources for Data Structures and Algorithms, System Design, Behavioral Interviews, and general interview preparation.

---

## Future Enhancements

- User authentication and authorization
- User profiles
- Bookmark interview questions
- Community submissions
- Admin dashboard
- Interview analytics
- AI-powered interview preparation
- Mock interview platform
- Personalized learning roadmap

---

## Contributors

| Name | GitHub |
|------|--------|
| Vijay Kiran Yarra (Team Lead) | https://github.com/vijaykiran06 |
| Divanshu | https://github.com/Divanshu-all |
| Parth Gupta | https://github.com/ParthGupta1004 |
| Suryans Mohanty | https://github.com/codersuryans |

---

## License

This project is developed for educational and learning purposes.

---

## Acknowledgements

This project was developed as part of the Techible Interview Prep & Learning Hub internship program. The objective of the platform is to provide a centralized and structured interview preparation experience for students and job seekers by combining company-specific interview preparation, learning resources, and career guidance into a single application.

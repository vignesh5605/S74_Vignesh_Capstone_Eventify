# 🚀 Eventify  
### Smart Event Planning & Vendor Bidding Platform  

---

## 🌍 Introduction  

Eventify is a full-stack event management web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

It is designed to simplify the event planning process by connecting customers, vendors, and event managers through a structured quotation and bidding system.

Instead of contacting vendors manually and negotiating individually, Eventify provides a centralized platform where users can post event requirements and receive competitive quotations from multiple vendors.

The platform promotes transparency, efficiency, and structured communication in event planning.

---

## 🎯 Problem Statement  

Planning events today involves:

- Unstructured communication
- Lack of price transparency
- Manual vendor comparison
- Time-consuming negotiations
- Dependency on personal networks

Busy professionals and individuals often struggle to manage multiple vendors while staying within budget.

---

## 💡 Solution  

Eventify solves this by:

- Providing a centralized marketplace for event services
- Enabling structured requirement posting
- Allowing vendors to submit competitive quotations
- Supporting comparison and negotiation
- Offering role-based dashboards for better workflow management

Users can either book individual services or request complete event planning.

---

## 👥 Target Users  

- Individuals planning weddings, birthdays, or corporate events  
- Working professionals with limited time  
- Event managers seeking client leads  
- Vendors looking for consistent project opportunities  

---

## 🏗️ Core Features  

### 🔐 Authentication & Authorization
- User Registration & Login
- Role-based access (Customer / Vendor / Event Manager)
- JWT-based secure authentication
- Protected routes

### 📝 Event Requirement Posting
- Event type
- Budget range
- Location
- Event date
- Required services
- Additional notes

### 💬 Vendor Bidding System
- Vendors view open event requests
- Submit quotations with pricing details
- Customers receive multiple bids
- Compare quotations
- Accept or reject proposals

### 📊 Dashboards
- Customer Dashboard → Track event requests & quotations
- Vendor Dashboard → Manage submitted bids
- Event Manager Dashboard → Manage assigned projects

### 📦 Service Categories
- Photography
- Catering
- Venue / Hall Booking
- Decoration
- Guest Management
- Full Event Planning

---

## 🛠️ Technology Stack  

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt (Password hashing)

### Development Tools
- Git & GitHub
- Postman
- VS Code
- Figma (UI/UX Design)

---


## 🧱 System Architecture  

Eventify follows a client-server architecture:

- Frontend (React) communicates with Backend via REST APIs
- Backend handles business logic
- MongoDB stores application data
- JWT ensures secure session handling

---

## 🗂️ Project Architecture  

Eventify/
│
├── client/ # Frontend (React)
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable UI Components
│ │ ├── pages/ # Application Pages
│ │ ├── services/ # API Calls (Axios)
│ │ ├── context/ # Global State Management
│ │ ├── hooks/ # Custom Hooks
│ │ ├── routes/ # Route Configuration
│ │ └── App.jsx
│ └── package.json
│
├── server/ # Backend (Node + Express)
│ ├── config/ # Database & App Configuration
│ ├── controllers/ # Business Logic
│ ├── models/ # MongoDB Schemas
│ ├── routes/ # API Routes
│ ├── middleware/ # Authentication Middleware
│ ├── utils/ # Helper Functions
│ ├── server.js # Entry Point
│ └── package.json
│
├── .env # Environment Variables
├── README.md
└── package.json



---

## 🧩 Database Design (High-Level)  

### User Schema
- name
- email
- password
- role (customer / vendor / event_manager)
- createdAt

### Event Schema
- title
- description
- eventType
- budget
- location
- date
- servicesRequired
- createdBy (User reference)

### Bid Schema
- eventId (Reference)
- vendorId (Reference)
- quotationAmount
- proposalDetails
- status (pending / accepted / rejected)

---

## 🔄 Application Workflow  

1. User registers and logs in  
2. Customer creates an event requirement  
3. Vendors browse available events  
4. Vendors submit quotations  
5. Customer compares bids  
6. Customer accepts a bid  
7. Event manager coordinates execution  

---

## 📡 API Endpoints (Sample)  

### Auth Routes
- POST /api/auth/register
- POST /api/auth/login

### Event Routes
- POST /api/events
- GET /api/events
- GET /api/events/:id

### Bid Routes
- POST /api/bids
- GET /api/bids/:eventId
- PUT /api/bids/:id

---

## 🔐 Security Measures  

- Password hashing using Bcrypt  
- JWT-based authentication  
- Role-based authorization middleware  
- Protected API routes  
- Environment variable protection  

---

## 🚀 Deployment Strategy  

- Frontend: Vercel / Netlify  
- Backend: Render / AWS / Azure  
- Database: MongoDB Atlas  

---

## 📈 Future Enhancements  

- Real-time notifications (Socket.io)
- Integrated payment gateway
- Vendor rating & review system
- AI-based vendor recommendation engine
- Event budgeting analytics
- Admin dashboard
- Mobile application version

---

## 🎓 Learning Outcomes  

Through Eventify, the following concepts were implemented:

- Full-stack MERN development
- REST API design
- Role-based authentication
- MongoDB schema modeling
- MVC backend architecture
- Frontend routing & protected pages
- Real-world bidding logic implementation
- Deployment workflow

---

## 📌 Project Status  

Currently under active development as a Capstone Project.

Focus areas:
- Scalable backend structure
- Clean UI/UX
- Secure authentication
- Modular architecture

---

## 🤝 Contribution  

This project is currently developed as a personal capstone initiative.  
Future collaboration and enhancements are welcome.

---

## 📄 License  

This project is built for educational and demonstration purposes.

## 🗂️ Project Architecture  


# Eventify - MERN Vendor Discovery & Quotation Marketplace

Eventify is a production-focused MERN application where customers post event requirements and vendors compete by sending quotations.

## Tech Stack
- **Frontend:** React, React Router, TailwindCSS, Axios, React Hook Form, Context API
- **Backend:** Node.js, Express, JWT auth, role authorization, MVC
- **Database:** MongoDB + Mongoose
- **Tools:** Cloudinary, Multer, dotenv, bcryptjs, express-validator, cors, helmet, express-rate-limit

## Features
- Auth with role-based access (`customer`, `vendor`, `admin`)
- Vendor marketplace with search + filters + pagination
- Event requirement posting
- Quotation comparison and acceptance flow
- Auto booking creation on quote acceptance
- Review system with vendor rating aggregation
- Admin analytics and vendor approvals
- Error handling, validation, secure middleware, modular architecture

## Folder Structure

```text
backend/
  controllers/ models/ routes/ middleware/ utils/ config/ docs/ server.js
frontend/
  src/components src/pages src/hooks src/services src/context src/utils
```

## Run locally

```bash
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

Set environment variables from `backend/.env.example`.

## API docs
See: `backend/docs/api.md`

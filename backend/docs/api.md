# Eventify API Docs

## Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

## Vendors
- GET `/api/vendors`
- GET `/api/vendors/:id`
- POST `/api/vendors/profile` (vendor)
- PUT `/api/vendors/profile` (vendor)

## Events
- POST `/api/events` (customer)
- GET `/api/events`
- GET `/api/events/:id`

## Quotes
- POST `/api/quotes` (vendor)
- GET `/api/quotes/event/:id`
- PATCH `/api/quotes/:id/accept` (customer)

## Bookings
- GET `/api/bookings`
- PATCH `/api/bookings/:id/status`

## Reviews
- POST `/api/reviews` (customer)
- GET `/api/reviews/vendor/:id`

## Admin
- GET `/api/admin/users`
- GET `/api/admin/analytics`
- PATCH `/api/admin/vendors/:id/approve`

Auth uses Bearer JWT in `Authorization` header.

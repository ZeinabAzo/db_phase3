# Sports Ticketing System

A full-stack sports ticketing platform for browsing, searching, reserving, and managing sports event tickets.

The project is built with a **FastAPI backend**, **React frontend**, **MySQL database**, **Redis**, and **Elasticsearch**. It also includes authentication with **OTP and JWT**, role-based access control, ticket search, reservations, payments, refunds, and an admin panel.

## Documentation

The complete API documentation is available here:

[API Documentation](API_DOCUMENTATION.md)

---

## Features

### User Features

* User registration and login
* OTP-based authentication
* JWT-based authorization
* User profile management
* Browse sports matches
* Search and filter available tickets
* Filter tickets by:

  * City
  * Sport type
  * Venue
  * Home team
  * Away team
  * Date
  * Ticket type
  * Minimum price
  * Maximum price
  * Search query
* View tickets for a specific match
* Reserve tickets
* View reservation information
* Cancel reservations
* Payment status management
* Refund handling

### Admin Features

* Admin authentication
* Role-based access control
* View reservations
* Check reservations by ID
* Cancel reservations
* Manage ticket availability
* View payment information
* View cancelled reservations
* Manage refund information
* Access reporting-related data

---

## Technology Stack

### Backend

* Python 3.13
* FastAPI
* Uvicorn
* Pydantic
* PyMySQL / MySQL Connector
* JWT
* bcrypt
* python-dotenv

### Database

* MySQL 8.0

### Cache & Authentication

* Redis
* OTP storage
* Temporary signup data
* Caching

### Search

* Elasticsearch

### Frontend

* React
* Vite
* JavaScript
* React Router
* Axios
* CSS

---

## Architecture

The backend follows a layered architecture:

```text
Frontend
   |
   | HTTP / REST API
   v
FastAPI
   |
   +---- Routers
   |
   +---- Services
   |
   +---- Repositories
   |
   +---- Security / Utilities
   |
   +---- Redis
   |
   +---- Elasticsearch
   |
   v
MySQL
```

### Backend Layers

**Routers**

Handle HTTP requests and API endpoints.

**Services**

Contain application logic such as authentication, OTP verification, registration, reservation, and other business operations.

**Repositories**

Handle database operations and execute SQL queries.

**Utilities**

Contain shared functionality such as:

* JWT generation and validation
* Elasticsearch client
* Redis client
* Password hashing
* Other helper functions

---

## Database

The project uses MySQL as its main relational database.

Main entities include:

```text
role
city
sport_type
team
refund_policy
ticket_type
feature
users
venue
seat
stadium
section
match
ticket
ticket_feature
reserve
payment
refund
report_about_ticket
report_about_reserve
```

The database contains relationships between users, matches, venues, tickets, seats, reservations, payments, and refunds.

---

## Authentication

The authentication system uses two main mechanisms:

### OTP

Redis is used to temporarily store OTP codes.

The general authentication flow is:

```text
User
  |
  v
Send OTP
  |
  v
Redis
  |
  v
Verify OTP
  |
  v
Register / Login
  |
  v
JWT
```

OTP data has a limited expiration time and is removed after successful verification.

### JWT

After successful authentication, the server generates an access token.

Protected endpoints use the JWT to identify the current user.

Example:

```text
Authorization: Bearer <access_token>
```

The backend extracts the user ID from the JWT and uses it for authorization and database operations.

---

## Role-Based Access Control

The system supports different user roles.

Protected admin endpoints verify the user's role before allowing access.

The general flow is:

```text
Request
   |
   v
JWT Authentication
   |
   v
Get User ID
   |
   v
Check User Role
   |
   +---- Admin ----> Allow
   |
   +---- Other ----> Reject
```

This prevents regular users from accessing administrator functionality.

---

## Redis

Redis is used for temporary and frequently accessed data.

Current uses include:

### OTP

```text
otp:<identifier>
```

OTP entries are stored temporarily with an expiration time.

### OTP Verification

```text
otp_verified:<identifier>
```

Successful OTP verification is temporarily stored to allow the next authentication step.

### Signup Data

Temporary signup information is also stored in Redis during the OTP registration process.

---

## Elasticsearch

Elasticsearch is used to improve ticket searching.

The ticket search system supports multiple filters, including:

```text
city
sport_type
venue
home_team
away_team
date
ticket_type
min_price
max_price
query
```

This allows users to search for tickets using specific filters or a general search query.

For example:

```text
Persepolis F.C.
```

can be used to search for matches and tickets related to a specific team.

---

## Ticket Search API

The main search endpoint is:

```text
GET /tickets/search_ticket
```

Example:

```text
/tickets/search_ticket?city=Tehran&sport_type=Football
```

Multiple filters can be combined.

For example:

```text
/tickets/search_ticket?city=Tehran&venue=Azadi&min_price=500000&max_price=2000000
```

Only non-empty filters are sent from the frontend.

---

## Reservation System

The reservation system connects users with tickets.

A simplified reservation flow is:

```text
User
  |
  v
Select Match
  |
  v
Select Ticket
  |
  v
Create Reservation
  |
  v
Payment
  |
  +---- Successful ----> Confirmed
  |
  +---- Failed --------> Failed
```

Reservation statuses include:

```text
pending
confirmed
cancelled
expired
```

Payment statuses include:

```text
pending
completed
failed
```

Expired reservations can be processed by the backend so that tickets become available again.

---

## Cancellation & Refunds

When an eligible reservation is cancelled, the system can:

1. Change the reservation status.
2. Make the ticket available again.
3. Check whether a payment exists.
4. Create a refund record when necessary.

Refund records contain information such as:

```text
refund_id
amount
status
reason
refunded_at
payment_id
```

Refund statuses include:

```text
requested
processed
declined
```

---

## API Documentation

FastAPI automatically generates interactive API documentation.

After starting the backend, Swagger UI is available at:

```text
http://127.0.0.1:8000/docs
```

ReDoc is also available at:

```text
http://127.0.0.1:8000/redoc
```

Swagger can be used to test the API endpoints directly from the browser.

---

## Project Structure

The backend is organized approximately as follows:

```text
backend/
│
├── routers/
│   ├── auth.py
│   ├── admin.py
│   ├── tickets.py
│   ├── matches.py
│   └── ...
│
├── services/
│   ├── auth_service.py
│   └── ...
│
├── repositories/
│   ├── user_repository.py
│   ├── city_repository.py
│   ├── role_repository.py
│   ├── ticket_repository.py
│   ├── reserve_repository.py
│   └── ...
│
├── models/
│   └── ...
│
├── db/
│   └── database.py
│
├── cache/
│   └── redis_client.py
│
├── utils/
│   ├── security.py
│   └── es_client.py
│
├── .env
└── main.py
```

The frontend is organized using React components and pages:

```text
frontend/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── ...
│
├── package.json
└── vite.config.js
```

---

## Environment Variables

Create a `.env` file for backend configuration.

Example:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database

REDIS_HOST=localhost
REDIS_PORT=6379

ELASTICSEARCH_URL=http://localhost:9200

SECRET_KEY=your_secret_key
```

Do **not** commit the real `.env` file to GitHub.

Add it to `.gitignore`:

```gitignore
.env
__pycache__/
*.pyc
node_modules/
```

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Backend Setup

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install the required packages:

```bash
pip install -r requirements.txt
```

Configure the `.env` file.

Make sure the following services are running:

```text
MySQL
Redis
Elasticsearch
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will normally be available at:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

Go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## CORS

The backend is configured to allow requests from the React development server.

Typical development configuration:

```text
Frontend:
http://localhost:5173

Backend:
http://127.0.0.1:8000
```

This allows the React application to communicate with the FastAPI API during development.

---

## Example API Endpoints

### Authentication

```text
POST /auth/send-otp
POST /auth/verify-otp
POST /auth/register
```

### Tickets

```text
GET /tickets/search_ticket
GET /tickets/match/{match_id}
```

### Matches

```text
GET /matches/
```

### Admin

Admin endpoints are protected using JWT authentication and role verification.

---

## Error Handling

The backend uses FastAPI's `HTTPException` mechanism to return appropriate HTTP status codes and error messages.

For example:

```text
401 Unauthorized
```

is returned when authentication fails or the JWT is invalid/expired.

Authorization failures can also prevent users without the required role from accessing protected endpoints.

---

## Security

The project includes several security mechanisms:

* Password hashing using bcrypt
* JWT authentication
* OTP verification
* Token expiration
* Role-based authorization
* Environment variables for secrets
* Redis expiration for temporary authentication data
* Protected admin endpoints

Sensitive information such as passwords, JWT secret keys, and database credentials should never be committed to the repository.

---

## Development Notes

This project intentionally uses **raw SQL queries** instead of an ORM for database operations.

The repository layer is responsible for database access, which keeps SQL queries separate from API and business logic.

This structure makes the backend easier to organize and maintain while keeping the database queries explicit.

---

## Future Improvements

Possible future improvements include:

* Online payment gateway integration
* SMS OTP provider integration
* More advanced Elasticsearch search
* Ticket recommendation system
* Improved admin dashboard
* Real-time ticket availability
* Reservation timeout handling
* Automated refund processing
* Automated testing
* Docker deployment
* CI/CD pipeline
* Production deployment
* Improved frontend UI/UX

---

## Project Status

This project was developed as a full-stack sports ticketing system with:

* REST API
* Relational database
* Authentication
* Authorization
* Caching
* Search engine
* Reservation system
* Payment and refund management
* React frontend
* Admin functionality

The project is suitable as a university database/full-stack project and can be extended toward a production-ready ticketing platform.

---

## License

This project is developed for educational and project purposes.

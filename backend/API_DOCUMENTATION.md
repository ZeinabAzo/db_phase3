# API Documentation

## Base URL

```text
http://127.0.0.1:8000
```

FastAPI automatically provides interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

ReDoc:

```text
http://127.0.0.1:8000/redoc
```

---

# Authentication

Authenticated endpoints require a valid JWT access token.

The token must be sent in the request header:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

User-specific endpoints use the authenticated user's ID extracted from the JWT.

Admin endpoints additionally require the authenticated user to have the required admin role.

---

# API Overview

| Category       | Method | Endpoint                                     |
| -------------- | ------ | -------------------------------------------- |
| Authentication | POST   | `/auth/signin/send-otp`                      |
| Authentication | POST   | `/auth/signin/verify-otp`                    |
| Authentication | POST   | `/auth/login`                                |
| Authentication | POST   | `/auth/signup`                               |
| Authentication | POST   | `/auth/signup/verify`                        |
| Users          | GET    | `/users/me`                                  |
| Users          | PATCH  | `/users/me`                                  |
| Locations      | GET    | `/get_locations`                             |
| Matches        | GET    | `/matches/`                                  |
| Matches        | POST   | `/matches/`                                  |
| Matches        | GET    | `/matches/{match_id}`                        |
| Matches        | PATCH  | `/matches/{match_id}`                        |
| Tickets        | GET    | `/tickets/search_ticket`                     |
| Tickets        | GET    | `/tickets/match/{match_id}`                  |
| Tickets        | GET    | `/tickets/{ticket_id}`                       |
| Reservations   | POST   | `/reserve/reserve_ticket`                    |
| Reservations   | GET    | `/reserve/active_reservations`               |
| Reservations   | GET    | `/reserve/reservation_history`               |
| Reservations   | GET    | `/reserve/{reserve_id}/cancellation-penalty` |
| Reservations   | POST   | `/reserve/{reserve_id}/cancel`               |
| Reservations   | GET    | `/reserve/purchased_tickets`                 |
| Payments       | POST   | `/payments/request`                          |
| Payments       | POST   | `/payments/callback`                         |
| Payments       | GET    | `/payments/{payment_id}`                     |
| Reports        | POST   | `/reports/ticket`                            |
| Reports        | POST   | `/reports/reserve`                           |
| Admin          | GET    | `/admin/cancelled-reserves`                  |
| Admin          | GET    | `/admin/payments`                            |
| Admin          | GET    | `/admin/reports/tickets`                     |
| Admin          | GET    | `/admin/reports/reserves`                    |
| Admin          | GET    | `/admin/reserves/{reserve_id}`               |
| Admin          | PATCH  | `/admin/reserves/{reserve_id}/cancel`        |
| Admin          | GET    | `/admin/stats`                               |

---

# 1. Authentication APIs

## 1.1 Send Sign-in OTP

```http
POST /auth/signin/send-otp
```

Sends a one-time password for the sign-in process.

### Request Body

```json
{
  "identifier": "user@example.com",
  "identifier_type": "email"
}
```

### Parameters

| Parameter         | Type   | Required | Description                          |
| ----------------- | ------ | -------- | ------------------------------------ |
| `identifier`      | string | Yes      | User's email address or phone number |
| `identifier_type` | string | Yes      | Type of identifier                   |

### Example `identifier_type`

```text
email
phone
```

### Response

The response is returned by the authentication service.

Example:

```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### Errors

If sending the OTP fails:

```text
400 Bad Request
```

---

## 1.2 Verify Sign-in OTP

```http
POST /auth/signin/verify-otp
```

Verifies the OTP sent to the user's email or phone.

### Request Body

```json
{
  "identifier": "user@example.com",
  "identifier_type": "email",
  "code": "123456"
}
```

### Parameters

| Parameter         | Type   | Required | Description           |
| ----------------- | ------ | -------- | --------------------- |
| `identifier`      | string | Yes      | Email or phone number |
| `identifier_type` | string | Yes      | Identifier type       |
| `code`            | string | Yes      | Verification code     |

### Errors

Invalid OTP or failed verification:

```text
401 Unauthorized
```

---

## 1.3 Login

```http
POST /auth/login
```

Authenticates an existing user using their identifier and password.

### Request Body

```json
{
  "identifier": "user@example.com",
  "identifier_type": "email",
  "password": "Password123"
}
```

### Parameters

| Parameter         | Type   | Required | Description           |
| ----------------- | ------ | -------- | --------------------- |
| `identifier`      | string | Yes      | User's email or phone |
| `identifier_type` | string | Yes      | Identifier type       |
| `password`        | string | Yes      | User password         |

### Example `identifier_type`

```text
email
phone
```

### Example Response

The exact response is generated by `login_user()`.

Typical response:

```json
{
  "success": true,
  "access_token": "<JWT_TOKEN>",
  "token_type": "bearer"
}
```

### Error

```text
400 Bad Request
```

---

## 1.4 Sign Up

```http
POST /auth/signup
```

Starts the user registration process.

### Request Body

```json
{
  "identifier": "user@example.com",
  "identifier_type": "email",
  "first_name": "John",
  "last_name": "Doe",
  "password": "Password123",
  "city": "Tehran",
  "role": "user"
}
```

### Parameters

| Parameter         | Type   | Required | Description           |
| ----------------- | ------ | -------- | --------------------- |
| `identifier`      | string | Yes      | Email or phone number |
| `identifier_type` | string | Yes      | Identifier type       |
| `first_name`      | string | Yes      | User's first name     |
| `last_name`       | string | Yes      | User's last name      |
| `password`        | string | Yes      | User password         |
| `city`            | string | Yes      | User's city           |
| `role`            | string | Yes      | User role             |

### Response

The service returns the signup result.

Example:

```json
{
  "success": true,
  "message": "Signup successful"
}
```

### Error

```text
400 Bad Request
```

---

## 1.5 Verify Sign Up

```http
POST /auth/signup/verify
```

Verifies the OTP associated with the signup process.

### Request Body

```json
{
  "identifier": "user@example.com",
  "code": "123456"
}
```

### Parameters

| Parameter    | Type   | Required | Description                       |
| ------------ | ------ | -------- | --------------------------------- |
| `identifier` | string | Yes      | Email or phone used during signup |
| `code`       | string | Yes      | Verification code                 |

### Error

```text
400 Bad Request
```

---

# 2. User APIs

Base path:

```text
/users
```

All user profile endpoints require authentication.

---

## 2.1 Get Current User Profile

```http
GET /users/me
```

Returns the profile of the authenticated user.

### Authentication

Required.

### Request

No body or query parameters are required.

### Response

```json
{
  "user_id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "user@example.com",
  "phone": "09123456789",
  "city": "Tehran"
}
```

The exact returned fields are determined by the user service/database result.

### Errors

```text
404 Not Found
```

---

## 2.2 Update Current User Profile

```http
PATCH /users/me
```

Updates the authenticated user's profile.

### Authentication

Required.

### Request Body

```json
{
  "first_name": "John",
  "last_name": "Smith",
  "email": "john@example.com",
  "phone": "09123456789",
  "profile_image": "profile.jpg",
  "city": "Tehran"
}
```

### Parameters

All fields are optional.

| Parameter       | Type   | Required | Description           |
| --------------- | ------ | -------- | --------------------- |
| `first_name`    | string | No       | Updated first name    |
| `last_name`     | string | No       | Updated last name     |
| `email`         | string | No       | Updated email         |
| `phone`         | string | No       | Updated phone         |
| `profile_image` | string | No       | Updated profile image |
| `city`          | string | No       | Updated city          |

Because all fields are optional, only the fields that need to be changed can be sent.

### Example

```json
{
  "city": "Tehran"
}
```

### Error

```text
400 Bad Request
```

---

# 3. Location API

## 3.1 Get Locations

```http
GET /get_locations
```

Returns available city and venue information.

### Parameters

None.

### Example

```bash
curl "http://127.0.0.1:8000/get_locations"
```

### Response

The response is generated by `get_locations()`.

---

# 4. Match APIs

Base path:

```text
/matches
```

---

## 4.1 Get All Matches

```http
GET /matches/
```

Returns a paginated list of matches.

### Query Parameters

| Parameter   | Type    | Required | Default | Constraints |
| ----------- | ------- | -------- | ------- | ----------- |
| `page`      | integer | No       | `1`     | `>= 1`      |
| `page_size` | integer | No       | `20`    | `1 - 100`   |

### Example

```http
GET /matches/?page=1&page_size=20
```

### Response

```json
{
  "items": [
    {
      "match_id": 1,
      "match_data": "2026-09-01",
      "start_time": "2026-09-01T18:00:00",
      "status": "scheduled",
      "created_at": "2026-08-01T10:00:00",
      "updated_at": "2026-08-01T10:00:00",
      "desc": "League match",
      "sport_type_id": 1,
      "home_team_id": 10,
      "away_team_id": 20,
      "stadium_id": 5,
      "sport_type": "Football",
      "home_team": "Team A",
      "away_team": "Team B",
      "stadium": "Azadi Stadium"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1,
  "total_pages": 1
}
```

### Match Response Fields

| Field           | Type        | Description           |
| --------------- | ----------- | --------------------- |
| `match_id`      | integer     | Match ID              |
| `match_data`    | string/null | Match date/data       |
| `start_time`    | datetime    | Match start time      |
| `status`        | string      | Match status          |
| `created_at`    | datetime    | Creation timestamp    |
| `updated_at`    | datetime    | Last update timestamp |
| `desc`          | string/null | Match description     |
| `sport_type_id` | integer     | Sport type ID         |
| `home_team_id`  | integer     | Home team ID          |
| `away_team_id`  | integer     | Away team ID          |
| `stadium_id`    | integer     | Stadium ID            |
| `sport_type`    | string/null | Sport name            |
| `home_team`     | string/null | Home team name        |
| `away_team`     | string/null | Away team name        |
| `stadium`       | string/null | Stadium name          |

---

## 4.2 Create Match

```http
POST /matches/
```

Creates a new match.

### Request Body

```json
{
  "match_data": "2026-09-01",
  "start_time": "2026-09-01T18:00:00",
  "status": "scheduled",
  "desc": "League match",
  "sport_type_id": 1,
  "home_team_id": 10,
  "away_team_id": 20,
  "stadium_id": 5
}
```

### Parameters

| Parameter       | Type     | Required | Description               |
| --------------- | -------- | -------- | ------------------------- |
| `match_data`    | string   | Yes      | Match date/data           |
| `start_time`    | datetime | Yes      | Match start date and time |
| `status`        | string   | Yes      | Match status              |
| `desc`          | string   | Yes      | Match description         |
| `sport_type_id` | integer  | Yes      | Sport type ID             |
| `home_team_id`  | integer  | Yes      | Home team ID              |
| `away_team_id`  | integer  | Yes      | Away team ID              |
| `stadium_id`    | integer  | Yes      | Stadium ID                |

### Response

```json
{
  "message": "Match created successfully",
  "match_id": 15
}
```

---

## 4.3 Get Match by ID

```http
GET /matches/{match_id}
```

Returns a specific match.

### Path Parameter

| Parameter  | Type    | Required | Description |
| ---------- | ------- | -------- | ----------- |
| `match_id` | integer | Yes      | Match ID    |

### Example

```http
GET /matches/15
```

### Error

```text
404 Not Found
```

```json
{
  "detail": "Match not found"
}
```

---

## 4.4 Update Match

```http
PATCH /matches/{match_id}
```

Updates an existing match.

### Path Parameter

| Parameter  | Type    | Required | Description |
| ---------- | ------- | -------- | ----------- |
| `match_id` | integer | Yes      | Match ID    |

### Request Body

All fields are optional.

```json
{
  "status": "cancelled",
  "desc": "Match cancelled"
}
```

### Parameters

| Parameter       | Type     | Required |
| --------------- | -------- | -------- |
| `match_data`    | string   | No       |
| `start_time`    | datetime | No       |
| `status`        | string   | No       |
| `desc`          | string   | No       |
| `sport_type_id` | integer  | No       |
| `home_team_id`  | integer  | No       |
| `away_team_id`  | integer  | No       |
| `stadium_id`    | integer  | No       |

At least one field must be provided for an actual update.

### Errors

Match not found:

```text
404 Not Found
```

No fields to update:

```text
400 Bad Request
```

```json
{
  "detail": "No fields to update"
}
```

---

# 5. Ticket APIs

Base path:

```text
/tickets
```

---

## 5.1 Search Tickets

```http
GET /tickets/search_ticket
```

Searches for tickets using optional filters.

### Query Parameters

| Parameter     | Type   | Required | Description          |
| ------------- | ------ | -------- | -------------------- |
| `city`        | string | No       | City name            |
| `sport_type`  | string | No       | Sport type           |
| `venue`       | string | No       | Venue name           |
| `home_team`   | string | No       | Home team            |
| `away_team`   | string | No       | Away team            |
| `date`        | string | No       | Match date           |
| `ticket_type` | string | No       | Ticket type          |
| `min_price`   | float  | No       | Minimum price        |
| `max_price`   | float  | No       | Maximum price        |
| `query`       | string | No       | General search query |

All parameters are optional.

### Example

```http
GET /tickets/search_ticket?city=Tehran&sport_type=Football
```

### Price Range Example

```http
GET /tickets/search_ticket?min_price=500000&max_price=2000000
```

### Team Search Example

```http
GET /tickets/search_ticket?home_team=Persepolis%20F.C.
```

### Combined Search

```http
GET /tickets/search_ticket?city=Tehran&sport_type=Football&venue=Azadi&min_price=500000&max_price=2000000
```

### Response

Returns tickets matching the specified filters.

The exact response structure is generated by the ticket service.

---

## 5.2 Get Ticket Details

```http
GET /tickets/{ticket_id}
```

Returns detailed information about a specific ticket.

### Path Parameter

| Parameter   | Type    | Required |
| ----------- | ------- | -------- |
| `ticket_id` | integer | Yes      |

### Example

```http
GET /tickets/25
```

### Error

If the ticket does not exist:

```text
404 Not Found
```

---

## 5.3 Get Tickets for a Match

```http
GET /tickets/match/{match_id}
```

Returns tickets belonging to a specific match.

### Path Parameter

| Parameter  | Type    | Required |
| ---------- | ------- | -------- |
| `match_id` | integer | Yes      |

### Example

```http
GET /tickets/match/15
```

---

# 6. Reservation APIs

Base path:

```text
/reserve
```

All reservation endpoints require authentication.

---

## 6.1 Reserve Ticket

```http
POST /reserve/reserve_ticket
```

Creates a reservation for a ticket.

### Authentication

Required.

### Query Parameter

| Parameter   | Type    | Required | Description |
| ----------- | ------- | -------- | ----------- |
| `ticket_id` | integer | Yes      | Ticket ID   |

### Example

```http
POST /reserve/reserve_ticket?ticket_id=25
```

### Header

```http
Authorization: Bearer <ACCESS_TOKEN>
```

The user ID is extracted automatically from the JWT.

---

## 6.2 Get Active Reservations

```http
GET /reserve/active_reservations
```

Returns the authenticated user's active reservations.

### Authentication

Required.

### Parameters

None.

---

## 6.3 Get Reservation History

```http
GET /reserve/reservation_history
```

Returns the authenticated user's reservation history.

### Authentication

Required.

### Parameters

None.

---

## 6.4 Calculate Cancellation Penalty

```http
GET /reserve/{reserve_id}/cancellation-penalty
```

Calculates the cancellation penalty for a reservation.

### Authentication

Required.

### Path Parameter

| Parameter    | Type    | Required |
| ------------ | ------- | -------- |
| `reserve_id` | integer | Yes      |

### Example

```http
GET /reserve/10/cancellation-penalty
```

The endpoint returns the result of the cancellation penalty calculation.

---

## 6.5 Cancel Reservation

```http
POST /reserve/{reserve_id}/cancel
```

Cancels a reservation for the authenticated user.

The service also handles the associated cancellation and refund logic.

### Authentication

Required.

### Path Parameter

| Parameter    | Type    | Required |
| ------------ | ------- | -------- |
| `reserve_id` | integer | Yes      |

### Example

```http
POST /reserve/10/cancel
```

### Request Body

None.

---

## 6.6 Get Purchased Tickets

```http
GET /reserve/purchased_tickets
```

Returns tickets purchased by the authenticated user.

### Authentication

Required.

### Parameters

None.

---

# 7. Payment APIs

Base path:

```text
/payments
```

---

## 7.1 Request Payment

```http
POST /payments/request
```

Creates a payment request for a reservation.

### Authentication

Required.

### Request Body

```json
{
  "reserve_id": 10,
  "payment_method": "credit_card"
}
```

### Parameters

| Parameter        | Type    | Required | Allowed Values                           |
| ---------------- | ------- | -------- | ---------------------------------------- |
| `reserve_id`     | integer | Yes      | Reservation ID                           |
| `payment_method` | string  | Yes      | `credit_card`, `paypal`, `bank_transfer` |

### Example

```json
{
  "reserve_id": 10,
  "payment_method": "credit_card"
}
```

### Response

The payment service returns the payment request result.

A payment response is structured as:

```json
{
  "payment_id": 20,
  "amount": 1500000,
  "payment_status": "pending",
  "payment_method": "credit_card",
  "transaction_id": "TX123456"
}
```

### Payment Status

```text
pending
completed
failed
```

---

## 7.2 Payment Callback

```http
POST /payments/callback
```

Processes the result of a payment transaction.

### Request Body

```json
{
  "transaction_id": "TX123456",
  "status": "completed"
}
```

### Parameters

| Parameter        | Type   | Required | Allowed Values         |
| ---------------- | ------ | -------- | ---------------------- |
| `transaction_id` | string | Yes      | Payment transaction ID |
| `status`         | string | Yes      | `completed`, `failed`  |

### Example

```json
{
  "transaction_id": "TX123456",
  "status": "failed"
}
```

---

## 7.3 Get Payment

```http
GET /payments/{payment_id}
```

Returns payment information.

### Authentication

Required.

### Path Parameter

| Parameter    | Type    | Required |
| ------------ | ------- | -------- |
| `payment_id` | integer | Yes      |

### Example

```http
GET /payments/20
```

### Payment Response

```json
{
  "payment_id": 20,
  "amount": 1500000,
  "payment_status": "completed",
  "payment_method": "credit_card",
  "transaction_id": "TX123456"
}
```

---

# 8. Report APIs

Base path:

```text
/reports
```

All report endpoints require authentication.

---

## 8.1 Report Ticket

```http
POST /reports/ticket
```

Allows a user to report an issue with a ticket.

### Request Body

```json
{
  "ticket_id": 25,
  "issue_type": "incorrect_ticket_info",
  "description": "The ticket information is incorrect."
}
```

### Parameters

| Parameter     | Type    | Required | Allowed Values     |
| ------------- | ------- | -------- | ------------------ |
| `ticket_id`   | integer | Yes      | Ticket ID          |
| `issue_type`  | string  | Yes      | See below          |
| `description` | string  | Yes      | Report description |

### Allowed `issue_type` Values

```text
payment_issue
incorrect_ticket_info
seat_or_section_problem
schedule_change
unexpected_cancellation
other
```

### Error

```text
400 Bad Request
```

---

## 8.2 Report Reservation

```http
POST /reports/reserve
```

Allows a user to report an issue with a reservation.

### Request Body

```json
{
  "reserve_id": 10,
  "issue_type": "payment_issue",
  "description": "There is a problem with my payment."
}
```

### Parameters

| Parameter     | Type    | Required | Allowed Values     |
| ------------- | ------- | -------- | ------------------ |
| `reserve_id`  | integer | Yes      | Reservation ID     |
| `issue_type`  | string  | Yes      | See below          |
| `description` | string  | Yes      | Report description |

### Allowed `issue_type` Values

```text
payment_issue
ticket_not_received
cancellation_request
incorrect_reserve_info
other
```

### Error

```text
400 Bad Request
```

---

# 9. Admin APIs

Base path:

```text
/admin
```

All admin endpoints require:

* A valid JWT
* An authenticated user
* Admin authorization

---

## 9.1 Get Cancelled Reservations

```http
GET /admin/cancelled-reserves
```

Returns cancelled reservations for administrators.

### Authentication

Admin only.

### Parameters

None.

---

## 9.2 Get All Payments

```http
GET /admin/payments
```

Returns payment information for administrative purposes.

### Authentication

Admin only.

### Parameters

None.

---

## 9.3 Get Ticket Reports

```http
GET /admin/reports/tickets
```

Returns reports submitted about tickets.

### Authentication

Admin only.

### Parameters

None.

---

## 9.4 Get Reservation Reports

```http
GET /admin/reports/reserves
```

Returns reports submitted about reservations.

### Authentication

Admin only.

### Parameters

None.

---

## 9.5 Get Reservation by ID

```http
GET /admin/reserves/{reserve_id}
```

Returns information about a specific reservation.

### Authentication

Admin only.

### Path Parameter

| Parameter    | Type    | Required |
| ------------ | ------- | -------- |
| `reserve_id` | integer | Yes      |

### Example

```http
GET /admin/reserves/10
```

---

## 9.6 Cancel Reservation as Admin

```http
PATCH /admin/reserves/{reserve_id}/cancel
```

Allows an administrator to cancel a reservation.

### Authentication

Admin only.

### Path Parameter

| Parameter    | Type    | Required |
| ------------ | ------- | -------- |
| `reserve_id` | integer | Yes      |

### Request Body

```json
{
  "reason": "Event was cancelled"
}
```

### Parameters

| Parameter | Type        | Required | Description             |
| --------- | ----------- | -------- | ----------------------- |
| `reason`  | string/null | No       | Reason for cancellation |

Because `reason` is optional, the following is also valid:

```json
{}
```

### Example

```http
PATCH /admin/reserves/10/cancel
```

```json
{
  "reason": "Event was cancelled by administrator"
}
```

---

## 9.7 Get Dashboard Statistics

```http
GET /admin/stats
```

Returns statistics used by the admin dashboard.

### Authentication

Admin only.

### Parameters

None.

### Response

The response is generated by:

```text
get_dashboard_stats_service()
```

and contains the dashboard statistics calculated by the backend.

---

# Testing the API

## 10.1 Testing with Swagger UI

Swagger UI is the easiest way to test the API during development.

Start the backend:

```bash
uvicorn main:app --reload
```

Then open:

```text
http://127.0.0.1:8000/docs
```

Swagger provides an interactive interface for all registered endpoints.

### Testing a Public Endpoint

For example:

```text
GET /matches/
```

1. Open the endpoint.
2. Click `Try it out`.
3. Enter the parameters.
4. Click `Execute`.
5. Inspect the response.

---

## 10.2 Testing Authenticated APIs with Swagger

For endpoints such as:

```text
GET /users/me
GET /reserve/active_reservations
GET /payments/20
```

a JWT is required.

If the application exposes the `Authorize` button in Swagger, click:

```text
Authorize
```

and provide:

```text
Bearer <ACCESS_TOKEN>
```

Then execute the endpoint.

---

# 10.3 Testing with Postman

Postman can be used to test the REST API manually.

### GET Request

Example:

```text
GET http://127.0.0.1:8000/matches/
```

Click:

```text
Send
```

---

### GET with Query Parameters

For:

```text
GET /tickets/search_ticket
```

use Postman's `Params` tab.

Example:

```text
Key          Value
----------------------------
city         Tehran
sport_type   Football
min_price    500000
max_price    2000000
```

The resulting request will be:

```text
http://127.0.0.1:8000/tickets/search_ticket?city=Tehran&sport_type=Football&min_price=500000&max_price=2000000
```

---

### POST with JSON

For:

```text
POST /auth/login
```

select:

```text
Body
→ raw
→ JSON
```

and enter:

```json
{
  "identifier": "user@example.com",
  "identifier_type": "email",
  "password": "Password123"
}
```

---

# 10.4 Adding JWT in Postman

For protected endpoints:

```text
Authorization
→ Type: Bearer Token
→ Token: <ACCESS_TOKEN>
```

For example:

```text
GET http://127.0.0.1:8000/users/me
```

Postman will send:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

---

# 10.5 Testing Admin APIs in Postman

Admin endpoints require an admin access token.

Example:

```text
GET http://127.0.0.1:8000/admin/stats
```

Authorization:

```text
Bearer <ADMIN_ACCESS_TOKEN>
```

A normal user token should not be accepted by admin endpoints.

---

# 10.6 Testing with cURL

## Send OTP

```bash
curl -X POST "http://127.0.0.1:8000/auth/signin/send-otp" ^
  -H "Content-Type: application/json" ^
  -d "{\"identifier\":\"user@example.com\",\"identifier_type\":\"email\"}"
```

Linux/macOS:

```bash
curl -X POST "http://127.0.0.1:8000/auth/signin/send-otp" \
  -H "Content-Type: application/json" \
  -d '{"identifier":"user@example.com","identifier_type":"email"}'
```

---

## Verify OTP

```bash
curl -X POST "http://127.0.0.1:8000/auth/signin/verify-otp" ^
  -H "Content-Type: application/json" ^
  -d "{\"identifier\":\"user@example.com\",\"identifier_type\":\"email\",\"code\":\"123456\"}"
```

---

## Login

```bash
curl -X POST "http://127.0.0.1:8000/auth/login" ^
  -H "Content-Type: application/json" ^
  -d "{\"identifier\":\"user@example.com\",\"identifier_type\":\"email\",\"password\":\"Password123\"}"
```

---

## Get User Profile

```bash
curl "http://127.0.0.1:8000/users/me" ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Update User Profile

```bash
curl -X PATCH "http://127.0.0.1:8000/users/me" ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"city\":\"Tehran\"}"
```

---

## Get Matches

```bash
curl "http://127.0.0.1:8000/matches/?page=1&page_size=20"
```

---

## Get Match

```bash
curl "http://127.0.0.1:8000/matches/15"
```

---

## Search Tickets

```bash
curl "http://127.0.0.1:8000/tickets/search_ticket?city=Tehran&sport_type=Football"
```

---

## Get Ticket

```bash
curl "http://127.0.0.1:8000/tickets/25"
```

---

## Get Tickets for Match

```bash
curl "http://127.0.0.1:8000/tickets/match/15"
```

---

## Reserve Ticket

```bash
curl -X POST "http://127.0.0.1:8000/reserve/reserve_ticket?ticket_id=25" ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Get Active Reservations

```bash
curl "http://127.0.0.1:8000/reserve/active_reservations" ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Get Reservation History

```bash
curl "http://127.0.0.1:8000/reserve/reservation_history" ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Calculate Cancellation Penalty

```bash
curl "http://127.0.0.1:8000/reserve/10/cancellation-penalty" ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Cancel Reservation

```bash
curl -X POST "http://127.0.0.1:8000/reserve/10/cancel" ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Get Purchased Tickets

```bash
curl "http://127.0.0.1:8000/reserve/purchased_tickets" ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Request Payment

```bash
curl -X POST "http://127.0.0.1:8000/payments/request" ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"reserve_id\":10,\"payment_method\":\"credit_card\"}"
```

---

## Payment Callback

```bash
curl -X POST "http://127.0.0.1:8000/payments/callback" ^
  -H "Content-Type: application/json" ^
  -d "{\"transaction_id\":\"TX123456\",\"status\":\"completed\"}"
```

---

## Get Payment

```bash
curl "http://127.0.0.1:8000/payments/20" ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Report Ticket

```bash
curl -X POST "http://127.0.0.1:8000/reports/ticket" ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"ticket_id\":25,\"issue_type\":\"incorrect_ticket_info\",\"description\":\"The ticket information is incorrect.\"}"
```

---

## Report Reservation

```bash
curl -X POST "http://127.0.0.1:8000/reports/reserve" ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"reserve_id\":10,\"issue_type\":\"payment_issue\",\"description\":\"There is a problem with the payment.\"}"
```

---

# Admin cURL Examples

All admin requests require an admin JWT.

## Cancelled Reservations

```bash
curl "http://127.0.0.1:8000/admin/cancelled-reserves" ^
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN"
```

## All Payments

```bash
curl "http://127.0.0.1:8000/admin/payments" ^
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN"
```

## Ticket Reports

```bash
curl "http://127.0.0.1:8000/admin/reports/tickets" ^
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN"
```

## Reservation Reports

```bash
curl "http://127.0.0.1:8000/admin/reports/reserves" ^
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN"
```

## Get Reservation

```bash
curl "http://127.0.0.1:8000/admin/reserves/10" ^
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN"
```

## Cancel Reservation as Admin

```bash
curl -X PATCH "http://127.0.0.1:8000/admin/reserves/10/cancel" ^
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"reason\":\"Event was cancelled\"}"
```

## Dashboard Statistics

```bash
curl "http://127.0.0.1:8000/admin/stats" ^
  -H "Authorization: Bearer ADMIN_ACCESS_TOKEN"
```

---

# HTTP Status Codes

| Status Code                 | Meaning                                      |
| --------------------------- | -------------------------------------------- |
| `200 OK`                    | Request completed successfully               |
| `201 Created`               | Resource created successfully                |
| `400 Bad Request`           | Invalid request or business operation failed |
| `401 Unauthorized`          | Authentication is missing or invalid         |
| `403 Forbidden`             | User does not have sufficient permissions    |
| `404 Not Found`             | Requested resource does not exist            |
| `422 Unprocessable Entity`  | Request validation failed                    |
| `500 Internal Server Error` | Internal server error                        |

---

# Recommended API Testing Flow

A complete functional test can be performed in the following order:

```text
1. Start MySQL
       ↓
2. Start Redis
       ↓
3. Start Elasticsearch
       ↓
4. Start FastAPI
       ↓
5. Sign Up
       ↓
6. Verify Sign Up OTP
       ↓
7. Login
       ↓
8. Receive JWT
       ↓
9. Get User Profile
       ↓
10. Browse Matches
       ↓
11. Search Tickets
       ↓
12. Get Ticket Details
       ↓
13. Reserve Ticket
       ↓
14. Request Payment
       ↓
15. Payment Callback
       ↓
16. View Purchased Tickets
       ↓
17. Cancel Reservation if necessary
       ↓
18. Submit Report if necessary
       ↓
19. Admin reviews reservations, payments and reports
```

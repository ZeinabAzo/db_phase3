
## 1. Reserve Status

- `pending`: رزرو موقت انجام شده و پرداخت نهایی نشده است.
- `confirmed`: پرداخت موفق بوده و رزرو قطعی شده است.
- `cancelled`: رزرو توسط کاربر یا پشتیبان لغو شده است.
- `expired`: مهلت پرداخت تمام شده و رزرو منقضی شده است.

## 2. Payment Status

- `pending`: پرداخت در حال پردازش یا هنوز نهایی نشده است.
- `completed`: پرداخت با موفقیت انجام شده است.
- `failed`: پرداخت ناموفق بوده یا درگاه خطا داده است.

## 3. Status Consistency Rules

| Event | reserve.status | payment.payment_status | ticket.status |
|---|---|---|---|
| Initial Reservation | `pending` | `pending` | `reserved` |
| Successful Payment | `confirmed` | `completed` | `sold` |
| Reservation Expired | `expired` | `pending` or `failed` | `available` |
| Failed Payment | `pending` or `expired` | `failed` | `available` |
| Cancellation After Purchase | `cancelled` | `completed` | `available` |

### Critical Rule

`reserve.status = 'confirmed'`

must only be set after:

`payment.payment_status = 'completed'`

## 4. Failed Payment Flow

Payment Failed
    ↓
payment.payment_status = 'failed'
    ↓
Does the reservation still have time to pay?
    ↓
Yes → reserve.status = 'pending'
    ↓
No → reserve.status = 'expired'

## 5. Meaning of "Purchased"

In the project logic, a "purchased ticket" means:

- Payment was successfully completed.
- The reservation was confirmed.
- The ticket has not subsequently been cancelled.

Therefore:

- Purchase in history:
  `payment_status = 'completed'`

- Currently active purchase:
  `payment_status = 'completed'`
  AND
  `reserve.status = 'confirmed'`

- Previously purchased but later cancelled:
  `payment_status = 'completed'`
  AND
  `reserve.status = 'cancelled'`

- Failed payment:
  `payment_status = 'failed'`

## 6. Ticket Cancellation

Cancelled tickets are not deleted.

When a ticket is cancelled:

1. The related reservation is set to `cancelled`.
2. The ticket is immediately set to `available`.
3. The ticket can be sold again.

The reservation record is preserved because it is referenced by other tables, including:

- `report_about_reserve`
- `payment`

Foreign key relationships use:

`ON DELETE RESTRICT`

Therefore, deleting the reservation would cause loss of historical information and is not allowed.

## 7. Suspicious Reservation Reports

A support user can report a suspicious reservation.

- `reporter_id`: ID of the support user who reported the reservation.
- Other support users can review the report.
- If a support user takes action, their ID is stored as `responder_id`.
- The related reservation can then be cancelled.
- The reservation ID is stored in the report.

Regular users can also report problems related to their own reservations.

## 8. Anti-Bot and Reservation Abuse

Two major problems must be considered:

1. Bots purchasing all tickets and reselling them at a higher price.
2. Users reserving large numbers of tickets and keeping them reserved indefinitely, preventing others from purchasing.

### Current Design

Each seat is assigned to one ticket, and each ticket is associated with one reservation.

This design allows the system to:

- Authenticate users when purchasing multiple tickets.
- Detect suspicious repeated reservation loops.
- Analyze IP addresses and reservation patterns.
- Identify potential bots and abusive behavior.

The goal is to detect abuse while minimizing the impact on legitimate users.

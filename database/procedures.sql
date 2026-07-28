-- =========================================================
-- PROCEDURE
-- =========================================================

-- =========================================================
-- 1.
-- =========================================================
-- با دریافت ایمیل یا شماره تلفن  لیست بلیط های خریداری شده توسط کاربر به صورت نزولی نمایش میدیهم
DELIMITER //

CREATE PROCEDURE GetPurchasedTicketsByContact(
    IN p_email VARCHAR(255),
    IN p_phone VARCHAR(50)
)
BEGIN

    SELECT
        t.ticket_id,
        t.price,
        m.match_id,
        m.match_data,
        m.start_time,
        s.name AS stadium_name,
        r.reserve_id,
        r.status AS reservation_status,
        p.amount AS paid_amount,
        p.paid_at AS purchase_time
    FROM users u
    JOIN reserve r
        ON u.user_id = r.user_id
    JOIN ticket t
        ON r.ticket_id = t.ticket_id
    JOIN payment p
        ON r.reserve_id = p.reservation_id
    JOIN `match` m
        ON t.match_id = m.match_id
    JOIN stadium s
        ON m.stadium_id = s.stadium_id
    WHERE
        (u.email = p_email OR u.phone = p_phone)
        AND r.status = 'confirmed'
        AND p.payment_status = 'completed'
    ORDER BY p.paid_at ASC;

END //

DELIMITER ;


-- =========================================================
-- 2.
-- =========================================================
-- منطق کد ما این است که با اطلاعات یک کاربر پشتیبان لیست تمامی کاربرانی که یکبار رزورشون رو توسط این پشتیبان  لغو کردن بدیم
DELIMITER //

CREATE PROCEDURE GetUsersWithCancelledReservationsBySupporter(
    IN p_email VARCHAR(255),
    IN p_phone VARCHAR(50)
)
BEGIN

    SELECT DISTINCT
        u2.user_id,
        u2.first_name,
        u2.last_name,
        u2.email,
        u2.phone
    FROM users supporter
    JOIN `role` ro
        ON supporter.role_id = ro.role_id
    JOIN report_about_reserve rar
        ON supporter.user_id = rar.responder_id
    JOIN reserve r
        ON rar.reserve_id = r.reserve_id
    JOIN users u2
        ON r.user_id = u2.user_id
    WHERE
        (supporter.email = p_email OR supporter.phone = p_phone)
        AND ro.role_name = 'supporter'
        AND r.status = 'cancelled';

END //

DELIMITER ;


-- =========================================================
-- 3.
-- =========================================================
-- با گرفتن نام یک شهر بلیط هایی که مربوط به ماسبقات ان شهر است را نمایش میدهیم
DELIMITER //

CREATE PROCEDURE GetPurchasedTicketsByCity(
IN p_city_name VARCHAR(255)
)
BEGIN

SELECT
    t.ticket_id,
    t.price,
    t.status AS ticket_status,
    m.match_id,
    m.match_data,
    m.start_time,
    s.name AS stadium_name,
    v.name AS venue_name,
    c.name AS city_name,
    r.reserve_id,
    r.status AS reservation_status,
    p.payment_id,
    p.amount AS paid_amount,
    p.paid_at AS purchase_time
FROM city c
JOIN venue v
    ON c.city_id = v.city_id
JOIN stadium s
    ON v.venue_id = s.venue_id
JOIN `match` m
    ON s.stadium_id = m.stadium_id
JOIN ticket t
    ON m.match_id = t.match_id
JOIN reserve r
    ON t.ticket_id = r.ticket_id
JOIN payment p
    ON r.reserve_id = p.reservation_id
WHERE c.name = p_city_name
  AND r.status = 'confirmed'
  AND p.payment_status = 'completed'
ORDER BY p.paid_at ASC;

END //

DELIMITER ;



-- =========================================================
-- 4.
-- =========================================================
-- Ticket Type
-- Venue
-- Reservation
-- Buyer / Spectator
-- Match
-- Team

DELIMITER //

CREATE PROCEDURE SearchTickets(
    IN p_search VARCHAR(255)
)
BEGIN

    SELECT DISTINCT
        t.ticket_id,
        t.price,
        t.status AS ticket_status,

        -- Buyer / Spectator
        u.user_id,
        CONCAT(u.first_name, ' ', u.last_name) AS spectator_name,

        -- Reservation
        r.reserve_id,
        r.status AS reservation_status,

        -- Match
        m.match_id,
        m.match_data,
        m.start_time,

        -- Teams
        home_team.name AS home_team_name,
        away_team.name AS away_team_name,

        -- Venue
        s.name AS stadium_name,
        v.name AS venue_name,

        -- Ticket Type
        tt.ticket_type AS ticket_type

    FROM ticket t

    JOIN reserve r
        ON t.ticket_id = r.ticket_id

    JOIN users u
        ON r.user_id = u.user_id

    JOIN `match` m
        ON t.match_id = m.match_id

    JOIN team home_team
        ON m.home_team_id = home_team.team_id

    JOIN team away_team
        ON m.away_team_id = away_team.team_id

    JOIN stadium s
        ON m.stadium_id = s.stadium_id

    JOIN venue v
        ON s.venue_id = v.venue_id

    JOIN ticket_type tt
        ON t.ticket_type_id = tt.ticket_type_id

    WHERE
        CONCAT(u.first_name, ' ', u.last_name)
            LIKE CONCAT('%', p_search, '%')

        OR home_team.name
            LIKE CONCAT('%', p_search, '%')

        OR away_team.name
            LIKE CONCAT('%', p_search, '%')

        OR s.name
            LIKE CONCAT('%', p_search, '%')

        OR v.name
            LIKE CONCAT('%', p_search, '%')

        OR tt.ticket_type
            LIKE CONCAT('%', p_search, '%')

    ORDER BY m.start_time ASC;

END //

DELIMITER ;


-- =========================================================
-- 5.
-- =========================================================
-- ابتدا شهر مورد نظر را پیدا کرده و سپس کاربر ها با ایدی همالن شهر را نشان میدهیم
DELIMITER //

CREATE PROCEDURE GetUsersFromSameCity(
    IN p_email VARCHAR(255),
    IN p_phone VARCHAR(50)
)
BEGIN

    SELECT
        u.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.phone,
        c.name AS city_name,
        c.province
    FROM users u
    JOIN city c
        ON u.city_id = c.city_id
    WHERE u.city_id = (
        SELECT city_id
        FROM users
        WHERE email = p_email
           OR phone = p_phone
        LIMIT 1
    )
    ORDER BY
        u.last_name,
        u.first_name;

END //

DELIMITER ;

-- =========================================================
-- 6. Identify top n buyers after DATETIME
-- =========================================================
DELIMITER //

CREATE PROCEDURE GetTopNBuyersAfterDate(
    IN p_date DATETIME,
    IN p_n INT
)
BEGIN

    SELECT
        u.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.phone,
        COUNT(DISTINCT r.ticket_id) AS purchased_ticket_count
    FROM users u
    JOIN reserve r
        ON u.user_id = r.user_id
    JOIN payment p
        ON r.reserve_id = p.reservation_id
    WHERE p.payment_status = 'completed'
      AND p.paid_at > p_date
    GROUP BY
        u.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.phone
    ORDER BY
        purchased_ticket_count DESC
    LIMIT p_n;

END //

DELIMITER ;


-- =========================================================
-- 7. Find cancelled reservations/tickets for a specific sport ORDER BY match.start_time DESC
-- =========================================================
DELIMITER //

CREATE PROCEDURE GetCancelledTicketsBySport(
    IN p_sport_name VARCHAR(255)
)
BEGIN

    SELECT
        t.ticket_id,
        t.price,
        r.reserve_id,
        r.status AS reservation_status,
        m.match_id,
        m.match_data,
        m.start_time,
        st.name AS sport_name,
        home_team.name AS home_team_name,
        away_team.name AS away_team_name,
        s.name AS stadium_name
    FROM ticket t

    JOIN reserve r
        ON t.ticket_id = r.ticket_id

    JOIN `match` m
        ON t.match_id = m.match_id

    JOIN sport_type st
        ON m.sport_type_id = st.sport_type_id

    JOIN team home_team
        ON m.home_team_id = home_team.team_id

    JOIN team away_team
        ON m.away_team_id = away_team.team_id

    JOIN stadium s
        ON m.stadium_id = s.stadium_id

    WHERE st.name = p_sport_name
      AND r.status = 'cancelled'

    ORDER BY m.start_time DESC;

END //

DELIMITER ;






-- =========================================================
-- 8.
-- =========================================================
-- عبارتی را در وردی می گیریم و دو جدول
#report_about_reserve report_about_ticket
-- بررسی میکنیم تا گزارش هایی که ان عبارت در توضح گزارش امده را پیدا کنیم
DELIMITER //

CREATE PROCEDURE GetUsersWithMostReportsByDescription(
    IN p_search VARCHAR(255)
)
BEGIN

    SELECT
        u.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.phone,
        COUNT(*) AS report_count
    FROM users u

    JOIN (
        SELECT
            reporter_id,
            description
        FROM report_about_ticket

        UNION ALL

        SELECT
            reporter_id,
            description
        FROM report_about_reserve
    ) AS all_reports
        ON u.user_id = all_reports.reporter_id

    WHERE all_reports.description LIKE CONCAT('%', p_search, '%')

    GROUP BY
        u.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.phone

    ORDER BY
        report_count DESC;

END //

DELIMITER ;
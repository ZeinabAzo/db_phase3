---1
SELECT
    u.first_name,
    u.last_name
FROM users u
WHERE NOT EXISTS (
    SELECT 1
    FROM reserve r
    JOIN payment p
        ON r.reserve_id = p.reservation_id
    WHERE r.user_id = u.user_id
      AND r.status = 'confirmed'
      AND p.payment_status = 'completed'
);

--2
SELECT
    u.first_name,
    u.last_name
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM reserve r
    JOIN payment p
        ON r.reserve_id = p.reservation_id
    WHERE r.user_id = u.user_id
      AND r.status = 'confirmed'
      AND p.payment_status = 'completed'
);

--3
SELECT
    u.user_id,
    u.first_name,
    u.last_name,
    YEAR(p.paid_at) AS payment_year,
    MONTH(p.paid_at) AS payment_month,
    SUM(p.amount) AS total_payment
FROM users u
JOIN reserve r
    ON u.user_id = r.user_id
JOIN payment p
    ON r.reserve_id = p.reservation_id
WHERE p.payment_status = 'completed'
  AND p.paid_at IS NOT NULL
  AND r.status = 'confirmed'
GROUP BY
    u.user_id,
    u.first_name,
    u.last_name,
    YEAR(p.paid_at),
    MONTH(p.paid_at)
ORDER BY
    u.user_id,
    payment_year,
    payment_month;


--4
SELECT
    u.user_id,
    u.first_name,
    u.last_name,
    c.name AS city_name
FROM users u
JOIN reserve r
    ON u.user_id = r.user_id
JOIN payment p
    ON r.reserve_id = p.reservation_id
JOIN ticket t
    ON r.ticket_id = t.ticket_id
JOIN `match` m
    ON t.match_id = m.match_id
JOIN stadium s
    ON m.stadium_id = s.stadium_id
JOIN venue v
    ON s.venue_id = v.venue_id
JOIN city c
    ON v.city_id = c.city_id
WHERE p.payment_status = 'completed'
  AND r.status = 'confirmed'
GROUP BY
    u.user_id,
    u.first_name,
    u.last_name,
    c.city_id,
    c.name
HAVING COUNT(DISTINCT r.ticket_id) = 1
ORDER BY
    u.user_id,
    c.name;

--5
SELECT
    u.user_id,
    u.first_name,
    u.last_name,
    u.email,
    u.phone,
    t.ticket_id,
    t.created_at AS ticket_created_at
FROM users u
JOIN reserve r
    ON u.user_id = r.user_id
JOIN ticket t
    ON r.ticket_id = t.ticket_id
JOIN payment p
    ON r.reserve_id = p.reservation_id
WHERE p.payment_status = 'completed'
ORDER BY t.created_at DESC
LIMIT 1;

--6
SELECT
    u.phone,
    u.email
FROM users u
JOIN reserve r
    ON u.user_id = r.user_id
JOIN payment p
    ON r.reserve_id = p.reservation_id
WHERE p.payment_status = 'completed'
AND r.status = 'confirmed'
GROUP BY
    u.user_id,
    u.phone,
    u.email
HAVING SUM(p.amount) > (
    SELECT AVG(user_total)
    FROM (
        SELECT
            r2.user_id,
            SUM(p2.amount) AS user_total
        FROM reserve r2
        JOIN payment p2
            ON r2.reserve_id = p2.reservation_id
        WHERE p2.payment_status = 'completed'
        GROUP BY r2.user_id
    ) AS user_totals
);

--7
SELECT
    st.sport_type_id,
    st.name AS sport_type,
    COUNT(t.ticket_id) AS sold_ticket_count
FROM sport_type st
LEFT JOIN `match` m
    ON st.sport_type_id = m.sport_type_id
LEFT JOIN ticket t
    ON m.match_id = t.match_id
    AND t.status = 'sold'
GROUP BY
    st.sport_type_id,
    st.name
ORDER BY
    sold_ticket_count DESC;

--8
SELECT
    u.user_id,
    u.first_name,
    u.last_name,
    COUNT(DISTINCT r.ticket_id) AS purchased_ticket_count
FROM users u
JOIN reserve r
    ON u.user_id = r.user_id
JOIN payment p
    ON r.reserve_id = p.reservation_id
WHERE p.payment_status = 'completed'
AND r.status = 'confirmed'
  AND p.paid_at >= NOW() - INTERVAL 7 DAY
GROUP BY
    u.user_id,
    u.first_name,
    u.last_name
ORDER BY
    purchased_ticket_count DESC
LIMIT 3;

--9
SELECT
    c.name AS city_name,
    COUNT(t.ticket_id) AS sold_ticket_count
FROM city c
JOIN venue v
    ON c.city_id = v.city_id
JOIN stadium s
    ON v.venue_id = s.venue_id
JOIN `match` m
    ON s.stadium_id = m.stadium_id
JOIN ticket t
    ON m.match_id = t.match_id
WHERE c.province = 'Tehran'
  AND t.status = 'sold'
GROUP BY
    c.city_id,
    c.name
ORDER BY
    sold_ticket_count DESC;

--10
SELECT DISTINCT
    c.name AS city_name
FROM users u
JOIN reserve r
    ON u.user_id = r.user_id
JOIN payment p
    ON r.reserve_id = p.reservation_id
JOIN ticket t
    ON r.ticket_id = t.ticket_id
JOIN `match` m
    ON t.match_id = m.match_id
JOIN stadium s
    ON m.stadium_id = s.stadium_id
JOIN venue v
    ON s.venue_id = v.venue_id
JOIN city c
    ON v.city_id = c.city_id
WHERE u.user_id = (
    SELECT user_id
    FROM users
    ORDER BY created_at ASC, user_id ASC
    LIMIT 1
)
AND p.payment_status = 'completed'
AND p.paid_at IS NOT NULL;

--12
SELECT
    u.first_name,
    u.last_name
FROM users u
JOIN `role` r
    ON u.role_id = r.role_id
WHERE r.role_name = 'supporter';

--12
SELECT
    u.first_name,
    u.last_name,
    COUNT(DISTINCT r.ticket_id) AS purchased_ticket_count
FROM users u
JOIN reserve r
    ON u.user_id = r.user_id
JOIN payment p
    ON r.reserve_id = p.reservation_id
WHERE p.payment_status = 'completed'
AND r.status = 'confirmed'
GROUP BY
    u.user_id,
    u.first_name,
    u.last_name
HAVING COUNT(DISTINCT r.ticket_id) >= 2;

--13
SELECT
    u.first_name,
    u.last_name,
    COUNT(DISTINCT r.ticket_id) AS purchased_ticket_count
FROM users u
JOIN reserve r
    ON u.user_id = r.user_id
JOIN payment p
    ON r.reserve_id = p.reservation_id
JOIN ticket t
    ON r.ticket_id = t.ticket_id
JOIN `match` m
    ON t.match_id = m.match_id
JOIN sport_type st
    ON m.sport_type_id = st.sport_type_id
WHERE p.payment_status = 'completed'
AND r.status = 'confirmed'
  AND st.name = 'Football'
GROUP BY
    u.user_id,
    u.first_name,
    u.last_name
HAVING COUNT(DISTINCT r.ticket_id) <= 2;

--14
SELECT
    u.email,
    u.phone
FROM users u
JOIN reserve r
    ON u.user_id = r.user_id
JOIN payment p
    ON r.reserve_id = p.reservation_id
JOIN ticket t
    ON r.ticket_id = t.ticket_id
JOIN `match` m
    ON t.match_id = m.match_id
WHERE p.payment_status = 'completed'
AND r.status = 'confirmed'
GROUP BY
    u.user_id,
    u.email,
    u.phone
HAVING COUNT(DISTINCT m.sport_type_id) = (
    SELECT COUNT(*)
    FROM sport_type
);

--15
SELECT
    t.ticket_id,
    t.price,
    t.status,
    p.paid_at
FROM payment p
JOIN reserve r
    ON p.reservation_id = r.reserve_id
JOIN ticket t
    ON r.ticket_id = t.ticket_id
WHERE p.payment_status = 'completed'
AND r.status = 'confirmed'
  AND p.paid_at >= CURDATE()
  AND p.paid_at < CURDATE() + INTERVAL 1 DAY
ORDER BY p.paid_at DESC;

-- 16
SELECT
    m.match_id,
    m.match_data,
    COUNT(t.ticket_id) AS sold_ticket_count
FROM `match` m
JOIN ticket t
    ON m.match_id = t.match_id
WHERE t.status = 'sold'
GROUP BY
    m.match_id,
    m.match_data
ORDER BY
    sold_ticket_count DESC
LIMIT 1 OFFSET 1;

#17
#در کد ما برای این قسمتی که کاربر پشتیبان بتواند رزور های مشکوک را ببیند و لغو اصلاح یا تاید کند مکانیزم زیر در نظر گرفته شده است
#یک کاربر پشتیبان میتواند یک رزور مشکوک را گزارش کند و به عنوان
#reporter_id
# ایدیش ثب شود تا کاربران پشتیبان های دیگر به ان نگاه کنند یا اینکه خودش رزور را برسی کنند#
# در صورت تغیر در رزرو ایدیش به عنوان
#responder_id
#ثبت میشود و در قسمت رزور وضعیت رزور به حالت کنسل تغیر میکند و ایدی رزرومورد نظر در گزارش ثبت میشود
# همچنین خود کاربران عادی هم میتواندد مشکلات در مورد رزرو خود را ثبت کنند
# درصد رزروهای کنسل‌شده‌ای که توسط این پشتیبان رسیدگی شده، نسبت به کل رزروهای کنسل‌شده‌ای که توسط یک responder رسیدگی شده‌اند
SELECT
    u.first_name,
    u.last_name,
    COUNT(DISTINCT rar.reserve_id) AS cancelled_reserve_count,
    ROUND(
        COUNT(DISTINCT rar.reserve_id) * 100.0 /
        (
            SELECT COUNT(DISTINCT reserve_id)
            FROM report_about_reserve
            WHERE reserve_id IN (
                SELECT reserve_id
                FROM reserve
                WHERE status = 'cancelled'
            )
            AND responder_id IS NOT NULL
        ),
        2
    ) AS cancellation_percentage
FROM users u
JOIN `role` r
    ON u.role_id = r.role_id
JOIN report_about_reserve rar
    ON u.user_id = rar.responder_id
JOIN reserve res
    ON rar.reserve_id = res.reserve_id
WHERE r.role_name = 'supporter'
  AND res.status = 'cancelled'
GROUP BY
    u.user_id,
    u.first_name,
    u.last_name
ORDER BY
    cancelled_reserve_count DESC
LIMIT 1;

#18
UPDATE users
SET last_name = 'Reddington'
WHERE user_id = (
    SELECT user_id
    FROM (
        SELECT
            r.user_id
        FROM reserve r
        WHERE r.status = 'cancelled'
        GROUP BY r.user_id
        ORDER BY COUNT(*) DESC
        LIMIT 1
    ) AS temp
);

#19
# در دریتا بیس ما حذف کردن تیکت کنسل شده معنا ندارد
# چرا که موقع کنسلی از سمت کاربر ما بلافاصله وضعیت تیکت را به حالت در دسترس تغیر میدهیم
# تا بتوانیم دوباره ان را بفروشیم مانند تمام کسب و کار ها منطقی
#   فلذا کاری که میکنیم رزور مربوط به اون تیکت را در حالت کنسل شده قرار مدیهم تا اطلاعت را داشته باشیم
#حذف رزرو هم در سیتم ما کار خوبی نیست چرا که رزور کلید های خارجی در جداول دیگری هست و نمیخواهیم ان ها را از دست بدهیم و وضعیت ان ها روی حالت
#ON DELETE RESTRICT
# قرار دادیم و نمیخواهم تغیر بدهیم
#جداول مربوط
#report_about_reserve , payment

DELETE FROM reserve
WHERE status = 'cancelled'
  AND user_id IN (
      SELECT user_id
      FROM users
      WHERE last_name = 'Reddington'
  );

#20
DELETE FROM reserve
WHERE status = 'cancelled';

#21
UPDATE ticket t
JOIN `match` m
    ON t.match_id = m.match_id
JOIN stadium s
    ON m.stadium_id = s.stadium_id
SET t.price = t.price * 0.90
WHERE t.status = 'sold'
  AND s.name = 'Azadi'
  AND DATE(m.start_time) = CURRENT_DATE - INTERVAL 1 DAY;

#22
WITH ReportCounts AS (
    SELECT
        ticket_id,
        COUNT(*) AS report_count
    FROM report_about_ticket
    GROUP BY ticket_id
),
MaxReport AS (
    SELECT MAX(report_count) AS max_report_count
    FROM ReportCounts
)
SELECT
    r.ticket_id,
    r.description,
    rc.report_count
FROM report_about_ticket r
JOIN ReportCounts rc
    ON r.ticket_id = rc.ticket_id
JOIN MaxReport mr
    ON rc.report_count = mr.max_report_count
ORDER BY r.ticket_id;

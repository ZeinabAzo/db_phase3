-- ==========================================
-- INSERT
-- ==========================================





SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- LEVEL 1
-- ============================================================

INSERT INTO `role` (role_id, role_name, `desc`) VALUES
(1, 'spectator', 'Regular user who can buy and reserve tickets'),
(2, 'support_staff', 'Website support staff who manages disputes and system'),
(3, 'venue_manager', 'Manager of a specific venue or stadium'),
(4, 'organizer', 'Event organizer who manages matches and tickets'),
(5, 'premium_member', 'Premium member with special discounts and benefits'),
(6, 'disabled_user', 'User with special accessibility needs'),
(7, 'student', 'Student with special discount eligibility'),
(8, 'corporate_client', 'Corporate bulk ticket buyer'),
(9, 'banned_user', 'Previously active user who was banned'),
(10, 'guest', 'Temporary guest user with limited access'),
(11,'super_admin','super_admin'),
(12,'admin','admin');

INSERT INTO city (city_id, name, province) VALUES
(1, 'Tehran', 'Tehran'),
(2, 'Karaj', 'Alborz'),
(3, 'Shiraz', 'Fars'),
(4, 'Isfahan', 'Isfahan'),
(5, 'Tabriz', 'East Azerbaijan'),
(6, 'Mashhad', 'Razavi Khorasan'),
(7, 'Ahvaz', 'Khuzestan'),
(8, 'Qom', 'Qom'),
(9, 'Rasht', 'Gilan'),
(10, 'Qazvin', 'Qazvin');

INSERT INTO sport_type (sport_type_id, name, `desc`, rules) VALUES
(1, 'Football', 'Professional football/soccer matches', '11 vs 11 players, 90 minutes'),
(2, 'Volleyball', 'Professional volleyball tournaments', '6 vs 6 players, 5 sets maximum'),
(3, 'Basketball', 'Professional basketball games', '5 vs 5 players, 4 quarters'),
(4, 'Handball', 'Professional handball matches', '7 vs 7 players, 2 halves'),
(5, 'Badminton', 'Badminton championship events', '1v1 or 2v2 players, best of matches'),
(6, 'Cycling', 'Professional cycling tours and events', 'Individual or team races'),
(7, 'Swimming', 'Olympic-style swimming competitions', 'Individual events in pool'),
(8, 'Athletics', 'Track and field championships', 'Sprint, jump, and throw events'),
(9, 'Tennis', 'Professional tennis tournaments', 'Single or double matches, best of sets'),
(10, 'Esports', 'Professional esports tournaments', 'Video game competitions, LAN tournaments');

INSERT INTO team (team_id, name, `desc`, created_at, status) VALUES
(1, 'Persepolis F.C.', 'Iran''s most successful football club with 8 Asian titles', '2010-01-15 09:00:00', 'active'),
(2, 'Esteghlal F.C.', 'Historic Iranian football powerhouse', '2010-02-20 10:30:00', 'active'),
(3, 'Sepahan F.C.', 'Isfahan-based professional football club', '2012-05-10 14:00:00', 'active'),
(4, 'Foolad F.C.', 'Khuzestan province football club', '2011-03-25 08:00:00', 'active'),
(5, 'Saba Battery V.C.', 'Elite Iranian volleyball team', '2015-06-18 11:00:00', 'active'),
(6, 'Iran National Basketball Team', 'National basketball team for international events', '2008-11-30 15:45:00', 'active'),
(7, 'Shahr Arak Team', 'Up-and-coming football club', '2022-09-01 07:30:00', 'active'),
(8, 'Persepolis Youth Academy', 'Youth team for development', '2018-04-12 09:15:00', 'active'),
(9, 'Female Volleyball Team Iran', 'Women''s national volleyball team', '2010-08-22 16:00:00', 'active'),
(10, 'Mixed Doubles Tennis Team', 'National tennis doubles team', '2020-12-05 13:20:00', 'active');

INSERT INTO refund_policy (refund_policy_id, name, `desc`) VALUES
(1, 'Full Refund', 'Full refund available if cancelled 7 days before event'),
(2, 'Partial Refund 50%', '50% refund if cancelled 3-7 days before event'),
(3, 'Partial Refund 25%', '25% refund if cancelled 1-3 days before event'),
(4, 'No Refund', 'No refund available after purchase, only exchange allowed'),
(5, 'Full Refund Until 24h', 'Full refund available until 24 hours before event'),
(6, 'Conditional Full Refund', 'Full refund only if event is cancelled by organizer'),
(7, 'Premium Exchange Only', 'Premium tickets can be exchanged for same tier only'),
(8, 'Weather Dependent Refund', '100% refund if event cancelled due to weather'),
(9, 'Senior Citizen Refund', 'Full refund up to 3 days before for seniors and disabled'),
(10, 'Group Booking Refund', 'Special refund policy for groups of 10+ tickets');

INSERT INTO ticket_type (ticket_type_id, ticket_type, `desc`) VALUES
(1, 'Standard Adult', 'Full price ticket for adults'),
(2, 'Student Discount', 'Discounted ticket for students with valid ID'),
(3, 'Child Half Price', 'Half price ticket for children under 12'),
(4, 'Senior Citizen', 'Discounted ticket for seniors over 65'),
(5, 'Disabled Accessible', 'Special ticket for disabled persons and one companion'),
(6, 'VIP Premium', 'Premium ticket with extra benefits and guaranteed seat'),
(7, 'Group Discount 10+', 'Discounted rate for groups of 10 or more tickets'),
(8, 'Early Bird', 'Discounted ticket for purchases made more than 30 days in advance'),
(9, 'Last Minute', 'Discounted ticket for purchases within 24 hours of event'),
(10, 'Standing Room Only', 'Standing-area ticket');

INSERT INTO feature (feature_id, name, `desc`) VALUES
(1, 'WiFi Access', 'Free high-speed WiFi throughout venue'),
(2, 'Covered Seating', 'Protected from weather elements'),
(3, 'Food Service', 'Food and beverage vendors available in section'),
(4, 'VIP Lounge Access', 'Access to exclusive VIP lounge with premium drinks'),
(5, 'Parking Included', 'Free parking permit in venue parking lot'),
(6, 'Wheelchair Accessible', 'Full wheelchair accessibility and companion seating'),
(7, 'Premium Restrooms', 'Access to upscale restroom facilities'),
(8, 'Parking Reserved', 'Reserved parking spot near entrance'),
(9, 'Early Entry', 'Entry to venue 30 minutes before general admission'),
(10, 'Post-Game Access', 'Access to post-game autograph and photo sessions');

-- ============================================================
-- LEVEL 2
-- ============================================================

INSERT INTO users
(user_id, first_name, last_name, email, phone, password_hash, profile_image,
 `status`, created_at, updated_at, role_id, city_id)
VALUES
(1, 'Mohammad', 'Rezaei', 'rezaei.m@email.com', '09121234567',
 SHA2('Password123!', 256), '/images/user1.jpg', 'active',
 '2020-01-15 08:00:00', '2024-06-17 10:30:00', 1, 1),

(2, 'Fatima', 'Hosseini', 'fatima.h@email.com', '09389876543',
 SHA2('SecurePass456!', 256), '/images/user2.jpg', 'active',
 '2019-06-20 14:30:00', '2024-06-16 15:45:00', 1, 1),

(3, 'Ali', 'Ahmadi', NULL, '09157891011',
 SHA2('MyPassword789!', 256), NULL, 'active',
 '2023-11-10 09:15:00', '2024-06-15 20:00:00', 1, 3),

(4, 'Sara', 'Javadi', 'sara.javadi@email.com', NULL,
 SHA2('Sara2024Pass!', 256), '/images/user4.jpg', 'active',
 '2024-01-05 11:00:00', '2024-06-10 12:30:00', 1, 2),

(5, 'Hassan', 'Karimi', 'hassan.k@email.com', '09167776666',
 SHA2('HasanSecure22!', 256), NULL, 'inactive',
 '2021-09-12 16:45:00', '2023-02-14 10:00:00', 1, 4),

(6, 'Maryam', 'Behzadi', 'maryam.admin@email.com', '09191919191',
 SHA2('AdminPass2024!', 256), '/images/admin1.jpg', 'active',
 '2015-03-08 08:00:00', '2024-06-17 09:00:00', 2, 1),

(7, 'Reza', 'Sadegh', 'reza.s@email.com', '09123456789',
 SHA2('RezaPass!', 256), '/images/user7.jpg', 'banned',
 '2022-05-20 13:30:00', '2023-10-01 14:30:00', 1, 5),

(8, 'Leila', 'Moradi', 'leila.m@email.com', '09112233445',
 SHA2('LeilaSecure!', 256), '/images/user8.jpg', 'active',
 '2023-08-15 10:00:00', '2024-06-17 08:00:00', 5, 1),

(9, 'Keyvan', 'Faroghi', 'keyvan@corporate.com', '09998765432',
 SHA2('CorporatePass!', 256), '/images/user9.jpg', 'active',
 '2023-03-10 09:00:00', '2024-06-16 17:00:00', 8, 1),

(10, 'Nasrin', 'Ebrahimi', 'nasrin.student@email.com', '09134567890',
 SHA2('StudentPass24!', 256), '/images/user10.jpg', 'active',
 '2024-04-02 14:00:00', '2024-06-17 16:30:00', 7, 6,

 (11,'super_admin1234','super_admin1234','super_admin1234@email.com',null,
 '$2b$12$35Hp58Pxvqw/RvksbPHMMeHxt2vGuMb5PHWiB3xI7zQOsAfdjT5kC',
 null,'active','2026-07-30 08:35:38','2026-07-30 08:35:38',11,1),

(12,'admin1234','admin1234','admin1234@email.com',null,
 '$2b$12$vZI1E49zFeGE2oDyAeX13ORBQu2rxqpzFvG2QiqZ6hBKjO/C9RRJm',
 null,'active','2026-07-30 08:37:18','2026-07-30 08:37:18',12,1),

(13,'spectator123456','spectator123456','spectator123456@email.com',null,
 '$2b$12$4erTDpQEygGnsGjskT5qtuUI9LjVKl3H4.XckqkXAspVfj26Qsd8i',
 null,'active','2026-07-30 08:40:12','2026-07-30 08:40:12',1,1);

INSERT INTO venue
(venue_id, `name`, address, `desc`, created_at, city_id)
VALUES
(1, 'Azadi Stadium', 'Azadi Square, Tehran',
 'National football stadium, capacity 100,000+, hosts international matches',
 '1975-06-10 00:00:00', 1),

(2, 'Shahid Bakeri Sports Complex', 'Northern Tehran',
 'Modern multi-sport facility with volleyball and basketball courts',
 '2005-03-15 00:00:00', 1),

(3, 'Habibi Indoor Hall', 'Tabriz Center',
 'Indoor volleyball and basketball venue, capacity 6,000',
 '2010-09-20 00:00:00', 5),

(4, 'Imam Square Arena', 'Naqsh-e Jahan Square, Isfahan',
 'Outdoor sports complex with historical significance',
 '2000-05-18 00:00:00', 4),

(5, 'Ghadir Swimming Pool Complex', 'South Shiraz',
 'Olympic-size swimming pool with diving facilities',
 '2008-11-25 00:00:00', 3),

(6, 'Kasgargar Stadium', 'Karaj Downtown',
 'Football stadium with 25,000 capacity, newly renovated',
 '2022-08-10 00:00:00', 2),

(7, 'Kish Indoor Sports Hall', 'Kish Island',
 'Island-based sports venue with unique location, 8,000 capacity',
 '2018-01-30 00:00:00', 1),

(8, 'Amir Kabir Gymnasium', 'Qom University Campus',
 'University-based venue, primarily for local events',
 '2012-10-05 00:00:00', 8),

(9, 'Ekbatan Outdoor Grounds', 'West Tehran',
 'Large open-air ground for multiple sports',
 '1995-02-14 00:00:00', 1),

(10, 'Rasht Volleyball Hall', 'Gilan Province Center',
 'Regional volleyball hub with 4,500 capacity',
 '2015-07-22 00:00:00', 9);

-- ============================================================
-- LEVEL 3
-- ============================================================

INSERT INTO stadium
(stadium_id, name, capacity, `desc`, created_at, venue_id)
VALUES
(1, 'Azadi Football Stadium', 100000,
 'Main football stadium section of Azadi complex, international standard',
 '1975-06-10 00:00:00', 1),

(2, 'Azadi Secondary Field', 20000,
 'Secondary pitch in Azadi for practice and smaller matches',
 '1975-06-10 00:00:00', 1),

(3, 'Shahid Bakeri Volleyball Court', 6000,
 'Olympic-size volleyball court with modern facilities',
 '2005-03-15 00:00:00', 2),

(4, 'Shahid Bakeri Basketball Arena', 4500,
 'FIBA-standard basketball court with professional setup',
 '2005-03-15 00:00:00', 2),

(5, 'Ghadir Olympic Pool', 2500,
 'Olympic swimming pool with spectator seating',
 '2008-11-25 00:00:00', 5),

(6, 'Habibi Indoor Hall', 6000,
 'Multi-sport indoor facility in Tabriz',
 '2010-09-20 00:00:00', 3),

(7, 'Kasgargar Main Field', 25000,
 'Recently renovated main football field, state-of-the-art',
 '2022-08-10 00:00:00', 6),

(8, 'Imam Square Open Ground', 30000,
 'Large outdoor space for various sports events',
 '2000-05-18 00:00:00', 4),

(9, 'Kish Island Sports Hall', 8000,
 'Island venue with unique logistics challenges',
 '2018-01-30 00:00:00', 7),

(10, 'Rasht Regional Volleyball', 4500,
 'Regional hub for volleyball in northern Iran',
 '2015-07-22 00:00:00', 10);

-- ============================================================
-- LEVEL 4
-- ============================================================


INSERT INTO section
(section_id, name, capacity, `desc`, price_multiplier, stadium_id)
VALUES
(1, 'North Stand', 5000, 'North terrace, regular seating', 1.00, 1),
(2, 'South VIP', 800, 'VIP section with premium seating and catering', 2.50, 1),
(3, 'East Wheelchair', 120, 'Accessible seating for disabled spectators', 1.00, 1),
(4, 'West Premium', 1200, 'Premium section with better views', 1.75, 1),
(5, 'Corner Family', 600, 'Family-friendly section with special amenities', 1.20, 1),
(6, 'Upper Deck', 3000, 'Budget section with distant views', 0.75, 1),
(7, 'VIP Lounge', 200, 'Exclusive lounge with full catering service', 4.00, 1),
(8, 'Press Box', 50, 'Reserved for media and broadcasters', 0.00, 1),
(9, 'Stadium Suite', 100, 'Private suite with bar and restaurant access', 3.50, 1),
(10, 'General Admission', 4000, 'Standing room only, general admission', 0.50, 1);

-- ============================================================
-- LEVEL 5
-- ============================================================

INSERT INTO seat
(seat_id, `row_number`, seat_number, seat_type, is_active, section_id)
VALUES
(1, 'A', '01', 'regular', 1, 1),
(2, 'A', '02', 'regular', 1, 1),
(3, 'B', '01', 'regular', 1, 1),
(4, 'A', '01', 'wheelchair', 1, 3),
(5, 'A', '02', 'companion', 1, 3),
(6, 'VIP', '01', 'premium', 1, 2),
(7, 'VIP', '02', 'premium', 1, 2),
(8, 'P', '50', 'premium', 0, 4),
(9, 'C', '15', 'regular', 1, 5),
(10, 'STANDING', '001', 'standing', 1, 10);

INSERT INTO `match`
(match_id, match_data, start_time, created_at, `status`, updated_at,
 `desc`, sport_type_id, home_team_id, away_team_id, stadium_id)
VALUES
(1, 'Persepolis vs Esteghlal - Derby Match',
 '2024-07-15 19:00:00', '2024-06-01 10:00:00', 'scheduled',
 '2024-06-15 14:30:00', 'Historic Tehran Derby, heavily anticipated',
 1, 1, 2, 1),

(2, 'Sepahan vs Foolad',
 '2024-06-18 17:30:00', '2024-06-01 10:00:00', 'finished',
 '2024-06-18 20:45:00', 'Regional match completed',
 1, 3, 4, 8),

(3, 'Iran National Basketball vs Asian Opponent',
 '2024-08-20 18:00:00', '2024-05-15 09:00:00', 'scheduled',
 '2024-06-16 11:00:00', 'International basketball championship qualifier',
 3, 6, NULL, 2),

(4, 'Saba Battery vs Iranian Women Volleyball',
 '2024-07-22 15:00:00', '2024-06-01 10:00:00', 'cancelled',
 '2024-06-10 12:00:00', 'Cancelled due to injury of key player',
 2, 5, 9, 3),

(5, 'Persepolis Youth vs Esteghlal Youth Academy',
 '2024-06-20 16:00:00', '2024-06-15 10:00:00', 'scheduled',
 '2024-06-15 10:00:00', 'Youth league match',
 1, 8, NULL, 1),

(6, 'Mixed Doubles Tennis Championship - Semifinal',
 '2024-07-05 14:00:00', '2024-05-20 09:00:00', 'finished',
 '2024-07-05 16:30:00', 'National tennis championship semifinal',
 9, 10, NULL, 5),

(7, 'Cycling Tour Stage 3',
 '2024-08-10 08:00:00', '2024-07-01 10:00:00', 'scheduled',
 '2024-06-16 15:00:00', 'Multi-day cycling tour stage',
 6, NULL, NULL, 9),

(8, 'Esports Championship Final - CS:GO',
 '2024-07-30 20:00:00', '2024-06-01 10:00:00', 'scheduled',
 '2024-06-17 09:00:00', 'Professional esports championship final',
 10, NULL, NULL, 2),

(9, 'Sepahan vs Esteghlal',
 '2024-06-25 19:30:00', '2024-06-10 10:00:00', 'scheduled',
 '2024-06-15 14:00:00', 'Match postponed due to weather forecast',
 1, 3, 2, 4),

(10, 'Tabriz Club vs Local Regional Team',
 '2024-09-05 17:00:00', '2024-06-15 10:00:00', 'scheduled',
 '2024-06-17 08:00:00', 'Early season match with new team',
 1, NULL, NULL, 6);

-- ============================================================
-- LEVEL 6
-- ============================================================

INSERT INTO ticket
(ticket_id, price, `status`, created_at, updated_at,
 match_id, seat_id, ticket_type_id, refund_policy_id)
VALUES
(1, 450000.00, 'available', '2024-06-01 10:00:00', '2024-06-17 08:00:00',
 1, 1, 1, 1),

(2, 350000.00, 'available', '2024-06-01 10:00:00', '2024-06-17 08:00:00',
 1, 2, 10, 1),

(3, 1200000.00, 'available', '2024-06-01 10:00:00', '2024-06-17 08:00:00',
 1, 6, 6, 1),

(4, 225000.00, 'sold', '2024-06-01 10:00:00', '2024-06-17 08:00:00',
 1, 3, 2, 1),

(5, 350000.00, 'available', '2024-06-02 10:00:00', '2024-06-10 14:30:00',
 2, 4, 5, 4),

(6, 1800000.00, 'available', '2024-05-20 10:00:00', '2024-06-17 08:00:00',
 3, 7, 6, 5),

(7, 0.00, 'available', '2024-06-01 10:00:00', '2024-06-17 08:00:00',
 3, 8, 1, 6),

(8, 180000.00, 'available', '2024-06-01 10:00:00', '2024-06-17 08:00:00',
 4, 5, 3, 3),

(9, 600000.00, 'available', '2024-06-01 10:00:00', '2024-06-17 08:00:00',
 5, 9, 1, 1),

(10, 280000.00, 'available', '2024-06-15 10:00:00', '2024-06-17 08:00:00',
 10, 10, 9, 2);

INSERT INTO ticket_feature (feature_id, ticket_id) VALUES
(2, 1),
(3, 2),
(4, 3),
(8, 3),
(6, 5),
(1, 6),
(8, 6),
(7, 3),
(5, 7),
(9, 9);

-- ============================================================
-- LEVEL 7
-- ============================================================

INSERT INTO reserve
(reserve_id, expire_at, created_at, confirmed_at, total_price,
 updated_at, `status`, user_id, ticket_id)
VALUES
(1, '2024-06-17 11:00:00',
 '2024-06-17 10:00:00', NULL, 450000.00,
 '2024-06-17 10:05:00', 'pending', 1, 1),

(2, '2024-06-17 10:30:00',
 '2024-06-17 09:00:00', NULL, 350000.00,
 '2024-06-17 09:10:00', 'pending', 2, 2),

(3, '2024-06-15 15:00:00',
 '2024-06-15 14:00:00', '2024-06-15 14:15:00', 1200000.00,
 '2024-06-15 18:00:00', 'confirmed', 8, 3),

(4, '2024-06-10 18:00:00',
 '2024-06-10 17:00:00', NULL, 180000.00,
 '2024-06-10 19:00:00', 'cancelled', 3, 8),

(5, '2024-06-18 14:00:00',
 '2024-06-17 13:00:00', NULL, 1800000.00,
 '2024-06-17 13:30:00', 'pending', 9, 6),

(6, '2024-06-16 20:00:00',
 '2024-06-16 19:00:00', NULL, 600000.00,
 '2024-06-16 19:10:00', 'cancelled', 4, 9),

(7, '2024-06-15 11:00:00',
 '2024-06-14 10:00:00', '2024-06-14 10:15:00', 1800000.00,
 '2024-06-14 11:00:00', 'confirmed', 2, 6),

(8, '2024-06-17 16:30:00',
 '2024-06-17 15:30:00', NULL, 180000.00,
 '2024-06-17 15:45:00', 'pending', 4, 5),

(9, '2024-06-13 19:00:00',
 '2024-06-13 18:00:00', NULL, 280000.00,
 '2024-06-13 18:20:00', 'cancelled', 5, 10),

(10, '2024-06-19 12:00:00',
 '2024-06-17 11:00:00', NULL, 225000.00,
 '2024-06-17 11:20:00', 'pending', 9, 4);

INSERT INTO report_about_ticket
(report_id, description, `status`, created_at, updated_at,
 respond, responder_id, ticket_id, reporter_id)
VALUES
(1, 'Ticket price seems higher than advertised price on website',
 'pending', '2024-06-16 14:00:00', '2024-06-16 14:00:00',
 NULL, NULL, 1, 1),

(2, 'Seat location does not match the ticket description',
 'in_progress', '2024-06-15 10:30:00', '2024-06-17 08:00:00',
 'We are investigating the seating chart mismatch', 6, 3, 2),

(3, 'Event was suddenly cancelled but no refund issued',
 'resolved', '2024-06-10 09:00:00', '2024-06-13 16:30:00',
 'Full refund has been processed to your account', 6, 8, 3),

(4, 'Website crashed during checkout, payment charged twice',
 'in_progress', '2024-06-14 11:45:00', '2024-06-17 07:00:00',
 'Investigating duplicate charge and payment records', 6, 4, 8),

(5, 'Cannot access ticket after purchase, only QR code broken',
 'pending', '2024-06-17 09:15:00', '2024-06-17 09:15:00',
 NULL, NULL, 6, 9),

(6, 'Accessibility features mentioned in ticket not available at venue',
 'resolved', '2024-06-12 13:20:00', '2024-06-14 10:00:00',
 'Venue manager contacted and facilities confirmed available.', 6, 5, 4),

(7, 'Discount code not applied to my purchase',
 'pending', '2024-06-16 15:45:00', '2024-06-16 15:45:00',
 NULL, NULL, 2, 1),

(8, 'Event rescheduled but I was not informed',
 'in_progress', '2024-06-11 16:00:00', '2024-06-15 12:00:00',
 'Checking notification system for why alert was not sent', 6, 9, 3),

(9, 'Ticket is counterfeit according to venue security',
 'in_progress', '2024-06-17 17:00:00', '2024-06-17 17:00:00',
 'Urgent investigation initiated, contacting payment processor', 6, 7, 2),

(10, 'Minor printing error on ticket, not affecting usability',
 'resolved', '2024-06-13 12:30:00', '2024-06-13 14:00:00',
 'Printing error confirmed but ticket is valid. No action needed.', 6, 10, 4);

-- ============================================================
-- LEVEL 8
-- ============================================================

INSERT INTO report_about_reserve
(report_id, description, `status`, created_at, updated_at,
 respond, responder_id, reserve_id, reporter_id)
VALUES
(1, 'Reservation expired without giving me enough time to pay',
 'pending', '2024-06-17 11:30:00', '2024-06-17 11:30:00',
 NULL, NULL, 2, 2),

(2, 'System cancelled my reservation unexpectedly',
 'in_progress', '2024-06-15 15:00:00', '2024-06-16 10:00:00',
 'Reviewing system logs for the cancellation trigger', 6, 4, 3),

(3, 'Cannot cancel my reservation through the app',
 'resolved', '2024-06-13 12:45:00', '2024-06-13 14:30:00',
 'Cancellation processed successfully. Refund will be issued within 3-5 business days.',
 6, 6, 4),

(4, 'Price changed after I reserved the ticket',
 'pending', '2024-06-16 16:20:00', '2024-06-16 16:20:00',
 NULL, NULL, 3, 8),

(5, 'Reservation shows as confirmed but payment shows as pending',
 'in_progress', '2024-06-14 13:15:00', '2024-06-17 09:00:00',
 'Data mismatch investigation in progress, payment verification underway',
 6, 3, 2),

(6, 'Got charged twice for the same reservation',
 'in_progress', '2024-06-11 10:00:00', '2024-06-15 14:00:00',
 'Investigating duplicate charge, credit card company contacted',
 6, 5, 9),

(7, 'Received no confirmation email after reserving',
 'resolved', '2024-06-17 08:00:00', '2024-06-17 08:30:00',
 'Confirmation email resent. Please check spam folder if not received.',
 6, 1, 1),

(8, 'Cannot proceed to payment, stuck at confirmation page',
 'pending', '2024-06-17 09:45:00', '2024-06-17 09:45:00',
 NULL, NULL, 10, 9),

(9, 'Colleague says reservation never existed but I got charged',
 'in_progress', '2024-06-12 11:00:00', '2024-06-16 15:00:00',
 'Database mismatch detected, investigating payment and reservation records',
 6, 5, 9),

(10, 'Reservation shows different amount than what I agreed to pay',
 'pending', '2024-06-16 17:30:00', '2024-06-16 17:30:00',
 NULL, NULL, 5, 9);

INSERT INTO payment
(payment_id, amount, payment_status, payment_method,
 transaction_id, paid_at, reservation_id)
VALUES
(1, 450000.00, 'completed', 'credit_card',
 'TXN20240615001234', '2024-06-15 14:30:00', 1),

(2, 350000.00, 'pending', 'bank_transfer',
 NULL, NULL, 2),

(3, 1200000.00, 'completed', 'credit_card',
 'TXN20240614005678', '2024-06-14 18:45:00', 3),

(4, 180000.00, 'failed', 'credit_card',
 'TXN20240610002341', NULL, 4),

(5, 1800000.00, 'pending', 'paypal',
 'PP20240617CORP999', NULL, 5),

(6, 600000.00, 'failed', 'bank_transfer',
 'BANK20240616999', NULL, 6),

(7, 1800000.00, 'completed', 'credit_card',
 'TXN20240614011111', '2024-06-14 11:00:00', 7),

(8, 180000.00, 'completed', 'credit_card',
 'TXN20240617000111', '2024-06-17 00:30:00', 8),

(9, 280000.00, 'pending', 'credit_card',
 'TXN20240617003333', NULL, 10),

-- Current schema requires reservation_id NOT NULL.
-- The old orphan payment was linked to reservation 9.
(10, 280000.00, 'completed', 'credit_card',
 'TXN20240613004444', '2024-06-13 19:15:00', 9);

-- ============================================================
-- LEVEL 9
-- ============================================================

INSERT INTO refund
(refund_id, amount, `status`, reason, refunded_at, payment_id)
VALUES
(1, 450000.00, 'processed',
 'User cancelled reservation 6 days before event',
 '2024-06-16 10:30:00', 1),

(2, 350000.00, 'requested',
 'User requesting refund due to schedule conflict',
 NULL, 4),

(3, 600000.00, 'processed',
 'Event cancelled by organizer due to bad weather',
 '2024-06-17 09:00:00', 6),

(4, 1800000.00, 'declined',
 'Refund request outside 24-hour policy window',
 NULL, 7),

(5, 280000.00, 'processed',
 'Payment method error, duplicate charge correction',
 '2024-06-17 08:30:00', 8),

(6, 0.00, 'requested',
 'Requesting exchange instead of refund for different event',
 NULL, 3),

(7, 180000.00, 'processed',
 'Disability accessibility not available at venue',
 '2024-06-15 14:00:00', 4),

(8, 360000.00, 'processed',
 'Customer error - booked wrong date, refunded minus 10% fee',
 '2024-06-14 16:45:00', 10),

(9, 1680000.00, 'requested',
 'Corporate client requesting group refund due to scheduling',
 NULL, 5),

(10, 700000.00, 'declined',
 'Bank transfer refund request outside deadline',
 NULL, 2);

SET FOREIGN_KEY_CHECKS = 1;

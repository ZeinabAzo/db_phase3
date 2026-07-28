CREATE DATABASE D3;
USE D3;

-- LEVEL 1

CREATE TABLE `role` (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL,
    `desc` TEXT
);

CREATE TABLE city (
    city_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    province VARCHAR(255)
);

CREATE TABLE sport_type (
    sport_type_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    `desc` TEXT,
    rules TEXT
);

CREATE TABLE team (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    `desc` TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

CREATE TABLE refund_policy (
    refund_policy_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    `desc` TEXT
);

CREATE TABLE ticket_type (
    ticket_type_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_type VARCHAR(255) NOT NULL,
    `desc` TEXT
);

CREATE TABLE feature (
    feature_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    `desc` TEXT
);


-- LEVEL 2: Tables depending on Level 1

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255),
    `status` ENUM('active', 'inactive', 'banned')DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    role_id INT,
    city_id INT,
    FOREIGN KEY (role_id)
        REFERENCES `role`(role_id)
        ON DELETE SET NULL,

    FOREIGN KEY (city_id)
        REFERENCES city(city_id)
        ON DELETE SET NULL,

    CONSTRAINT chk_email_or_phone
        CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

CREATE TABLE venue (
    venue_id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    address TEXT,
    `desc` TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    city_id INT,
    FOREIGN KEY (city_id)
        REFERENCES city(city_id)
        ON DELETE SET NULL
);



-- LEVEL 3

CREATE TABLE stadium (
    stadium_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity INT,
    `desc` TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    venue_id INT,

    FOREIGN KEY (venue_id)
        REFERENCES venue(venue_id)
        ON DELETE CASCADE
);


-- LEVEL 4

CREATE TABLE section (
    section_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity INT,
    `desc` TEXT,
    price_multiplier DECIMAL(5,2),
    stadium_id INT ,
    FOREIGN KEY (stadium_id)
        REFERENCES stadium(stadium_id)
        ON DELETE CASCADE
);



-- LEVEL 5

CREATE TABLE seat (
    seat_id INT AUTO_INCREMENT PRIMARY KEY,
    `row_number` VARCHAR(50),
    seat_number VARCHAR(50) NOT NULL,
    seat_type VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    section_id INT,
    FOREIGN KEY (section_id) REFERENCES section(section_id) ON DELETE CASCADE
);

CREATE TABLE `match` (
    match_id INT AUTO_INCREMENT PRIMARY KEY,
    match_data TEXT,
    start_time DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('scheduled','ongoing','finished','cancelled') DEFAULT 'scheduled'  ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `desc` TEXT,
    sport_type_id INT,
    home_team_id INT,
    away_team_id INT,
    stadium_id INT,
    FOREIGN KEY (sport_type_id) REFERENCES sport_type(sport_type_id) ON DELETE SET NULL,
    FOREIGN KEY (home_team_id) REFERENCES team(team_id) ON DELETE RESTRICT,
    FOREIGN KEY (away_team_id) REFERENCES team(team_id) ON DELETE RESTRICT,
    FOREIGN KEY (stadium_id) REFERENCES stadium(stadium_id) ON DELETE SET NULL
);


-- LEVEL 6

CREATE TABLE ticket (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10,2) NOT NULL,
    `status` ENUM('available','reserved', 'sold') DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    match_id INT NOT NULL ,
    seat_id INT NOT NULL ,
    ticket_type_id INT,
    refund_policy_id INT,
    FOREIGN KEY (match_id) REFERENCES `match`(match_id) ON DELETE RESTRICT,
    FOREIGN KEY (seat_id) REFERENCES seat(seat_id) ON DELETE RESTRICT,
    FOREIGN KEY (ticket_type_id) REFERENCES ticket_type(ticket_type_id) ON DELETE SET NULL,
    FOREIGN KEY (refund_policy_id) REFERENCES refund_policy(refund_policy_id) ON DELETE SET NULL,
    CONSTRAINT uq_match_seat
        UNIQUE (match_id, seat_id)
);


-- LEVEL 7

CREATE TABLE ticket_feature (
    feature_id INT,
    ticket_id INT,
    PRIMARY KEY (feature_id, ticket_id),
    FOREIGN KEY (feature_id) REFERENCES feature(feature_id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id) ON DELETE CASCADE
);

CREATE TABLE reserve (
    reserve_id INT AUTO_INCREMENT PRIMARY KEY,
    expire_at DATETIME NOT NULL ,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    confirmed_at DATETIME,
    total_price DECIMAL(10,2),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('pending', 'confirmed', 'cancelled','expired') DEFAULT 'pending',
    user_id INT NOT NULL ,
    ticket_id INT NOT NULL ,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT,
    FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id) ON DELETE RESTRICT
);

CREATE TABLE report_about_ticket (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    status VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    respond TEXT,
    responder_id INT,
    ticket_id INT,
    reporter_id INT,
    FOREIGN KEY (responder_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id) ON DELETE RESTRICT,
    FOREIGN KEY (reporter_id) REFERENCES users(user_id) ON DELETE RESTRICT
);


-- LEVEL 8

CREATE TABLE report_about_reserve (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    status VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    respond TEXT,
    responder_id INT,
    reserve_id INT,
    reporter_id INT,
    FOREIGN KEY (responder_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (reserve_id) REFERENCES reserve(reserve_id) ON DELETE RESTRICT,
    FOREIGN KEY (reporter_id) REFERENCES users(user_id) ON DELETE RESTRICT
);

CREATE TABLE payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM(
        'pending',
        'completed',
        'failed'
    ) DEFAULT 'pending',
    payment_method ENUM(
        'credit_card',
        'paypal',
        'bank_transfer'
    ) NOT NULL,
    transaction_id VARCHAR(255),
    paid_at DATETIME,
    reservation_id INT NOT NULL ,
    FOREIGN KEY (reservation_id)
        REFERENCES reserve(reserve_id)
        ON DELETE RESTRICT
);


-- LEVEL 9
CREATE TABLE refund (
    refund_id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('requested', 'processed', 'declined') DEFAULT 'requested',
    reason TEXT,
    refunded_at DATETIME,
    payment_id INT NOT NULL ,
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id) ON DELETE RESTRICT
);
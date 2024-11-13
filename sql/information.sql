CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    pass_word VARCHAR(255),
    phone VARCHAR(255),
    birthday VARCHAR(255),
    gender VARCHAR(255),
    role VARCHAR(255)
);

CREATE TABLE rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_name VARCHAR(255),
    passenger_id INT,  -- foreign key referencing the user who is associated with the room
    FOREIGN KEY (passenger_id) REFERENCES users(id),
    room_number INT,
    bed INT,
    bathroom INT,
    description TEXT,
    price INT,
    laundry BOOLEAN DEFAULT FALSE,
    iron BOOLEAN DEFAULT FALSE,
    television BOOLEAN DEFAULT FALSE,
    air_conditioner BOOLEAN DEFAULT FALSE,
    wifi BOOLEAN DEFAULT FALSE,
    stove BOOLEAN DEFAULT FALSE,
    parking BOOLEAN DEFAULT FALSE,
    images VARCHAR(255)
);

CREATE TABLE book_room (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    check_in_datetime DATE DEFAULT CURRENT_DATE,
    check_out_datetime DATE DEFAULT CURRENT_DATE,
    quantity_of_people INT,
    booking_user INT,  -- foreign key referencing the user who made the booking
    FOREIGN KEY (booking_user) REFERENCES users(id)
);

CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    working_code INT,       
    comment_code INT,   
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    stars INT
);

CREATE TABLE location (
    id INT PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(255),
    province VARCHAR(255),
    country VARCHAR(255),
    images VARCHAR(255)
);

ALTER TABLE users MODIFY COLUMN gender ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL AFTER id;

INSERT INTO users (username, email, pass_word, phone, birthday, gender, role) VALUES
('john_doe', 'john@example.com', 'password123', '1234567890', '1990-05-01', 'Male', 'user'),
('jane_smith', 'jane@example.com', 'password123', '1234567891', '1985-08-12', 'Female', 'admin'),
('alice_jones', 'alice@example.com', 'password123', '1234567892', '1992-02-20', 'Female', 'user'),
('bob_martin', 'bob@example.com', 'password123', '1234567893', '1988-03-14', 'Male', 'user'),
('charlie_brown', 'charlie@example.com', 'password123', '1234567894', '1995-07-25', 'Male', 'user'),
('diana_wilson', 'diana@example.com', 'password123', '1234567895', '1993-11-09', 'Female', 'user'),
('emily_davis', 'emily@example.com', 'password123', '1234567896', '1990-12-17', 'Female', 'admin'),
('frank_lee', 'frank@example.com', 'password123', '1234567897', '1987-04-03', 'Male', 'user'),
('grace_clark', 'grace@example.com', 'password123', '1234567898', '1991-10-11', 'Female', 'user'),
('henry_king', 'henry@example.com', 'password123', '1234567899', '1989-01-22', 'Male', 'user'),
('isabella_moore', 'isabella@example.com', 'password123', '1234567900', '1994-06-05', 'Female', 'user'),
('jack_miller', 'jack@example.com', 'password123', '1234567901', '1996-09-30', 'Male', 'user'),
('kelly_adams', 'kelly@example.com', 'password123', '1234567902', '1992-03-18', 'Female', 'admin'),
('luke_scott', 'luke@example.com', 'password123', '1234567903', '1985-07-11', 'Male', 'user'),
('maria_taylor', 'maria@example.com', 'password123', '1234567904', '1990-05-09', 'Female', 'user'),
('nathan_king', 'nathan@example.com', 'password123', '1234567905', '1987-12-22', 'Male', 'user'),
('olivia_harris', 'olivia@example.com', 'password123', '1234567906', '1993-04-14', 'Female', 'user'),
('paul_walker', 'paul@example.com', 'password123', '1234567907', '1992-08-29', 'Male', 'user'),
('quinn_stevens', 'quinn@example.com', 'password123', '1234567908', '1991-12-04', 'Male', 'user');


INSERT INTO rooms (room_name, passenger_id, room_number, bed, bathroom, description, price, laundry, iron, television, air_conditioner, wifi, stove, parking, images) VALUES
('Room A', 1, 101, 1, 1, 'A cozy room with a single bed.', 50, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, 'room_a.jpg'),
('Room B', 2, 102, 2, 1, 'A spacious room with a double bed.', 75, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'room_b.jpg'),
('Room C', 3, 103, 1, 1, 'A small room with a single bed.', 40, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, TRUE, 'room_c.jpg'),
('Room D', 4, 104, 2, 1, 'A large room with a double bed and a sofa.', 100, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'room_d.jpg'),
('Room E', 5, 105, 1, 1, 'A simple room with a queen-size bed.', 60, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, 'room_e.jpg'),
('Room F', 6, 106, 2, 2, 'A luxurious room with a king-size bed.', 150, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'room_f.jpg'),
('Room G', 7, 107, 1, 1, 'A budget room with a single bed.', 45, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, 'room_g.jpg'),
('Room H', 8, 108, 2, 1, 'A stylish room with a double bed.', 85, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'room_h.jpg'),
('Room I', 9, 109, 2, 1, 'A spacious room with two double beds.', 120, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'room_i.jpg'),
('Room J', 10, 110, 1, 1, 'A simple room with a queen-size bed.', 65, FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, 'room_j.jpg'),
('Room K', 11, 111, 1, 1, 'A small, cozy room for one guest.', 50, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, 'room_k.jpg'),
('Room L', 12, 112, 2, 1, 'A room with two single beds and a TV.', 70, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, 'room_l.jpg'),
('Room M', 13, 113, 1, 1, 'A compact room with a queen-size bed.', 60, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, 'room_m.jpg'),
('Room N', 14, 114, 2, 1, 'A room with a king-size bed and a sofa.', 130, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'room_n.jpg'),
('Room O', 15, 115, 1, 1, 'A simple room with a single bed and a desk.', 55, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, 'room_o.jpg'),
('Room P', 16, 116, 2, 1, 'A stylish room with modern decor and a large bed.', 90, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, 'room_p.jpg'),
('Room Q', 17, 117, 2, 2, 'A room with a king-size bed and a large bathroom.', 140, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'room_q.jpg'),
('Room R', 18, 118, 1, 1, 'A small, clean room with a single bed.', 40, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, 'room_r.jpg'),
('Room S', 19, 119, 1, 1, 'A room with a queen-size bed and modern amenities.', 70, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, 'room_s.jpg');

INSERT INTO comments (working_code, comment_code, comment_date, description, stars) VALUES
(1, 101, '2024-11-10 10:00:00', 'Great stay, comfortable bed and clean room!', 5),
(2, 102, '2024-11-11 11:30:00', 'The room was okay but could use more amenities.', 3),
(3, 103, '2024-11-12 09:45:00', 'Very cozy room, but the Wi-Fi was slow.', 4),
(4, 104, '2024-11-13 14:20:00', 'Spacious room, great location, would stay again.', 5),
(5, 105, '2024-11-14 08:00:00', 'The room was fine, but the AC didn’t work properly.', 2),
(6, 106, '2024-11-15 16:00:00', 'Excellent room with amazing amenities, highly recommend!', 5),
(7, 107, '2024-11-16 12:10:00', 'Not very clean, needs improvement.', 2),
(8, 108, '2024-11-17 13:15:00', 'Loved the design and comfort, had a great time!', 5),
(9, 109, '2024-11-18 15:00:00', 'The room was too small for two people.', 3),
(10, 110, '2024-11-19 17:30:00', 'Decent stay but not worth the price.', 3),
(11, 111, '2024-11-20 18:45:00', 'Very satisfied with the room and facilities!', 5),
(12, 112, '2024-11-21 19:50:00', 'The service was great, but the room was outdated.', 4),
(13, 113, '2024-11-22 10:00:00', 'The room exceeded expectations, very happy with my stay.', 5),
(14, 114, '2024-11-23 11:05:00', 'Comfortable but the noise from outside was disturbing.', 3),
(15, 115, '2024-11-24 12:30:00', 'Nice room, friendly staff, would visit again.', 4),
(16, 116, '2024-11-25 13:25:00', 'Room was very clean, but lacked a minibar.', 4),
(17, 117, '2024-11-26 14:40:00', 'Perfect for a weekend getaway, would stay again.', 5),
(18, 118, '2024-11-27 15:50:00', 'Clean and tidy but the bathroom was too small.', 3),
(19, 119, '2024-11-28 16:30:00', 'The room was just as described, great value for money!', 5),
(20, 120, '2024-11-29 17:00:00', 'I had an okay stay, but the noise from the hallway was annoying.', 2);

INSERT INTO book_room (room_id, check_in_datetime, check_out_datetime, quantity_of_people, booking_user) VALUES
(1, '2024-11-10', '2024-11-12', 1, 2),
(2, '2024-11-11', '2024-11-15', 2, 3),
(3, '2024-11-12', '2024-11-13', 1, 4),
(4, '2024-11-14', '2024-11-18', 2, 5),
(5, '2024-11-13', '2024-11-15', 1, 6),
(6, '2024-11-10', '2024-11-20', 2, 7),
(7, '2024-11-14', '2024-11-16', 1, 8),
(8, '2024-11-15', '2024-11-19', 2, 9),
(9, '2024-11-16', '2024-11-17', 1, 10),
(10, '2024-11-10', '2024-11-14', 1, 11),
(11, '2024-11-18', '2024-11-22', 2, 12),
(12, '2024-11-20', '2024-11-24', 1, 13),
(13, '2024-11-21', '2024-11-23', 2, 14),
(14, '2024-11-22', '2024-11-25', 1, 15),
(15, '2024-11-23', '2024-11-26', 2, 16),
(16, '2024-11-24', '2024-11-28', 1, 17),
(17, '2024-11-25', '2024-11-29', 2, 18),
(18, '2024-11-26', '2024-11-30', 1, 19),
(19, '2024-11-27', '2024-11-29', 2, 2),
(2, '2024-11-28', '2024-11-30', 1, 2);

INSERT INTO location (location_name, province, country, images) VALUES
('Paris City Center', 'Île-de-France', 'France', 'paris_city_center.jpg'),
('Tokyo Tower', 'Minato', 'Japan', 'tokyo_tower.jpg'),
('Great Wall of China', 'Beijing', 'China', 'great_wall_china.jpg'),
('Sydney Opera House', 'New South Wales', 'Australia', 'sydney_opera_house.jpg'),
('Statue of Liberty', 'New York', 'USA', 'statue_of_liberty.jpg'),
('London Eye', 'Greater London', 'United Kingdom', 'london_eye.jpg'),
('Mount Fuji', 'Yamanashi', 'Japan', 'mount_fuji.jpg'),
('Eiffel Tower', 'Île-de-France', 'France', 'eiffel_tower.jpg'),
('Colosseum', 'Lazio', 'Italy', 'colosseum.jpg'),
('Grand Canyon', 'Arizona', 'USA', 'grand_canyon.jpg'),
('Machu Picchu', 'Cusco', 'Peru', 'machu_picchu.jpg'),
('Santorini', 'South Aegean', 'Greece', 'santorini.jpg'),
('Christ the Redeemer', 'Rio de Janeiro', 'Brazil', 'christ_the_redeemer.jpg'),
('Dubai Burj Khalifa', 'Dubai', 'UAE', 'dubai_burj_khalifa.jpg'),
('Niagara Falls', 'Ontario', 'Canada', 'niagara_falls.jpg'),
('Pyramids of Giza', 'Giza', 'Egypt', 'pyramids_of_giza.jpg'),
('Acropolis of Athens', 'Attica', 'Greece', 'acropolis_of_athens.jpg'),
('Petra', 'Maan', 'Jordan', 'petra.jpg'),
('Stonehenge', 'South West', 'United Kingdom', 'stonehenge.jpg'),
('Taj Mahal', 'Uttar Pradesh', 'India', 'taj_mahal.jpg');


-- CreateTable
CREATE TABLE `book_room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NULL,
    `check_in_datetime` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `check_out_datetime` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `quantity_of_people` INTEGER NULL,
    `booking_user` INTEGER NULL,

    INDEX `booking_user`(`booking_user`),
    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `working_code` INTEGER NULL,
    `comment_code` INTEGER NULL,
    `comment_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `description` TEXT NULL,
    `stars` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location_name` VARCHAR(255) NULL,
    `province` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `images` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_name` VARCHAR(255) NULL,
    `passenger_id` INTEGER NULL,
    `room_number` INTEGER NULL,
    `bed` INTEGER NULL,
    `bathroom` INTEGER NULL,
    `description` TEXT NULL,
    `price` INTEGER NULL,
    `laundry` BOOLEAN NULL DEFAULT false,
    `iron` BOOLEAN NULL DEFAULT false,
    `television` BOOLEAN NULL DEFAULT false,
    `air_conditioner` BOOLEAN NULL DEFAULT false,
    `wifi` BOOLEAN NULL DEFAULT false,
    `stove` BOOLEAN NULL DEFAULT false,
    `parking` BOOLEAN NULL DEFAULT false,
    `images` VARCHAR(255) NULL,
    `location_id` INTEGER NULL DEFAULT 1,

    INDEX `passenger_id`(`passenger_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `username` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `pass_word` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `birthday` VARCHAR(255) NULL,
    `role` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `book_room` ADD CONSTRAINT `book_room_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `book_room` ADD CONSTRAINT `book_room_ibfk_2` FOREIGN KEY (`booking_user`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`passenger_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

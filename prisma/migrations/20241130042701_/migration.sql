-- DropForeignKey
ALTER TABLE `rooms` DROP FOREIGN KEY `rooms_location_id_fkey`;

-- AlterTable
ALTER TABLE `book_room` MODIFY `check_in_datetime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `check_out_datetime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `rooms` ALTER COLUMN `location_id` DROP DEFAULT;

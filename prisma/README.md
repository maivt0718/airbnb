### Migration
npx prisma migrate dev --name add_location_id_to_rooms
(No default vaules in the new colunm)

### To auto_inc = 1
```
ALTER TABLE rooms AUTO_INCREMENT = 1;
DELETE FROM rooms

ALTER TABLE book_room DROP FOREIGN KEY book_room_ibfk_1;
TRUNCATE TABLE rooms;

ALTER TABLE book_room ADD CONSTRAINT book_room_ibfk_1 FOREIGN KEY (room_id) REFERENCES rooms(id);
```
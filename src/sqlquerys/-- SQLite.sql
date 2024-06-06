-- SQLite
DELETE FROM typy;
DELETE FROM czat;
DELETE FROM users;
UPDATE typy SET id = 0;
UPDATE users SET id = 0;
UPDATE czat SET id = 0;
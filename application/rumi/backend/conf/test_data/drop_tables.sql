-- Having some foreign key constraints might prevent you from executing drop table, 
-- so the first thing you should do is to temporarily disable all the foreign key constraints in order for the drop statements work
SET FOREIGN_KEY_CHECKS = 0;

-- Then you list all the available tables from the current database
SELECT
    table_name
FROM
    information_schema.tables
WHERE
    table_schema = 'rumi-db2';

-- And delete all tables on by one from the list
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS list;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS searchtext;
DROP TABLE IF EXISTS user;

-- And delete all tables on by one from the list
SET FOREIGN_KEY_CHECKS = 1;
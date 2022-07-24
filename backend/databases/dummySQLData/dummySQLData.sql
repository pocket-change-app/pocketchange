-- to execute this script (through terminal), enter the MySQL terminal and type the command:
-- source <entire file path to this file>/dummySQLData.sql

-- insert users
INSERT INTO users (userID, salt, createdAt,updatedAt) VALUES ("1c", '552bad3bc6c09965', '2022-03-04 09:22:11','2022-03-04 20:34:13');
INSERT INTO users (userID, salt, createdAt,updatedAt) VALUES ("2c", '552bad3bc6c09965', '2022-03-04 09:22:11','2022-03-04 20:34:13');
INSERT INTO users (userID, salt, createdAt,updatedAt) VALUES ("3c",'552bad3bc6c09965', '2022-03-04 09:22:11','2022-03-04 20:34:13');
INSERT INTO users (userID, salt, createdAt,updatedAt) VALUES ("4c", '552bad3bc6c09965','2022-03-04 09:22:11','2022-03-04 20:34:13');
INSERT INTO users (userID, salt, createdAt,updatedAt) VALUES ("5c", '552bad3bc6c09965','2022-03-04 09:22:11','2022-03-04 20:34:13');

-- insert pockets
INSERT INTO pockets (pocketID, circulatingChange, changeRate, createdAt, updatedAt) VALUES ("1p", "16.00", "0.08", '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO pockets (pocketID, circulatingChange, changeRate, createdAt, updatedAt) VALUES ("2p", "4.5", "0.10", '2022-02-04 09:22:11','2022-02-04 20:34:13');

-- insert businesses
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("1b",  '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("2b",'2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("3b",'2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("4b", '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("5b",'2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("6b", '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("7b",'2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("8b", '2022-02-04 09:22:11','2022-02-04 20:34:13');

-- insert transactions
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,createdAt,updatedAt) VALUES 
("1t",'1c', '20.00', '2022-06-04 09:22:11', '1b', '1p', '0.00', '1.60','2021-03-04 09:22:11','2021-03-04 20:34:13');
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,createdAt,updatedAt) VALUES 
("2t",'2c', '30.00', '2022-06-04 09:22:11', '8b', '2p', '0.00', '3.00', '2021-03-04 09:22:11','2021-03-04 20:34:13');
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,createdAt,updatedAt) VALUES 
("3t",'1c', '50.00', '2022-06-04 09:22:11', '2b', '1p', '0.00', '4.00','2021-03-06 09:22:11','2021-03-06 20:34:13');
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,createdAt,updatedAt) VALUES 
("4t",'2c', '16.00', '2022-06-04 09:22:11', '7b', '2p', '3.00', '0.00', '2021-03-06 09:22:11','2021-03-06 20:34:13');
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,createdAt,updatedAt) VALUES 
("5t",'3c', '25.00', '2022-06-04 09:22:11', '2b', '1p', '0.00', '2.00', '2021-03-06 09:22:11','2021-03-06 20:34:13');
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,createdAt,updatedAt) VALUES 
("6t",'4c', '25.00', '2022-06-04 09:22:11', '5b', '2p', '0.00', '2.50', '2021-03-06 09:22:11','2021-03-06 20:34:13');
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,createdAt,updatedAt) VALUES 
("7t",'5c', '45.00', '2022-06-04 09:22:11', '3b', '1p', '0.00', '3.60', '2021-03-06 09:22:11','2021-03-06 20:34:13');
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,createdAt,updatedAt) VALUES 
("8t",'1c', '60.00', '2022-06-04 09:22:11', '4b', '1p', '0.00', '4.80', '2021-03-10 09:22:11','2021-03-10 20:34:13');
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,createdAt,updatedAt) VALUES 
("9t",'2c', '10.00', '2022-06-04 09:22:11', '6b', '2p', '0.00', '1.00', '2021-03-10 09:22:11','2021-03-10 20:34:13');
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,createdAt,updatedAt) VALUES 
("10t",'1c', '10.00', '2022-06-04 09:22:11', '6b', '2p', '0.00', '1.00', '2021-03-10 09:22:11','2021-03-10 20:34:13');

-- insert changes
INSERT INTO `changes` (changeID,pocketID, value, userID, expiryDate, createdAt, updatedAt) VALUES ("1change", "1p",  "10.40", "1c", '2023-02-04 20:34:13','2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `changes` (changeID,pocketID, value, userID, expiryDate, createdAt, updatedAt) VALUES ("2change", "2p",  "1.00", "1c", '2023-02-04 20:34:13','2022-02-04 20:34:13','2022-02-04 20:34:13');
INSERT INTO `changes` (changeID,pocketID, value, userID, expiryDate, createdAt, updatedAt) VALUES ("3change", "2p",  "1.00", "2c", '2023-02-04 20:34:13','2023-02-04 20:34:13','2022-02-04 20:34:13');
INSERT INTO `changes` (changeID,pocketID, value, userID, expiryDate, createdAt, updatedAt) VALUES ("4change", "1p",  "2.00", "3c", '2023-02-04 20:34:13','2023-02-04 20:34:13','2022-02-04 20:34:13');
INSERT INTO `changes` (changeID,pocketID, value, userID, expiryDate, createdAt, updatedAt) VALUES ("5change", "2p",  "2.50", "4c", '2023-02-04 20:34:13','2023-02-04 20:34:13','2022-02-04 20:34:13');

-- insert IsIn
INSERT INTO `isIn` (businessID, pocketID, createdAt, updatedAt)  VALUES ('1b', '1p','2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isIn` (businessID, pocketID, createdAt, updatedAt)  VALUES ('2b', '1p','2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isIn` (businessID, pocketID, createdAt, updatedAt)  VALUES ('3b', '1p','2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isIn` (businessID, pocketID, createdAt, updatedAt)  VALUES ('4b', '1p','2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isIn` (businessID, pocketID, createdAt, updatedAt)  VALUES ('5b', '2p','2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isIn` (businessID, pocketID, createdAt, updatedAt)  VALUES ('6b', '2p','2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isIn` (businessID, pocketID, createdAt, updatedAt)  VALUES ('7b', '2p','2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isIn` (businessID, pocketID, createdAt, updatedAt)  VALUES ('8b', '2p','2022-02-04 09:22:11','2022-02-04 20:34:13');

--insert IsMemberOf
INSERT INTO `isMemberOf` (userID, pocketID, role, createdAt, updatedAt)  VALUES ('1c', '1p', 'customer', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isMemberOf` (userID, pocketID, role, createdAt, updatedAt)  VALUES ('1c', '2p', 'customer', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isMemberOf` (userID, pocketID, role, createdAt, updatedAt)  VALUES ('2c', '2p', 'customer', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isMemberOf` (userID, pocketID, role, createdAt, updatedAt)  VALUES ('3c', '1p', 'customer', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isMemberOf` (userID, pocketID, role, createdAt, updatedAt)  VALUES ('4c', '2p', 'customer', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isMemberOf` (userID, pocketID, role, createdAt, updatedAt)  VALUES ('5c', '1p', 'customer', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isMemberOf` (userID, pocketID, role, createdAt, updatedAt)  VALUES ('6c', '1p', 'customer', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isMemberOf` (userID, pocketID, role, createdAt, updatedAt)  VALUES ('6c', '2p', 'customer', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isMemberOf` (userID, pocketID, role, createdAt, updatedAt)  VALUES ('6c', '1p', 'manager', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isMemberOf` (userID, pocketID, role, createdAt, updatedAt)  VALUES ('7c', '1p', 'customer', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isMemberOf` (userID, pocketID, role, createdAt, updatedAt)  VALUES ('10c', '2p','customer', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `isMemberOf` (userID, pocketID, role, createdAt, updatedAt)  VALUES ('10c', '2p','manager', '2022-02-04 09:22:11','2022-02-04 20:34:13');

--insert WorksAt
INSERT INTO `worksAt` (userID, businessID, role, createdAt, updatedAt)  VALUES ('6c', '1b', 'owner', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `worksAt` (userID, businessID, role, createdAt, updatedAt)  VALUES ('7c', '2b', 'owner', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `worksAt` (userID, businessID, role, createdAt, updatedAt)  VALUES ('8c', '3b', 'owner', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `worksAt` (userID, businessID, role, createdAt, updatedAt)  VALUES ('9c', '4b', 'owner', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `worksAt` (userID, businessID, role, createdAt, updatedAt)  VALUES ('10c', '5b', 'owner', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `worksAt` (userID, businessID, role, createdAt, updatedAt)  VALUES ('11c', '6b', 'owner', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `worksAt` (userID, businessID, role, createdAt, updatedAt)  VALUES ('12c', '7b', 'owner', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `worksAt` (userID, businessID, role, createdAt, updatedAt)  VALUES ('13c', '8b', 'owner', '2022-02-04 09:22:11','2022-02-04 20:34:13');

--insert Loves
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('1c', '1b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('1c', '2b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('1c', '3b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('2c', '8b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('2c', '5b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('3c', '2b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('3c', '1b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('4c', '5b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('5c', '1b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('5c', '4b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('6c', '1b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('7c', '2b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('8c', '3b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('9c', '4b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('10c', '5b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('11c', '6b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('12c', '7b', '2022-02-04 09:22:11','2022-02-04 20:34:13');
INSERT INTO `loves` (userID, businessID, createdAt, updatedAt)  VALUES ('13c', '8b', '2022-02-04 09:22:11','2022-02-04 20:34:13');

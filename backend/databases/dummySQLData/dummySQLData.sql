-- to execute this script (through terminal), enter the MySQL terminal and type the command:
-- source <entire file path to this file>/dummySQLData.sql

-- insert users
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("1c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("2c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("3c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("4c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("5c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("6c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("7c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("8c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("9c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("10c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("11c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("12c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("13c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("pocketchangeAdmin", "2022-03-04 09:22:11","2022-03-04 20:34:13");

-- insert pockets
INSERT INTO pockets (pocketID, circulatingChange, changeRate, createdAt, updatedAt) VALUES ("1p", 16.00, 0.80, "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO pockets (pocketID, circulatingChange, changeRate, createdAt, updatedAt) VALUES ("2p", 4.50, 1.00, "2022-02-04 09:22:11","2022-02-04 20:34:13");

-- insert businesses
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("1b",  "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("2b","2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("3b","2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("4b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("5b","2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("6b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("7b","2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO businesses (businessID, createdAt, updatedAt) VALUES ("8b", "2022-02-04 09:22:11","2022-02-04 20:34:13");

-- insert transactions
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,refunded, refundDate, createdAt,updatedAt) VALUES 
("1t","1c", "20.00", "2022-06-04 09:22:11", "1b", "1p", 00.00, 01.60, false, null, "2021-03-04 09:22:11","2021-03-04 20:34:13");
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned, refunded, refundDate,createdAt,updatedAt) VALUES 
("2t","2c", "30.00", "2022-06-04 09:22:11", "8b", "2p", 00.00, 03.00, false, null, "2021-03-04 09:22:11","2021-03-04 20:34:13");
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,refunded, refundDate, createdAt,updatedAt) VALUES 
("3t","1c", "50.00", "2022-06-04 09:22:11", "2b", "1p", 00.00, 04.00,false, null, "2021-03-06 09:22:11","2021-03-06 20:34:13");
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,refunded, refundDate, createdAt,updatedAt) VALUES 
("4t","2c", "16.00", "2022-06-04 09:22:11", "7b", "2p", 03.00, 00.00, false, null, "2021-03-06 09:22:11","2021-03-06 20:34:13");
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned, refunded, refundDate,createdAt,updatedAt) VALUES 
("5t","3c", "25.00", "2022-06-04 09:22:11", "2b", "1p", 00.00, 02.00, false, null, "2021-03-06 09:22:11","2021-03-06 20:34:13");
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned, refunded, refundDate,createdAt,updatedAt) VALUES 
("6t","4c", "25.00", "2022-06-04 09:22:11", "5b", "2p", 00.00, 02.50, false, null, "2021-03-06 09:22:11","2021-03-06 20:34:13");
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned,refunded, refundDate, createdAt,updatedAt) VALUES 
("7t","5c", "45.00", "2022-06-04 09:22:11", "3b", "1p", 00.00, 03.60, false, null, "2021-03-06 09:22:11","2021-03-06 20:34:13");
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned, refunded, refundDate, createdAt,updatedAt) VALUES 
("8t","1c", "60.00", "2022-06-04 09:22:11", "4b", "1p", 00.00, 04.80, false, null, "2021-03-10 09:22:11","2021-03-10 20:34:13");
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned, refunded, refundDate,createdAt,updatedAt) VALUES 
("9t","2c", "10.00", "2022-06-04 09:22:11", "6b", "2p", 00.00, 01.00, false, null, "2021-03-10 09:22:11","2021-03-10 20:34:13");
INSERT INTO transactions (transactionID,userID, value, date, businessID, pocketID, changeRedeemed, changeEarned, refunded, refundDate, createdAt,updatedAt) VALUES 
("10t","1c", "10.00", "2022-06-04 09:22:11", "6b", "2p", 00.00, 01.00, false, null, "2021-03-10 09:22:11","2021-03-10 20:34:13");

-- insert changes
INSERT INTO changeBalances (changeBalanceID,pocketID, value, userID, expiryDate, createdAt, updatedAt) VALUES ("1change", "1p",  10.40, "1c", "2023-02-04 20:34:13","2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO changeBalances (changeBalanceID,pocketID, value, userID, expiryDate, createdAt, updatedAt) VALUES ("2change", "2p",  01.00, "1c", "2023-02-04 20:34:13","2022-02-04 20:34:13","2022-02-04 20:34:13");
INSERT INTO changeBalances (changeBalanceID,pocketID, value, userID, expiryDate, createdAt, updatedAt) VALUES ("3change", "2p",  01.00, "2c", "2023-02-04 20:34:13","2023-02-04 20:34:13","2022-02-04 20:34:13");
INSERT INTO changeBalances (changeBalanceID,pocketID, value, userID, expiryDate, createdAt, updatedAt) VALUES ("4change", "1p",  02.00, "3c", "2023-02-04 20:34:13","2023-02-04 20:34:13","2022-02-04 20:34:13");
INSERT INTO changeBalances (changeBalanceID,pocketID, value, userID, expiryDate, createdAt, updatedAt) VALUES ("5change", "2p",  02.50, "4c", "2023-02-04 20:34:13","2023-02-04 20:34:13","2022-02-04 20:34:13");

-- insert IsIns
INSERT INTO isIns (businessID, pocketID, createdAt, updatedAt)  VALUES ("1b", "1p","2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isIns (businessID, pocketID, createdAt, updatedAt)  VALUES ("2b", "1p","2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isIns (businessID, pocketID, createdAt, updatedAt)  VALUES ("3b", "1p","2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isIns  (businessID, pocketID, createdAt, updatedAt)  VALUES ("4b", "1p","2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isIns  (businessID, pocketID, createdAt, updatedAt)  VALUES ("5b", "2p","2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isIns  (businessID, pocketID, createdAt, updatedAt)  VALUES ("6b", "2p","2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isIns  (businessID, pocketID, createdAt, updatedAt)  VALUES ("7b", "2p","2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isIns  (businessID, pocketID, createdAt, updatedAt)  VALUES ("8b", "2p","2022-02-04 09:22:11","2022-02-04 20:34:13");

-- insert isMembers
INSERT INTO isMembers (userID, pocketID, role, createdAt, updatedAt)  VALUES ("1c", "1p", "customer", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isMembers (userID, pocketID, role, createdAt, updatedAt)  VALUES ("1c", "2p", "customer", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isMembers (userID, pocketID, role, createdAt, updatedAt)  VALUES ("2c", "2p", "customer", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isMembers (userID, pocketID, role, createdAt, updatedAt)  VALUES ("3c", "1p", "customer", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isMembers (userID, pocketID, role, createdAt, updatedAt)  VALUES ("4c", "2p", "customer", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isMembers (userID, pocketID, role, createdAt, updatedAt)  VALUES ("5c", "1p", "customer", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isMembers (userID, pocketID, role, createdAt, updatedAt)  VALUES ("6c", "1p", "customer", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isMembers (userID, pocketID, role, createdAt, updatedAt)  VALUES ("6c", "2p", "customer", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isMembers (userID, pocketID, role, createdAt, updatedAt)  VALUES ("6c", "1p", "manager", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isMembers (userID, pocketID, role, createdAt, updatedAt)  VALUES ("7c", "1p", "customer", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isMembers (userID, pocketID, role, createdAt, updatedAt)  VALUES ("10c", "2p","customer", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO isMembers (userID, pocketID, role, createdAt, updatedAt)  VALUES ("10c", "2p","manager", "2022-02-04 09:22:11","2022-02-04 20:34:13");

-- insert worksAts
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("6c", "1b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("7c", "2b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("8c", "3b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("9c", "4b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("10c", "5b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("11c", "6b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("12c", "7b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("13c", "8b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");

-- insert loves
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("1c", "1b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("1c", "2b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("1c", "3b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("2c", "8b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("2c", "5b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("3c", "2b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("3c", "1b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("4c", "5b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("5c", "1b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("5c", "4b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("6c", "1b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("7c", "2b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("8c", "3b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("9c", "4b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("10c", "5b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("11c", "6b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("12c", "7b", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO loves (userID, businessID, createdAt, updatedAt)  VALUES ("13c", "8b", "2022-02-04 09:22:11","2022-02-04 20:34:13");

-- insert geolocation 
INSERT INTO geolocations (userID, timestamp, latitude, longitude, createdAt, updatedAt) VALUES ("1c", "2022-08-04 13:10:11", 43.6819014, -79.408669, "2022-08-04 13:10:11", "2022-08-04 13:10:11");
INSERT INTO geolocations (userID, timestamp, latitude, longitude, createdAt, updatedAt) VALUES ("1c", "2022-08-04 13:15:15", 43.671845, -79.3740792, "2022-08-04 13:15:11", "2022-08-04 13:15:11");
INSERT INTO geolocations (userID, timestamp, latitude, longitude, createdAt, updatedAt) VALUES ("1c", "2022-08-04 13:20:15", 43.661132, -79.3440358, "2022-08-04 13:20:11", "2022-08-04 13:20:11");
INSERT INTO geolocations (userID, timestamp, latitude, longitude, createdAt, updatedAt) VALUES ("2c", "2022-08-04 13:10:11", 43.6613675, -79.3530894, "2022-08-04 13:10:11", "2022-08-04 13:10:11");
INSERT INTO geolocations (userID, timestamp, latitude, longitude, createdAt, updatedAt) VALUES ("2c", "2022-08-04 13:15:15", 43.660452, -79.3457077, "2022-08-04 13:15:11", "2022-08-04 13:15:11");
INSERT INTO geolocations (userID, timestamp, latitude, longitude, createdAt, updatedAt) VALUES ("2c", "2022-08-04 13:20:15", 43.661132, -79.3440358, "2022-08-04 13:20:11", "2022-08-04 13:20:11");
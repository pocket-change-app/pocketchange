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
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("14c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("15c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("16c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("17c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("18c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("19c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("20c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("21c", "2022-03-04 09:22:11","2022-03-04 20:34:13");
INSERT INTO users (userID, createdAt,updatedAt) VALUES ("pocketchangeAdmin", "2022-03-04 09:22:11","2022-03-04 20:34:13");

-- insert pockets
INSERT INTO pockets (pocketID, circulatingChange, changeRate, createdAt, updatedAt) VALUES ("1p", 16.00, 0.08, "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO pockets (pocketID, circulatingChange, changeRate, createdAt, updatedAt) VALUES ("2p", , 0.08, "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO pockets (pocketID, circulatingChange, changeRate, createdAt, updatedAt) VALUES ("3p", 4.50, 0.08, "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO pockets (pocketID, circulatingChange, changeRate, createdAt, updatedAt) VALUES ("4p", 4.50, 0.08, "2022-02-04 09:22:11","2022-02-04 20:34:13");

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
INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("1t", "1c", 20.00, 04.00, 01.19, 23.96, "2022-06-04 9:22:11", "1b", "1p", 01.23, 01.50, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("2t", "2c", 04.50, 00.00, 00.44, 03.94, "2022-06-04 10:22:11", "1b", "1p", 01.00, 00.28, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("3t", "3c", 37.79, 05.67, 01.80, 40.26, "2022-06-05 11:22:11", "1b", "1p", 05.00, 02.62, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("4t", "4c", 03.25, 00.00, 00.43, 03.68, "2022-06-06 9:22:11", "1b", "1p", 00.00, 00.26, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("5t", "5c", 12.45, 02.00, 00.75, 12.20, "2022-06-06 11:22:11", "1b", "1p", 03.00, 00.76, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("6t", "6c", 07.60, 01.50, 00.65, 09.75, "2022-06-07 9:22:11", "1b", "1p", 00.00, 00.61, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("7t", "7c", 10.50, 00.00, 00.42, 03.47, "2022-06-08 9:22:11", "1b", "1p", 07.45, 00.24, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("8t", "8c", 13.47, 02.23, 00.91, 16.61, "2022-06-09 9:22:11", "1b", "1p", 00.00, 01.08, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("9t", "9c", 05.49, 01.00, 00.55, 07.04, "2022-06-10 9:22:11", "1b", "1p", 00.00, 00.44, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("10t", "10c", 03.25, 00.75, 00.41, 03.26, "2022-06-11 9:22:11", "1b", "1p", 01.15, 00.17, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("11t", "1c", 06.75, 00.00, 00.46, 04.54, "2022-06-04 9:22:11", "2b", "1p", 02.67, 00.33, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("12t", "11c", 35.00, 00.00, 01.53, 32.96, "2022-06-04 10:22:11", "2b", "1p", 03.57, 02.51, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("13t", "12c", 40.00, 00.00, 01.43, 30.48, "2022-06-05 11:22:11", "2b", "1p", 10.95, 02.32, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("14t", "13c", 60.00, 00.00, 02.52, 59.52, "2022-06-06 9:22:11", "2b", "1p", 03.00, 04.56, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("15t", "14c", 35.00, 00.00, 01.59, 34.59, "2022-06-06 11:22:11", "2b", "1p", 02.00, 02.64, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("16t", "2c", 60.00, 00.00, 02.60, 61.50, "2022-06-07 9:22:11", "2b", "1p", 01.10, 04.71, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("17t", "3c", 50.00, 00.00, 02.09, 48.09, "2022-06-08 9:22:11", "2b", "1p", 04.00, 03.68, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("18t", "4c", 70.00, 00.00, 02.76, 65.76, "2022-06-09 9:22:11", "2b", "1p", 07.00, 05.04, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("19t", "15c", 35.00, 00.00, 01.67, 36.67, "2022-06-10 9:22:11", "2b", "1p", 00.00, 02.80, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("20t", "16c", 25.00, 00.00, 01.16, 23.16, "2022-06-11 9:22:11", "2b", "1p", 03.00, 01.76, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("21t", "17c", 26.00, 00.00, 01.31, 27.31, "2022-06-04 9:22:11", "3b", "1p", 00.00, 02.08, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("22t", "8c", 47.75, 00.00, 02.08, 47.83, "2022-06-04 10:22:11", "3b", "1p", 02.00, 03.66, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("23t", "9c", 50.08, 00.00, 02.18, 50.26, "2022-06-05 11:22:11", "3b", "1p", 02.00, 03.85, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("24t", "10c", 67.70, 00.00, 02.86, 68.56, "2022-06-06 9:22:11", "3b", "1p", 02.00, 05.26, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("25t", "18c", 14.00, 00.00, 00.85, 14.85, "2022-06-06 11:22:11", "3b", "1p", 00.00, 01.12, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("26t", "19c", 13.63, 00.00, 00.79, 13.42, "2022-06-07 9:22:11", "3b", "1p", 01.00, 01.01, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("27t", "20c", 10.99, 00.00, 00.65, 09.64, "2022-06-08 9:22:11", "3b", "1p", 02.00, 00.72, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("28t", "1c", 11.00, 00.00, 00.73, 11.73, "2022-06-09 9:22:11", "3b", "1p", 00.00, 00.88, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("29t", "11c", 34.00, 00.00, 01.51, 32.51, "2022-06-10 9:22:11", "3b", "1p", 03.00, 02.48, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("30t", "12c", 23.50, 00.00, 01.22, 24.72, "2022-06-11 9:22:11", "3b", "1p", 00.00, 01.88, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("31t", "13c", 20.99, 00.00, 01.08, 21.07, "2022-06-04 9:22:11", "4b", "1p", 01.00, 01.60, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("32t", "14c", 17.98, 00.00, 00.85, 14.83, "2022-06-04 10:22:11", "4b", "1p", 04.00, 01.12, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13"

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("33t", "2c", 12.45, 00.00, 00.79, 13.24, "2022-06-05 11:22:11", "4b", "1p", 00.00, 01.00, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("34t", "3c", 13.45, 00.00, 00.36, 01.81, "2022-06-06 9:22:11", "4b", "1p", 12.00, 00.12, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("35t", "4c", 12.98, 00.00, 00.81, 13.79, "2022-06-06 11:22:11", "4b", "1p", 00.00, 01.04, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("36t", "15c", 04.64, 00.00, 00.48, 05.12, "2022-06-07 9:22:11", "4b", "1p", 00.00, 00.37, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("37t", "16c", 04.98, 00.00, 00.42, 03.40, "2022-06-08 9:22:11", "4b", "1p", 02.00, 00.24, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("38t", "17c", 04.98, 00.00, 00.42, 03.40, "2022-06-09 9:22:11", "4b", "1p", 02.00, 00.24, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("39t", "8c", 12.00, 00.00, 00.77, 12.77, "2022-06-10 9:22:11", "4b", "1p", 00.00, 00.96, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("40t", "9c", 32.12, 00.00, 01.55, 33.67, "2022-06-11 9:22:11", "4b", "1p", 00.00, 02.57, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("41t", "1c", 02.45, 00.25, 00.41, 03.11, "2022-06-04 9:22:11", "5b", "2p", 00.00, 00.20, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("42t", "2c", 07.65, 01.00, 00.44, 04.09, "2022-06-04 10:22:11", "5b", "2p", 05.00, 00.21, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("43t", "3c", 12.35, 01.50, 00.84, 14.69, "2022-06-05 11:22:11", "5b", "2p", 00.00, 00.99, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("44t", "4c", 04.69, 01.00, 00.52, 06.21, "2022-06-06 9:22:11", "5b", "2p", 00.00, 00.38, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("45t", "5c", 03.45, 00.50, 00.42, 03.37, "2022-06-06 11:22:11", "5b", "2p", 01.00, 00.20, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("46t", "1c", 16.77, 03.35, 01.08, 21.20, "2022-06-07 9:22:11", "5b", "2p", 00.00, 01.34, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("47t", "2c", 03.54, 01.00, 00.48, 05.02, "2022-06-08 9:22:11", "5b", "2p", 00.00, 00.28, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("48t", "2c", 02.50, 00.25, 00.33, 01.08, "2022-06-09 9:22:11", "5b", "2p", 02.00, 00.04, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("49t", "4c", 03.50, 00.00, 00.44, 03.94, "2022-06-10 9:22:11", "5b", "2p", 00.00, 00.28, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("50t", "3c", 03.50, 00.50, 00.38, 02.38, "2022-06-11 9:22:11", "5b", "2p", 02.00, 00.12, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("51t", "5c", 11.50, 02.00, 00.83, 14.33, "2022-06-04 9:22:11", "6b", "2p", 00.00, 00.92, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("52t", "6c", 15.00, 02.50, 00.94, 17.44, "2022-06-04 10:22:11", "6b", "2p", 01.00, 01.12, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("53t", "7c", 08.99, 01.50, 00.71, 11.20, "2022-06-05 11:22:11", "6b", "2p", 00.00, 00.72, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("54t", "8c", 18.50, 03.50, 01.12, 22.12, "2022-06-06 9:22:11", "6b", "2p", 01.00, 01.40, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("55t", "1c", 33.00, 05.00, 01.78, 39.78, "2022-06-06 11:22:11", "6b", "2p", 00.00, 02.64, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("56t", "3c", 12.50, 03.00, 00.90, 16.40, "2022-06-07 9:22:11", "6b", "2p", 00.00, 01.00, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("57t", "4c", 23.00, 04.00, 01.31, 27.31, "2022-06-08 9:22:11", "6b", "2p", 01.00, 01.76, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("58t", "9c", 19.50, 02.00, 01.02, 19.52, "2022-06-09 9:22:11", "6b", "2p", 03.00, 01.32, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("59t", "10c", 14.00, 02.00, 00.92, 16.92, "2022-06-10 9:22:11", "6b", "2p", 00.00, 01.12, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("60t", "1c", 11.99, 02.00, 00.77, 12.76, "2022-06-11 9:22:11", "6b", "2p", 02.00, 00.80, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("61t", "2c", 150.00, 00.00, 06.03, 153.03, "2022-06-04 9:22:11", "7b", "2p", 03.00, 11.76, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("62t", "11c", 35.00, 00.00, 01.55, 33.55, "2022-06-04 10:22:11", "7b", "2p", 03.00, 02.56, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("63t", "7c", 25.00, 00.00, 01.24, 25.24, "2022-06-05 11:22:11", "7b", "2p", 01.00, 01.92, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("64t", "12c", 28.00, 00.00, 01.39, 29.39, "2022-06-06 9:22:11", "7b", "2p", 00.00, 02.24, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("65t", "13c", 50.00, 00.00, 02.13, 49.13, "2022-06-06 11:22:11", "7b", "2p", 03.00, 03.76, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("66t", "14c", 94.00, 00.00, 03.42, 83.42, "2022-06-07 9:22:11", "7b", "2p", 14.00, 06.40, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("67t", "15c", 38.00, 00.00, 01.74, 38.74, "2022-06-08 9:22:11", "7b", "2p", 01.00, 02.96, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
v"68t", "6c", "3m", 12.00, 00.00, 00.73, 11.73, "2022-06-09 9:22:11", "7b", "2p", 01.00, 00.88, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("69t", "2c", 65.00, 00.00, 02.84, 67.84, "2022-06-10 9:22:11", "7b", "2p", 00.00, 05.20, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("70t", "1c", 40.00, 00.00, 01.39, 29.39, "2022-06-11 9:22:11", "7b", "2p", 12.00, 02.24, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("71t", "15c", 05.00, 01.00, 00.53, 06.53, "2022-06-04 9:22:11", "8b", "2p", 00.00, 00.40, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("72t", "16c", 03.50, 00.00, 00.44, 03.94, "2022-06-04 10:22:11", "8b", "2p", 00.00, 00.28, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("73t", "17c", 04.50, 01.00, 00.48, 04.98, "2022-06-05 11:22:11", "8b", "2p", 01.00, 00.28, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("74t", "18c", 07.00, 01.00, 00.61, 08.61, "2022-06-06 9:22:11", "8b", "2p", 00.00, 00.56, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("75t", "19c", 06.00, 00.00, 00.53, 06.53, "2022-06-06 11:22:11", "8b", "2p", 00.00, 00.48, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("76t", "20c", 08.00, 02.00, 00.57, 07.57, "2022-06-07 9:22:11", "8b", "2p", 03.00, 00.40, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("77t", "1c", 04.50, 00.00, 00.32, 00.82, "2022-06-08 9:22:11", "8b", "2p", 04.00, 00.04, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("78t", "13c", 03.00, 00.00, 00.38, 02.38, "2022-06-09 9:22:11", "8b", "2p", 01.00, 00.16, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("79t", "14c", 04.50, 00.50, 00.46, 04.46, "2022-06-10 9:22:11", "8b", "2p", 01.00, 00.28, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("80t", "10c", 09.00, 01.00, 00.69, 10.69, "2022-06-11 9:22:11", "8b", "2p", 00.00, 00.72, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("81t", "1c", 45.00, 06.00, 02.13, 49.13, "2022-06-04 9:22:11", "9b", "3p", 04.00, 03.28, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("82t", "2c", 30.00, 04.00, 01.63, 35.63, "2022-06-04 10:22:11", "9b", "3p", 00.00, 02.40, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("83t", "3c", 36.00, 04.00, 01.74, 38.74, "2022-06-05 11:22:11", "9b", "3p", 03.00, 02.64, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("84t", "4c", 75.00, 12.00, 03.69, 90.69, "2022-06-06 9:22:11", "9b", "3p", 00.00, 06.00, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("85t", "5c", 65.00, 12.00, 03.23, 78.23, "2022-06-06 11:22:11", "9b", "3p", 02.00, 05.04, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("86t", "6c", 45.00, 08.00, 02.37, 55.37, "2022-06-07 9:22:11", "9b", "3p", 00.00, 03.60, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("87t", "7c", 12.00, 04.00, 00.92, 16.92, "2022-06-08 9:22:11", "9b", "3p", 00.00, 00.96, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("88t", "8c", 12.00, 02.00, 00.65, 09.65, "2022-06-09 9:22:11", "9b", "3p", 05.00, 00.56, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("89t", "9c", 09.00, 01.00, 00.69, 10.69, "2022-06-10 9:22:11", "9b", "3p", 00.00, 00.72, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("90t", "10c", 08.00, 02.00, 00.69, 10.69, "2022-06-11 9:22:11", "9b", "3p", 00.00, 00.64, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("91t", "1c", 35.00, 00.00, 01.08, 21.08, "2022-06-04 9:22:11", "10b", "3p", 15.00, 01.60, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("92t", "11c", 12.50, 00.00, 00.79, 13.29, "2022-06-04 10:22:11", "10b", "3p", 00.00, 01.00, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("93t", "12c", 99.00, 00.00, 03.73, 91.73, "2022-06-05 11:22:11", "10b", "3p", 11.00, 07.04, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("94t", "13c", 35.00, 00.00, 01.67, 36.67, "2022-06-06 9:22:11", "10b", "3p", 00.00, 02.80, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("95t", "14c", 40.00, 00.00, 01.86, 41.86, "2022-06-06 11:22:11", "10b", "3p", 00.00, 03.20, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("96t", "2c", 23.00, 00.00, 01.08, 21.08, "2022-06-07 9:22:11", "10b", "3p", 03.00, 01.60, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("97t", "3c", 20.00, 00.00, 01.08, 21.08, "2022-06-08 9:22:11", "10b", "3p", 00.00, 01.60, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("98t", "4c", 10.00, 00.00, 00.57, 07.57, "2022-06-09 9:22:11", "10b", "3p", 03.00, 00.56, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("99t", "15c", 08.00, 00.00, 00.61, 08.61, "2022-06-10 9:22:11", "10b", "3p", 00.00, 00.64, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("100t", "16c", 65.00, 00.00, 02.68, 63.68, "2022-06-11 9:22:11", "10b", "3p", 04.00, 04.88, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("101t", "17c", 25.00, 00.00, 00.81, 13.81, "2022-06-04 9:22:11", "11b", "3p", 12.00, 01.04, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("102t", "8c", 45.00, 00.00, 02.06, 47.06, "2022-06-04 10:22:11", "11b", "3p", 00.00, 03.60, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("103t", "9c", 33.00, 00.00, 01.55, 33.55, "2022-06-05 11:22:11", "11b", "3p", 01.00, 02.56, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("104t", "10c", 16.00, 00.00, 00.92, 16.92, "2022-06-06 9:22:11", "11b", "3p", 00.00, 01.28, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("105t", "18c", 17.00, 00.00, 00.92, 16.92, "2022-06-06 11:22:11", "11b", "3p", 01.00, 01.28, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("106t", "19c", 15.00, 00.00, 00.89, 15.89, "2022-06-07 9:22:11", "11b", "3p", 00.00, 01.20, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("107t", "20c", 32.00, 00.00, 01.51, 32.51, "2022-06-08 9:22:11", "11b", "3p", 01.00, 02.48, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("108t", "1c", 25.00, 00.00, 01.28, 26.28, "2022-06-09 9:22:11", "11b", "3p", 00.00, 02.00, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("109t", "11c", 27.00, 00.00, 01.28, 26.28, "2022-06-10 9:22:11", "11b", "3p", 02.00, 02.00, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("110t", "12c", 44.41, 00.00, 02.03, 46.44, "2022-06-11 9:22:11", "11b", "3p", 00.00, 03.55, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("111t", "13c", 02.50, 00.00, 00.32, 00.82, "2022-06-04 9:22:11", "12b", "3p", 02.00, 00.04, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("112t", "14c", 05.75, 00.00, 00.52, 06.27, "2022-06-04 10:22:11", "12b", "3p", 00.00, 00.46, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("113t", "2c", 05.00, 00.00, 00.50, 05.50, "2022-06-05 11:22:11", "12b", "3p", 00.00, 00.40, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("114t", "3c", 28.75, 00.00, 01.38, 29.13, "2022-06-06 9:22:11", "12b", "3p", 01.00, 02.22, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("115t", "4c", 34.65, 00.00, 01.65, 36.30, "2022-06-06 11:22:11", "12b", "3p", 00.00, 02.77, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("116t", "15c", 08.70, 00.00, 00.64, 09.34, "2022-06-07 9:22:11", "12b", "3p", 00.00, 00.70, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("117t", "16c", 09.75, 00.00, 00.64, 09.39, "2022-06-08 9:22:11", "12b", "3p", 01.00, 00.70, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("118t", "17c", 04.30, 00.00, 00.47, 04.77, "2022-06-09 9:22:11", "12b", "3p", 00.00, 00.34, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("119t", "8c", 02.25, 00.00, 00.31, 00.56, "2022-06-10 9:22:11", "12b", "3p", 02.00, 00.02, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("120t", "9c", 11.99, 00.00, 00.77, 12.76, "2022-06-11 9:22:11", "12b", "3p", 00.00, 00.96, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("121t", "1c", 03.50, 00.00, 00.44, 03.94, "2022-06-04 9:22:11", "13b", "4p", 00.00, 00.28, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("122t", "2c", 04.50, 01.00, 00.51, 06.01, "2022-06-04 10:22:11", "13b", "4p", 00.00, 00.36, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("123t", "3c", 07.00, 01.00, 00.50, 05.50, "2022-06-05 11:22:11", "13b", "4p", 03.00, 00.32, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("124t", "4c", 06.00, 00.00, 00.53, 06.53, "2022-06-06 9:22:11", "13b", "4p", 00.00, 00.48, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("125t", "5c", 08.00, 02.00, 00.38, 02.38, "2022-06-06 11:22:11", "13b", "4p", 08.00, 00.00, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("126t", "1c", 04.50, 00.00, 00.48, 04.98, "2022-06-07 9:22:11", "13b", "4p", 00.00, 00.36, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("127t", "2c", 03.00, 00.00, 00.42, 03.42, "2022-06-08 9:22:11", "13b", "4p", 00.00, 00.24, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("128t", "2c", 04.50, 00.50, 00.50, 05.50, "2022-06-09 9:22:11", "13b", "4p", 00.00, 00.36, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("129t", "4c", 09.00, 01.00, 00.61, 08.61, "2022-06-10 9:22:11", "13b", "4p", 02.00, 00.56, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("130t", "3c", 06.75, 01.00, 00.60, 08.35, "2022-06-11 9:22:11", "13b", "4p", 00.00, 00.54, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("131t", "5c", 55.00, 00.00, 02.41, 56.41, "2022-06-04 9:22:11", "14b", "4p", 01.00, 04.32, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("132t", "6c", 35.00, 00.00, 01.55, 33.55, "2022-06-04 10:22:11", "14b", "4p", 03.00, 02.56, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("133t", "7c", 20.00, 00.00, 01.08, 21.08, "2022-06-05 11:22:11", "14b", "4p", 00.00, 01.60, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("134t", "8c", 45.00, 00.00, 01.94, 43.94, "2022-06-06 9:22:11", "14b", "4p", 03.00, 03.36, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("135t", "1c", 60.00, 00.00, 02.64, 62.64, "2022-06-06 11:22:11", "14b", "4p", 00.00, 04.80, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("136t", "3c", 115.00, 00.00, 04.12, 102.12, "2022-06-07 9:22:11", "14b", "4p", 17.00, 07.84, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("137t", "4c", 70.00, 00.00, 03.03, 73.03, "2022-06-08 9:22:11", "14b", "4p", 00.00, 05.60, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("138t", "9c", 85.00, 00.00, 03.62, 88.62, "2022-06-09 9:22:11", "14b", "4p", 00.00, 06.80, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("139t", "10c", 38.00, 00.00, 01.67, 36.67, "2022-06-10 9:22:11", "14b", "4p", 03.00, 02.80, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("140t", "1c", 28.00, 00.00, 01.39, 29.39, "2022-06-11 9:22:11", "14b", "4p", 00.00, 02.24, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("141t", "2c", 12.50, 00.00, 00.63, 09.13, "2022-06-04 9:22:11", "15b", "4p", 04.00, 00.68, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("142t", "11c", 15.00, 00.00, 00.89, 15.89, "2022-06-04 10:22:11", "15b", "4p", 00.00, 01.20, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("143t", "7c", 18.00, 00.00, 01.00, 19.00, "2022-06-05 11:22:11", "15b", "4p", 00.00, 01.44, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("144t", "12c", 20.00, 00.00, 00.96, 17.96, "2022-06-06 9:22:11", "15b", "4p", 03.00, 01.36, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("146t", "14c", 60.00, 00.00, 02.64, 62.64, "2022-06-07 9:22:11", "15b", "4p", 00.00, 04.80, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");
("145t", "13c", 25.00, 00.00, 01.24, 25.24, "2022-06-06 11:22:11", "15b", "4p", 01.00, 01.92, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("147t", "15c", 08.00, 00.00, 00.57, 07.57, "2022-06-08 9:22:11", "15b", "4p", 01.00, 00.56, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("148t", "6c", 10.50, 00.00, 00.67, 10.17, "2022-06-09 9:22:11", "15b", "4p", 01.00, 00.76, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("149t", "2c", 16.50, 00.00, 00.90, 16.40, "2022-06-10 9:22:11", "15b", "4p", 01.00, 01.24, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("150t", "1c", 35.00, 00.00, 01.67, 36.67, "2022-06-11 9:22:11", "15b", "4p", 00.00, 02.80, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("151t", "15c", 126.00, 20.00, 05.88, 148.88, "2022-06-04 9:22:11", "16b", "4p", 03.00, 09.84, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("152t", "16c", 80.00, 15.00, 04.01, 99.01, "2022-06-04 10:22:11", "16b", "4p", 00.00, 06.40, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("153t", "17c", 175.00, 30.00, 08.14, 209.14, "2022-06-05 11:22:11", "16b", "4p", 04.00, 13.68, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("154t", "18c", 95.00, 15.00, 04.40, 109.40, "2022-06-06 9:22:11", "16b", "4p", 05.00, 07.20, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("155t", "19c", 45.00, 10.00, 02.25, 52.25, "2022-06-06 11:22:11", "16b", "4p", 05.00, 03.20, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("156t", "20c", 87.00, 15.00, 04.16, 103.16, "2022-06-07 9:22:11", "16b", "4p", 03.00, 06.72, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("157t", "1c", 141.75, 30.00, 07.00, 178.75, "2022-06-08 9:22:11", "16b", "4p", 00.00, 11.34, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("158t", "13c", 75.00, 13.00, 03.62, 88.62, "2022-06-09 9:22:11", "16b", "4p", 03.00, 05.76, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("159t", "14c", 108.00, 20.00, 04.75, 118.75, "2022-06-10 9:22:11", "16b", "4p", 14.00, 07.52, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");

INSERT INTO transactions (transactionID,userID, subtotal, tip, fee, total, date, businessID, pocketID, changeRedeemed, changeEarned, refundedValue, refundDate, changeRedeemedBeforeRefund, createdAt,updatedAt) VALUES
("160t", "10c", 35.00, 08.00, 01.98, 44.98, "2022-06-11 9:22:11", "16b", "4p", 00.00, 02.80, 0.00, null, null, "2021-03-04 9:22:11", "2021-03-04 20:34:13");




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
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("14c", "9b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("15c", "10b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("16c", "11b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("17c", "12b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("18c", "13b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("19c", "14b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("20c", "15b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
INSERT INTO worksAts (userID, businessID, role, createdAt, updatedAt)  VALUES ("21c", "16b", "owner", "2022-02-04 09:22:11","2022-02-04 20:34:13");
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
INSERT INTO geolocations (geolocationID, userID, timestamp, latitude, longitude, createdAt, updatedAt) VALUES ("1geo", "1c", "2022-08-04 13:10:11", 43.6819014, -79.408669, "2022-08-04 13:10:11", "2022-08-04 13:10:11");
INSERT INTO geolocations (geolocationID, userID, timestamp, latitude, longitude, createdAt, updatedAt) VALUES ("2geo","1c", "2022-08-04 13:15:15", 43.671845, -79.3740792, "2022-08-04 13:15:11", "2022-08-04 13:15:11");
INSERT INTO geolocations (geolocationID, userID, timestamp, latitude, longitude, createdAt, updatedAt) VALUES ("3geo","1c", "2022-08-04 13:20:15", 43.661132, -79.3440358, "2022-08-04 13:20:11", "2022-08-04 13:20:11");
INSERT INTO geolocations (geolocationID, userID, timestamp, latitude, longitude, createdAt, updatedAt) VALUES ("4geo","2c", "2022-08-04 13:10:11", 43.6613675, -79.3530894, "2022-08-04 13:10:11", "2022-08-04 13:10:11");
INSERT INTO geolocations (geolocationID, userID, timestamp, latitude, longitude, createdAt, updatedAt) VALUES ("5geo","2c", "2022-08-04 13:15:15", 43.660452, -79.3457077, "2022-08-04 13:15:11", "2022-08-04 13:15:11");
INSERT INTO geolocations (geolocationID, userID, timestamp, latitude, longitude, createdAt, updatedAt) VALUES ("6geo","2c", "2022-08-04 13:20:15", 43.661132, -79.3440358, "2022-08-04 13:20:11", "2022-08-04 13:20:11");
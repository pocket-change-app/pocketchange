db = db.getSiblingDB("pocketchange"); 
db.createUser(
    {
        user: "mica",
        pwd: "123456",
        roles: [
            {
                role: "readWrite",
                db: "pocketchange"
            }
        ]
    }
);


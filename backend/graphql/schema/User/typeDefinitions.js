const gql = require('graphql-tag')

module.exports = gql`
    """
    User, belongs to pockets where they accrue change
    """
    type User {
        userID: ID 
        username: String
        name: String
        home: String
        birthDate: Date
        totalChange: Decimal
        emailAddress: String
    }

    type Query {
        """
        Query a specific User from it's ID
        """
        user(userID:ID):User
        """
        Login a specific user given username and password
        """
        loginUser(username:String, password:String):User
        """
        Fetch a list of all users from Mongo if no other parameters specified, otherwise fetch by username
        """
        getAllUsers(username:String):[User]
        """
        Get a list of all the users recently at a business/pocket within a dateRange if specified
        """
        getTopUsers(businessID:ID, startDate: Date, endDate: Date, userNumber: Int, pocketID:ID):[User]
        """
        Get a list of all the users that love a business
        """
        getUsersThatLove(businessID:ID):[User]
    }

    type Mutation {
        """
        Register a user to the pocketchange app
        """
        registerUser(username: String, password: String, name: String, home: String, birthDate: Date, emailAddress:String): User
        deactivateUSer(userID:ID): User
        registerUser(userID: ID, password: String): User
        updateUserProfile(username: String, name: String, home: String, birthDate: Date, emailAddress:String): User
        loveOrUnloveBusiness(userID: ID, businessID:ID)
        addUserRole(userID: ID, role: String, businessID: ID)
        removeUserRole(userID: ID, role: String, businessID: ID)
        updateUserLocations(userID:ID, latitude: Float, longitude: Float)
    }
`
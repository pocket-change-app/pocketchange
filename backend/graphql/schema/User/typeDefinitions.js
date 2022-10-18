const gql = require('graphql-tag')

module.exports = gql`
    """
    User, belongs to pockets where they accrue change
    """
    type User {
        userID: ID 
        firstName: String
        lastName: String
        home: String
        birthDate: Date
        totalChange: Decimal
        emailAddress: String
    }

    enum RoleType {
        CONSUMER
        MERCHANT
        LEADER
    }
      
    enum RoleLevel {
        OWNER
        MANAGER
        EMPLOYEE
    }

    type UserRole{
        type: RoleType,
        level: RoleLevel,
        entityID: String, 
        entityName: String, 
    }

    type Query {
        """
        Query a specific User from it's ID
        """
        user(userID:ID):User
        """
        Login a specific user given username and password
        """
        loginUser(emailAddress:String, password:String):User
        """
        Fetch a list of all users from Mongo if no other parameters specified, otherwise fetch by userID
        """
        getAllUsers(userID:ID):[User]
        """
        Get a list of all the users recently at a business/pocket within a dateRange if specified
        """
        getTopUsers(businessID: ID, startDate: Date, endDate: Date, userNumber: Int, pocketID: ID):[User]
        """
        Get a list of all the users that love a business
        """
        getUsersThatLove(businessID:ID):[User]
        """
        Get a list of all a users roles
        """
        getUserRoles(userID:ID):[UserRole]
    }

    type Mutation {
        """
        Register a user to the pocketchange app
        """
        registerUser(userID: ID, firstName: String, lastName: String, home: String, birthDate: Date, emailAddress: String): User
        deactivateUser(userID: ID): User
        updatePassword(userID: ID, password: String): User
        updateUserProfile(userID: ID, firstName: String, lastName: String, home: String, birthDate: Date, emailAddress: String): User
        loveOrUnloveBusiness(userID: ID, businessID: ID): User
        addUserRole(userID: ID, role: String, businessID: ID): User
        removeUserRole(userID: ID, role: String, businessID: ID): User
        updateUserLocations(userID:ID, latitude: Float, longitude: Float): User
        pickWinner(contestID: ID, userID:ID): User
    }
`
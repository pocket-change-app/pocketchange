const gql = require('graphql-tag')

module.exports = gql`
    """
    User, belongs to pockets where they accrue change
    """
    type User {
        userID: ID 
        username: String
        name: String
        birthDate: Date
        totalChange: Decimal
        emailAddress: String
        favouriteBusiness: [String]
        pockets: [String]
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
    }

    type Mutation {
        """
        Register a user to the pocketchange app
        """
        registerUser(username: String, password: String): User
    }
`
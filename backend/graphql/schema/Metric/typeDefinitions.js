const gql = require('graphql-tag')

module.exports = gql`
    """
    Metric, a data insight
    """
    interface Metric {
        startDateTime: Date!
        endDateTime: Date!
    }

    type TimeSeriesMetric implements Metric {
        startDateTime: Date!
        endDateTime: Date!
        data: TimeSeriesData
    }

    type TimeSeriesData {
        x: [Date!]!
        y: [Float!]!
    }


    type CategoricalMetric implements Metric {
        startDateTime: Date!
        endDateTime: Date!
        data: CategoricalData 
    }

    type CategoricalData {
        x: [String!]!
        y: [Float!]!
    }


    type Query {
       
    }

    type Mutation {
       
    }


`
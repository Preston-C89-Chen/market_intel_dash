const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    "Query to get tracks array for the homepage grid"
    tracksForHome: [Track!]!
    balanceSheets(symbol:String!): [BalanceSheet]
    balanceSheet(symbol:String!): BalanceSheet!
    earningsCalendar(from: String!,to:String!): [Earnings!]
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    "The track's title"
    title: String!
    "The track's main Author"
    author: Author!
    "The track's illustration to display in track card or track page detail"
    thumbnail: String
    "The track's approximate length to complete, in minutes"
    length: Int
    "The number of modules this track contains"
    modulesCount: Int
  }

  "Author of a complete Track or a Module"
  type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture"
    photo: String
  }

  type BalanceSheet {
    symbol: String
    date: String
    calendarYear: String
    totalLiabilities: Float
    cashAndCashEquivalents: Float
    shortTermInvestments: Float
    netReceivables: Float
    link: String
  }

  type Earnings {
    date: String
    symbol: String
    eps: String
    time: String
    revenue: String
  }
`;

module.exports = typeDefs;
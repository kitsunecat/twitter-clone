/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTweet = /* GraphQL */ `
  query GetTweet($id: ID!) {
    getTweet(id: $id) {
      id
      content
      createdAt
      updatedAt
    }
  }
`;
export const listTweets = /* GraphQL */ `
  query ListTweets(
    $filter: ModelTweetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTweets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

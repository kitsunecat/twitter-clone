import type { NextPage } from 'next'
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { createTweet, updateTweet, deleteTweet } from '../graphql/mutations';
import { listTweets } from '../graphql/queries';
import { onCreateTweet } from '../graphql/subscriptions';


import { useCallback, useEffect, useState } from 'react';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

type Tweet = {
  content: String
  createdAt: String
  id: String
  updatedAt: String
}
const Home: NextPage = () => {
  const [tweets, setTweets] = useState<Tweet[]>([])

  /* create a tweet */
  // await API.graphql(graphqlOperation(createTweet, { input: tweet }));
  // /* update a tweet */
  // await API.graphql(graphqlOperation(updateTweet, { input: { id: tweetId, name: "Updated tweet info" } }));
  // /* delete a tweet */
  // await API.graphql(graphqlOperation(deleteTweet, { input: { id: tweetId } }));

  const getTweets = async () => {
    const tweets = await API.graphql(graphqlOperation(listTweets));
    // @ts-ignore
    setTweets(tweets.data.listTweets.items)
  }

  useEffect(() => {
    getTweets()
  }, [])

  return (
    <div>
      {tweets.map((tweet) => (
        <div key="tweet.id">
          <p>{tweet.id}</p>
          <p>{tweet.content}</p>
          <p>{tweet.createdAt}</p>
          <p>{tweet.updatedAt}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default Home

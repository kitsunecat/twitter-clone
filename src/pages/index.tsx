// Next.js
import type { NextPage } from 'next'

// React
import { useEffect, useState } from 'react';

// Amplify
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

// Amplify GraphQL
import { createTweet, deleteTweet } from '../graphql/mutations';
import { listTweets } from '../graphql/queries';

type Tweet = {
  content: String
  createdAt: String
  id: String
  updatedAt: String
}

const Home: NextPage = () => {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [newTweet, setNewTweet] = useState<String>("")

  const getTweets = async () => {
    const tweets = await API.graphql(graphqlOperation(listTweets))
    // @ts-ignore
    setTweets(tweets.data.listTweets.items)
  }

  const createTweetHandler = async () => {
    const result = await API.graphql(graphqlOperation(createTweet, { input: { content: newTweet } }))
    // @ts-ignore
    setTweets([...tweets, result.data.createTweet])
    setNewTweet('')
  }

  const deleteTweetHandler = async (tweetId: string) => {
    await API.graphql(graphqlOperation(deleteTweet, { input: { id: tweetId } }))
    // @ts-ignore
    setTweets(tweets.filter(t => t.id !== tweetId))
  }

  useEffect(() => {
    getTweets()
  }, [])

  return (
    <div>
      <input type="text" onChange={(e) => setNewTweet(e.target.value)} />
      <button onClick={() => createTweetHandler()}>submit</button>

      {tweets.map((tweet) => (
        <div key={tweet.id}>
          <p>{tweet.id}</p>
          <p>{tweet.content}</p>
          <p>{tweet.createdAt}</p>
          <p>{tweet.updatedAt}</p>
          <button onClick={() => deleteTweetHandler(tweet.id)}>delete</button>
          <hr />
        </div>
      ))
      }
    </div >
  )
}

export default Home

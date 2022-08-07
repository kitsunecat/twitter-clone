// Next.js
import type { NextPage } from 'next'

// React
import { useEffect, useState } from 'react';

// Amplify
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Tweet } from '../models';

const Home: NextPage = () => {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [newTweet, setNewTweet] = useState<string>("")

  const getTweets = async () => {
    const models = await DataStore.query(Tweet);
    setTweets(models)
  }

  const createTweetHandler = async () => {
    const tweet = await DataStore.save(
      new Tweet({ "content": newTweet })
    );
    setNewTweet('')
    setTweets([...tweets, tweet])
  }

  const deleteTweetHandler = async (tweetId: string) => {
    const models = await DataStore.query(Tweet);
    const modelToDelete = models.find(i => i.id === tweetId)
    if (modelToDelete) DataStore.delete(modelToDelete);
    setTweets(models.filter(t => t.id !== tweetId))
  }

  useEffect(() => {
    getTweets()
  }, [])

  return (
    <div>
      <input type="text" value={newTweet} onChange={(e) => setNewTweet(e.target.value)} />
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

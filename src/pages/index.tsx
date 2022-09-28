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
import { detectContentType } from 'next/dist/server/image-optimizer';

// NextAuth
import { useSession, signIn, signOut } from "next-auth/react"

const Home: NextPage = () => {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [newTweet, setNewTweet] = useState<string>("")
  const { data: session } = useSession()

  const SessionButton = () => {
    if (session) {
      return (
        <>
          Signed in as {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )
    } else {
      return (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )
    }
  }

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
    <div className="w-3/5 border border-gray-600 h-auto  border-t-0">
      <SessionButton />
      <div className="flex">
        <div className="flex-1 px-2 pt-2 mt-2">
          <textarea value={newTweet} onChange={(e) => setNewTweet(e.target.value)} className=" bg-transparent text-gray-400 font-medium text-lg w-full" placeholder="What's happening?"></textarea>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <button onClick={() => createTweetHandler()} className="bg-blue-400 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
            Tweet
          </button>
        </div>
      </div>

      <div className="p-3 text-lg font-bold border-b border-solid border-grey-light">
        ツイート
      </div>
      {tweets.map((tweet) => (
        <div className="flex border-b border-solid border-grey-light" key={tweet.id}>
          <div className="w-1/8 text-right pl-3 pt-3">
            <div>
              <img src="https://news.mynavi.jp/article/20210708-1918224/images/006.jpg" alt="avatar" className="rounded-full h-12 w-12 mr-2" />
            </div>
          </div>
          <div className="w-7/8 p-3 pl-0">
            <div className="flex justify-between">
              <div>
                <span className="font-bold"><a href="#" className="text-black">USER_NAME</a></span>
                <span className="text-grey-dark">@USER_ID</span>
                <span className="text-grey-dark">·</span>
                <span className="text-grey-dark">{tweet.createdAt}</span>
              </div>
              <div>
                <a href="#" className="text-grey-dark hover:text-teal"><i className="fa fa-chevron-down"></i></a>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <p>{tweet.content}</p>
                <button className="bg-red-400 mt-5 hover:bg-red-600 text-white py-1 px-4 rounded-full float-right" onClick={() => deleteTweetHandler(tweet.id)}>delete</button>
              </div>
            </div>
          </div>
          <hr className="border-gray-600" />
        </div>
      ))
      }
    </div >
  )
}

export default Home

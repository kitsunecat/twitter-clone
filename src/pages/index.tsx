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
    <div className="w-3/5 border border-gray-600 h-auto  border-t-0">
      <div className="flex">
        <div className="flex-1 m-2">
          <h2 className="px-4 py-2 text-xl font-semibold text-white">Home</h2>
        </div>
        <div className="flex-1 px-4 py-2 m-2">
          <a href="" className=" text-2xl font-medium rounded-full text-white hover:bg-blue-800 hover:text-blue-300 float-right">
            <svg className="m-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><g><path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path></g>
            </svg>
          </a>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 px-2 pt-2 mt-2">
          <textarea value={newTweet} onChange={(e) => setNewTweet(e.target.value)} className=" bg-transparent text-gray-400 font-medium text-lg w-full" rows="2" cols="50" placeholder="What's happening?"></textarea>
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

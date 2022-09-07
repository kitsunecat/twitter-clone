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
    <div className="w-full lg:w-1/2 bg-white mb-4">
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
          <div className="flex flex-shrink-0 p-4 pb-0">
            <a href="#" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <img className="inline-block h-10 w-10 rounded-full" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAXVBMVEX///8dofIAnfIAm/EAmfEVn/IAl/Hg8P202/rx+f75/f/T6fzD4vuf0fiFxffq9f5MsPQppPJru/XZ7fxXtPWNyfen1fnL5vt3wPY+qvQAlPFkuPWZzvg9rPN2vPZv+CZ4AAAC8UlEQVRoge2Z6ZKqMBCFoTut7CHsDuD7P+YFRmcchQQatOpW5fupJIeT7nQWHMdisVgsFovFYrFYLP8/Z69s0yKLI/+DooGXEgIRAYJqwse/ZPQ+2egC5P4AkMn7P34MLN0sWPFQgg+qk7Jbj78Heakw5cjWX+2Kd0P3BfT8ukwRXFFzdDPChCM7WB7iPeo3HFlnaCoMLWMxJ3uDLmvi9EIojK+cz7q9m1ajrNw81N7UKRaaly5II1sMol5Bcrn5PCV8t7+cl54INXap9RIFgOFS40USuPXgegtPNKAZZndMLVxqqqH86RWb2fLnX3SyI6LaLuvEv6OIaq7u5JrofjfrGLJO9Bg9zF6jHOmyeQA4bodhPP3pBJtnZc+gy10TnsIHmP1NzkqbVm7OlHXi537ppLoH05XeL1s3mOkXxKWrb9ltiC9b9zGjH6UB+qaKQllrZd3FcmOmX5gpNGiDq/S6mwvkL2fXNEUXIcXdaoXDghDyhRXX7PUSSydPuX5ZW5yRBBD7a8bUhStXd5qexB1nXm0eCU/m3jW6rC3dBD+nRvjTN9HXXz09a083IXWbRQPA28LuNsw7oNwIFDfCpHZUySGluYYp2yM7LHXM+Sv2nj9rl2WZvSj8IIvTdstQ7pUdLRenrZ5xV1aNTLPfLzfaNR5fjeTUp70y7Cxe7O7Y4twpYHNKH2DXfCiYs3vIZVK2OaniI2QdubFYUn+I7OZiCQck1U34+YbqA6M8IdXq5MKdC8ITMa3zTCl/mzGLH6cojNo7l91ZAhlVrV6YdpwBdXj6KUXu9kujFeStfpzfIysT0A8yvCG2zjkh0+VNevgVv6xS48qPR+wwRq3p7YNzXTVKGKsGKv5p6En3+iVQCERDVEcIywOrRd6KdSVq7ipvF2ELxqUIsH1DrcgTpRtnQpUc7PWO72VqNsYEqLK3fh7z665Q040VTXzfXbVd+IFvckEeVV3TFmlaZEnn1eeDlzuLxWKxWCwWi8VisXyaf3jsH8eZomRXAAAAAElFTkSuQmCC" alt="" />
                </div>
                <div className="ml-3">
                  <p className="text-base leading-6 font-medium text-white">
                    User name
                    <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      @id . {tweet.createdAt}
                    </span>
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className="pl-16">
            <p className="text-base width-auto font-medium text-white flex-shrink">
              {tweet.content}
            </p>


            <div className="flex">
              <div className="w-full">

                <div className="flex items-center">
                  <div className="flex-1 text-center">
                    <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                      <svg className="text-center h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    </a>
                  </div>

                  <div className="flex-1 text-center py-2 m-2">
                    <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                      <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                    </a>
                  </div>

                  <div className="flex-1 text-center py-2 m-2">
                    <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                      <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </a>
                  </div>

                  <div className="flex-1 text-center py-2 m-2">
                    <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                      <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    </a>
                  </div>
                  <div className="flex-1 text-center py-2 m-2">
                    <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                      <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
                    </a>
                  </div>
                  <div className="flex-1 text-center py-2 m-2">
                    <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                      <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => deleteTweetHandler(tweet.id)}>delete</button>
          <hr className="border-gray-600" />
        </div>
      ))
      }
    </div >
  )
}

export default Home

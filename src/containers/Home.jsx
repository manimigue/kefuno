import React, { useState, useEffect, lazy, Suspense } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ReactPlayer from 'react-player/lazy'
import Skeleton from 'react-loading';

import {selectPlayed, savePlayed} from '../store/video'

import News from './News'

import Pic from '../img/homepic.webp'
import Video from  '../video/video.mov'
import '../sass/main/home.scss'

const Twitter = lazy(() => import('../component/Twitter'));


const Home = () => {
  const played = useSelector(selectPlayed);
  const dispatch = useDispatch();

  const [playable,setPlayable] = useState(false)
  const [hide, setHide] = useState(played)

  useEffect(() => {
    if (played) {
      setTimeout(() => {
        setHide(true)
      }, 2000)
    }
  },[played])

  return (
    <div className="home">
      {hide ? null : 
      <div className={played ? "topVideo played" : "topVideo"}>
        <ReactPlayer 
          url={Video} 
          playing={playable} 
          playsinline 
          volume={0}
          muted={true}
          onReady={() => setPlayable(true)} 
          width="100%" height="auto"
          onEnded={() => dispatch(savePlayed())}
          fallback={() => null}
        />
        {/* <button onClick={() => dispatch(savePlayed())} className={playable ? "skip" : "skip loading"}>
          <span>スキップ→</span>
        </button> */}
      </div>}
      <img className="topImage" src={Pic} alt="kefuno. Home" />
      <News />
      <div className="twitterContainer">
        <Suspense fallback={() => <Skeleton width="100%" height="100%"/>} >
          <Twitter account='twitter'/>
        </Suspense>
      </div>
    </div>
  )
}

export default Home

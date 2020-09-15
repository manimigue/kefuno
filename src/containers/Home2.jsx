import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ReactPlayer from 'react-player/lazy'

import {selectPlayed, savePlayed} from '../store/video'

import News from './News'
import Twitter from '../component/Twitter'

import Pic from '../img/homepic.png'
import Video from  '../video/video.mov'
import '../sass/main/home2.scss'

const Home2 = () => {
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
    <div className="home2">
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
        />
        <button onClick={() => dispatch(savePlayed())} className={playable ? "skip" : "skip loading"}>
          <span>スキップ→</span>
        </button>
      </div>}
      <img className="topImage" src={Pic} alt="kefuno. Home" />
      <News />
      <Twitter account='twitter'/>
    </div>
  )
}

export default Home2

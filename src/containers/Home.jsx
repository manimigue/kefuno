import React, { useState, useEffect, lazy, Suspense } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ReactPlayer from 'react-player/lazy'
import Skeleton from 'react-loading';

import {selectPlayed, savePlayed} from '../store/video'

import News from './News'

import Thumb_mobile from '../img/thumb_mobile.jpg'
import Thumb_pc from '../img/thumb_pc.jpg'
import Video_mobile from  '../video/mobile.mov'
import Video_pc from  '../video/pc.mov'

import '../sass/main/home.scss'

const Twitter = lazy(() => import('../component/Twitter'));


const Home = () => {
  const played = useSelector(selectPlayed);
  const dispatch = useDispatch();

  const [playable,setPlayable] = useState(false)
  const [hide, setHide] = useState(played)
  const [width, setWidth] = useState(window.innerWidth)

  const mobile = width >= 720 ? false : true

  const Video = mobile ?  Video_mobile : Video_pc 
  const Pic = mobile ? Thumb_mobile : Thumb_pc

  useEffect(() => {
    window.addEventListener("resize", ()=>setWidth(window.innerWidth))
    if (played) {
      setTimeout(() => {
        setHide(true)
      }, 2000)
    }
  },[played])

  return (
    <div className={ mobile ? "home mobile" : "home pc"}>
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
          loop={true}
        />
        {/* <button onClick={() => dispatch(savePlayed())} className={playable ? "skip" : "skip loading"}>
          <span>スキップ→</span>
        </button> */}
      </div>}
      <picture alt="kefuno. Home">
        <img className="topImage" src={Pic} alt="kefuno. Home"/>
      </picture>
      <News />
      <div className="twitterContainer">
        <Suspense fallback={<Skeleton width="100%" height="100%"/>} >
          <Twitter account='twitter'/>
        </Suspense>
      </div>
    </div>
  )
}

export default Home

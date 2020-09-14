import React, { useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { Cancel } from '@material-ui/icons'
import {useSelector, useDispatch} from 'react-redux'

import {selectPlayed, savePlayed} from '../store/video'

import Pic from '../img/homepic.png'
import Video from  '../video/video.mov'
import '../sass/main/home.scss'
import News from './News'
import Twitter from '../component/Twitter'

const Home = () => {
  const played = useSelector(selectPlayed);
  const dispatch = useDispatch();

  const [playable,setPlayable] = useState(false)

  return (
    <div className="home">
      {played ? null : 
      <div className="topVideo">
        <Cancel onClick={() => dispatch(savePlayed())} />
        <ReactPlayer 
          url={Video} 
          playing={playable} 
          onReady={() => setPlayable(true)} 
          width="100%" height="100%" 
          onEnded={() => dispatch(savePlayed())}
        />
      </div> }
      <img className="topImage" src={Pic} alt="kefuno. Home" />
      <News />
      <Twitter account='twitter'/>
    </div>
  )
}

export default Home

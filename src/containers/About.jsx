import React from 'react'

import Logo from '../img/logo_whiteback.png'
import '../sass/main/about.scss'

const About = () => {
  return (
    <div className="about">
      <h3>kefuno. プロフィール</h3>
      <img src={Logo} alt="kefuno. Logo" style={{maxWidth: "300px"}}/>
      <p>
      音楽家 藤川大晃と作家 行川優によるユニット。<br/>
      日本語という言葉に焦点を当て、言葉自体が持つ音と時間構造を探究する作品を制作している。<br/>
      主な作品に、連作シアターピース「koto-ba」シリーズがある。
      </p>
    </div>
  )
}

export default About
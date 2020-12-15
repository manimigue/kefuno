import React from 'react'

import Logo from '../img/logo_whiteback.png'
import '../sass/main/about.scss'

export default () => {
  return (
    <div className="about">
      <h1>kefuno. プロフィール</h1>
      <p>
      音楽家 藤川大晃と作家 行川優によるユニット。<br/>
      日本語という言葉に焦点を当て、言葉自体が持つ音と時間構造を探究する作品を制作している。<br/>
      主な作品に、連作シアターピース「koto-ba」シリーズがある。
      </p>
      <img src={Logo} alt="kefuno. Logo" />
    </div>
  )
}

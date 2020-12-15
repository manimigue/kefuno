import React from 'react'

import Image_webp from '../img/kefuno_image01.webp'
import Image_jpg from '../img/kefuno_image01.jpg'
import '../sass/main/work.scss'

export default () => {
  return (
    <div className="work">
      <h1 className="title">Work</h1>
      <h2>月に惑ふ</h2>
      <picture alt="kefuno. Home" className="topImage">
        <source srcSet={Image_webp} type="image/webp" />
        <img src={Image_jpg} alt="kefuno. Home"/>
      </picture>
      <p>
      『更級日記』を題材に、日記文学の中にある複数の声と時間構造を音楽として再構成する作品。舞台作品として、シアターピース化する予定で進めていたが、コロナ禍によって大きく方向転換。配信、連作化することで、新しい芸術形態を思考するプロジェクトとして再スタートした。<br/>
      菅原孝標女という一人の女性が生きた人生と、彼女が憧れた『源氏物語』の登場人物浮舟の人生が交錯し、複数の「声」による対話が行われる。 
      </p>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import MarkdownRender from "@nteract/markdown";
import replace_assets from '../../article/replace_assets';
import I0 from '../markdown/assets/kefuno.drawio.png'
import I1 from '../markdown/assets/typora_download.png'
import I2 from '../markdown/assets/typora_setting1.png'
import I3 from '../markdown/assets/assets2.png'
import I4 from '../markdown/assets/imgset4.png'
import I5 from '../markdown/assets/imgset3.png'
import I6 from '../markdown/assets/kefunoApp.png'
import I7 from '../markdown/assets/typoraex.png'
import I8 from '../markdown/assets/style.png'
import I9 from '../markdown/assets/upload1.png'
import I10 from '../markdown/assets/upload2.png'
import A1 from '../markdown/assets/kefuno.zip'
import A2 from '../markdown/assets/kefunoStyle.zip'
const paths = {
  'kefuno.drawio.png' : I0,
  'typora_download.png' : I1,
  'typora_setting1.png' : I2,
  'assets2.png' : I3,
  'imgset4.png' : I4,
  'imgset3.png' : I5,
  'kefunoApp.png' : I6,
  'typoraex.png' : I7,
  'style.png' : I8,
  'upload1.png' : I9,
  'upload2.png' : I10,
  'kefuno.zip' : A1,
  'kefunoStyle.zip' : A2
}

export default () => {
  const [markdown, setMarkdown] = useState('loading...')

  useEffect(() => {
    const path = require("../markdown/kefunoWebpage概要.md");

    fetch(path)
    .then(response => {
      return response.text()
    })
    .then(text => {    
      setMarkdown(replace_assets(text,paths))
    })
  })
  return (
    <MarkdownRender 
      className='article' 
      source={markdown} 
      escapeHtml={false}
    />
  )
}

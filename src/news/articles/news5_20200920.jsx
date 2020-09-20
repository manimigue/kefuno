import React, { useState, useEffect } from 'react'
import MarkdownRender from "@nteract/markdown";
import replace_assets from '../../article/replace_assets';
import I0 from './assets/スクリーンショット 2020-05-06 19.34.28.png'
import I1 from './assets/logo.png'
import I2 from './assets/test.png'
import I3 from './assets/test2.png'
const paths = {
  'スクリーンショット 2020-05-06 19.34.28.png' : I0,
  'logo.png' : I1,
  'test.png' : I2,
  'test2.png' : I3
}

export default () => {
  const [markdown, setMarkdown] = useState('loading...')

  useEffect(() => {
    const path = require("../markdown/写真テスト.md");

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

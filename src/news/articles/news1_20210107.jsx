import React, { useState, useEffect } from 'react'
import MarkdownRender from "@nteract/markdown";
import replace_assets from '../../article/replace_assets';
import path from "../markdown/ホームページを開設しました.md"
import I0 from '../markdown/assets/kefuno_image02.jpg'
const paths = {
  'kefuno_image02.jpg' : I0
}

const NewsArticle = () => {
  const [markdown, setMarkdown] = useState('loading...')

  useEffect(() => {

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

export default NewsArticle

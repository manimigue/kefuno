import React, { useState, useEffect } from 'react'
import MarkdownRender from "@nteract/markdown";
import path from "../markdown/レコーディングの様子.md";
import replace_assets from '../../article/replace_assets';
import I0 from '../markdown/assets/IMG_6252-1903301.jpg'
import I1 from '../markdown/assets/IMG_6255-1903307.jpg'
const paths = {
  'IMG_6252-1903301.jpg' : I0,
  'IMG_6255-1903307.jpg' : I1
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

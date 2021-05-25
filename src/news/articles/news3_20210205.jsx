import React, { useState, useEffect } from 'react'
import MarkdownRender from "@nteract/markdown";
import path from "../markdown/月に惑ふ ＃1 について.md";
import replace_assets from '../../article/replace_assets';

const paths = {

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
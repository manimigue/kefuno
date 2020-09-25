import React, { useState, useEffect } from 'react'
import MarkdownRender from "@nteract/markdown";
import replace_assets from '../../article/replace_assets';

const paths = {

}

export default () => {
  const [markdown, setMarkdown] = useState('loading...')

  useEffect(() => {
    const path = require("../markdown/Typoraの使い方.md");

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
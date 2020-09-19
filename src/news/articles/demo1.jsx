import React, { useState, useEffect } from 'react'
import MarkdownRender from "@nteract/markdown";

const Demo = () => {
  const [markdown, setMarkdown] = useState('loading...')

  useEffect(() => {
    const path = require("../markdown/demo1.md");

    fetch(path)
    .then(response => {
      return response.text()
    })
    .then(text => {
      setMarkdown(text)
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

export default Demo

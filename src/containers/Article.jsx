import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import AxiosBase from 'axios';
import MarkdownRender from "@nteract/markdown";
import urljoin from 'url-join';

import Back from '../component/Back'

const Article = ({ id, type, delHome, selectHome, root }) => {
  let { url } = useParams();
  const [md, setMd] = useState("loading...")
  const [ error, setError ] = useState(null)

  useEffect(() => {
    const axios = AxiosBase.create({
      baseURL: urljoin(root, type + "-articles")
    })
    const fetchMd = async (id, url) => {
      if (id) {
        try {
          const response = await axios.get(String(id));
          setMd(response.data.content)
        } catch (e) {
          setError("## ページが見つかりませんでした")
        }
      } else {
        try {
          const id = url.match(/^news(\d+)_/)[1]
          const response = await axios.get(String(id));
          setMd(response.data.content)
        } catch (e) {
          setError("## ページが見つかりませんでした")
        }
      }
    }
    fetchMd(id, url)
  }, [id, url, root, type])
  return (
    <div className="articleContent">
      <Back type={type} delHome={delHome} selectHome={selectHome}>&#8249; 戻る</Back>
      <MarkdownRender 
        className='article' 
        source={error ? String(error) : md}
        escapeHtml={false}
        renderers={{
          "image" : (props) => <img {...props} alt={props.alt} src={urljoin(root,props.src)} />
        }}
      />
      <Back type={type} delHome={delHome} selectHome={selectHome}>&#8249; 戻る</Back>
    </div>
  )
}

export default Article

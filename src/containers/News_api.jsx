import React , { Component } from 'react';
import urljoin from 'url-join'

import Articles from './Articles'

import '../sass/main/news.scss';
import Axios from 'axios';
import { dataToLog } from '../news/api';

class News_api extends Component {
  state = {
    log: [],
    tags: [],
    error: null
  }

  static defaultProps = {
    root: "http://localhost:1337"
  }

  type = "news"

  axios = Axios.create({
    baseURL: urljoin(this.props.root)
  })

  componentDidMount = async ()  => {
    window.scrollTo(0, 0)
    try{
      const response = await this.axios.get(this.type + "-articles")
      const tag_response = await this.axios.get('tags/name')
      const log = dataToLog(response.data)
      const tags = tag_response.data
      this.setState({ log, tags })
    }catch(error) {
      this.setState({ error })
    }
  }

  render() {
    const logReverse = this.state.log.slice(0).reverse()
    const tags = this.state.tags
    return (
      <Articles title='News' log={logReverse} type={this.type} range={5} tags={tags}/>
    );
  }
}



export default News_api;

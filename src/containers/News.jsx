import React , { Component } from 'react';

import log from '../news/log.json';
import tags from '../news/tag.json';
import Articles from './Articles'

import '../sass/main/news.scss';

class News extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Articles title='News' log={log} type='news' range={5} tags={tags}/>
    );
  }
}



export default News;

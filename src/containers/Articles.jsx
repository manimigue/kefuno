import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import Fade from 'react-reveal/Fade';
import { Search, Cancel } from '@material-ui/icons';
import Button from 'react-bootstrap/Button';

import { saveStart, saveTag, saveHome } from '../store/news'
import Link from '../component/Link';

class Articles extends Component {
  static defaultProps = {
    range: false,
    tags: false,
    date : true,
    more : false
  }

  static propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.listRef = React.createRef()
    this.state = {
      start : props.start,
      selectedTag : props.selectedTag,
      tagDisp : props.tagDisp,
      logPart : (props.logPart === null ? props.log : props.logPart),
      listTag : true
    }
    if (props.range !== false) {
      for (var i = 0; i < props.range; i++) {
        this[`tagRef${i}`] = React.createRef()
      }
      if (this.state.start < props.range){
        this.state.prevBut = false;
      } else {
        this.state.prevBut = true;
      }

      this.state.end = this.state.start+props.range;

      if (this.state.end >= this.state.logPart.length){
        this.state.nextBut = false;
      } else {
        this.state.nextBut = true;
      }

    } else {
      this.state.nextBut = false;
      this.state.end = this.state.logPart.length;
    }

    this.state.logSlice = this.state.logPart.slice(this.state.start,this.state.end);

  }

  setSlice = (start, end, logPart) => {
    this.setState({
      start,
      end,
      logSlice : logPart.slice(start,end),
      listTag : true
    })
  }

  first = (range, logPart=this.state.logPart) => {
    this.setSlice(0, range, logPart)
  }

  previous = (start, range) => {
    this.setSlice(start-range, start, this.state.logPart)
  }

  next = (end, range) => {
    this.setSlice(end, end+range, this.state.logPart)
  }

  toUrl = (url, range, logPart) => {
    const index = logPart.findIndex((l) => {
      return l.url === url
    })
    const start = Math.floor(index / range) * 5;
    
    this.setSlice(start, start+range,logPart)
  }

  selectTag = (tag, range, selectedTag, toFirst=true,url=null) => {
    const nTag = tag === selectedTag ? null : tag;
    const logPart = nTag !== null ?
     this.props.log.filter(l => l.tag.includes(nTag)) :
     this.props.log;

    this.setState({
      selectedTag: nTag,
      logPart: logPart
    })
    if (toFirst || url === null){
      this.first(range, logPart)
    } else {
      this.toUrl(url, range, logPart)
    }

    ReactGA.event({
      category : 'Tag',
      action : nTag
    })
  }

  switchTagDisp = (tagDisp) => {
    this.setState({
      tagDisp: !tagDisp
    });
  }

  initializeTag = (range) => {
    this.setState({
      selectedTag: null,
      logPart: this.props.log,
      tagDisp: false
    });
    this.first(range,this.props.log)
  }

  articleURL = url => ("/" + this.props.type + "/" + url)

  componentDidMount() {
    if (this.props.tags !== false){
      const listWidth = this.listRef.current.offsetWidth
      if (this.state.listTag){
        for (var i = 0; i < this.state.logSlice.length; i++) {
          try {
            if (listWidth-this[`tagRef${i}`].current.offsetWidth < 170){
              this.setState({ listTag : false })
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    }
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextProps.range !== false){
  //     if (nextState.start < nextProps.range){
  //       if (nextState.prevBut){
  //         this.setState({prevBut:false})
  //       }
  //     } else {
  //       if (!nextState.prevBut){
  //         this.setState({prevBut:true})
  //       }
  //     }
  //     if (nextState.end >= nextState.logPart.length){
  //       if (nextState.nextBut){
  //         this.setState({nextBut:false})
  //       }
  //     } else {
  //       if (!nextState.nextBut){
  //         this.setState({nextBut:true})
  //       }
  //     }
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tags !== false){
      const listWidth = this.listRef.current.offsetWidth
      if (this.state.listTag){
        for (var i = 0; i < this.state.logSlice.length; i++) {
          try {
            if (listWidth-this[`tagRef${i}`].current.offsetWidth < 170){
              this.setState({ listTag : false })
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    }

    if (this.props.range !== false){
      if (this.state.start < this.props.range){
        if (this.state.prevBut){
          this.setState({prevBut:false})
        }
      } else {
        if (!this.state.prevBut){
          this.setState({prevBut:true})
        }
      }
      if (this.state.end >= this.state.logPart.length){
        if (this.state.nextBut){
          this.setState({nextBut:false})
        }
      } else {
        if (!this.state.nextBut){
          this.setState({nextBut:true})
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.saveStart(this.state.start, this.props.type)
    this.props.saveTag(this.state.selectedTag, this.state.tagDisp, this.state.logPart, this.props.type)
  }



  render() {
    const {type, title, range, tags, date, more} = this.props;
    const {start, end, prevBut, nextBut, selectedTag, tagDisp, logSlice, listTag} = this.state;

    const lists = logSlice.map((article, i) => {
      const articleTags = tags !== false &&  listTag ?
        article.tag.map(tag => {
          const tagSelector = (
            <Button
              className='tagSelector'
              variant={tag === selectedTag ? "secondary" : "outline-secondary"}
              onClick={()=>this.selectTag(tag, range, selectedTag,false,article.url)}
              key={article.url + tag}
            >
              #{tag}
            </Button>
          )
          return tagSelector
        })
        : null;

      const tagDiv = <div display="inline-block" className="tagDiv" key={i} ref={this[`tagRef${i}`]}>{articleTags}</div>

      return (
        <li key={article.url} className='articleList' style={{cursor:"pointer"}}>
            <Link
            key={article.url+'button'}
            to={this.articleURL(article.url)}
          className='articleListTitle'
            >
              <h3 key={article.url+'h2'} className='article-title'>{article.title}</h3>
            </Link>
          <div>
          { date ?
              <Link key={article.url+'p'} className='article-date' to={this.articleURL(article.url)}><span>更新日:{article.date}</span></Link>
           : null
          }
            {tagDiv}
          </div>
          { more ?
            <Link key={article.url+'more'} className='article-more' to={this.articleURL(article.url)}>…read more</Link>
             : null
          }
        </li>
      );
    });
    const button = nextBut || prevBut ?
    (
      <div className='articleButton' height='50px'>
        <Button
          className='articlePrev'
          variant="dark"
          style={{display : prevBut ? 'block' : 'none'}}
          onClick={()=>this.previous(start,range)}
        >
          &#8249; 戻る
        </Button>
        <Button
          className="articleFirst"
          variant="secondary"
          style={{display : start!==0 ? 'inline-block' : 'none'}}
          onClick={()=>this.first(range)}
        >
          &laquo; 最新へ
        </Button>
        <Button
          className='articleNext'
          variant="dark"
          style={{display : nextBut ? 'block' : 'none'}}
          onClick={()=>this.next(end,range)}
        >
          次へ &#8250;
        </Button>
      </div>
    )
    : null;

    const tagSearch = tags !== false ?
    (
      <Button
        className='tagSearch'
        onClick={() => this.switchTagDisp(tagDisp)}
        style={{textAlign:"center"}}
        variant="link"
      >
        Search<Search />
      </Button>
    ) :
    null;

    const tagSelectors = tags !== false ? (
      tags.map(tag => {
        return (<Button
          className='tagSelector tagSelector-main'
          variant={tag === selectedTag ? "secondary" : "outline-secondary"}
          onClick={()=>this.selectTag(tag, range, selectedTag)}
          key={tag}
        >
          #{tag}
        </Button>)
      }).concat(
        [<Button
          className='tagSelector tagSelector-main'
          variant="secondary"
          onClick={()=>this.initializeTag(range)}
          key="null"
        >
          <Cancel />
        </Button>]
      )
    ) : null;

    return (
      <div className={"articleSec articleSec-"+type}>
        <h2 className='title'>{title}{tagSearch}</h2>
        <Fade right collapse when={tags !== false && tagDisp !== false} children={<div>{tagSelectors}</div>} duration={2000}/>
        <ul className='articles' ref={this.listRef}>{lists}</ul>
        {button}
      </div>
    );
  }
}

const mapStateToProps = ({news}) => ({
  start: news.start,
  selectedTag: news.selectedTag,
  tagDisp: news.tagDisp,
  logPart: news.logPart,
  home: news.home
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveStart(start){
      dispatch(saveStart(start))
    },
    saveTag(selectedTag, tagDisp, logPart){
      dispatch(saveTag({selectedTag, tagDisp, logPart}))
    },
    saveHome(){
      dispatch(saveHome())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);

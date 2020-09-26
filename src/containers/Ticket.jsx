import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import ReactGA from 'react-ga';
import {Helmet} from 'react-helmet';

import {ticketInfo as Info, ticketTypes, ticketMax} from '../data/ticket';

import '../sass/main/ticket.scss'

class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketTypeNum : 1,
      on : "on",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  addTicket = () => {
    if (this.state.ticketTypeNum < 3){
      this.setState({
        ticketTypeNum : this.state.ticketTypeNum + 1
      })
    }
  }

  reduceTicket = () => {
    if (this.state.ticketTypeNum > 1){
      this.setState({
        ticketTypeNum : this.state.ticketTypeNum - 1
      })
    }
  }

  onWhich = (on,component) => {
    switch (on) {
      case "on":
        return component;
      case "commingSoon":
        return <h5 style={{marginBottom:"30px"}}>Comming soon</h5>;
      case "end":
        return <h5 style={{marginBottom:"30px"}}>販売終了しました。</h5>;
      default:
        return ;
    }
  }

  gaSubmit = (action) => {
    ReactGA.event({
      category: 'User',
      action: action
    });
  }

  render() {
    const mail = "orchestra.musicart.ticket@gmail.com";
    const ticketTypeNum = this.state.ticketTypeNum;
    const ticketSelect = (type) => (
      <div className={"ticket-type type" + type.toString()} key={type}>
        <h5>券種{ticketTypeNum < 2 ? null : type.toString()}</h5>
        <select 
        name={'券種' + type.toString()} 
        as="select" 
        disabled={type > ticketTypeNum}>
          {
            ticketTypes.map((t) => (<option key={t} value={t}>{t}</option>))
          }
        </select>
        <h5>枚数</h5>
        <select className="formControl"
        name={'枚数' + type.toString()} 
        as="select" 
        disabled={type > ticketTypeNum}>
          {
            Array.from(Array(ticketMax), (v, num) => (<option key={type * ticketMax + num} value={num + 1}>{num + 1}</option>))
          }
        </select>
      </div>
    )
    const ticketSelections = () => (
      <React.Fragment>
        { ticketSelect(1) } 
        { ticketTypes.length > 1 ? 
          <React.Fragment>
            {Array.from(Array(ticketTypes.length -1 ), (v,num) => (
              <Fade key={num} collapse when={num+2 <= ticketTypeNum}>
                {ticketSelect(num+2)}
              </Fade>
            ))}
            <div className="manageTicketTypes">
              <Fade duration={500} when={ticketTypeNum < ticketTypes.length} >
                <div className='add'>
                  <button type="button" onClick={this.addTicket}> + </button>
                </div>
              </Fade>
              <Fade duration={500} when={ticketTypeNum > 1}>
                <div className='reduce'>
                  <button type="button" onClick={this.reduceTicket}> - </button>
                </div>
              </Fade>
            </div>
          </ React.Fragment>
        : null
        }
      </React.Fragment>
    )

    const ticketForm = () => (
      <React.Fragment>
        <p>下記のフォームに入力していただき、送信してください。<br/>1 週間以内に確認の連絡を送らせて頂きます。</p>
        <form method="POST" action={"https://formspree.io/" + mail} >
          { ticketSelections() }
          <h5>代表者名</h5>
          <input type='text' name='代表者名' placeholder="佐藤　太郎" />
          <h5>メールアドレス</h5>
          <input type="email" name="返信先メールアドレス" placeholder="you@example.com"/>
          <h5>電話番号</h5>
          <input type="tel" name="返信先電話番号" placeholder="09012345678"/>
          <h5>その他お問い合わせ</h5>
          <textarea name='お問い合わせ内容'></textarea>
          <input className='submit' type="submit" value='Send' onClick={() => this.gaSubmit('Tickets reservation')}/>
        </form>
      </React.Fragment>
    )

    return (
      <div className='ticket'>
        <Helmet>
          <title>kefuno. チケット情報</title>
        </Helmet>
        <div className="title"><h2 >Ticket</h2></div>
        <Info />
        <div className='ticket-buy' >
          <h4>チケット予約</h4>
          <div className='ticket-form'>
            {this.onWhich(this.state.on,ticketForm())}
          </div>
        </div>
      </div>

    );
  }
}

export default Tickets;
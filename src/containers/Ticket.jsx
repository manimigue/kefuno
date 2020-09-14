import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
        <Form.Control 
        name={'券種' + type.toString()} 
        as="select" 
        disabled={type > ticketTypeNum}>
          {
            ticketTypes.map((t) => (<option key={t} value={t}>{t}</option>))
          }
        </Form.Control>
        <h5>枚数</h5>
        <Form.Control 
        name={'枚数' + type.toString()} 
        as="select" 
        disabled={type > ticketTypeNum}>
          {
            Array.from(Array(ticketMax), (v, num) => (<option key={type * ticketMax + num} value={num + 1}>{num + 1}</option>))
          }
        </Form.Control>
      </div>
    )
    const ticketSelections = () => (
      <React.Fragment>
        { ticketSelect(1) } 
        { ticketTypes.length > 1 ? 
          Array.from(Array(ticketTypes.length -1 ), (v,num) => (
            <Fade key={num} collapse when={num+2 <= ticketTypeNum}>{ticketSelect(num+2)}</Fade>
          ))
        : null
        }
        { (ticketTypes.length > 1 && ticketTypeNum < ticketTypes.length) ? 
          <Button onClick={this.addTicket} className='add-ticketTypes'> + </Button>
        : null
        }
        { (ticketTypes.length > 1 && ticketTypeNum > 1) ? 
          <Button onClick={this.reduceTicket} className='reduce-ticketTypes'> - </Button>
        : null
        }
      </React.Fragment>
    )

    // for multiple ticket types
    // <h5>券種{type}</h5>
    // <Fade collapse when={2 <= ticketTypeNum}>{ ticketSelect(2) }</Fade>
    // <Fade collapse when={3 <= ticketTypeNum}>{ ticketSelect(3) }</Fade>
    // {this.state.ticketTypeNum < 3 ? <Button onClick={this.addTicket} className='add-ticketTypes'> + </Button> : null}
    // {this.state.ticketTypeNum > 1 ? <Button onClick={this.reduceTicket} className='reduce-ticketTypes'> - </Button> : null}

    const ticketForm = () => (
      <React.Fragment>
        <h1 style={{fontFamily:'Baskerville Normal',fontWeight:"normal",fontSize:"42px"}}>AaBbCcDdEeFfGgHhŞşIıİi Example</h1>
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
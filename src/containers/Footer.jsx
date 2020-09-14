import React from 'react';

// import Logo from '../img/footer_logo.png'
// import twitter from '../img/twitter-64.png'
import Link from '../component/Link';
import links from '../data/links';

import '../sass/footer/footer.scss'

const Footer = () => {
  const lists = links.map(link => (
    <Link 
      key={link.text} 
      to={link.url}
      className='footerLink'
    >{link.text}</Link>
  ));

  return (
    <footer>
      <div className='footerTop'>
        <div className="title"><h2>kefuno.</h2></div>
      </div>
      <div className='footerLinks'>
        <ul>{lists}</ul>
          {/* <img src={Logo} alt='Mμsicart' size='60%' onClick={() => this.props.linkToPage('Route','/')}/>
          <a href='https://twitter.com/orch_musicart'>
            <img className='twitter' src={twitter} alt='twitter' width='5%'/>
          </a> */}
      </div>
      <div className="copyright">
        <p>Ⓒ 2020 kefuno.</p>
      </div>
    </footer>
  );
}

export default Footer;

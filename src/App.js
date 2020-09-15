import React from 'react';
import { Route } from 'react-router-dom'

import Home from './containers/Home'
import Home2 from './containers/Home2'
import Header from './containers/Header';
import News from './containers/News'
import Contact from './containers/Contact';
import Tickets from './containers/Ticket';
import Footer from './containers/Footer';
import NewsRoutes from './news';

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className='main'>
        <Route exact path='/' component={Home} />
        <Route exact path='/home2' component={Home2} />
        <Route exact path='/news' component={News} />
        <Route exact path='/ticket' component={Tickets} />
        <Route exact path='/contact' component={Contact} />
        <NewsRoutes />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;

import React from 'react';
import { Route } from 'react-router-dom'

import Home from './containers/Home'
import Header from './containers/Header';
import News from './containers/News'
import Contact from './containers/Contact';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Route exact path='/' component={Home} />
      <Route exact path='/news' component={News} />
      <Route exact path='/contact' component={Contact} />
    </React.Fragment>
  );
}

export default App;

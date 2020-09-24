import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom'
import Footer from './containers/Footer'
import NewsRoutes from './news'
import Home from './containers/Home'
import Header from './containers/Header';

const News =  lazy(() => import( './containers/News'))
const Contact =  lazy(() => import( './containers/Contact'));
const Tickets =  lazy(() => import( './containers/Ticket'));

const renderLoader = () => <p>Loading</p>;

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className='main'>
        <Route exact path='/' component={Home} />
        <Suspense fallback={renderLoader()}>
          <Route exact path='/news' component={News} />
          <Route exact path='/ticket' component={Tickets} />
          <Route exact path='/contact' component={Contact} />
        </Suspense>
        <NewsRoutes />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;

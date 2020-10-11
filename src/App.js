import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom'
import Footer from './containers/Footer'
import NewsRoutes from './news'
import Home from './containers/Home'
import Header from './containers/Header';
import { delHome, selectHome } from './store/news'

const News =  lazy(() => import( './containers/News_api'))
const Contact =  lazy(() => import( './containers/Contact'));
const Tickets =  lazy(() => import( './containers/Ticket'));
const Article = lazy(() => import('./containers/Article'))

const renderLoader = () => <p>Loading</p>;



function App({ strapiRoot }) {
  return (
    <React.Fragment>
      <Header />
      <div className='main'>
        <Route exact path='/' component={Home} />
        <Suspense fallback={renderLoader()}>
          <Route exact path='/news' component={() => <News root={strapiRoot} />} />
          <Route exact path='/ticket' component={Tickets} />
          <Route exact path='/contact' component={Contact} />
          <Route path='/news/:url' component={() => <Article type="news" root={strapiRoot} delHome={delHome} selectHome={selectHome}/>} />
        </Suspense>
        <NewsRoutes />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;

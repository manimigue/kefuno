import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import './sass/index.scss'
import './sass/fonts.scss'

import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import watchForHover from './watchForHover'
import * as serviceWorker from './serviceWorker';


ReactGA.initialize('UA-177620795-1');
const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

history.listen(({ pathname }) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
});

watchForHover()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history} basename='/kefuno'>
        <App strapiRoot="https://kefuno-strapi.gq/"/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

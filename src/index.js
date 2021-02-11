import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { createStore } from 'redux';

import { db, auth, storage } from './firebase';
import rootReducer from './reducer';
import * as serviceWorker from './serviceWorker';

import './index.css';
import About from './View/About/index';
import Help from './View/Help/index';
import Terms from './View/Terms/index';
import Contact from './View/Contact/index';
import Trust from './View/Trust/index';
import Cancellation from './View/Cancellation/index';
import App from './View/App.js';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
window.store = store;

function Routing() {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/about' component={About} />
          <Route path='/help' component={Help} />
          <Route path='/terms' component={Terms} />
          <Route path='/contact' component={Contact} />
          <Route path='/trust' component={Trust} />
          <Route path='/cancellation' component={Cancellation} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Routing />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

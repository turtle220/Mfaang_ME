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
import Admin from './View/Admin/index';
import Meet from './View/Meet/index';
import LogIn from './components/UserLog/LogIn';
import SignUp from './components/UserLog/SignUp';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
window.store = store;

function Routing() {
  const [posts, setPosts] = useState([]);
  console.log('--posts:', posts);
  useEffect(() => {
    if (!posts.length) {
      db.collection('post')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          //every time a new post is added, it fires up onSnapshot
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          );
        });
    }
  }, [posts]);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/login' component={LogIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/admin' component={Admin} />
          <Route path='/meet' component={Meet} />
          <Route path='/about' component={About} />
          <Route path='/help' component={Help} />
          <Route path='/terms' component={Terms} />
          <Route path='/contact' component={Contact} />
          <Route path='/trust' component={Trust} />
          <Route path='/cancellation' component={Cancellation} />

          {/* <Route
            path='/:id'
            component={({ match }) => {
              const postsArray = [];

              posts.forEach((element) => {
                if (element.id === match.params.id) {
                  postsArray.push({
                    username: element.post.username,
                    caption: element.post.caption,
                    imageUrl: element.post.imageUrl,
                    imageName: element.post.imagename,
                    email: element.post.useremail,
                    count: element.post.count ? element.post.count : 0
                  });
                }
              });

              return (
                <Post
                  key={match.params.id}
                  postId={match.params.id}
                  count={postsArray[0] && postsArray[0].count}
                  username={postsArray[0] && postsArray[0].username}
                  caption={postsArray[0] && postsArray[0].caption}
                  imageUrl={postsArray[0] && postsArray[0].imageUrl}
                  imageName={postsArray[0] && postsArray[0].imageName}
                  email={postsArray[0] && postsArray[0].email}
                />
              );
            }}
          /> */}
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

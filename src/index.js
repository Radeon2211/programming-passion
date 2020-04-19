import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './store/reducers/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import fbConfig from './config/fbConfig';
import firebase from 'firebase/app';

// TODO - REMOVE USER AGENT CHECK BELOW
const reduxDevToolsEnhancer = (process.env.NODE_ENV === 'development' && !navigator.userAgent.match(/Android/i) ) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, reduxDevToolsEnhancer(
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
      reduxFirestore(fbConfig)
    )
  )
);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: {
    ...fbConfig,
    ...rrfConfig,
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
  userProfile: 'users',
  presence: 'presence',
  sessions: 'sessions',
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <div className="center">Loading...</div>;
  return children;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

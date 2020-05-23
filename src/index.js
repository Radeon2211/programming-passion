import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from 'firebase/app';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, useSelector } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './store/reducers/rootReducer';
import fbConfig from './config/fbConfig';
import Loader from './components/UI/Loader/Loader';

const reduxDevToolsEnhancer =
  process.env.NODE_ENV === 'development' && !navigator.userAgent.match(/Android/i)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  reduxDevToolsEnhancer(
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
      reduxFirestore(fbConfig),
    ),
  ),
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

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div className="LoaderWrapper">
        <Loader size="Big" />
      </div>
    );
  return children;
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <HashRouter>
            <App />
          </HashRouter>
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();

import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

/* eslint-disable no-underscore-dangle */
const configureStore = (reducers, preloadedState = {}, additionalMiddleware = []) => {
  let middleware = additionalMiddleware;
  if (!Array.isArray(additionalMiddleware)) {
    middleware = [additionalMiddleware];
  }
  const store = createStore(
    reducers,
    preloadedState,
    compose(applyMiddleware(
      createLogger({ collapsed: true }),
      ...middleware,
    ),
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    ),
  );

  return store;
};
/* eslint-enable */

export default configureStore;
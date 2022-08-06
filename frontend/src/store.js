import { createStore, applyMiddleware, compose } from "redux";
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import { decryptUserInfo } from "./utils/decryptUserInfo";
import ls from "localstorage-slim";
import AES from "crypto-js/aes";
import encUTF8 from "crypto-js/enc-utf8";

import rootReducer from "./reducers";

const userInfoFromStorage = localStorage.getItem("QussAd4sw9")
  ? localStorage.getItem("QussAd4sw9")
  : null;

const preloadedState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middlewares = [thunk];

const composeEnhancers = composeWithDevTools();

// const store = createStore(
//   rootReducer,
//   preloadedState,
//   composeEnhancers(applyMiddleware(...middlewares))
// );

// const store = compose(composeEnhancers(applyMiddleware(...middlewares)))(
//   createStore
// )(rootReducer);

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => [
//     ...getDefaultMiddleware(),
//     middlewares,
//   ],
//   devTools: process.env.NODE_ENV !== "production",
//   preloadedState,
// });

// const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

// const store = configureStore({
//   reducer: rootReducer,
//   // middleware: [...middlewares],
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
//   devTools: process.env.NODE_ENV !== "production",
//   preloadedState,
// });

export default function configureStore() {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}

// export default store;

import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import store from './data/store'

import Routes from './routes'
import { setAuthToken } from './helpers/setAuthToken'
import { loadUser } from './data/reducers/auth'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './assets/main.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Provider } from 'react-redux'
import store from './data/store'

import Navbar from './components/navbar/navbar.component'

import Register from './screens/Register'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/register' component={Register}/>
      </Switch>
    </BrowserRouter>
    <App />
  </Provider>,
  document.getElementById('root')
);

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './assets/main.css'
import { ToastContainer } from 'react-toastify'

import Navbar from './components/navbar/navbar.component'
import Register from './screens/Register'
import Home from './screens/Home'
import Login from './screens/Login'

const Routes = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

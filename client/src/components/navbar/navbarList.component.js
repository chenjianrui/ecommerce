import React from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { LOGOUT } from '../../data/reducers/auth'

import NavbarItem from './navbarItem.component'
import Button from '../button/button.component'

const NavbarList = ({ history }) => {
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const isActive = (history, path) => {
    const { pathname } = history.location
    if(pathname === path){
      return 'text-primary'
    }
    return ''
  }
  return (
    <ul className='font-bold flex-wrap flex md:mr-5 flex-col md:flex-row text-center'>
      <NavbarItem link='/' name='Home' listStyle={ isActive(history, '/') }/>
      <NavbarItem link='/shop' name='Shop' listStyle={ isActive(history, '/shop') }/>
      <NavbarItem link='/dashboard' name='Dashboard' listStyle={ isActive(history, '/dashboard') }/>
      { isAuth && 
        <>
          <Button 
            title='Signout' 
            moreStyle='hover:text-primary' 
            action={() => dispatch({ type: LOGOUT })}
          />
        </>
      }
      { !isAuth &&
        <>
          <Button 
            title='Login' 
            moreStyle='hover:text-primary'
            isButton={false}
            href='/login'
          />
          <Button 
            title='Register' 
            moreStyle='hover:text-primary'
            isButton={false}
            href='/register'
          />
        </>
      }
      <Button 
        title='cart' 
        isButton={false} 
        href='/cart' 
        moreStyle='bg-primary text-white uppercase w-24 md:ml-6'
      /> 
    </ul>
  )
}

export default withRouter(NavbarList)

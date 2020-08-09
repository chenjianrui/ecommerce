import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

import Container from '../container/container.component'
import NavbarToggle from './navbarToggle.components'
import NavbarList from './navbarList.component'

const Navbar = () => {
  const [active, setActive] = useState(false)

  const menuState = () => setActive(!active)
  return (
    <Container>
      <nav className='navbar'>
        <div className='flex justify-between w-full md:w-32 items-center'>
          <Link to='/' className='logo w-16 animate'>
            <img src={require('../../assets/logo.png')} alt='Main Logo'/>
          </Link>
          <NavbarToggle active={active} menuState={menuState}/>
        </div>
        <div className={`${active ? 'flex' : 'hidden'} md:flex`}>
          <NavbarList />
        </div>
      </nav>
    </Container>
  )
}

export default Navbar
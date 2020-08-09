import React from 'react'
import { Link } from 'react-router-dom'

const NavbarItem = ({ link, name, listStyle }) => {
  return (
    <li className={`hover:text-primary animate px-3 py-2 rounded-md ${listStyle}`}>
      <Link to={link}>
        <span>{name}</span>
      </Link>
    </li>
  )
}

export default NavbarItem

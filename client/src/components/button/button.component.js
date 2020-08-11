import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ isButton = true, title = '', href, moreStyle, type = 'button', action  }) => {
  const style = `font-bold rounded-md px-3 py-2 text-base cursor-pointer animate focus:outline-none ${moreStyle}`

  return (
    <>
      {
        isButton ? 
          <button className={style} type={type} onClick={action}>
            {title}
          </button> : 
          <Link to={href} className={style}>
            {title}
          </Link>
      }
    </>
  )
}

export default Button
import React from 'react'
import { useLocation } from 'react-router-dom'

import Menu from './Menu'
import Link from '../component/Link'


import '../sass/header/header.scss'

const Header = () => {
  const location = useLocation()

  const home = location.pathname !== "/"

  return (
    <header className={home ? "nothome" : ""}>
      <div className="logo" >
        <Link to="/">
          <h1>kefuno.</h1>
        </Link>
      </div>
      <Menu />
    </header>
  )
}

export default Header

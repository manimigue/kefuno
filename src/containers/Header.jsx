import React from 'react'
import { useLocation } from 'react-router-dom'

import Menu from './Menu'
import Link from '../component/Link'


import '../sass/header/header.scss'

const Header = () => {
  const location = useLocation()

  const home = location.pathname === "/" 
  const home2 = location.pathname === "/home2"

  return (
    <header className={home ? "": home2 ? "home2" : "nothome"}>
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

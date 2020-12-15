import React from 'react'
import { useLocation } from 'react-router-dom'

import Menu from './Menu'
import Link from '../component/Link'

import Logo from '../img/logo.png'


import '../sass/header/header.scss'

const Header = () => {
  const location = useLocation()

  const home = location.pathname === "/" 

  return (
    <header className={home ? "":  "nothome"}>
      <div className="logo" >
        <Link to="/">
          <img src={Logo} alt="kefuno. logo"/>
        </Link>
      </div>
      <Menu />
    </header>
  )
}

export default Header

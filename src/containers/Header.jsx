import React from 'react'
import { useLocation } from 'react-router-dom'

import Menu from './Menu'

import '../sass/header/header.scss'

const Header = () => {
  const location = useLocation()

  const home = location.pathname === "/" 

  return (
    <header className={home ? "":  "nothome"}>
      <Menu />
    </header>
  )
}

export default Header

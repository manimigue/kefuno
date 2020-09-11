import React from 'react'
import { useLocation } from 'react-router-dom'

import Menu from './Menu'
import Link from '../component/Link'


import '../sass/header/header.scss'

// import { saveHome } from '../'

const Header = () => {
  const location = useLocation()
  console.log(location.pathname);
  

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

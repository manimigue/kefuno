import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SideBar from 'react-sidebar';

import links from '../data/links'
import Burger from '../component/Burger';

import '../sass/header/sidebar.scss'

const Menu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const path = useLocation().pathname

  const onSetSidebarOpen = open => {
    setSidebarOpen(open)
  }

  const sidebarMenu = (
    <ul>
      {links.map(link => (
        path === link.url ? null : 
        <Link key={link.text} to={link.url} onClick={() => onSetSidebarOpen(false)}>{link.text}</Link>
      ))}
    </ul>
  )

  return (
    <div className="sidebarContainer">
      <SideBar
        sidebar={sidebarMenu}
        open={sidebarOpen}
        onSetOpen={onSetSidebarOpen}
        styles={{ overlay: {transform: sidebarOpen ? "translateX(0%)" : "translateX(100%)"}}}
        pullRight={true}
        sidebarClassName="sidebarMenu"
        contentClassName="sidebarContent"
        overlayClassName="sidebarOverlay"
        >
          <div className="sidebarButton">
            <Burger open={sidebarOpen} setOpen={onSetSidebarOpen} />
            <div className="buttonText">MENU</div>
          </div>
      </SideBar>
    </div>
  )
}

export default Menu

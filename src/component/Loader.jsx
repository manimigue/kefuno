import React from 'react'
import Spinner from 'react-loader-spinner'

import Logo from '../img/logo_whiteback.png'
import '../sass/main/loader.scss'

const Loader = () => {
  return (
    <div className="loader">
      <img className="load-logo" src={Logo} alt="Loading..."/>
      <Spinner
         type="BallTriangle"
         color="#8d8f8f"
         height={100}
         width={100}
 
      />
    </div>
  )
}

export default Loader

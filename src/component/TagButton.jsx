import React from 'react'
import '../sass/button/tagButton.scss'

export default (props) => {
  return (
    <button {...props} className={'tagButton ' + props.className}/>
  )
}

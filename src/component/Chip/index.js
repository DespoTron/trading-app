import React from 'react'
import './styles.css'

export default (props) => {
  return (
    <div className="chip">
      <div className="chip__avatar">
        <img src={props.image} width={10} />
      </div>
      <div className="chip__label">
        <span>{props.label}</span>
      </div>
    </div>
  )
}
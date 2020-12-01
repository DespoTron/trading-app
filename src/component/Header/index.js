import React from 'react'
import './styles.css'

export default () => {
  return (
    <div className="header__wrapper">
      {/* logo */}
      <div className="header__logo">
        <img src="images/robinhood.svg" width={25} alt="logo"/>
      </div>
      {/* search */}
      <div className="header__search">
        <div className="header__searchContainer">
          <input placeholder="Search" type="text" />
        </div>
      </div>
      {/* menu items */}
      <div className="header__menuItems">
        <a href="#">Free Stocks</a>
        <a href="#">Portfolio</a>
        <a href="#">Cash</a>
        <a href="#">Messages</a>
        <a href="#">Account</a>
      </div>
    </div>  
  )
}
import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'
const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <a href="/order">Order</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage review</a>
            </nav>
        </div>
    );
};

export default Header;
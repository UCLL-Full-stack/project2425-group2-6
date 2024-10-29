import React from "react";

const Header: React.FC = () => {
    return (

        <div id="header-container">

        <div id="strip">
            <div id="header-item1"></div>
            <div id="header-item2"></div>
            <div id="header-item3"></div>
            <div id="header-item4"></div>
            <div id="header-item5"></div>
        </div>

        <nav id="navigation-container">
            <ul>
                <li><a href="/about-us">About Us</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/blog">Blog</a></li>
            </ul>
        </nav>

        </div>
    );
};

export default Header;

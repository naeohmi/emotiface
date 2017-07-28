import React, { Component } from 'react';

class Navigation extends Component {
    render() {
        return (
            <div className="navigation-wrapper">
                <div className="logo-small">
                    <a href="/"><img src="/images/logo-small.png" alt="logo-small" /></a>
                </div>
                <nav className="navigation-nav">
                    <ul className="nav-ul">
                        <li className="nav-li nav-li1">
                            <a href="#home"> home </a>
                        </li>
                        <li className="nav-li nav-li2">
                            <a href="#about"> about </a>
                        </li>
                        <li className="nav-li nav-li3">
                            <a href="#play"> play </a>
                        </li>
                        <li className="nav-li nav-li4">
                            <a href="#stop"> stop </a>
                        </li>      
                    </ul>
                </nav>
            </div>
        );
    }
}
export default Navigation;
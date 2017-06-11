import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <div className="navigation-wrapper">
                <div className="logo">
                    <a href="/"><img src="/images/logo.png" alt="Logo" /></a>
                </div>
                <nav className="nav">
                    <ul className="nav-ul">
                        <li className="nav-li"><Link to="/">home</Link></li>
                        <li className="nav-li"><NavLink to="/about">about</NavLink></li>
                        <li className="nav-li"><NavLink to="/end">stop</NavLink></li>
                    </ul>
                </nav>
            </div>
        );
    }
}
export default Navigation;
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <div className="navigation-wrapper">
                <div className="logo-small">
                    <a href="/"><img src="/images/logo-small.png" alt="logo-small" /></a>
                </div>
                <nav className="navigation-nav">
                    <ul className="nav-ul">
                        <li className="nav-li nav-li1"><Link to="/">home</Link></li>
                        <li className="nav-li nav-li2"><NavLink to="/about">about</NavLink></li>
                        <li className="nav-li nav-li3"><NavLink to="/play/setup">play</NavLink></li>
                        <li className="nav-li nav-li4"><NavLink to="/end">stop</NavLink></li>
                    </ul>
                </nav>
            </div>
        );
    }
}
export default Navigation;
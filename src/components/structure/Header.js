import React from 'react'
import { Link } from 'react-router'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header">
                <h1>War map</h1>
                <nav role="nav">
                    <Link to="/" className="link">Map</Link>
                    <Link to="/history" className="link">History</Link>
                    <Link to="/players" className="link">Players</Link>
                </nav>
            </header>
        );
    }
}

module.exports = Header;

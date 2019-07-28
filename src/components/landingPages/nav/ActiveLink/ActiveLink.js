import React from 'react';
import { Link } from 'react-router-component';
import './ActiveLink.css';

class ActiveLink extends React.Component {
    get active() {
        return window.location.pathname === this.props.href
    }

    render() {
        return (
            <Link
                className={this.active ? 'link--active' : 'link--inactive'}
                href={this.props.href}
            >
                {this.props.children}
            </Link>
        );
    }
}

export default ActiveLink;


import React from 'react';
import { Link } from 'react-router-component';
import ExternalLinkIcon from './../../../../assets/external-link.svg';
import './ActiveLink.css';

class ActiveLink extends React.Component {
    get active() {
        return window.location.pathname === this.props.href
    }

    render() {
        return (
            <Link
                className={this.active ? 'link link--active' : 'link link--inactive'}
                href={this.props.href}
            >
                {this.props.children}
                {this.props.global &&
                    <img
                        className='link__external-icon'
                        alt='External link'
                        src={ExternalLinkIcon}
                    />
                }
            </Link>
        );
    }
}

export default ActiveLink;


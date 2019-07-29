import React from 'react';
import './InternalLink.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class InternalLink extends React.Component {
  render() {
    return (
      <Link
        className={this.props.history.location.pathname === this.props.to ? 'link link--active' : 'link link--inactive'}
        to={this.props.to}
      >
        {this.props.children}
      </Link>
    );
  }
}

export default withRouter(InternalLink);


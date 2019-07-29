import React from 'react';
import './NavBar.css';

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <ul className='nav-bar'>
          {this.props.children}
        </ul>
      </nav>
    )
  }
}

export default NavBar;

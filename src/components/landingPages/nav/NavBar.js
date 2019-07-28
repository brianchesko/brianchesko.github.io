import React from 'react';
import './NavBar.css';

export default function(props) {
    return (
        <ul className='nav-bar'>
            {props.children}
        </ul>
    )
};
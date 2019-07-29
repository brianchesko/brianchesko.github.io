import React from 'react';
import ExternalLinkIcon from './../../../assets/external-link.svg';
import './ExternalLink.css';

export default function(props) {
  return (
    <a href={props.to} className='link'>
      {props.children}
      <img
        className='link__external-icon'
        alt='External link'
        src={ExternalLinkIcon}
      />
    </a>
  );
  
}
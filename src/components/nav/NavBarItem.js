import React from 'react';
import InternalLink from './InternalLink/InternalLink';
import ExternalLink from './ExternalLink/ExternalLink';

export default function(props) {
  return (
    <li className='nav-bar__item'>
      {props.external ? 
        <ExternalLink to={props.to}>
          {props.value}
        </ExternalLink>
        :
        <InternalLink to={props.to} active={props.active}>
          {props.value}
        </InternalLink>
      }
    </li>
  );
}
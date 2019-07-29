import React from 'react';
import './TextPost.css';

export default function(props) {
  return (
    <div className='post-wrapper'>
      {props.heading && <h2 className='post__header'>{props.heading}</h2>}
      <div className='post__body'>
        {props.children}
      </div>
    </div>
  );
}
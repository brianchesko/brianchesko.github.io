import React from 'react';
import './Landing.css';


export default function(props) {
  return (
    <div className='landing'>
      <article className='landing__content'>
        {props.heading &&
          <header className='landing__header'>
            <h2 className='landing__header__content'>
              {props.heading}
            </h2>
          </header>
        }
        {props.children}
      </article>
    </div>
  );
}
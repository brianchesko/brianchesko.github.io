import React from 'react';
import './ResumeFrame.css';

export default function (props) {
  return (
    <iframe className='resume-frame'
      title={'resume-frame--'+props.title}
      src={props.src}/>
  )
}
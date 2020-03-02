import React from 'react';
import Landing from '../Landing';
import ResumeFrame from './ResumeFrame/ResumeFrame';
import EngineeringResume from './../../../assets/bchesko-engineering-resume-030220.pdf';

export default function (props) {
  return (
    <Landing heading='Resume'>
      <ResumeFrame
          src={EngineeringResume}
          title='engineering_resume' />
    </Landing>
  )
}
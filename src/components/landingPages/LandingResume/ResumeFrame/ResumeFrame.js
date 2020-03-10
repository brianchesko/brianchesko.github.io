import React from 'react';
import ExternalLink from './../../../nav/ExternalLink/ExternalLink';
import './ResumeFrame.css';

export default function (props) {
  const pdfLink = props.src;

  return (
    <object className='resume-frame' data={pdfLink} type='application/pdf'>
      <div className='not-supported'>
        <p>
          Your browser doesn't support embedding PDFs.
        </p>
        <span>
          Click 
            <ExternalLink to={pdfLink} noIcon>
              <span className='inline-link inline-link__bold'>here</span>
            </ExternalLink>
          to download
            <ExternalLink to={pdfLink} noIcon>
              <span className='inline-link inline-link__italic'>
                {pdfLink.substring(pdfLink.lastIndexOf('/') + 1)}
              </span>
            </ExternalLink>
        </span>
      </div>
    </object>
  )
}
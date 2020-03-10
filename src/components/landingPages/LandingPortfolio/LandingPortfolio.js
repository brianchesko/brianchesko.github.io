import React from 'react';
import Landing from '../Landing';
import PortfolioCarousel from '../../carousels/PortfolioCarousel/PortfolioCarousel';
import GearboxIso from './../../../assets/projects/gearbox/gearbox_isometric.jpg';
import GearboxTop from './../../../assets/projects/gearbox/gearbox_top.jpg';

export default function (props) {
  return (
    <Landing heading='Portfolio (Work in Progress!)'>
      <h3 className='portfolio__project-title__gearbox'>
        Differential Gearbox
      </h3>
      <PortfolioCarousel>
        {[GearboxIso, GearboxTop]}
      </PortfolioCarousel>
    </Landing>
  )
}
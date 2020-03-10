import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './PortfolioCarousel.css';

export default function(props) {
  const { children, ...other } = props;
  const slides = children.map((x, i) => (
    <Slide index={i} key={'carousel-image-' + i}>
      <Image src={x} alt={'temporary alt text, image ' + i}/>
    </Slide>
  ));

  return (
    <CarouselProvider {...other} className='carousel__portfolio'
        naturalSlideWidth='3'
        naturalSlideHeight='4'
        totalSlides={slides.length}
        infinite
    >
      <Slider>
        {slides}
      </Slider>
      <ButtonBack className='traversal-button traversal-button__back'/>
      <ButtonNext className='traversal-button traversal-button__next'/>
      <DotGroup/>
    </CarouselProvider>
  );
}
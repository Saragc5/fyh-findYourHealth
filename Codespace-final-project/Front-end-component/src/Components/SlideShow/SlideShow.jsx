import React from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption
} from 'reactstrap';
import { useState, useRef, useEffect } from 'react';
import styles from './SlideShow.module.scss'




export default function SlideShow(props) {
  const itemsSlideShow = props.itemsSlideShow;

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const slideshowRef = useRef(null);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === itemsSlideShow.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? itemsSlideShow.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }


  const slides = itemsSlideShow.map((item) => {
    return (
      <CarouselItem
        key={item.src}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>

    )
  })

  useEffect(() => {
    let slideshowRefCurrent = slideshowRef.current;
    const interval = setInterval(() => {
      slideshowRefCurrent.next();
    }, 2500);
    return () => {
      clearInterval(interval);
      slideshowRefCurrent = null;
    };
  }, []);


  return (
    <div className={styles.sliderVeg} ref={slideshowRef}>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  )
}


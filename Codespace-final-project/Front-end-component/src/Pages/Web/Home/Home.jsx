import React from 'react'
import SubTitle from '../../../Components/Subtitle/SubTitle';
import SlideShow from '../../../Components/SlideShow/SlideShow'
import itemsSlideShow from '../../../Components/SlideShow/itemsSlideShow'
import ListProfessionals from '../../../Components/ListProfessionals/ListProfessionals'
import styles from './Home.module.scss'
import ListPost from '../../../Components/ListPost/ListPost';

export default function Home() {

  return (
    <div className={styles.home}>
      <SlideShow itemsSlideShow={itemsSlideShow} />     
      <SubTitle subTitle="Our last professionals" />
      <ListProfessionals section="Home" />
      <SubTitle subTitle="Last posted" />
      <ListPost section="Home" />
      <br />
    </div>
  )
}

   
    
      

import React from 'react'
import CardPresentation from '../../../Components/CardPresentation/CardPresentation';
import styles from './AboutUs.module.scss';
import SubTitle from '../../../Components/Subtitle/SubTitle'



export default function AboutUs() {


  return (
    <div className={styles.whoContainer}>
      <>
        <div className={styles.header} >
          <SubTitle subTitle="About us" color="yellow" />
        </div>
        <div className={styles.cardPresentation}>
          <CardPresentation
            id="0"
            imagen="sara"
            name="Sara"
          />
          <CardPresentation
            id="1"
            imagen="juang"
            name="Juan G"
          />
        </div>
      </>
      <div className={styles.text}>
        <p>
          We are Sara and Juan G, and we have created <i>Find Your Health</i> <b>(FYH)</b> a website where you can find the health professional for your needs.
        </p>
        <p>
          One day we realized about the necesity of visiting a health professional and the difficulty in searching them, and thus FYH was born.

          Since searching is tedious, we wanted to combine the search in one place, a contact portal where patients and clients can enter and search

          for several specialties near their home or online.
        </p>
        <p>
          So we contacted 3 types of professionals in this sector who have a lot of interrelation when working and we proposed them to join our project,

          starting with a small group which is growing up really fast.
        </p>
        <p>

          You can find physical therapists, personal trainers and nutritionists, all physical health professionals, but we hope that in the future we

          can grow more and include more specialists such as psychologists and psychiatrists.
        </p>
        <p>
          Join us!
        </p>
        <p>
          Sara & Juang.
        </p>
      </div>
    </div>
  )
}

import React from 'react'
import styles from './Footer.module.scss'
import { Link } from 'react-router-dom';
import { SlSocialInstagram } from 'react-icons/sl'
import { GrFacebook } from 'react-icons/gr'
import { ImTwitter } from 'react-icons/im'
import { MdEmail } from 'react-icons/md'



export default function Footer() {


  return (
    <div className={styles.footerPages}>

      <div className={styles.linkPages} >
        <><Link to="rigths" className={styles.links} >&nbsp;&nbsp; Copyright &copy; 2022 fyh.com  &nbsp;  &nbsp;</Link></>
        <><Link to="termsandconditions" className={styles.links} >&nbsp; Terms  & Conditions  &nbsp; &nbsp;</Link></>
        <><Link to="privacyPolicy" className={styles.links} >&nbsp; Privacy Policy &nbsp;  &nbsp;</Link></>
        <><Link to="cookies" className={styles.links}>&nbsp; Cookies &nbsp; &nbsp; </Link></>
        <><Link to="about" className={styles.links}>&nbsp; About Us &nbsp; &nbsp; </Link></>
      </div>

      <div className={styles.icons} >
        <span><SlSocialInstagram /></span>
        <span><GrFacebook /></span>
        <span><ImTwitter /></span>
        <span><Link to="contact" style={{ color: "white" }} ><MdEmail /></Link></span>
      </div>


    </div>
  )
}
           

      

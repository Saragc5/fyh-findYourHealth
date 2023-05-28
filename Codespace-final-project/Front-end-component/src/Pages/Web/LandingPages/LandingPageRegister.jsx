import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './LandingPages.module.scss';


export default function LandingPageRegister() {

  const navigate = useNavigate();

  return (
    <div className={styles.container} >
      <br />
      <h3 >Than you for your registration, please go to login to start session</h3>
      <button className={styles.buttonsLanding} onClick={() => navigate("/login")}>Login</button>
    </div>
  )
}

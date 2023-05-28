import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './LandingPages.module.scss';



export default function LandingPageContact() {

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 3500)
  }, [navigate])

  return (
    <div className={styles.container}>
      <br />
      <h3 >Than you for your enquiry, we will reply as soon as possible.</h3>
    </div>
  )
}

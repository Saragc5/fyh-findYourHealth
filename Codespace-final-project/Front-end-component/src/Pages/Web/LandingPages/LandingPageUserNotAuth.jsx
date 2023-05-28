import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPages.module.scss';

export default function LandingPageUserNotAuth() {

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/login")
    }, 6000)
  }, [navigate])

  return (
    <div className={styles.container}>
      <h3 >You have to be loggued in</h3>
    </div>
  )
}
      
    
    

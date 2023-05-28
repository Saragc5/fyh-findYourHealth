import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './LandingPages.module.scss';

export default function LandingPageDelete() {

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 3500)
  }, [navigate])

  return (
    <div className={styles.container}>
      <br />
      <h3 >Sorry to hear that, we will miss you!</h3>
    </div>
  )
}

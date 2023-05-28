import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './LandingPages.module.scss';


export default function LandingPagePublishedNewArticle() {

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/blog")
    }, 4500)
  }, [navigate])

  return (
    <div className={styles.container}>
      <br />
      <h3 >Thank you! You just uploaded an article.</h3>
    </div>
  )
}

import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';


export default function NotFound() {

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 3500)
  }, [navigate])

  return (
    <div className={styles.container} />
  )
}
      
    
    

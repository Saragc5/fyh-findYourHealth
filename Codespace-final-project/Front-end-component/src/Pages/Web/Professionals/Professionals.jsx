import React from 'react';
import ListProfessionals from '../../../Components/ListProfessionals/ListProfessionals';
import styles from './Professionals.module.scss';
import Subtitle from '../../../Components/Subtitle/SubTitle';
import { useContext } from 'react';
import { AuthProvider } from '../../../Components/AuthContext';




export default function Professionals(props) {
  const auth = useContext(AuthProvider);

  return (
    <div className={styles.container}>
      <span>{auth}</span>
      <div className={styles.header}>
        <Subtitle subTitle="Our best professionals" color="yellow" />
      </div>
      <ListProfessionals
        section="Professionals"
      />
    </div>
  )
}
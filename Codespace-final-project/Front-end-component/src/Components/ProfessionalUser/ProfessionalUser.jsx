import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './ProfessionalUser.module.scss';
import { useContext } from 'react';
import { AuthProvider } from '../../Components/AuthContext';
import { MdEmail } from 'react-icons/md'
import SubTitle from '../Subtitle/SubTitle';
import Swal from 'sweetalert2';




export default function ProfessionalUser() {
  const auth = useContext(AuthProvider);


  const navigate = useNavigate();

  const [professionals, setProfessionals] = useState([]);
  let { id } = useParams();

  //Alert to say to the client that the contact is well done.
  const showAlert = () => {
    Swal.fire({
      title: "Well done!",
      text: 'You have just sent an alert to contact with you',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
      ustomClass: {
        confirmButton: 'mi-clase-confirm',
      },
      customContainerClass: 'mi-container-class',
      customStyle: {
        background: '#125566',
        color: '#ffffff',
      },
    })
  };

  //Fetch to get the info from DB:
  const fetchUsers = async () => {
    const result = await fetch(`http://localhost:9000/users/${id}`);
    const data = await result.json();
    setProfessionals(data.user);
  };

  useEffect(() => {
    fetchUsers();
  }, [id]);

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className={styles.container}>
    {auth}
      <div className={styles.header} >
        <SubTitle color="yellow" subTitle={professionals.profession} />
      </div>
      <div className={styles.containerDetails} key={id}>
        <img src={!professionals.image ? ("/ImgsProf/no-picture.png") : `http://localhost:9000/public/${professionals.image}`} alt={`Foto del profesional ${professionals.username} ${professionals.profession}`} />
        <h1 className={styles.detailsName} >{professionals.firstname} {professionals.lastname}</h1>
        <h3 className={styles.detailsProfession} >{professionals.profession}</h3>
        <h3 className={styles.details} >Especiality: {professionals.speciality}</h3>
        <h3 className={styles.details} >Years of experience: {professionals.experience}</h3>
        <h3 className={styles.details} >Ciudad: {professionals.city}</h3>
        <h4 className={styles.details} >Something about me</h4>
        <h3 className={styles.description} >{professionals.description}</h3>
      </div>
      <div className={styles.buttonsContainer} >
        <button className={styles.contact} text="contact" onClick={showAlert}><MdEmail />  Contact</button>
        <button className={styles.goBack} text="go back" onClick={goBack}>go back</button>

      </div>
      <br />
    </div>
  )
};
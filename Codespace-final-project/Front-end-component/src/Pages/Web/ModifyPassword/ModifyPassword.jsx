import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthProvider } from '../../../Components/AuthContext';
import styles from './ModifyPassword.module.scss';
import Swal from 'sweetalert2';
import { port } from '../../../Components/settings';

export default function ModifyPassword() {
  const auth = useContext(AuthProvider);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [mensaje, setMensaje] = useState("");


  const showAlert = () => {
    Swal.fire({
      text: 'Password updated',
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
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      token: token
    }

    await fetch(`http://localhost:${port}/users/api/modifyPassword`, {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        credentials: 'include'
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok === true) {
          showAlert();
          setMensaje("Password updated")

        }
        else {
          setMensaje("Wrong password")
        }


      }).catch((error) => {
        console.error(error)
      });
  };


  //Cancel change password:
  const goBack = (e) => {
    e.preventDefault();
    navigate(-1)
  }

  return (
    <div>
      <form className={styles.modifyPassword} onSubmit={handleSubmit}>
        <span>{auth}</span>
        <label className={styles.old}>
          Old Password:
          <input type="password" name="old-password" autoComplete="old-password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
        </label>
        <label className={styles.new}>
          New Password:
          <input type="password" name="new-password" autoComplete="new-password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        </label>
        <div className={styles.message} >{mensaje} </div>
        <div className={styles.buttonsContainer} >
          <button className={styles.changePassword} type="submit" >modify</button>
          <button className={styles.goBack} onClick={goBack}>go back</button>

        </div>
      </form>
    </div>
  )
}


  

  


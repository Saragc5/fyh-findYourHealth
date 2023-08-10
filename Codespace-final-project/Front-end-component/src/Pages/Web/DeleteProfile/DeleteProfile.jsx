import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./DeleteProfile.module.scss";
import { port } from '../../../Components/settings';


export default function DeleteProfile() {

  const navigate = useNavigate();

  // /Delete user profile:
  const deleteProfile = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("id");
    await fetch(`http://localhost:${port}/users/profile/categoryprof/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",

      }
    }).then((res) => res.json())
      .then((data) => {
        if (data) {
          localStorage.clear();
          navigate("/landingDelete");
          window.location.reload(true);
    
        }
      }).catch((error) => {
        console.error(error)
      });
   
  }
  return (
    <div className={styles.deleteProfile} >
      <h1>Are you sure you want to delete your profile?</h1>
      <br />
      <button className={styles.buttonDelete} onClick={deleteProfile} type="submit" value="" >yes</button>
      <button className={styles.buttonGoBack} onClick={() => { navigate(-1) }}>No! go back</button>

    </div>
  )
}

import React from 'react'
import styles from './Profiles.module.scss';
import SubTitle from '../../../../Components/Subtitle/SubTitle';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';
import { BiUpload } from 'react-icons/bi'
import { port } from '../../../../Components/settings';


export default function ProfileProf() {

  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const [clicked, setClicked] = useState(false);

  const [userProfile, setUserProfile] = useState("");

  ///Function to manage the initial user info when entering their profile after login
  const getInfoUser = async () => {
    const response = await fetch(`http://localhost:${port}/users/getuser/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json, multipart/form-data",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
        credentials: 'include'
      },
    });
    const data = await response.json();
    setUserProfile(data);

  }
  useEffect(() => {
    if (token) {
      getInfoUser();
    } 

  }, [token]);



  const [newDetails, setNewDetails] = useState({ userProfile });

  //Manage the input texts:
  const handleInput = (e) => {
    if (e.target.name !== 'image') {
      setNewDetails({ ...newDetails, ...{ [e.target.name]: e.target.value } })

    }
  }

  ///Functions to manage the change of the profile image:    
  const uploadImage = async (e) => {
    e.preventDefault();
    let formProfile = document.querySelector('#formProfile');
    let inputImage = formProfile.querySelector('input[name="image"]');

    const formData = new FormData();
    formData.append('image', inputImage.files[0])

    const id = localStorage.getItem("id");
    await fetch(`http://localhost:${port}/users/profile/uploadimage/${id}`, {
      method: 'POST',
      body: formData,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        encType: "multipart/form-data"
      }
    })
      .then((res) => res.json())      
      .catch(error => console.error("Error: ", error))
    if (uploadImage) {
      window.location.reload(true);
    }
  }
  ///Functions to save data type text:
  const saveData = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:${port}/users/profile/categoryprof/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newDetails),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then((res) => res.json())
      .then((data) => {
        setNewDetails(newDetails)

      }).catch((error) => {
        console.error(error)
      });
    if (saveData) {
      window.location.reload(true);
    }
  }

  //Edit profile:
  const editProfile = (e) => {
    e.preventDefault();
    setClicked(true)
  }
  const cancelEditProfile = (e) => {
    e.preventDefault();
    setClicked(false)
  }

  //Log out of sesion:
  const logout = () => {
    localStorage.clear();
    setNewDetails(false);
    window.location.reload(true);
    navigate("/login")
  }





  return userProfile.length === 0 ? (
    <div className={styles.loading} >
      <h3>Wait while loading...</h3>
      <h4>if it takes too long, please press reset</h4>
      <button className={styles.reset} onClick={logout}>reset</button>
    </div>
  ) : (

    <div className={styles.containerProfile}>
      <div className={styles.header} >
        <div className={styles.headerName} >
          <SubTitle className={styles.name} subTitle={userProfile.userDB.username} color="yellow"  fontSize={3.5}/>
        </div>
      </div>
      <form className={styles.profileForm}
        encType="multipart/form-data"
        id="formProfile">
        <div className={styles.headerForm}>
          <span className={styles.containerImage}>
            {userProfile.userDB.image ? (
              <img
                src={`http://localhost:${port}/public/${userProfile.userDB.image}`}
                alt={`Foto de ${userProfile.userDB.firstname}`}
              />
            ) : (
              <div>Loading picture...</div>
            )}</span>

          <div>
            <label for="fileUpload" className={styles.customFileUpload} >
              <i><BiUpload /></i> upload image
            </label>
            <input id="fileUpload" className={styles.uploadDefault} type="file" name='image' accept="image/*" onChange={uploadImage} />
          </div>

        </div>

        <div className={styles.containerButtonsEditProfile} >
          <button id="buttonEdit" className={clicked ? styles.disabledEdit : styles.edit} onClick={editProfile}><FiEdit2 /></button>
          <button id="buttonCancel" className={clicked ? styles.cancelEdit : styles.disabledCancelEdit} onClick={cancelEditProfile}><MdCancel /></button>
        </div>


        <div className={styles.bodyProfile}>
          <div className={clicked && window.innerWidth <= 400 ? styles.blockDetailsClickedIphone : styles.blockDetails}>
            <label className={clicked && window.innerWidth <= 400 ? styles.labelDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.labelDBClicked : styles.labelDB} >Name:</label>
            <span className={clicked && window.innerWidth <= 400 ? styles.detailsDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.detailsDBClicked : styles.detailsDB}>{!userProfile.userDB.firstname ? "" : userProfile.userDB.firstname}</span>
            <input className={clicked && window.innerWidth <= 400 ? styles.inputClickedIphone : clicked && window.innerWidth >= 400 ? styles.input : styles.detailsDB} name="name"
              type="text" autoComplete="user-Name"
              placeholder="type to edit" onChange={handleInput} />
          </div>
          <div className={clicked && window.innerWidth <= 400 ? styles.blockDetailsClickedIphone : styles.blockDetails}>
          <label className={clicked && window.innerWidth <= 400 ? styles.labelDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.labelDBClicked : styles.labelDB}>Lastname:</label>
          <span className={clicked && window.innerWidth <= 400 ? styles.detailsDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.detailsDBClicked : styles.detailsDB}>{!userProfile.userDB.lastname ? "" : userProfile.userDB.lastname}</span>
            <input className={clicked && window.innerWidth <= 400 ? styles.inputClickedIphone : clicked && window.innerWidth >= 400 ? styles.input : styles.detailsDB} name="lastname" type="text" autoComplete="user-lastname"
              placeholder="type to edit " onChange={handleInput} />
          </div>
          <div className={clicked && window.innerWidth <= 400 ? styles.blockDetailsClickedIphone : styles.blockDetails}>
            <label className={clicked && window.innerWidth <= 400 ? styles.labelDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.labelDBClicked : styles.labelDB}>Address:</label>
            <span className={clicked && window.innerWidth <= 400 ? styles.detailsDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.detailsDBClicked : styles.detailsDB}>{!userProfile.userDB.fullAddress ? "" : userProfile.userDB.fullAddress}</span>
            <input className={clicked && window.innerWidth <= 400 ? styles.inputClickedIphone : clicked && window.innerWidth >= 400 ? styles.input : styles.detailsDB} name="fullAddress" type="text" autoComplete="user-fullAddress"
              placeholder="type to edit" onChange={handleInput} />
          </div>
          <div className={clicked && window.innerWidth <= 400 ? styles.blockDetailsClickedIphone : styles.blockDetails}>
            <label className={clicked && window.innerWidth <= 400 ? styles.labelDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.labelDBClicked : styles.labelDB}>City:</label>
            <span className={clicked && window.innerWidth <= 400 ? styles.detailsDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.detailsDBClicked : styles.detailsDB}>{!userProfile.userDB.city ? "" : userProfile.userDB.city}</span>
            <input className={clicked && window.innerWidth <= 400 ? styles.inputClickedIphone : clicked && window.innerWidth >= 400 ? styles.input : styles.detailsDB} name="city" type="text" autoComplete="user-City"
              placeholder="type  to edit" onChange={handleInput} />
          </div>
          <div className={clicked && window.innerWidth <= 400 ? styles.blockDetailsClickedIphone : styles.blockDetails}>
            <label className={clicked && window.innerWidth <= 400 ? styles.labelDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.labelDBClicked : styles.labelDB}>Website:</label>
            <span className={clicked && window.innerWidth <= 400 ? styles.detailsDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.detailsDBClicked : styles.detailsDB}>{!userProfile.userDB.website ? "" : userProfile.userDB.website}</span>
            <input className={clicked && window.innerWidth <= 400 ? styles.inputClickedIphone : clicked && window.innerWidth >= 400 ? styles.input : styles.detailsDB} name="website" type="text" autoComplete="user-Website"
              placeholder="type to edit" onChange={handleInput} />
          </div>
          <div className={clicked && window.innerWidth <= 400 ? styles.blockDetailsClickedIphone : styles.blockDetails}>
            <label className={clicked && window.innerWidth <= 400 ? styles.labelDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.labelDBClicked : styles.labelDB}>Company name:</label>
            <span className={clicked && window.innerWidth <= 400 ? styles.detailsDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.detailsDBClicked : styles.detailsDB}>{!userProfile.userDB.companyName ? "" : userProfile.userDB.companyName}</span>
            <input className={clicked && window.innerWidth <= 400 ? styles.inputClickedIphone : clicked && window.innerWidth >= 400 ? styles.input : styles.detailsDB} name="companyName" type="text" autoComplete="user-CompanyName"
              placeholder="type  to edit" onChange={handleInput} />
          </div>
          <div className={clicked && window.innerWidth <= 400 ? styles.blockDetailsClickedIphone : styles.blockDetails}>
            <label className={clicked && window.innerWidth <= 400 ? styles.labelDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.labelDBClicked : styles.labelDB}>Profession:</label>
            <span className={clicked && window.innerWidth <= 400 ? styles.detailsDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.detailsDBClicked : styles.detailsDB}>{!userProfile.userDB.profession ? "" : userProfile.userDB.profession}</span>
            <select className={clicked && window.innerWidth <= 400 ? styles.inputClickedIphone : clicked && window.innerWidth >= 400 ? styles.input : styles.detailsDB} name="profession" onChange={handleInput} required={+true} autoComplete="off">
              <option className={styles.options} value="">Select:</option>
              <option className={styles.options} value="Trainer" >Trainer</option>
              <option className={styles.options} value="Nutritionist" >Nutritionist</option>
              <option className={styles.options} value="Physical therapist" >Physical therapist</option>
            </select>
          </div>
          <div className={clicked && window.innerWidth <= 400 ? styles.blockDetailsClickedIphone : styles.blockDetails}>
            <label className={clicked && window.innerWidth <= 400 ? styles.labelDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.labelDBClicked : styles.labelDB}>Speciality:</label>
            <span className={clicked && window.innerWidth <= 400 ? styles.detailsDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.detailsDBClicked : styles.detailsDB}>{!userProfile.userDB.speciality ? "" : userProfile.userDB.speciality}</span>
            <input className={clicked && window.innerWidth <= 400 ? styles.inputClickedIphone : clicked && window.innerWidth >= 400 ? styles.input : styles.detailsDB} name="speciality" type="text" autoComplete="user-Speciality"
              placeholder="type  to edit" onChange={handleInput} />
          </div>
          <div className={clicked && window.innerWidth <= 400 ? styles.blockDetailsClickedIphone : styles.blockDetails}>
            <label className={clicked && window.innerWidth <= 400 ? styles.labelDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.labelDBClicked : styles.labelDB}>Experience(years):</label>
            <span className={clicked && window.innerWidth <= 400 ? styles.detailsDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.detailsDBClicked : styles.detailsDB}>{!userProfile.userDB.experience ? "" : userProfile.userDB.experience}</span>
            <input className={clicked && window.innerWidth <= 400 ? styles.inputClickedIphone : clicked && window.innerWidth >= 400 ? styles.input : styles.detailsDB} name="experience" type="text" autoComplete="user-Experience"
              placeholder="type  to edit" onChange={handleInput} />
          </div>
          <div className={clicked && window.innerWidth <= 400 ? styles.blockDetailsDescriptionClickedIphone : styles.blockDetailsDescription}>
          <label style={{ marginLeft: "2.5rem", textDecoration: "underline" }}>About me:</label>           
            <p className={clicked && window.innerWidth <= 400 ? styles.descriptionClickedIphone : clicked && window.innerWidth >= 400 ? styles.descriptionClicked : styles.description} >{!userProfile.userDB.description ? "" : userProfile.userDB.description}</p>
            <textarea className={clicked && window.innerWidth <= 400 ? styles.textareaClickedIphone : clicked && window.innerWidth >= 400 ? styles.textarea : styles.disabledArea} name="description" type="text" autoComplete="user-Description"
              placeholder="type to edit" onChange={handleInput} />
          </div>
          <div className={clicked && window.innerWidth <= 400 ? styles.blockDetailsClickedIphone : styles.blockDetails}>
            <label className={clicked && window.innerWidth <= 400 ? styles.labelDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.labelDBClicked : styles.labelDB}>Email:</label>
            <span className={clicked && window.innerWidth <= 400 ? styles.detailsDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.detailsDBClicked : styles.detailsDB}>{!userProfile.userDB.email ? "" : userProfile.userDB.email}</span>
            <input className={clicked && window.innerWidth <= 400 ? styles.inputClickedIphone : clicked && window.innerWidth >= 400 ? styles.input : styles.detailsDB} name="email" type="email" autoComplete="user-Email"
              placeholder="type to edit" onChange={handleInput} />
          </div>

          <div className={clicked && window.innerWidth <= 400 ? styles.blockDetailsClickedIphone : styles.blockDetails}>
            <label className={clicked && window.innerWidth <= 400 ? styles.labelDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.labelDBClicked : styles.labelDB}>Password:</label>
            <span className={clicked && window.innerWidth <= 400 ? styles.detailsDBClickedIphone : clicked && window.innerWidth >= 400 ? styles.detailsDBClicked : styles.detailsDB} >********</span>
            <input  className={clicked && window.innerWidth <= 400 ? styles.inputPasswordClickedIphone : clicked && window.innerWidth >= 400 ? styles.inputPassword : styles.detailsDB} />
            <button className={clicked && window.innerWidth <= 400 ? styles.editPasswordClickedIphone : clicked && window.innerWidth >= 400 ? styles.editPassword : styles.disabledEditPassword}
              onClick={() => { navigate("/modifyPassword") }}><FiEdit2 /></button>
        
          </div>
        </div>
      </form>
      <button className={styles.writeNewArticle} onClick={() => { navigate("/blog/newBlogArticle") }}>post an article</button>

      <button className={styles.save} type="submit" onClick={saveData}>Save</button>
    </div>
  )
}

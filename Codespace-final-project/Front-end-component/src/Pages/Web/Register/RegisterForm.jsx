import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from  './RegisterForm.module.scss';
import { port } from '../../../Components/settings';

export default function Register(props) {
  const navigate = useNavigate();

  //Initialize the state:
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    categoryprof: Boolean
  });
  //Function to manage the inputs:
  function handleInput(e) {
    const inputData = e.target.value;
    setNewUser({ ...newUser, ...{ [e.target.name]: inputData } })

  }
  //Function to control the submit:
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:${port}/users/register`, {
      method: "POST",
      body: JSON.stringify(newUser),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    }).then((res) => res.json())
      .then((data) => {
        if (data) {
          setNewUser(newUser)
         
        }
      })
      .catch(error => console.error("Error: ", error))

    const redirectToLogin = () => { navigate("/landingRegister") }
    if (handleSubmit) {     
      redirectToLogin();
    }
  }

  return (

    <form className={styles.registerForm} onSubmit={handleSubmit} autoComplete="off">
      <input name="firstname" value={newUser.firstname} type="text" autoComplete="off" placeholder="Firstname" onChange={handleInput} required={+true} />
      <input name="lastname" value={newUser.lastname} type="text" autoComplete="off" placeholder="lastname" onChange={handleInput} required={+true} />
      <input name="username" value={newUser.username} type="text" autoComplete="off" placeholder="Username" onChange={handleInput} required={+true} />
      <input name="email" value={newUser.email} type="email" autoComplete="off" placeholder="Email" onChange={handleInput} required={+true} />
      <input name="password" value={newUser.password} type="password" autoComplete="off" placeholder="Password" onChange={handleInput} required={+true} minlength="4" />
      <select name="categoryprof" onChange={handleInput} required={+true} autoComplete="off">
        <option value="">Are you a professional?</option>
        <option value="false" >No</option>
        <option value="true" >Yes</option>
      </select>

      <button className={styles.submit} type="submit" >register</button>
      <br />
      <button className={styles.login} text="button" onClick={() => navigate("/login")}>Login</button>
    </form>

  )
}
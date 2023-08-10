import React, { useState } from 'react';
import styles from './LoginForm.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { port } from '../../../Components/settings';

function LoginForm() {


  const navigate = useNavigate();
  const location = useLocation();

  const [details, setDetails] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");


  const submitHandler = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:${port}/login`, {
      method: "POST",
      body: JSON.stringify(details),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",

      }
    }).then((res) => res.json())
      .then((credentials) => {
        localStorage.setItem("token", credentials.token);
        localStorage.setItem("id", credentials.id);
        localStorage.setItem("categoryprof", credentials.user.categoryprof);
        localStorage.setItem("firstname", credentials.user.firstname);
        localStorage.setItem("role", credentials.user.role);
      

        if (credentials.user.active === false) {
          setMessage("User not registered")

        }
        else if ((credentials && credentials.user.categoryprof === true)) {
          navigate(location.state?.from || "/profile/prof");
          window.location.reload(true);

        }
        else if ((credentials && credentials.user.role === "ADMIN")) {
          navigate(location.state?.from || "/profile/admin");
          window.location.reload(true);
        }
        else if (credentials && credentials.user.categoryprof === false) {
          navigate(location.state?.from || "/profile/client");
          window.location.reload(true);

        }

      })
      .catch((error) => {
        console.error("Error: respuesta del servidor no válida");
        setMessage("Error: user not found");
      })
      

  }



  return (
    <form className={styles.loginForm} id="login" onSubmit={submitHandler}>

      <div >
        <div>
          <input className={styles.inputLogin} id="emailfield" type="text" autoComplete="useremail" name="email"
            placeholder="email" onChange={e => setDetails({ ...details, email: e.target.value, })} value={details.email} required={+true} />
        </div>
        <div>
          <input className={styles.inputLogin} type="password" autoComplete="current-password" name="password" id="password"
            placeholder="password" onChange={e => setDetails({ ...details, password: e.target.value, })} value={details.password} required={+true} />
        </div>
        <p>{message}</p>
        <button className={styles.loginButton} type="submit" >login</button>
      </div>

      <br />
      <button className={styles.register} onClick={() => navigate("/users/register")}>Register</button>

    </form>



  )
}

export default LoginForm;
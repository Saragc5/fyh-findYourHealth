import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react'
import styles from './Navbar.module.scss';
import { FiMenu } from "react-icons/fi";
import { useContext } from 'react';
import { AuthProvider } from '../AuthContext';
import CustomDropdown from '../CustomDropwdown/CustomDropdown';


export default function Navbar({ logout }) {
  const auth = useContext(AuthProvider);

  const [clicked, setClicked] = useState(false);

  const handleClick = () => setClicked(!clicked);

  const hideNavbar = () => setClicked(false);

  const location = useLocation();

  let token = localStorage.getItem("token");
  let categoryprof = localStorage.getItem("categoryprof"); //category of user
  let firstname = localStorage.getItem("firstname");


  return (
    <>
    <span>{auth}</span>
      <nav>
        <h1><Link to="/" className={styles.logo} >
          FYH

        </Link></h1>
        <div>
          <ul key="navbar" id="navbar" className={clicked ? styles.navbarActive : styles.navbar}>
            <li>
              <Link to="/" className={styles.links} onClick={hideNavbar}>Home</Link>
            </li>
            <li>
              <Link to="blog" className={styles.links} onClick={hideNavbar}>Blog</Link>
            </li>
            <li>
              <Link to="users" className={styles.links} onClick={hideNavbar}>Professionals</Link>
            </li>
            <li>
              <Link to="contact" className={styles.links} onClick={hideNavbar}>Contact</Link>
            </li>

            {
              ((token !== null && token !== undefined) && (categoryprof === 'false'))
                ? (<li><Link to="profile/client" className={styles.linksName} onClick={hideNavbar}>
                  <CustomDropdown
                    firstname={firstname}
                    onLogout={logout}
                    styles={styles}
                  />
                </Link></li>)
                : ((token !== null && token !== undefined) && (categoryprof === 'true')) ? (<li><Link to="profile/prof" className={styles.linksName} onClick={hideNavbar}>
                  <CustomDropdown
                    firstname={firstname}
                    onLogout={logout}
                    styles={styles}
                  />
                </Link></li>)
                  : <li><Link to="login" state={{ prev: location.pathname }} className={styles.links} onClick={hideNavbar}>Login</Link></li>
            }

          </ul>
        </div>
        <div className={styles.mobile} onClick={handleClick}>
          <i><FiMenu /></i>
        </div>
      </nav>

    </>
  )
}

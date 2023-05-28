import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CustomDropdown.module.scss';


export default function CustomDropdown({ firstname }) {
  const navigate = useNavigate();

  let token = localStorage.getItem("token"); //token given in the log in
  let categoryprof = localStorage.getItem("categoryprof"); //category of user given in the log in
  let role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/")
    window.location.reload(true);
  }

  return (
    <div className={styles.profileDropdown}>
      <div className={styles.dropdownTrigger}>
        {firstname} <i></i>
      </div>
      <div className={styles.dropdownContent}>
        {
          (((token !== null && token !== undefined) && (categoryprof === 'true')) || ((token !== null && token !== undefined) && (role === "ADMIN")))
            ? (<Link className={styles.links} to="/blog/newBlogArticle"
            >Write an article</Link>)
            : ""

        }

        <Link className={styles.links} to="/sureDelete">Delete profile</Link>
        <button className={styles.logout} onClick={logout}>Logout</button>
      </div>
    </div>
  );
};



import React from 'react'
import SubTitle from '../../../Components/Subtitle/SubTitle'
import styles from './Blog.module.scss'
import ListPost from '../../../Components/ListPost/ListPost'
import { useNavigate } from 'react-router-dom';



export default function Blog() {

  const navigate = useNavigate();
  
  let token = localStorage.getItem("token"); //token given in the log in
  let categoryprof = localStorage.getItem("categoryprof"); //category of user given in the log in
  let role = localStorage.getItem("role");


  return (
    <div className={styles.containerBlogPage} >
      <div className={styles.header} >
        <SubTitle subTitle="Our blog" color="yellow" />
      </div>
      <ListPost
        section="Blog" />
      {
        (((token !== null && token !== undefined) && (categoryprof === 'true')) || ((token !== null && token !== undefined) && (role === "ADMIN")))
          ? (<button className={styles.newArticle}
            onClick={() => { navigate("/blog/newBlogArticle") }}>Write a new article</button>)
          : ""

      }

    </div>
  )
}
       

       
    

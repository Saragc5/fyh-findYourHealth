import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from './Article.module.scss';



export default function Article() {

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  let { id } = useParams();

  //Fetch to get data from DB
  const fetchBlog = async () => {
    const result = await fetch(`http://localhost:9000/blog/${id}`)
    const data = await result.json();
    setData(data.article);

  };


  useEffect(() => {
    fetchBlog();
  }, [id]);

  return (

    <div className={styles.article}>
      <li key={id}>
        <img
          className={styles.imageArticle}
          src={!data.image ? ("/ImgBlog/imagen-no-disponible.jpg")
            : `http://localhost:9000/public/${data.image}`} alt={`imagen del artículo ${id}`} />
        <div className={styles.titleArticle}>{data.title}</div>
        <p className={styles.textArticle}>{data.text} </p>
        <p className={styles.published}>Published by: {data.author} - on: {data.dateOfPublish}</p>

      </li>
      <div className={styles.buttons} >
        <button className={styles.goBack} onClick={handleClick}>go back</button>
      </div>
    </div>

  )
}

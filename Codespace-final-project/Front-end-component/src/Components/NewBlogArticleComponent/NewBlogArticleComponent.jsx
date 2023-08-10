import React from 'react'
import styles from './NewBlogArticleComponent.module.scss'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BiUpload } from 'react-icons/bi';
import { port } from '../settings';

export default function NewBlogArticleComponent() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [topic, setTopic] = useState('');



  //Functions to manage the delivery of the data to the DB:
  const uploadArticle = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('image', image);
    formData.append('title', title);
    formData.append('text', text);
    formData.append('author', author);
    formData.append('topic', topic);

    //Fetch to send the data to DB:
    await fetch(`http://localhost:${port}/blog/newBlogArticle`, {
      method: 'POST',
      body: formData,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "enctype": "multipart/form-data"
      }
    }).then((res) => res.json())
      .catch(error => console.error("Error: ", error))

    navigate("/landingPublished");
  }

  return (

    <form className={styles.newArticle} onSubmit={uploadArticle}  >
      <div className={styles.headerForm}>
        <span>
          {image ? (
            <img
              src={`http://localhost:${port}/public/${image}`}
              alt="Blog article img to upload"
            />
          ) : (
            <div></div>
          )}</span>
        <div>
          <label for="fileUpload" className={styles.customFileUpload} >
            <i><BiUpload /></i> upload image
          </label>
          <input id="fileUpload" className={styles.uploadDefault} type="file" name='image' accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>

      </div>
      <input name="title" type="text" autoComplete="title"
        placeholder="Title" onChange={(e) => setTitle(e.target.value)} required={true} />
      <textarea name="text" type="text"
        placeholder="Text" onChange={(e) => setText(e.target.value)} required={true} />
      <input name="author" type="text" autoComplete="author"
        placeholder="Author" onChange={(e) => setAuthor(e.target.value)} required={true} />
      <select name="topic" onChange={(e) => setTopic(e.target.value)} required={true} autoComplete="off">
        <option value="" >Select a topic for your article</option>
        <option value="exercise">Exercise</option>
        <option value="nutrition">Nutrition</option>
        <option value="injuries">Injuries</option>
      </select>
      <button className={styles.submit} type="submit"
      >submit</button>

      <br />
    </form>

  )
}

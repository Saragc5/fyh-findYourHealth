import React from 'react'
import styles from './Contact.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Contact() {

  const navigate = useNavigate();

  //Initialize the form state:
  const [newEnquiry, setNewEnquiry] = useState({
    name: "",
    email: "",
    topic: "",
    enquiry: ""
  });
  //Function to update the state, for each inputput
  function handleInput(e) {
    const inputEnquiry = e.target.value;
    setNewEnquiry({ ...newEnquiry, ...{ [e.target.id]: inputEnquiry } })
  }
  //Fucntion to manage the submit:
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:9000/contact', {
      method: "POST",
      body: JSON.stringify(newEnquiry),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",

      }
    }).then((res) => res.json())
      .then((data) => {
        setNewEnquiry(newEnquiry)
      })
      .catch(error => console.error("Error: ", error))

    const redirectToHome = () => {
      navigate("/landingContact")
    }
    if (handleSubmit) {
      redirectToHome();
    }
  }

  return (

    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <input id="name" name="name" value={newEnquiry.name} type="text" placeholder="Name" onChange={handleInput} required={+true} />
      <input id="email" name="email" value={newEnquiry.email} type="email" placeholder="Email" onChange={handleInput} required={+true} />
      <input id="topic" name="topic" value={newEnquiry.topic} type="text" placeholder="Topic" onChange={handleInput} required={+true} />
      <textarea id="enquiry" name="enquiry" value={newEnquiry.enquiry} type="text" placeholder="Tell us your enquiry" onChange={handleInput} required={+true} />
      <button className={styles.send} text="submit">  Send</button>
    </form>

  )
}



import React from "react"
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PaginationBlog from '../PaginationBlog/PaginationBlog';
import styles from './ListPost.module.scss';
import { port } from '../settings';

export default function ListPost(props) {

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  //Pagination
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const lastPage = (Math.ceil(totalPosts / postsPerPage));
  //Fin pagination
  

  //Fetch to get the info from DB
  const url = `http://localhost:${port}/blog`;
  const fetchPosts = async () => {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    setPosts(data.results);

  };
  useEffect(() => {
    fetchPosts();
  }, []);


  //Input search:
  //Set the input state:
  const [search, setSearch] = useState("");
  //Search function:
  const searcher = (e) => {
    setSearch(e.target.value)
  }
  //Filter method::
  const resultado = !search ? posts :
    posts.filter((item) =>
      item.hasOwnProperty("topic") && item.topic.toLowerCase().includes(search.toLocaleLowerCase()));

  //useFfect for ListProfs page of list professionals to stablish the total posts to show:  
  useEffect(() => {
    setTotalPosts(resultado.length);
  }, [resultado]);

  //Function to manage the pages with the filter:
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }


  //Set what the component shows when we give props for Home page: 
  if (props.section === 'Home') {
    return <>
      <div className={styles.container} >
        {posts && posts.slice(0, 6).map(({ _id, image, title }) => {
          return (
            <li className={styles.link} key={_id} >
              <Link style={{ textDecoration: "none" }} to={`/blog/${_id}`}  >
                <div className={styles.cardContainer} >
                  <img
                    src={!image ? ("/ImgBlog/imagen-no-disponible.jpg")
                      : `http://localhost:${port}/public/${image}`} alt={`imagen de ${_id}`} />
                  <h3>{title}</h3>
                </div>
              </Link>
            </li>
          )
        }).sort((a, b) =>
          new Date(b.dateOfPublish) - new Date(a.dateOfPublish)
        )}
      </div>
      <br />
      <button className={styles.seeMore}
        onClick={() => { navigate("/blog") }}>see more</button>
      <br />
    </>
  }
  //Set what the component shows when we give props for Blog page: 
  else {
    return (
      <div  >
        <br />
        <input className={styles.filter} value={search} onChange={searcher} type="text" placeholder="Search by nutrition, exercise or injuries" />
        {resultado && resultado.map(({ _id, image, title, text,  }) => {
          return (
            <div className={styles.container2} >
              <li className={styles.listOfArticles} >
                <Link className={styles.linkToArticles} to={`/blog/${_id}`} style={{ textDecoration: "none" }} key={_id}>
                  <div className={styles.articles}>
                    <img
                      src={!image ? ("/ImgBlog/imagen-no-disponible.jpg")
                        : `http://localhost:${port}/public/${image}`}
                      alt={`imagen del artículo ${_id}`} />
                    <h3 className={styles.articleTitle}>{title}</h3>
                    <p className={styles.paragraphArticle}>{text}</p>
                  </div>
                </Link>
              </li>

            </div>
          )
        }).sort((a, b) =>
          new Date(b.dateOfPublish) - new Date(a.dateOfPublish)
        ).slice(firstPostIndex, lastPostIndex)
        }

        <PaginationBlog
          totalPosts={totalPosts}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          lastPage={lastPage}
          setPostsPerPage={postsPerPage}
          postsPerPage={postsPerPage}
          lastPostIndex={lastPostIndex}
          onChange={handlePageChange}
        />
      </div>

    )
  }
}

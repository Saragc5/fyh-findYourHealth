import React from 'react';
import styles from './ListProfessionals.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import PaginationProfs from '../PaginationProfs/PaginationProfs';
import PaginationHomeListProf from '../PaginationHome/PaginationHomeListProf';
import { useContext } from 'react';
import { AuthProvider } from '../AuthContext';
import FunctionToTop from '../../Utils/FunctionToTop';
import { port } from '../settings';

export default function ListProfessionals(props) {
  const auth = useContext(AuthProvider);

  if (props.section !== "Home") {
    FunctionToTop(0, 0);
  }



  //Pagination in Home:
  const [totalCards, setTotalCards] = useState(0);
  const [currentPageCards, setCurrentPageCards] = useState(1);
  const [cardsPerPage] = useState(5);
  const lastCardIndex = currentPageCards * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const lastPageCards = (Math.ceil(totalCards / cardsPerPage));
  //



  //Pagination in page of Professionals:
  const [professionals, setProfessionals] = useState([]);
  const [totalProfs, setTotalProfs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [profsPerPage] = useState(4);
  const lastProfIndex = currentPage * profsPerPage;
  const firstProfIndex = lastProfIndex - profsPerPage;
  const lastPage = Math.ceil(totalProfs / profsPerPage);
  //Fin pagination


  //Fetch to get info from DB
  const url = `http://localhost:${port}/users`;
  const fetchProfessionals = async () => {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    setProfessionals(data.results);

  };
  useEffect(() => {
    fetchProfessionals();
  }, []);


  //Input search: 
  //Set the input state:
  const [search, setSearch] = useState("");
  //Search function:
  const searcher = (e) => {
    setSearch(e.target.value)

  }
  // Filter method:   
  const results = !search ? professionals :
    professionals.filter((item) =>
      item.hasOwnProperty("profession") && item.profession.toLowerCase().includes(search.toLocaleLowerCase()));

  //useFfect for Home page of list professionals to stablish the total cards to show:
  useEffect(() => {
    setTotalCards(professionals.length / 3);
  }, [professionals]);

  //useFfect for ListProfs page of list professionals to stablish the total professionals to show:  
  useEffect(() => {
    setTotalProfs(results.length);
  }, [results]);

  //Function to manage the pages with the filter:
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  if (props.section === "Home") {
    return (
      <main className={styles.slideProfessionals}>
        <div className={styles.cards}>
          {professionals && professionals.slice(0, 10).map(({ _id, image, firstname, profession }) => {
            return (
              <li className={styles.slideProfessionals} key={_id}  >
                <Link to={`/users/${_id}`} style={{ textDecoration: "none", listStyle: "none" }} >
                  <div className={styles.details}>
                    <img src={!image ? ("/ImgsProf/no-picture.png") : `http://localhost:${port}/public/${image}`} alt={`Foto del profesional ${firstname} ${profession}`} />
                    <h4>{profession}</h4>
                  </div>
                </Link>
              </li>
            )
          }).slice(firstCardIndex, lastCardIndex)}
        </div>
        <PaginationHomeListProf
          totalCards={totalCards}
          setCurrentPageCards={setCurrentPageCards}
          currentPageCards={currentPageCards}
          lastPageCards={lastPageCards}
          setCardsPerPage={cardsPerPage}
          cardsPerPage={cardsPerPage}
          setLastCardIndex={lastCardIndex}
        />
        <>
        </>
      </main>
    )
  }
  else {
    return (
      <>
        <span>{auth}</span>
        <input className={styles.filter} value={search} onChange={searcher} type="text" placeholder="search example: nutritionist" />
        <main >
          {results && results.map(({ _id, image, firstname, lastname, profession, speciality, city }) => {
            return (
              <ul className={styles.completeList}>
                <li key={_id} className={styles.container} >
                  <Link to={`/users/${_id}`} className={styles.linkPerson}>
                    <div className={styles.card} >
                      <img src={!image ? ("/ImgsProf/no-picture.png") : `http://localhost:${port}/public/${image}`} alt={`Foto del profesional ${firstname} ${profession}`} />

                      <div className={styles.otherDetails} >
                        <h2 >{firstname} {lastname}</h2>
                        <h3 >{profession}</h3>
                        <h4>Especiality in {speciality}</h4>
                        <h5>{city} </h5>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            )
          }
          ).slice(firstProfIndex, lastProfIndex)
          }

          <PaginationProfs
            totalProfs={totalProfs}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            lastPage={lastPage}
            setProfsPerPage={profsPerPage}
            profsPerPage={profsPerPage}
            lastProfIndex={lastProfIndex}
            onChange={handlePageChange}
          />
        </main>
      </>
    )
  }
}

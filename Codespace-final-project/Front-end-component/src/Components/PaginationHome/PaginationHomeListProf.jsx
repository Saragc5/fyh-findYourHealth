import styles from './PaginationHomeListProf.module.scss';
import { useNavigate } from 'react-router-dom';


export default function PaginationHomeListProf({
    totalCards,
    currentPageCards,
    setCurrentPageCards,
    lastCardIndex,
    lastPageCards,

}) {

    const navigate = useNavigate();

    const pagesNumber = [];


    for (let i = 1; i <= lastPageCards; i++) {
        pagesNumber.push(i)
    }

    const onPreviousPage = () => {
        setCurrentPageCards(currentPageCards - 1)
    }
    const onNextPage = () => {
        setCurrentPageCards(currentPageCards + 1);
    }

   

    return (
        <nav className={styles.containerButtonsPageHomeListProf}>
            <button className={styles.buttonPag} onClick={onPreviousPage}
                disabled={(currentPageCards === 1) ? true : false} >{"<"} </button>
            <ul>
                {pagesNumber.map((page, index) => (
                    <button
                        key={index}
                        className={styles.missingButtons}
                        onClick={() => setCurrentPageCards(page)}></button>


                ))}
            </ul>
            <button className={styles.buttonPagSeeAll} onClick={() => { navigate("/users") }}>see all</button>

            <button className={styles.buttonPag} onClick={onNextPage}
                disabled={
                    currentPageCards === lastPageCards ||
                        lastCardIndex >= totalCards
                        ? true
                        : false
                } >{">"}</button>

        </nav>
    )


}

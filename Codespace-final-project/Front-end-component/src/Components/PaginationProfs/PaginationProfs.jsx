import styles from './PaginationProfs.module.scss';


export default function PaginationProfs({
    totalProfs,
    currentPage,
    setCurrentPage,
    lastProfIndex,
    lastPage
}) {


    const pagesNumber = [];


    for (let i = 1; i <= lastPage; i++) {
        pagesNumber.push(i)
    }

    const onPreviousPage = () => {
        setCurrentPage(currentPage - 1)
    }
    const onNextPage = () => {
        setCurrentPage(currentPage + 1)

    }

 


    return (
        <nav className={styles.containerButtonsPage}>
            <button
                className={styles.buttonPrevAndNext}
                onClick={onPreviousPage}
                disabled={(currentPage === 1) ? true : false}>{"<"}</button>
            <ul className={styles.paginationList}>
                {pagesNumber.map((page, index) => (
                    <button
                        key={index}
                        className={
                            page === currentPage
                                ? styles.active
                                : styles.buttonPage}
                        onClick={() => setCurrentPage(page)}>{page}</button>

                ))}
            </ul>

            <button
                className={styles.buttonPrevAndNext}
                onClick={onNextPage}
                disabled={lastProfIndex >= totalProfs}>{">"}</button>
        </nav>
    )


}

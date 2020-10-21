const Pagination = ({ totalPages, currentPage }) => {
    const renderPageNumbers = () => {
        const pages = [];

        for(let i = 1;i <= totalPages; i++){
            pages.push((
                <li 
                    className={`page-item ${currentPage == i && 'active'}`}
                    key={`${i}`}
                >
                    <a className="page-link" href="#">{i}</a>
                </li>
            ));
        } 
        return pages;
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
            <li className="page-item disabled">
                <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            {renderPageNumbers()}
            <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
            </ul>
        </nav>
    );
}

export default Pagination;
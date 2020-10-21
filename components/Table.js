import Pagination from './Pagination';

const Table = ({ data, renderRow, renderHeader, pageSize = 10, currentPage }) => {
    const renderRows = () => data.map(renderRow);

    return (
        <>
            <table className="table">
                <thead>
                    {renderHeader()}
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
            <Pagination 
                totalPages={Math.ceil(data.length / pageSize)}
                currentPage={currentPage}
            />
        </>
    );
}

export default Table;
const Table = ({ data, renderRow, renderHeader }) => {
    const renderRows = () => data.map(renderRow);

    return (
        <table className="table">
            <thead>
                {renderHeader()}
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    );
}

export default Table;
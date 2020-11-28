import ProductRow from './ProductRow';

const ProductTable = ({ products, onDeleteProduct }) => {
    const renderTableRows = () => products.map((product, i) => (
        <ProductRow 
            key={`${i}`}
            product={product}
            onDelete={onDeleteProduct}
        />
    ));

    return (
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty.</th>
                </tr>
            </thead>
            <tbody>
                {renderTableRows()}
            </tbody>
        </table>
    );
}

export default ProductTable;
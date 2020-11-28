import LinkNext from '../LinkNext';
import styles from '../../styles/ProductRow.module.css';

const ProductRow = ({ product, onDelete }) => {
    const { product_id, name, price, quantity } = product;

    return (
        <tr>
            <td>
                <i 
                    className={`fas fa-trash ${styles.btnDelete} product-row__delete-button`}
                    onClick={() => onDelete(product_id)}
                ></i>
            </td>
            <td>
                <LinkNext
                    href={`/product/${product_id}`}
                >
                    {name}
                </LinkNext>
            </td>
            <td>${price}.99</td>
            <td>{quantity}</td>
        </tr>
    );
}

export default ProductRow;
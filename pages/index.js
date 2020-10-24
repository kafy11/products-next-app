import Page from '../templates/Page';
import { useRouter } from 'next/router';
import { Table, LinkButton, LinkNext } from '../components';
import { getProducts, deleteProduct } from '../actions/product';
import styles from '../styles/ProductList.module.css';

const ProductListPage = ({ products }) => {
  const router = useRouter();

  const handleClickDelete = async (product_id) => {
    await deleteProduct(product_id);
    router.reload();
  };

  const toolbarContent = (
    <LinkButton
      href="/add"
      title="Add Product"
      className="float-right"
    >
      <i className="fas fa-plus"></i>
    </LinkButton>
  );

  const renderTableHeader = () => (
    <tr>
      <th></th>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Qty.</th>
    </tr>
  );

  const renderTableRow = ({ product_id, name, price, quantity }, i) => (
    <tr key={`${i}`}>
      <td>
        <i 
          className={`fas fa-trash ${styles.btnDelete}`}
          onClick={() => handleClickDelete(product_id)}
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

  return (
    <Page 
      title="Product List"
      toolbarContent={toolbarContent}
    >
      <Table 
        data={products}
        currentPage={1}
        renderHeader={renderTableHeader}
        renderRow={renderTableRow}
      />
    </Page>
  );
}

export async function getStaticProps() {
  const products = await getProducts();

  return {
    props: {
      products,
    },
  }
}

export default ProductListPage;
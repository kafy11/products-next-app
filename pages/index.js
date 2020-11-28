import Page from '../templates/Page';
import { useRouter } from 'next/router';
import { LinkButton } from '../components';
import ProductTable from '../components/productList/ProductTable';
import { getProducts, deleteProduct } from '../actions/product';

const ProductListPage = ({ products }) => {
  const router = useRouter();

  //delete the product then reloads
  const handleClickDelete = async (product_id) => {
    await deleteProduct(product_id);
    router.reload();
  };

  //Add button for the toolbar
  const toolbarContent = (
    <LinkButton
      href="/add"
      title="Add Product"
      className="float-right"
    >
      <i className="fas fa-plus"></i>
    </LinkButton>
  );

  return (
    <Page 
      title="Product List"
      toolbarContent={toolbarContent}
    >
      <ProductTable 
        products={products}
        onDeleteProduct={handleClickDelete}
      />
    </Page>
  );
}

//fetchs the products to pre-render the page
export async function getStaticProps() {
  const products = await getProducts();

  return {
    props: {
      products,
    },
  }
}

export default ProductListPage;
import ProductFormPage from '../../templates/ProductFormPage';
import { useRouter } from 'next/router';
import { updateProduct, getProducts, getProduct } from '../../actions/product';

const EditProductPage = ({ product_id, ...rest }) => {
    const router = useRouter();

    const handleSubmit = async (product) => {
        await updateProduct(product_id, product);
        router.push('/');
    }

    return (
        <ProductFormPage 
            title="Create Product"
            onSubmit={handleSubmit}
            {...rest}
        />
    );
}

export async function getStaticPaths() {
    const products = await getProducts(); 
    const paths = products.map(({ product_id }) => `/product/${product_id}`);
  
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const product = await getProduct(params.product_id);
  
    return {
        props: {
            ...product,
        },
    }
  }

export default EditProductPage;
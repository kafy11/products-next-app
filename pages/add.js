import ProductFormPage from '../templates/ProductFormPage';
import { useRouter } from 'next/router';
import { addProduct } from '../actions/product';

const AddProductPage = () => {
  const router = useRouter();

  const handleSubmit = async (product) => {
    try {
      await addProduct(product);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductFormPage 
      title="Create Product"
      onSubmit={handleSubmit}
    />
  );
}

export default AddProductPage;
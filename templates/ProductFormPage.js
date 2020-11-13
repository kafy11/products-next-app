import { useState } from 'react';
import { useRouter } from 'next/router';
import Page from './Page';
import { Button, InputText } from '../components';

//Product form template that is used for the insert and update pages
const ProductFormPage = ({ title, onSubmit, ...rest }) => {
    const router = useRouter();
    const [name, setName] = useState(rest.name);
    const [price, setPrice] = useState(rest.price);
    const [quantity, setQuantity] = useState(rest.quantity);

    //prevents the automatic reload and calls the onSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit({
            name,
            price,
            quantity
        });
    };

    //handle for allowing only number, tab and backspace keys
    const handleOnlyNumber = (e) => {
        if([8,9].indexOf(e.keyCode) == -1 && isNaN(e.key)){
            e.preventDefault();
        }
    };

    //use router to redirect to the product list
    const handleCancelClick = () => router.push('/');

    return (
        <Page title={title}>
            <form className="mb-3" onSubmit={handleSubmit} >
                <InputText 
                    className="product-form-page__name"
                    label="Name" 
                    value={name}
                    onChange={setName}
                    required 
                />

                <InputText 
                    className="product-form-page__price"
                    label="Price"
                    value={price}
                    onChange={setPrice}
                    prepend="$"
                    append=".99"
                    onKeyPress={handleOnlyNumber}
                    required
                />

                <InputText
                    className="product-form-page__quantity"
                    label="Quantity" 
                    value={quantity}
                    onChange={setQuantity}
                    onKeyPress={handleOnlyNumber}
                    required
                />

                <Button submit>Submit</Button>
                <Button 
                    color="light"
                    className="ml-2 product-form-page__cancel-button"
                    onClick={handleCancelClick}
                >
                    Cancel
                </Button>
            </form>
        </Page>
    );
}

export default ProductFormPage;
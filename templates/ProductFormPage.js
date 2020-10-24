import { useState } from 'react';
import { useRouter } from 'next/router';
import Page from './Page';
import { Button, InputText } from '../components';

const ProductFormPage = ({ title, onSubmit, ...rest }) => {
    const router = useRouter();
    const [name, setName] = useState(rest.name);
    const [price, setPrice] = useState(rest.price);
    const [quantity, setQuantity] = useState(rest.quantity);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit({
            name,
            price,
            quantity
        });
    };

    const handleOnlyNumber = (e) => {
        if([8,9].indexOf(e.keyCode) == -1 && isNaN(e.key)){
            e.preventDefault();
        }
    };

    const handleCancelClick = () => router.push('/');

    return (
        <Page title={title}>
            <form className="mb-3" onSubmit={handleSubmit} >
                <InputText 
                    label="Name" 
                    value={name}
                    onChange={setName}
                    required 
                />

                <InputText 
                    label="Price"
                    value={price}
                    onChange={setPrice}
                    prepend="$"
                    append=".99"
                    onKeyPress={handleOnlyNumber}
                    required
                />

                <InputText
                    label="Quantity" 
                    value={quantity}
                    onChange={setQuantity}
                    onKeyPress={handleOnlyNumber}
                    required
                />

                <Button submit>Submit</Button>
                <Button 
                    color="light"
                    className="ml-2"
                    onClick={handleCancelClick}
                >
                    Cancel
                </Button>
            </form>
        </Page>
    );
}

export default ProductFormPage;
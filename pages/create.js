import Page from '../templates/Page';
import { Button, InputText } from '../components';

const CreateProductPage = () => {
  const handleOnlyNumber = (e) => {
    if([8,9].indexOf(e.keyCode) == -1 && isNaN(e.key)){
      e.preventDefault();
    }
  }

  return (
    <Page title="Create Product">
      <form className="mb-3">
        <InputText label="Name" />

        <InputText 
          label="Price"
          prepend="$"
          append=".99"
          onKeyPress={handleOnlyNumber}
        />

        <InputText
          label="Quantity" 
          onKeyPress={handleOnlyNumber}
        />

        <Button submit>Submit</Button>
      </form>
    </Page>
  );
}

export default CreateProductPage;
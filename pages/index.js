import Page from '../templates/Page';
import Table from '../components/Table';

const ProductList = () => {
  const toolbarContent = (
    <a 
      role="button" 
      className="btn btn-link float-right" 
      title="Add Product"
      href="#"
    >
      <i className="fas fa-plus"></i>
    </a>
  );

  const products = [
    { name: 'PS4', price: 399.99, qty: 3 },
    { name: 'XBOX One', price: 499.99, qty: 2 },
    { name: 'Nintendo Switch', price: 299.99, qty: 1 }
  ];

  const renderTableHeader = () => (
    <tr>
      <th></th>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Qty.</th>
    </tr>
  );

  const renderTableRow = ({ name, price, qty }, i) => (
    <tr key={`${i}`}>
      <td><i className="fas fa-trash"></i></td>
      <td>{name}</td>
      <td>US${price}</td>
      <td>{qty}</td>
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

export default ProductList;
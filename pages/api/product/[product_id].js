import generateProductDAO from '../../../daos/productDAO';

const { updateProduct, getProduct, deleteProduct } = generateProductDAO();

export default async (req, res) => {
    const {
        query: { product_id },
    } = req;

    switch(req.method){
        case 'POST':
            await updateProduct({
                product_id,
                ...req.body
            });
            res.status(200).json({ success: 1 });
            break;
        
        case 'GET':
            try{
                const product = await getProduct(product_id);
                res.status(200).json(product);
            } catch (error){
                //if query doesn't return a product
                res.status(404).json('Product not found')
            }
            break;
        
        case 'DELETE':
            await deleteProduct(product_id);
            res.status(200).json({ success: 1 });
            break;
        
        default:
            //blocks all other methods
            res.status(405).setHeader('Allow', 'POST, GET, DELETE').send('Not Allowed');
    }
}

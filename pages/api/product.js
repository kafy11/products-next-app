import generateProductDAO from '../../daos/productDAO';

const { insertProduct, getAllProducts } = generateProductDAO();

export default async (req, res) => {
    switch(req.method){
        case 'POST':
            await insertProduct(req.body);
            res.status(200).json({ success: 1 });
            break;
        
        case 'GET':
            const products = await getAllProducts();
            res.status(200).json(products);
            break;
        
        default:
            res.status(405).setHeader('Allow', 'POST, GET').send('Not Allowed');
    }
}

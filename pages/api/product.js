import generateProductDAO from '../../daos/productDAO';

export default async (req, res) => {
    const { insertProduct, getAllProducts } = generateProductDAO();
    
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
            //blocks all other methods
            res.status(405).setHeader('Allow', 'POST, GET').send('Not Allowed');
    }
}

import ProductModel from '../Modals/ProductModel';

const seedProducts = async () => {
    const products = [
        { name: 'Nomad Tumbler', price: 1200, imgUrl: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg" },
        { name: 'Machined Mechanical Pencil', price: 800, imgUrl: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg" },
        {
            name: 'Earthen Bottle',
            price: 48,
            imgUrl: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg",
           

        }
        // Add more products
    ];
    try {
        // Check if products already exist
        const count = await ProductModel.countDocuments();
        if (count === 0) {
            for (const product of products) {
                await ProductModel.findOneAndUpdate({ name: product.name }, product, { upsert: true });
            }
        }
        else {
            console.log("Products already exist in the database.");
        }
    } catch (err) {
        console.error("Error seeding the database: ", err);
    }
};

export default seedProducts;

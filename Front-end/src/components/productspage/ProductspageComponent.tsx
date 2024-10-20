/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
import '../../styles/globals.css';
import Navbar from '../navbar/NavComponent';
import Productcard from '../productcard/ProductcardComponent';
import { useEffect, useState } from 'react';
import Productmodal from '../productmodal/ProductmodalComponent';
import { useRouter } from 'next/router';
import { ApiService } from '../Api_service/page';
import LoaderModal from "../loaderModal/LoaderComponent";


export default function ProductsPage() {
    const router = useRouter();
    // const auth = localStorage.getItem('token');
    interface ProductInterface {
        _id:string;
        imgUrl: string;
        name: string;
        price: number;
    }

    useEffect(() => {
        const auth = localStorage.getItem('token');
        if (auth == null || auth == undefined) {
            router.push('/signin');
        }
    }, [])

    const [isProductModalOpen, setisProductModalOpen] = useState(false);
    const [clickedItem, setclickedItem] = useState(0)

    const [productNameing, setproductName] = useState("")
    const [productPrice, setproductPrice] = useState(0)
    const [productId, setId] = useState("")

    const [productImg_String, setproductImg_String] = useState("")
    const [qty, setQty] = useState(0)
    const [productData, setproductData] = useState<ProductInterface[]>([]);

    const [isLoading, setIsLoading] = useState(false);



    const open = (index: number, name: string, price: number, img: string ,id:string) => {
        setproductName(name);
        setproductPrice(price);
        setproductImg_String(img);
        setId(id);

        setclickedItem(index)

    }
    useEffect(() => {
        getProducts()

    }, []);

    // const productDataArr = [

    //     {
    //         img: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    //         name: 'Nomad Tumbler',
    //         price: 35,

    //     },
    //     {
    //         img: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
    //         name: 'Machined Mechanical Pencil',
    //         price: 35,

    //     }, {
    //         img: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg",
    //         name: 'Earthen Bottle',
    //         price: 48,

    //     },



    // ]

    const getProducts = async () => {
        setIsLoading(true);
        const auth = localStorage.getItem('token');
        const headers = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${auth}`
        }
        const response = await ApiService(null, "product/listsOfProducts", headers, "GET");
        if (response.data.status === "success") {
            console.log(response.data.data);
            setproductData(response.data.data)
            setIsLoading(false);
        }

    }
   
    return (
        <>
            {isLoading && <LoaderModal />}
            <Navbar />
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {productData.map((product, idx: number) => (
                            <>

                                <div key={idx} onClick={() => { setisProductModalOpen(true); open(idx, product.name, product.price, product.imgUrl,product._id);  }}>
                                    <Productcard key={idx} productName={product.name} price={product.price} img={product.imgUrl} />

                                </div>
                                {
                                    isProductModalOpen && clickedItem === idx && <Productmodal productName={productNameing} price={productPrice} img={productImg_String} id={productId} />
                                }
                            </>
                        ))}


                    </div>
                </div>
            </div>

        </>


    );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

import '../../styles/globals.css';
import Navbar from '../navbar/NavComponent';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { ApiService } from '../Api_service/page';
import LoaderModal from "../loaderModal/LoaderComponent";


export default function Cart() {
    interface CartDataInterface {
        _id: number;
        quantity: number;
        productId: {
            _id: number;
            imgUrl: string;
            name: string;
            price: number;
        }
    }
    const [cartData, setCartData] = useState<CartDataInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPriceState, setTotalPrice] = useState(0);


    // const cartData = [

    //     {
    //         img: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
    //         name: 'Nomad Tumbler',
    //         price: 35,
    //         qty: 1,

    //     },
    //     {
    //         img: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
    //         name: 'Machined Mechanical Pencil',
    //         price: 35,
    //         qty: 2,

    //     }, {
    //         img: "https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg",
    //         name: 'Earthen Bottle',
    //         price: 48,
    //         qty: 1,

    //     },




    // ]
    const calculateTotal = () => {
        let total = 0;
        cartData.forEach(product => {
            total += product.productId.price * product.quantity;
        });
        setTotalPrice(total);
    };
 

    const getCartItems = async () => {
        setIsLoading(true);
        const auth = localStorage.getItem('token');
        const headers = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${auth}`
        }
        const response = await ApiService(null, "cart/getAUserItem", headers, "GET");
        console.log(response.data.data);

        if (response.data.status === "success") {
            console.log(response.data.data);
            setCartData(response.data.data)
            setIsLoading(false);
        }

    }
    const removeCartItems = async (id: number) => {
        setIsLoading(true);
        const auth = localStorage.getItem('token');
        const headers = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${auth}`
        }
        console.log(id);

        const response = await ApiService(null, `cart/deleteCartItem/${id}`, headers, "DELETE");
        console.log(response.data.data);

        if (response.data.status === "success") {
            console.log(response.data.data);
            setIsLoading(false);
            getCartItems()

        }

    }

    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem('token');
        if (auth == null || auth == undefined) {
            router.push('/signin');
        }
    }, [])

    useEffect(() => {
        getCartItems()

    }, []);
    useEffect(() => {

        

        calculateTotal();
    }, [cartData]); // This ensures the total price updates whenever cartData changes

    useEffect(() => {
        getCartItems();
    }, []);
    return (
        <>
            <Navbar />
            {isLoading && <LoaderModal />}

            <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>

                                            <Link href="/products">
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                                        <span className="absolute -inset-0.5"></span>
                                                        <span className="sr-only">Close panel</span>
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </Link>

                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {cartData.map((product, idx: number) => (

                                                        <li key={idx} className="flex py-6">
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img src={product.productId.imgUrl} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            <a href="#">{product.productId.name}</a>
                                                                        </h3>
                                                                        <p className="ml-4">${product.productId.price}</p>
                                                                    </div>
                                                                    {/* <p className="mt-1 text-sm text-gray-500">Salmon</p> */}
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <p className="text-gray-500">Qty {product.quantity}</p>
                                                                    <p className="text-gray-500">Total ${product.productId.price * product.quantity} </p>
                                                                    { }
                                                                    <div className="flex">
                                                                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => removeCartItems(product._id)}>Remove</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>$ {totalPriceState} </p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                        <div className="mt-6">
                                            <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or
                                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

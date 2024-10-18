/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
import Link from 'next/link';
import '../../styles/globals.css';

export default function Homepage() {
    return (
        <div className="bg-hero-img h-dvh ">
            <div className=" sticky top-0 h-16 backdrop-blur-md pl-10 flex items-center text-primary text-2xl font-bold">SHOPMADE</div>

            <div className="flex justify-end gap-y-20  pb-20 items-center h-3/4 flex-col">
                <h1 className=" w-4/4 px-0.5  text-center text-white text-5xl font-bold md:text-7xl md:w-3/4">Quick and hassle-free shopping</h1>
                <Link href="/signin">
                <button className=" w-40 rounded text-black bg-white h-16" >SHOP NOW</button>
                </Link>

            </div>

            {/* second section */}
            <section className="bg-primary h-4/4 py-10 gap-x-10  flex justify-center items-center flex-wrap md:flex-nowrap text-white">
                <span className="w-4/4  px-10 text-5xl md:w-2/4 md:text-7xl">An extension of your closet</span>
                <div className="w-4/4  pt-20 flex flex-col gap-y-10 md:2/4 pl-10 md:pl-0 md:w-2/4">
                    <span className="text-5xl"> Mintmade Fashion offers same-day or next-day delivery within our service areas.</span>
                    <span className="text-2l w-2/4 ">Shop for whatever you feel like wearing and get it within 24 hours!</span>
                </div>
            </section>

            {/* thrid section */}
            <section className="bg-white gap-10 pb-10 flex justify-center items-center flex-wrap md:flex-nowrap md:pb-0">
                <img className="w-4/4 md:w-2/4" src="https://res.cloudinary.com/di3n0yigr/image/upload/v1729067671/h2orrvdyvbdijuhvesd0.png" alt="" />
                <div className="text-black   flex flex-col items-center gap-5 h-4/4">
                    <span className="text-5xl font-bold">Clothes for Her</span>
                    <span className="text-center w-3/4">Shop for classic or trendy pieces you can wear every day.</span>
                    <Link href="/signin">
                    <button className=" w-40 rounded text-white bg-primary h-16" >SHOP NOW</button>
                    </Link>
                </div>
            </section>

            {/* fourth section */}
            <section className="pt-10 bg-white gap-10  flex justify-center items-center flex-wrap md:flex-nowrap ">
                <div className="text-black flex flex-col items-center gap-5 h-4/4">
                    <span className="text-5xl font-bold">Clothes for Him</span>
                    <span className="text-center w-3/4">Look dashing while on the go with our casual wear items.</span>
                    <Link href="/signin">
                    <button className=" w-40 rounded text-white bg-primary h-16" >SHOP NOW</button>
                    </Link>
                </div>
                <img className="w-4/4 md:w-2/4" src="https://res.cloudinary.com/di3n0yigr/image/upload/v1729068750/frzgpan7iwvjnybd2euu.png" alt="" />

            </section>

        </div>
    );
}

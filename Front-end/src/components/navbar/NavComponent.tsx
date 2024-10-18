/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
import Link from 'next/link';
import '../../styles/globals.css';
import { useEffect, useState } from 'react'
import { navLinks } from "../navbar/Navlinks"
import { useRouter } from "next/router";

export default function Navbar() {
    const [isNavOpen, setNavOpen] = useState(false)
    const router = useRouter();

    const signOut = () => {
        localStorage.clear()
        router.push('/')
    }

    return (

        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5 " onClick={() => setNavOpen(!isNavOpen)}></span>
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            {/* <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" /> */}
                            <h1 className="text-2xl font-black text-center text-white ">SHOPMADE</h1>

                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {
                                    navLinks.map((link, index) => {
                                        return (
                                            < Link href={link.path} key={index} className={` ${router.pathname === link.path ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}`}>{link.name}</Link>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>


                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <Link href="/cart">
                            <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="  absolute -inset-1.5"></span>
                                <span className="sr-only ">View cart</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>

                            </button>
                        </Link>

                        <div onClick={() => signOut()} className="relative ml-3 ">
                            <div>
                                <button type="button" className="  relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="  absolute -inset-1.5 "></span>
                                    <span className="sr-only">Open user menu</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                    </svg>

                                </button>
                            </div>


                        </div>

                    </div>


                </div>
            </div>
            {
                isNavOpen &&
                <div className="sm:hidden " id="mobile-menu">
                    <div className="  space-y-1 px-2 pb-3 pt-2"> {
                        navLinks.map((link, index) => {
                            return (
                                < Link href={link.path} key={index} className={` ${router.pathname === link.path ? "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" : "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}`}>{link.name}</Link>
                            )
                        })}

                        {/* <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
                        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a> */}
                    </div>
                </div>

            }

        </nav>

    );
}

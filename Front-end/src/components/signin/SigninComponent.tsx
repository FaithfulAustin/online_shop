/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from 'next/link';
import '../../styles/globals.css'; import { useState } from 'react';
import LoaderModal from "../loaderModal/LoaderComponent";
import { ApiService } from '../Api_service/page';
import { useRouter } from 'next/router';

export default function Signin() {

  const [emailState, setEmail] = useState("")
  const [passwordState, setPassword] = useState("")
  const [isLoading, setisLoading] = useState(false)

  const router = useRouter();
  const formData = {
    email: emailState,
    password: passwordState,
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }

  };
  const header = {
    'Content-Type': 'application/json',

  };
  const signInRequest = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    setisLoading(true)
    const response = await ApiService(formData, "auth/login", header, "POST")
    console.log(response);
    console.log(response.data.data._doc.full_name);

    if (response.data.status === "success") {
      const token = response.data.data.token;
      const fullName = response.data.data._doc.full_name;
      localStorage.setItem("token", token);
      localStorage.setItem("name", fullName);

      setisLoading(false)
      router.push('/products');
      // return <Link href="/signup"></Link>
    }


  }
  return (
    <>
      {isLoading && <LoaderModal />}


      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-5xl font-black text-center text-primary ">Shopmade</h1>

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={signInRequest} method="POST">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>

              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Dont have an account ?
            <Link href="/signup" className="font-semibold leading-6 text-primary hover:text-hover"> Sign Up </Link>

          </p>
        </div>
      </div>
    </>

  );
}

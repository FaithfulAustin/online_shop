/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from 'next/link';
import '../../styles/globals.css';
import LoaderModal from "../loaderModal/LoaderComponent";
import { ApiService } from '../Api_service/page';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const header = {
    'Content-Type': 'application/json',
  };

  const signUpRequest = async (values: any) => {
    setIsLoading(true);
    const response = await ApiService(values, "auth/register", header, "POST");

    if (response.data.status === "success") {
      setIsLoading(false);
      router.push('/signin');
    }
  };

  return (
    <>
      {isLoading && <LoaderModal />}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-5xl font-black text-center text-primary">Shopmade</h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to get started</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              full_name: '',
              email: '',
              password: '',
              confirm_password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={signUpRequest}
          >
            {({ handleChange, values }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                  <div className="mt-2">
                    <Field
                      id="full_name"
                      name="full_name"
                      type="text"
                      onChange={handleChange}
                      value={values.full_name}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="full_name" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                  <div className="mt-2">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={values.email}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={values.password}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                  <div className="mt-2">
                    <Field
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      onChange={handleChange}
                      value={values.confirm_password}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage name="confirm_password" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <Link href="/signin" className="font-semibold leading-6 text-primary hover:text-hover"> Sign In </Link>
          </p>
        </div>
      </div>
    </>
  );
}

import React from 'react';
import Image from "next/image";
import Link from "next/link";

export default function Intro() {
  return (
    <section className="bg-gray-50">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl text-black font-extrabold sm:text-5xl">
          File Stack: Share Files
          <strong className="font-extrabold text-blue-700 sm:block"> With Ease. </strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed">
        Introducing our versatile file sharing app, seamlessly connecting users through link sharing and email attachments. 
        Experience the convenience of effortlessly sending files of any size while ensuring the security of cloud backup for all your valuable data. 
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={"/dashboard/upload"}>
            <button
              className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            >
              Get Started
            </button>
          </Link>
  
          <a
            className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
            href="/about"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
  )
}

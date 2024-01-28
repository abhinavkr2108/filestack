"use client"
import { Heading } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

export default function Sidebar() {

  const [activeIndex, setActiveIndex] = useState(0);
  const menuList = [
    {
      id:1,
      title: 'Upload',
      icon: <FaFileUpload/>,
      link: '/dashboard/upload'
    },
    {
      id:2,
      title: 'All Files',
      icon: <FaFileAlt/>,
      link: '/dashboard/files'
    }
  ];
  return (
    <div className="flex flex-col gap-3">
      <Heading padding={5}>File Stack</Heading>
      {menuList.map((item, index) => (
        <Link href={item.link} key={item.id}>
          <button
            className={`flex items-center justify-start gap-2 p-2 w-full hover:bg-blue-600 hover:text-white ${activeIndex===index? "bg-blue-600 text-white hover:bg-none":null}`}
            onClick={() => setActiveIndex(index)}
            key={item.id}
          >
            {item.icon}
            {item.title}
          </button>
        </Link>
      ))}
    </div>
  )
}

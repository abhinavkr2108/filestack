"use client"
import Sidebar from '@/components/dashboard/Sidebar'
import { UserButton, useUser } from '@clerk/nextjs'
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react';
import Header from '@/components/dashboard/Header';



export default function DashboardLayout({children}) {
    const account = useUser();
    const [user, setUser] = useState();
  
    useEffect(() => {
      if (account.isLoaded) {
        setUser(account.user);
        localStorage.setItem('user', JSON.stringify(account.user));
      }
    },[account.isLoaded])

  return (
    <div>
    
        <div className='flex h-screen w-full'>
          <Box 
            display={{base: 'none', md: 'block'}}  
            w={{base:0, md: 60}}
            bg='gray.50'
          >
            <Sidebar/>
          </Box>
          <Box display={{base: 'flex', md: 'none'}} m={5}>
            <GiHamburgerMenu size={30}/>
          </Box>
          <div className="flex flex-col flex-grow">
            <div className='h-12 w-full bg-gray-50'>
              <Header/>
            </div>
            <div className='h-screen w-full'>
                {children}
            </div>
          </div>
        </div>
    
    </div>
  )
}


import { UserButton, auth, useUser } from '@clerk/nextjs'
import React from 'react'

export default function Header() {
  // const {user} = auth();

  return (
    <div className='w-full h-full flex items-center justify-end px-8 py-2'>
        {/* <p className='pr-3'>{name}</p> */}
        <UserButton afterSignOutUrl='/'/>
    </div>
  )
}
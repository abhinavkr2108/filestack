import React from 'react'

export default function AuthLayout({ children }) {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        {children}
    </div>
  )
}

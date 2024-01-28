import FileUpload from '@/components/ui/FileUpload'
import { Button, Heading } from '@chakra-ui/react'
import React from 'react'

export default function UploadPage() {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full gap-5'>
        <Heading>
            Upload Your Files Here
        </Heading>

        <FileUpload/>
       

    </div>
  )
}

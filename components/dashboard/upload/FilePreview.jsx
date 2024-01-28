import Image from 'next/image'
import React from 'react'
import fileImg from "@/public/file.png"
import { Text, VStack } from '@chakra-ui/react'
import { RxCross1 } from "react-icons/rx";

export default function FilePreview({file,removeFile}) {

    const truncateFileName = (fileName) =>{
        if (fileName.length > 20) {
            return fileName.substring(0, 20) + "...";
        } else {
            return fileName;
        }
    }
    
  return (
    <div className='flex gap-2 items-center justify-between min-w-[50vw] border border-blue-200 rounded-md p-2'>
        <div className='flex items-center gap-2'>
            <Image
                src={fileImg}
                alt="file"
                width={40}
                height={40}
            />
            <VStack align={"start"} spacing={0}>
                <Text fontWeight={"semibold"} size={"18px"}>{truncateFileName(file.name)}</Text>
                <Text size={"14px"} color={"gray.500"} fontWeight={"semibold"}>{file.type}/{(file.size/1024/1024).toFixed(2)}MB</Text>
            </VStack>
        </div>
        <div>
            <RxCross1 size={20} className='cursor-pointer' onClick={()=> removeFile()}/>
        </div>
     
    </div>
  )
}

"use client"

import React, { useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';
import FileCard from '@/components/download/FileCard';
import { Spinner } from '@chakra-ui/react';

export default function DownloadFilePage({params}) {
    const db = getFirestore(app);
    const [file, setFile] = React.useState();
    
    const getFileInfo = async () => {
        const docRef = doc(db, "Uploaded File", params.fileId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data from downloads route:", docSnap.data());
            setFile(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    useEffect(()=>{
        getFileInfo();
    },[])

    useEffect(() => {
        if(file){
            console.log("FILE STATE");
            console.log(file);
        }
    },[file])
  return (
   file?  <FileCard file = {file}/> : (<div className='flex h-screen w-full items-center justify-center'><Spinner/></div>)
  )
}

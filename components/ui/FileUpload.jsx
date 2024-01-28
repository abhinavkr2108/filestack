"use client"
import { Button,Progress, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import FileAlert from './FileAlert';import ErrorAlert from './ErrorAlert';
import FilePreview from '../dashboard/upload/FilePreview';
import { app } from '@/config/FirebaseConfig';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import generateRandomString from '@/utils/RandomString';
import { useRouter } from 'next/navigation';
import { auth, currentUser } from "@clerk/nextjs";
// import Progress from './Progress';


export default function FileUpload() {
    // State Variables
    const [file, setFile] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    // const [fileId, setFileId] = useState("");

    const {user,isLoaded} = useUser();


    useEffect(()=>{
        console.log("USER");
        console.log(user);
    },[])

    const router = useRouter();

    //Firebase
    const storage = getStorage(app);
    const db = getFirestore(app);

    useEffect(()=>{
        console.log("USER");
        console.log(user);
    },[isLoaded])

    useEffect(() => {
        if(file){
            console.log("FILE STATE");
            console.log(file);
        }
    },[file]);

    // Take file as an input
    const handleFile = (inputFile) => {
        try {
            if(inputFile.size>4000000){
                setShowAlert(true)
            } else{
                setShowAlert(false);
                setFile(inputFile);
            }
            console.log("FILE STATE");
            console.log(file);
            
        } catch (error) {
            console.error(error);
            setError(error.message);
        }    
    }

    // Remove the input file
    const removeFile = () => {
        setFile(null);
    }

    // Upload the file to firebase storage
    const uploadFileToFirebase = async (uploadFile) => {        
        console.log("FILE UPLOAD");
        console.log(uploadFile);
        const metadata = {
            contentType: uploadFile.type,
        }

        try {
            const storageRef = ref(storage, `files/${uploadFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef,uploadFile,metadata);
            
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes)* 100;
                console.log(`Upload is ${progress}% done`);
                setUploadProgress(progress);

                if(progress === 100){
                    console.log("Upload is 100% done");
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log("File available at", url);
                        console.log(uploadTask.snapshot);
                        saveDataToFirebaseDatabase(uploadFile,url);
                    });
                }
               
            })
            
        } catch (error) {
            console.error(error);
            setError("Error uploading file");
        }
    }



    const saveDataToFirebaseDatabase = async (uploadFile,url) => {
        const docId = Date.now().toString();
        const uploadedFileId = generateRandomString();
        // const docRef = await db.collection('files').doc(docId);
        await setDoc(doc(db, "Uploaded File", docId),{
            id: uploadedFileId,
            name: uploadFile.name,
            type: uploadFile.type,
            size: uploadFile.size,
            url: url,
            userName: user.fullName,
            userEmail: user.primaryEmailAddress.emailAddress,
            password: "",
            shortUrl: process.env.NEXT_PUBLIC_BASE_URL + "download/" + docId,
            createdAt: new Date(),
        }).then(()=>{
            console.log("FILE ID");
            console.log(docId);
        }).then(()=>{
            router.push(`file-preview/${docId}`);
        }).catch((error) => {
            console.error(error);
            setError("Error saving data to database");
        })
    
    }

    if(!isLoaded){
        return <Spinner/>
    }
  return (
    <>
     
            <div className="flex flex-col items-center justify-center w-[70vw] gap-5">
            {
                showAlert? <FileAlert/> : null
            }
            {
                error? <ErrorAlert>{error}</ErrorAlert> : null
            }
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden"
                    onChange={(event)=>handleFile(event.target.files[0])}
                 />
            
            </label>
            {
                file? <FilePreview file={file} removeFile={removeFile}/> : null
            }
             
            
       
    
            {
                uploadProgress > 0? (
                    <Progress hasStripe value={uploadProgress} width={"100%"} />
                ) : null
            }
            {
                uploadProgress == 100? (
                    <Text fontWeight={"bold"} color={"blue.500"} fontSize={18}>File Uploaded</Text>
                ) : uploadProgress > 0 && uploadProgress < 100? (
                    <Text fontWeight={"bold"} color={"gray.500"} fontSize={18}>Uploading File...</Text>
                ) : (
                    <Button 
                        isDisabled={file===null? true : false} 
                        colorScheme={"blue"} 
                        className='disabled:bg-gray-600' 
                        w={"150px"}
                        onClick={()=>uploadFileToFirebase(file)}
                    >
                        Upload
                    </Button>
                )
            }
    
    
           
    
        </div> 
      
    </>
  
  )
}

"use client"
import { app } from '@/config/FirebaseConfig';
import { Box, Button, Checkbox, Flex, HStack,Heading,Input,InputGroup,InputRightElement,Text, VStack } from '@chakra-ui/react';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import fileShare from "../../../../../public/share_file.jpg";
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import ErrorAlert from '@/components/ui/ErrorAlert';

export default function FilePreviewPage({params}) {
    const [file, setFile] = React.useState();
    const db = getFirestore(app);
    const router = useRouter();
    const {user,isLoaded} = useUser();

    const [isLoading, setIsLoading] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const [isChecked, setIsChecked] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [error, setError] = React.useState("");


    React.useEffect(() => {
        getFileInfo();
    },[])

    const getFileInfo = async () => {
        const docRef = doc(db, "Uploaded File", params.fileId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setFile(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    const savePasswordInFirebase = async () => {
        const docRef = doc(db, "Uploaded File", params.fileId);
        await updateDoc(docRef, {
            password:password
        }).then(() => {
            alert("Password Updated Successfully")
        }).catch((error) => {
            console.log(error);
            setError("Error while updating password");
        })
    }
    const sendFileViaEmail = async () => {
        if(!email){
            setError("Please Enter Email");
            return
        }
        setIsLoading(true);
        const data = {
            emailTo: email,
            userName: user?.fullName,
            subject: subject ? subject : "Someone wants to share file with you",
            fileId: params.fileId,
            fileTitle: file?.name,
            fileType: file?.type,
            fileSize: file?.size,
            fileUrl: file?.shortUrl,
        }
        axios.post("/api/email", data).then((res) => {
            console.log(res);
        }).then(()=>{
            alert("Email Sent Successfully");
            setIsLoading(false);
            setError("");
        }).catch((err)=>{
            console.log(err);
            setError("Error while sending email");
            setIsLoading(false);
        })
    }
    if(!isLoaded){
        return <Text>Loading...</Text>
    }

  return (
    <div className='p-8'>
        <HStack className='cursor-pointer' onClick={()=> router.back()} marginBottom={10}>
            <BsFillArrowLeftSquareFill size={25} className='cursor-pointer' color='blue'/>
            <Text>Go to uploads</Text>
        </HStack>
        {
            error && (<div className='mb-3'><ErrorAlert>{error}</ErrorAlert></div>)
        }
        <Box borderWidth={"thin"} borderColor='gray.500' p={5} borderRadius={10} maxW={"6xl"} m={"auto"}>
            <Flex direction={{base:"column",lg:"row"}} gap={5} w={"full"}>
                <Image 
                    src={fileShare} alt="file"
                    className='sm:w-full sm:h-[200px] lg:w-1/2 lg:h-[350px]'
                />
                <VStack w={"full"} align={"start"}>
                    <Heading size={"md"}> Share File</Heading>
                    <Text className='text-gray-500 font-bold text-lg'>URL</Text>
                    <Box className='border border-gray-400 rounded-md p-2 bg-gray-50'>
                        <Text>{file?.url}</Text>
                    </Box>
                    <Text className='text-gray-500 font-bold text-lg'>Short URL</Text>
                    <Box className='border border-gray-400 rounded-md p-2 bg-gray-50 w-full'>
                        <Text>{file?.shortUrl}</Text>
                    </Box>
                    <HStack>
                        <Checkbox isChecked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
                        <Text className='text-gray-500 font-bold text-lg'>Enable Password?</Text>
                    </HStack>
                    <HStack w={"full"} align={"start"}>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                isDisabled={!isChecked}
                                onChange={(e)=>setPassword(e.target.value)}
                                value={password}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick} isDisabled={!isChecked}>
                                {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button isDisabled={!isChecked} onClick={()=>{savePasswordInFirebase()}}>Save</Button>
                    </HStack>
                    <Text className='text-gray-500 font-bold text-lg'>Send File to Email</Text>
                    <Input 
                        placeholder='Enter the email of reciever' 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        value={email}

                    />
                    <Text className='text-gray-500 font-bold text-lg'>Subject</Text>
                    <Input 
                        placeholder='Enter the subject you want to send along with file' 
                        onChange={(e)=>{setSubject(e.target.value)}}
                        value={subject}

                    />
                    <Button 
                        colorScheme='blue' 
                        isLoading={isLoading}
                        onClick={()=>{sendFileViaEmail()}}
                    >
                        Send Email
                    </Button>
                </VStack>
                
            </Flex>
        </Box>

    </div>
  )
}

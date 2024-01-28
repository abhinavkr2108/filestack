"use client"
import React, { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Container, HStack, Heading, Input, InputGroup, InputRightElement, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import Image from 'next/image';
import { MdCheckCircle } from "react-icons/md";
import fileImg from "../../public/file.png"
import Link from 'next/link';


export default function FileCard({file}) {
    const [show, setShow] = React.useState(false);
    const [password, setPassword] = useState()

    const handleClick = () => setShow(!show);

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
    <Container maxW={"3xl"} m={"auto"}>
        <Card bgColor={"white"} shadow={"md"} rounded={"md"} zIndex={2} className='flex flex-col justify-center items-center gap-3'>
            <CardHeader>
                <Heading textAlign={"center"}>View File</Heading>
                <Image src={fileImg} alt="file" width={150} height={150} className='m-auto'/>
            </CardHeader>
            <CardBody>
                <Text fontSize={"lg"} fontWeight={"bold"} color={"gray.500"}>Below are the file details</Text>
                <List spacing={3} pt={2}>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='blue.500' />
                        File Name : {file.name}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='blue.500' />
                        File Type : {file.type}
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='blue.500' />
                        File Size : {file.size} Bytes
                    </ListItem>
                </List>
                {
                    file?.password && (
                        <>
                            <Text fontSize={"lg"} fontWeight={"bold"} color={"gray.500"} mt={3}>File is Password Protected</Text>
                            <HStack w={"full"} mt={3}>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                onChange={(e)=>setPassword(e.target.value)}
                                value={password}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        
                    </HStack>
                        </>
                    )
                }
            </CardBody>
            <CardFooter>
                <Link href={file.url}>
                    {
                        file.password ? (
                            <Button colorScheme='blue' isDisabled={password !== file?.password}>Download</Button>
                        ): (
                            <Button colorScheme='blue'>Download</Button>
                        )
                    }
                </Link>
            </CardFooter>
        </Card>
    </Container>
</div>
  )
}

import { Alert, AlertIcon,Text } from '@chakra-ui/react'
import React from 'react'

export default function ErrorAlert({children}) {
  return (
    <Alert status='error'>
    <AlertIcon />
    <Text fontWeight={"bold"}>
      {children}
    </Text>
  </Alert>
  )
}

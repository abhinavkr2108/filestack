import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

export default function FileAlert() {
  return (
    <div>
         <Alert status='warning'>
            <AlertIcon />
            File Size cannot be greater than 4 MB
        </Alert>
    </div>
  )
}

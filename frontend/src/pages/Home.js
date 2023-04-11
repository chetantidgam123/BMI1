import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { AuthState } from '../Context/AuthProvider'


const Home = () => {
  const navigate = useNavigate()
  const {user} = AuthState()
  const toast = useToast()
  const [loading, setloader] = useState(false)
  const [data, setData] = useState({
      height: '',
      weight: ''
  })
   const submitHandler = async () => {
        setloader(true);
        if (!data.weight || !data.height) {
            toast({
                title: "Please Fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
            setloader(false);
            return
        }

        // await login(data)
        //     .then((result) => {
        //         setloader(false)
        //         if(result.data.code==200){
        //             localStorage.setItem('token', JSON.stringify(result.data.token))
        //             toast({
        //                 title: "Login Successful",
        //                 status: "success",
        //                 duration: 2000,
        //                 isClosable: true,
        //                 position: "top-right"
        //             })
        //             navigate('/home')
        //         }else{
        //             toast({
        //                 title: result.data.message,
        //                 status: "error",
        //                 duration: 2000,
        //                 isClosable: true,
        //                 position: "top-right"
        //             }) 
        //         }
        //     })
        //     .catch((err) => {
        //         toast({
        //             title: err.message,
        //             status: "error",
        //             duration: 2000,
        //             isClosable: true,
        //             position: "top-right"
        //         }) 
        //         setloader(false)
        //     })
    }
  return (
          <VStack spacing={'5'} style={{width:'15%'}} mx={'auto'} mt={'1.5'}>
        <FormControl id='email1' isRequired>
            <FormLabel>Height</FormLabel>
            <Input placeholder='enter Your Email' value={data?.height} onChange={(e) => { setData({ ...data, height: e.target.value }) }} />
        </FormControl>
        <FormControl id='password1' isRequired>
            <FormLabel>Weight</FormLabel>
                <Input type='text' value={data?.weight} placeholder='enter Your weight' onChange={(e) => { setData({ ...data, weight: e.target.value }) }} />
        </FormControl>
        <Button colorScheme={'blue'} width="100%" mt={'1.5'} onClick={submitHandler} >
            Check
        </Button>
         </VStack>
  )
}

export default Home
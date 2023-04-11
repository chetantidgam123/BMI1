import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Table, Tbody, Td, Text, Th, Thead, Tr, useToast, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { AuthState } from '../Context/AuthProvider'
import { calculatebmi, getUserHistory, clearhistory } from '../service'
import { Spinner } from '@chakra-ui/react'

const Home = () => {
    const navigate = useNavigate()
    const { user } = AuthState()
    const toast = useToast()
    const [loading, setloader] = useState(false)
    const [loading1, setloader1] = useState(false)
    const [history, sethistory] = useState([])
    const [bmi, setBmi] = useState(0)
    const [data, setData] = useState({
        height: '',
        weight: '',
        date: new Date().toLocaleDateString()
    })
    useEffect(() => {
        setTimeout(() => {
            getUserhistory()
        }, 1000);
    }, [user])

    const getUserhistory = async () => {
        await getUserHistory()
            .then((result) => {
                if (result.data.code == 200) {
                    sethistory(result?.data?.bmiHistory)
                } else {
                    toast({
                        title: result.data.message,
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                        position: "top-right"
                    })
                }
            })
            .catch((err) => {
                toast({
                    title: err.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                })
                setloader(false)
            })
    }

    const clearHistory = async () => {
        setloader1(true);
        await clearhistory()
            .then((result) => {
                setloader1(false);
                if (result.data.code == 200) {
                    sethistory(result?.data?.bmiHistory)
                    setData({ ...data, height: '', weight: '' })
                    setBmi(0)
                } else {
                    toast({
                        title: result.data.message,
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                        position: "top-right"
                    })
                }
            })
            .catch((err) => {
                toast({
                    title: err.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                })
                setloader1(false)
            })
    }
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

        await calculatebmi(data)
            .then((result) => {
                setloader(false)
                if (result.data.code == 200) {
                    let a = Number(result.data.data.bmi).toFixed(2) || 0
                    setBmi(a)
                    sethistory(result?.data?.history.bmiHistory)
                } else {
                    toast({
                        title: result.data.message,
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                        position: "top-right"
                    })
                }
            })
            .catch((err) => {
                toast({
                    title: err.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                })
                setloader(false)
            })
    }
    return (
        <>
            <Box style={{ width: '30%' }} mx={'auto'} mt={'1.5'} display={'flex'} justifyContent={'space-between'} >
                <VStack spacing={'5'} >
                    <FormControl id='email1' isRequired>
                        <FormLabel>Height(ft)</FormLabel>
                        <Input placeholder='enter Your Height' type={'number'} value={data?.height} onChange={(e) => { setData({ ...data, height: e.target.value }) }} />
                    </FormControl>
                    <FormControl id='password1' isRequired>
                        <FormLabel>Weight(Kg)</FormLabel>
                        <Input type={'number'} value={data?.weight} placeholder='enter Your weight' onChange={(e) => { setData({ ...data, weight: e.target.value }) }} />
                    </FormControl>
                    <Button colorScheme={'blue'} width="100%" mt={'1.5'} onClick={submitHandler} >
                        Check {loading && <Spinner ml={3} />}
                    </Button>
                </VStack>
                <Box>
                    <Heading size={'md'}>Your BMI Value is {bmi}</Heading>
                </Box>
            </Box>
            <Box textAlign={'center'} my={5}>
                <Box width={'50%'} mx={'auto'} display={'flex'} justifyContent={'space-between'}>
                    <Heading size={'md'}>BMI HISTORY</Heading>
                    <Button colorScheme={'blue'} onClick={clearHistory} >Clear History {loading1 && <Spinner ml={3} />}</Button>
                </Box >
                <Table size={'sm'} variant='striped' colorScheme='teal' width={'50%'} mx={'auto'}>
                    <Thead>
                        <Tr >
                            <Th textAlign={'center'}>Sr No.</Th>
                            <Th textAlign={'center'}>Date</Th>
                            <Th textAlign={'center'}>Height (ft) </Th>
                            <Th textAlign={'center'}>Weight (Kg) </Th>
                            <Th textAlign={'center'}>BMI</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            history.map((e, i) => {
                                e.bmi = Number(e.bmi).toFixed(2)
                                return (
                                    <Tr key={i}>
                                        <Td textAlign={'center'}>{i + 1}</Td>
                                        <Td textAlign={'center'}>{e.date}</Td>
                                        <Td textAlign={'center'}>{e.height}</Td>
                                        <Td textAlign={'center'}>{e.weight}</Td>
                                        <Td textAlign={'center'}>{e.bmi}</Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </Box>
        </>
    )
}

export default Home
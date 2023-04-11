import { Box, Button, Image, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import '../CSS/navbar.css';
import { FaHome, FaPlus, FaShoppingCart, FaUser } from "react-icons/fa";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../Context/AuthProvider';
const Navbar = () => {
    const { isOpen: isLogout, onOpen: onOpenLogout, onClose: onCloseLogout } = useDisclosure()
    const { user } = AuthState()
    const navigate = useNavigate()
    const [name, setName] = useState('User')
    const cancelRef = React.useRef()
    useEffect(() => {
        setName(user?.firstname)
    }, [user])

    const logOutConfirm = () => {
        localStorage.clear()
        onCloseLogout()
        setName('')
        navigate('/login')
    }
    return (
        <>
            <Box className='navbar'>
                <Box>
                    <Button onClick={() => { navigate('/home') }}>
                        <FaHome></FaHome>
                    </Button>
                </Box>
                <Box>
                    <Menu className='menulist'>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} me={1}>
                            Hi. {name ? name : "User"}
                        </MenuButton>
                        <MenuList >
                            {name ? <MenuItem onClick={onOpenLogout}>Logout</MenuItem> : <MenuItem onClick={() => { navigate('/login') }}>Login</MenuItem>}
                        </MenuList>
                    </Menu>
                    <Button onClick={() => { navigate('/profile') }}>
                        <FaUser></FaUser>
                    </Button>
                </Box>
            </Box>

            <AlertDialog
                isOpen={isLogout}
                leastDestructiveRef={cancelRef}
                onClose={onCloseLogout}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            All In One
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You want to Logout.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseLogout}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={logOutConfirm} ml={3}>
                                Logout
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </>
    )
}

export default Navbar

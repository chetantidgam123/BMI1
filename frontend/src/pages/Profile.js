import React from 'react'
import { AuthState } from '../Context/AuthProvider'
import { Box, Text } from '@chakra-ui/react'

const Profile = () => {
    const { user } = AuthState()
    return (
        <Box>
            <Text>Name :  {user.firstname + ' ' + user.lastname}</Text>
            <Text>Email :  {user.email}</Text>
        </Box>
    )
}

export default Profile

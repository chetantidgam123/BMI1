import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Auth from './Auth'
import Home from './Home'
import Profile from './Profile'

const AllRoute = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Auth />} />
                <Route path='/home' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </div>
    )
}

export default AllRoute

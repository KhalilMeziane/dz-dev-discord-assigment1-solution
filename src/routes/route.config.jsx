import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Flex, Text } from '@chakra-ui/react'
const LoginPage = React.lazy(() => import('../pages/login'))
const DashboardPage = React.lazy(() => import('../pages/dashboard'))
const NotFound = React.lazy(() => import('../pages/notFound'))

function Loading() {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'gray.50'}
        >
            <Text fontSize={'3xl'}>Loading...</Text>
        </Flex>
    )
}

function RouteConfig () {
    return (
        <BrowserRouter basename='/'>
            <Routes>
                <Route element={<PrivateRoute/>}>
                    <Route path='/dashboard' element={
                        <Suspense fallback={<Loading/>}>
                            <DashboardPage/>
                            </Suspense>
                    } />
                </Route>
                <Route element={<PublicRoute/>}>
                    <Route path='/' element={
                        <Suspense fallback={<Loading/>}>
                            <LoginPage/>
                        </Suspense>
                    } />
                </Route>
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteConfig


function PrivateRoute() {
    const { user } = useSelector((state)=> state.user)
    if (!user?.token) {
      return <Navigate to="/" />
    }
    return <Outlet />
}

function PublicRoute() {
    const { user } = useSelector((state)=> state.user)
    if (user?.token) {
      return <Navigate to="/dashboard" />
    }
    return <Outlet />
}

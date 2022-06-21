import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const LoginPage = React.lazy(() => import('../pages/login'))
const DashboardPage = React.lazy(() => import('../pages/dashboard'))
const NotFound = React.lazy(() => import('../pages/notFound'))

function RouteConfig () {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute/>}>
                    <Route path='/dashboard' element={<DashboardPage/>} />
                </Route>
                <Route element={<PublicRoute/>}>
                    <Route path='/' element={<LoginPage/>} />
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

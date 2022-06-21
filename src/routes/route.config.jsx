import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { LoginPage, DashboardPage, NotFound } from '../pages/_index'
import { useSelector } from 'react-redux'

function RouteConfig () {
    return (
        <BrowserRouter>
            <Routes >
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

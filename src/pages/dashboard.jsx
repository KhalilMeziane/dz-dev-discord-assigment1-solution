import React, { useEffect } from 'react'
import Layout from '../components/layout'
import Table from '../components/tables/table'
import EditUserModal from '../components/modals/editUser'
import DeleteUserModal from '../components/modals/deleteUser'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../store/store'

const tableHeadColumns = [
    {
        Header: 'id',
        accessor: 'id'
    },
    {
        Header: 'name',
        accessor: 'name'
    },
    {
        Header: 'username',
        accessor: 'username'
    },
    {
        Header: 'email',
        accessor: 'email'
    },
    {
        Header: 'edit',
        accessor: 'edit',
        Cell: (props) => <EditUserModal title='Edit User' user={props.row.original}/>
    },
    {
        Header: 'delete',
        accessor: 'delete',
        Cell: (props) => <DeleteUserModal title='Delete User' user={props.row.original}/>
    }
]


export default function DashboardPage () {
    const dispatch = useDispatch()
    const { user } = useSelector((state)=> state.user)
    useEffect(()=>{
        dispatch(getData(user.token))
    }, [])
    const data = useSelector((state)=> state.data)
    console.log('data', data)
    return (
        <>
            <Layout title='Dashboard | App' bg={'gray.50'} minH='100vh'>
                {
                    <Table
                        columns={tableHeadColumns}
                        data={data}
                        title='Dashboard'
                        search='username'
                    />
                }
            </Layout>
        </>
    )
}

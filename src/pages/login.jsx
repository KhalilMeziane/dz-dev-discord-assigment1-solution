import React, { useState } from 'react'
import { Form } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { Flex, Box, Stack, Button, Heading, Text } from '@chakra-ui/react'
import Layout from '../components/layout'
import axios from  'axios'
import MyForm from '../components/forms/form'
import InputField from '../components/forms/fields/Input.field'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/store'

export default function LoginPage () {
    const [error, setError] = useState()
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const initialValues = { email: '', password: '' }
    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required')
    })
    const dispatch = useDispatch()
    const handelSubmit = async (values, actions) => {
        try {
            setLoading(true)
            const { data } = await axios.post('https://dz-dev-discord-assigment1-api.herokuapp.com/login', values)
            dispatch(setUser(data))
            setLoading(false)
            navigate('/dashboard')
        } catch (error) {
            setLoading(false)
            console.log('error response: ', error)
            setError('invalid email or password')
        }
    }

    return (
        <>
            <Layout title='Login | App'>
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    bg={'gray.50'}
                >
                    <Stack
                        spacing={8} py={12} px={6} mx={'auto'}
                        w={{ base: 'full', md: 'lg', lg: 'xl' }}
                    >
                        <Stack align={'center'}>
                            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        </Stack>
                        <Box
                            rounded={'lg'}
                            bg={'white'}
                            boxShadow={'lg'}
                            p={8}
                        >
                            <Stack spacing={2}>
                                <MyForm
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    handelSubmit={handelSubmit}
                                >
                                    {
                                        () => (
                                            <Form>
                                                {
                                                    error && <Text textAlign={'center'} textTransform={'capitalize'} py={3} px={2} color='red.400' rounded='sm' bg={'red.50'} mb='4'>{error}</Text>
                                                }
                                                <Stack spacing={2}>
                                                    <InputField name='email' label='Email address' type='email' placeholder='johnDoe@gmail.com'/>
                                                    <InputField name='password' label='Password' type='password' placeholder='*******'/>
                                                    <Stack spacing={2}>
                                                        <Button
                                                            type="submit"
                                                            bg={'blue.400'}
                                                            color={'white'}
                                                            isLoading={isLoading}
                                                            _hover={{
                                                                bg: 'blue.500'
                                                            }}
                                                        >
                                                            Login
                                                        </Button>
                                                    </Stack>
                                                </Stack>
                                            </Form>
                                        )
                                    }
                                </MyForm>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </Layout>
        </>
    )
}

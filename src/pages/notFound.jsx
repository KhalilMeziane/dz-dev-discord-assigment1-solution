import React from 'react'
import { Flex, Stack, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout'

export default function LoginPage () {
    return (
        <>
            <Layout title='NotFound | App'>
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
                            <Heading fontSize={'4xl'}>404 Page Not Found</Heading>
                            <Text textColor={'blue.500'} fontWeight={'medium'} fontSize={'lg'}><Link to='/'>Go to Home</Link></Text>
                            
                        </Stack>
                    </Stack>
                </Flex>
            </Layout>
        </>
    )
}

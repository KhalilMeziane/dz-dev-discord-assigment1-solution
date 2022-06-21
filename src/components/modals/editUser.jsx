import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, useDisclosure, ModalFooter, Stack, HStack } from '@chakra-ui/react'
import * as yup from 'yup'
import { Form } from 'formik'
import MyForm from '../forms/form'
import InputField from '../forms/fields/Input.field'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { editUser } from '../../store/store'

export default function EditUserModal ({ title, user }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setLoading] = useState(false)
    const initialValues = { email: user.email, name: user.name, username: user.username }
    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        name: yup.string().min(4, 'Name must be at least 4 characters long').required('Name is required'),
        username: yup.string().min(4, 'Username must be at least 4 characters long').required('Username is required')
    })
    const dispatch = useDispatch()
    const handelSubmit = async (values, actions) => {
        const target = { ...values, id: user.id }
        try {
            setLoading(prev => !prev)
            dispatch(editUser(target))
            onClose()
            setLoading(prev => !prev)
        } catch (error) {
            console.log('error: ', error)
        }
    }
    return (
        <>
            <Button onClick={onOpen} colorScheme={'yellow'} textColor='white'>Edit</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={'xl'}
                isCentered
                preserveScrollBarGap
                blockScrollOnMount={false}
            >
                <ModalOverlay />
                <ModalContent
                    rounded={'md'}
                    overflow='hidden'
                >
                    <ModalHeader color={'gray.900'} bg={'gray.50'}>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={'3'}>
                    <MyForm
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            handelSubmit={handelSubmit}
                        >
                                {
                                    () => (
                                        <Form>
                                            <Stack spacing={2} mb={'2'}>
                                                <InputField name='name' label='Name' type='text' placeholder='john doe'/>
                                                <InputField name='email' label='Email' type='email' placeholder='johnDoe@gmail.com'/>
                                                <InputField name='username' label='Username' type='text' placeholder='username'/>
                                                <ModalFooter px={0} py={'0'}>
                                                    <HStack spacing={2}>
                                                        <Button
                                                            type="submit"
                                                            colorScheme={'blue'}
                                                            isLoading={isLoading}
                                                            w={'28'}
                                                        >
                                                            Save
                                                        </Button>
                                                        <Button color={'gray.700'} w={'28'} onClick={onClose} variant={'outline'}>cancel</Button>
                                                </HStack>
                                                </ModalFooter>
                                            </Stack>
                                        </Form>
                                    )
                                }
                        </MyForm>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

EditUserModal.propTypes = {
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
}

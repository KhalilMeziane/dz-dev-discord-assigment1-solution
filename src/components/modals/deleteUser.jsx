import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, useDisclosure, ModalFooter, HStack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../../store/store'

export default function DeleteUserModal ({ title, user }) {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setLoading] = useState(false)
    const handelSubmit = async (values, actions) => {
        try {
            setLoading(true)
            dispatch(deleteUser(user.id))
            setLoading(false)
            onClose()
        } catch (error) {
            setLoading(false)
            console.log('error: ', error)
        }
    }
    return (
        <>
            <Button onClick={onOpen} colorScheme={'red'}>Delete</Button>
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
                    <ModalBody py={'4'}>
                        <Text>Once you delete your account, there is no going back. Please be certain.</Text>
                    </ModalBody>
                    <ModalFooter px={0} py={'2'}>
                        <HStack spacing={2}>
                            <Button
                                type="submit"
                                colorScheme={'red'}
                                isLoading={isLoading}
                                w={'28'}
                                onClick={handelSubmit}
                            >
                                Delete
                            </Button>
                            <Button color={'gray.700'} w={'28'} onClick={onClose} variant={'outline'}>cancel</Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

DeleteUserModal.propTypes = {
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
}

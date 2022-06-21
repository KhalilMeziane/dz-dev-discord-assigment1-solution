import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTable, usePagination, useFilters, useGlobalFilter } from 'react-table'
import { Box, Flex, Select, HStack, IconButton, Text } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/table'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import AddUserModal from '../modals/addUser'

export default function MyTable (props) {
    const { data, columns: cols } = props
    const columns = useMemo(() => [...cols], [cols])
    const {
        getTableProps,
        getTableBodyProps,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        headerGroups
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }
        },
        useFilters,
        useGlobalFilter,
        usePagination
    )
    return (
        <Box px={{ base: 4, md: 4, lg: 6, xl: 8 }} py={'4'} maxW={'5xl'} mx='auto'>
            <Flex justifyContent={'space-between'} alignItems={'center'} pb='4' pt={'3'}>
                <Text fontSize='2xl' color='gray.900' fontWeight='semibold'>{props.title}</Text>
                <AddUserModal title='Add User' />
            </Flex>
            <Box overflowX="auto">
                <Table rounded={'md'}  {...getTableProps()}>
                    <Thead bg='gray.50'>
                        {
                            headerGroups.map((headerGroup, key) => (
                                    <Tr key={key} {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            headerGroup.headers.map((column, index) => (
                                                <Th fontWeight={'medium'} fontSize={'xs'} color={'gray.700'} key={index} {...column.getHeaderProps()}>
                                                    {
                                                        column.render('Header')
                                                    }
                                                </Th>

                                            ))
                                        }
                                    </Tr>
                                ))
                        }
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {
                            page.map((row, index) => {
                                prepareRow(row)
                                return (
                                    <Tr key={index} {...row.getRowProps()} bg={'white'} borderBottom={'8px'} borderColor={'gray.50'} shadow={'sm'}>
                                        {
                                            row.cells.map((cell, key) => {
                                                    return (
                                                        <Td fontSize={'sm'} py={2} key={key} {...cell.getCellProps()}>
                                                            {
                                                                cell.render('Cell')
                                                            }
                                                        </Td>
                                                    )
                                                }
                                            )
                                        }
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </Box>
            <Flex justifyContent={'end'} alignContent='center'>
                <Select
                    w={'auto'}
                    bg={'white'}
                    value={state.pageSize}
                    py={'2.5'}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                        </option>
                    ))}
                </Select>
                <HStack p={'1.5'}>
                    <IconButton color={'gray.900'} size='lg' bg='white' onClick={() => previousPage()} disabled={!canPreviousPage} aria-label='previous page' icon={<IoIosArrowBack />} />
                    <IconButton color={'gray.900'} size='lg' bg='white' onClick={() => nextPage()} disabled={!canNextPage} aria-label='next page' icon={<IoIosArrowForward />} />
                </HStack>
            </Flex>
        </Box>
    )
}

MyTable.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    title: PropTypes.string
}

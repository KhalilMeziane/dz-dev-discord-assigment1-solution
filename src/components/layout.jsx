import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Box } from '@chakra-ui/react'

function Layout ({ title, children, ...props }) {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Box fontFamily={'Poppins'} {...props}>
                {children}
            </Box>
        </>
    )
}

export default Layout

Layout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

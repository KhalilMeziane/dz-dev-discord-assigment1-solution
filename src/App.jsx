import React, { Suspense } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import RouteConfig from './routes/route.config'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Font } from './theme/font'
import { Flex, Text } from '@chakra-ui/react'


const theme = extendTheme({
    fonts: {
        heading: 'Poppins',
        body: 'Poppins'
    }
})

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

function App () {
    return (
		<Suspense fallback={<Loading/>}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ChakraProvider theme={theme}>
						<Font/>
						<RouteConfig/>
					</ChakraProvider>
				</PersistGate>
			</Provider>
		</Suspense>
    )
}

export default App

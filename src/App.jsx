import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import RouteConfig from './routes/route.config'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Font } from './theme/font'

const theme = extendTheme({
    fonts: {
        heading: 'Poppins',
        body: 'Poppins'
    }
})

function App () {
    return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ChakraProvider theme={theme}>
					<Font/>
					<RouteConfig/>
				</ChakraProvider>
			</PersistGate>
		</Provider>
    )
}

export default App

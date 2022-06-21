import { configureStore, createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reduxThunk from 'redux-thunk'
import axios from 'axios'

const persistConfig = {
    key: 'root',
    storage
}

export const getData = createAsyncThunk(
    'data/getData',
    async (accessToken, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('https://dz-dev-discord-assigment1-api.herokuapp.com/data',{ headers: { Authorization: `Bearer ${accessToken}` } })
            return data
        } catch (error) {
            console.error('error.response: ', error.response)
            return rejectWithValue(error.response.message)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoading: false,
        error: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

const dataSlice = createSlice({
    name: 'data',
    initialState: [],
    reducers: {
        editUser : (state, action) => {
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return { ...action.payload }
                }
                return item
            })
        },
        addUser : (state, action) => {
            const id = state[state.length - 1].id + 1
            return [...state, {...action.payload, id}]
        },
        deleteUser : (state, action) => {
            return state.filter(item => item.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled(), (state, action) => {
            return action.payload
        })
    }
})

const persistedReducer = persistReducer(persistConfig, combineReducers({ user: userSlice.reducer, data: dataSlice.reducer }))

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [reduxThunk]
})

export const persistor = persistStore(store)
export const { setUser } = userSlice.actions
export const { editUser, addUser, deleteUser } = dataSlice.actions

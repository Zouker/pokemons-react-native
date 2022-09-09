import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, Pokemon, PokemonItem} from '../../api/api';

export const getAllPokemonsTC = createAsyncThunk<PokemonItem[] | undefined, void>('root/getAllPokemonsTC', async () => {
    try {
        const resp = await api.getAllPokemons()
        return resp.data.results
    } catch (e) {
        console.log('err', e)
    }
})

export const getCurrentPokemonTC = createAsyncThunk<Pokemon | undefined, { url: string }>('root/getCurrentPokemonTC', async (params) => {
    try {
        const resp = await api.getCurrentPokemon(params.url)
        return resp.data
    } catch (e) {
        console.log('err', e)
    }
})

export const cleanCurrentPokemonAC = createAction('root/cleanCurrentPokemonAC')

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        allPokemons: [] as PokemonItem[],
        currentPokemon: {} as Pokemon,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //thunk
            .addCase(getAllPokemonsTC.fulfilled, (state, action) => {
                state.allPokemons = action.payload ? action.payload : []
            })
            .addCase(getCurrentPokemonTC.fulfilled, (state, action) => {
                state.currentPokemon = action.payload ? action.payload : {} as Pokemon
            })
            //action
            .addCase(cleanCurrentPokemonAC, (state) => {
                state.currentPokemon = {} as Pokemon
            })
    }
})

export const root = rootSlice.reducer
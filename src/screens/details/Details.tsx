import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {DetailsPropsType} from '../types';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {cleanCurrentPokemonAC, getCurrentPokemonTC} from '../../store/Root/root';

export const Details = ({route}: DetailsPropsType) => {
        const dispatch = useAppDispatch()
        const currentPokemon = useAppSelector(state => state.root.currentPokemon)
        // const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null)
        useEffect(() => {
            //api.getCurrentPokemon(route.params.url).then((res) => {
            //      setCurrentPokemon(res.data)
            //})
            dispatch(getCurrentPokemonTC({url: route.params.url}))
            return () => {
                dispatch(cleanCurrentPokemonAC)
            }
        }, [])

        if (!Object.keys(currentPokemon).length) {
            return <View style={styles.container}><Text>LOADING...</Text></View>
        }

        return (
            <View style={styles.container}>
                {currentPokemon && <>
                    <Text style={styles.name}>{currentPokemon.name}</Text>
                    <Image style={styles.image}
                           source={{uri: currentPokemon.sprites.other['official-artwork'].front_default}}/>

                </>}
            </View>
        );
    }
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 50,
        fontFamily: 'serif',
    },
    image: {
        width: 300,
        height: 300,
    }
});
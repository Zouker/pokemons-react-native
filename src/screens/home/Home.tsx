import React, {useEffect} from 'react';
import {
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {PokemonItem} from '../../api/api';
import {useAppNavigation} from '../types';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getAllPokemonsTC} from '../../store/Root/root';

export const Home = () => {
    const navigation = useAppNavigation()
    const dispatch = useAppDispatch()
    const allPokemons = useAppSelector(state => state.root.allPokemons)
    // const [allPokemons, setAllPokemons] = useState<PokemonItem[]>([])
    useEffect(() => {
        /*api.getAllPokemons().then((res) => {
            setAllPokemons(res.data.results)
        })*/
        dispatch(getAllPokemonsTC())
    }, [])

    const renderItem: ListRenderItem<PokemonItem> = ({item}) => {
        return <View style={styles.item}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Details', {url: item.url})
            }
            }>
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={allPokemons}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
    },
    item: {
        marginVertical: 5,
        backgroundColor: '#5cb773',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#fff',
        alignItems: 'center',
    },
    name: {
        fontSize: 22,
        color: '#fff',
    }
});
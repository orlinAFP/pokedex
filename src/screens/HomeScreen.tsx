import React from 'react';
import {Image, View, Text, FlatList, ActivityIndicator} from 'react-native';
import {styles} from '../theme/appTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {FadeInImage} from '../hooks/FadeInImage';
import {PokemonCard} from '../components/PokemonCard';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {simplePokemonList, loadPokemons} = usePokemonPaginated();

  return (
    <View>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebalBG}
      />
      <View style={{alignItems: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={simplePokemonList}
          numColumns={2}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                marginTop: top + 10,
              }}>
              Pokedex
            </Text>
          }
          onEndReached={loadPokemons}
          ListFooterComponent={
            <ActivityIndicator
              size={40}
              style={{justifyContent: 'center', height: 50, marginBottom: 40}}
              color={'red'}
            />
          }
        />
      </View>
    </View>
  );
};

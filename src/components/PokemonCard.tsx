import React, {useEffect, useRef, useState} from 'react';
import ImageColors from 'react-native-image-colors';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

interface Props {
  pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('gray');

  const isMounted = useRef(true);

  const getColor = async (uri: string) => {
    let color;
    if (!isMounted.current) return;
    try {
      const result = await ImageColors.getColors(uri, {fallback: 'gray'});
      switch (result.platform) {
        case 'android':
          color = result.dominant;
          break;
        case 'ios':
          color = result.background;
          break;
        default:
          color = 'gray';
      }
      setBgColor(color!);
    } catch (error) {
      console.error('ERROR: get color');
    }
  };

  useEffect(() => {
    getColor(pokemon.picture);

    return () => {isMounted.current = false};
  }, []);

  return (
    <View>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={{...styles.container, backgroundColor: bgColor}}>
          <View>
            <Text style={styles.textCard}>{pokemon.name}</Text>
            <Text style={styles.textCard}>{'#' + pokemon.id}</Text>
          </View>
          <View style={styles.pokebolaContainer}>
            <Image
              source={require('../assets/pokebola-blanca.png')}
              style={styles.pokeball}
            />
          </View>
          <Image source={{uri: pokemon.picture}} style={styles.picture} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: windowWidth * 0.4,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textCard: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    top: 5,
  },
  pokebolaContainer: {
    height: 100,
    width: 100,
    position: 'absolute',
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },

  pokeball: {
    height: 100,
    width: 100,
    position: 'absolute',
    right: -15,
    bottom: -25,
    opacity: 0.5,
  },
  picture: {
    height: 100,
    width: 80,
    position: 'absolute',
    right: -9,
    bottom: -18,
  },
});

import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackParams} from '../navigation/Navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text} from 'react-native';
import {FadeInImage} from '../hooks/FadeInImage';
import { PokemonDetail } from '../components/PokemonDetail';

interface Props extends StackScreenProps<StackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {top} = useSafeAreaInsets();
  const {SimplePokemon, color} = route.params;
  return (
    <View style={{flex:1}}>
      <View style={{...styles.headerContainer, backgroundColor: color}}>
        <TouchableOpacity
          style={{...styles.backButton, top: top + 10}}
          activeOpacity={0.8}
          onPress={() => navigation.pop()}>
          <Icon name="arrow-back-circle-outline" size={35} color={'white'} />
        </TouchableOpacity>

        <Text style={{...styles.titulo, top: top + 50}}>
          {SimplePokemon.name + '\n'} #{SimplePokemon.id}
        </Text>

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokebola}
        />

        <FadeInImage
          uri={SimplePokemon.picture}
          style={{height: 250, width: 250, position: 'absolute', bottom: -10}}
        />
      </View>
      <PokemonDetail />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 300,
    zIndex: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  titulo: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 18,
    left: 20,
    alignSelf: 'center',
  },
  pokebola: {
    height: 250,
    width: 250,
    position: 'absolute',
    bottom: 0,
    opacity: 0.8,
  },
});

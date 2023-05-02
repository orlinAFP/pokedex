import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../apis/pokemonApi';

import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  const [isLoading, setisLoading] = useState(true);
  const uriNext = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

  const loadPokemons = async () => {
    setisLoading(true);
    const data = (
      await pokemonApi.get<PokemonPaginatedResponse>(uriNext.current)
    ).data;

    uriNext.current = data.next;
    mapSimplePokemonList(data.results);
  };

  const mapSimplePokemonList = (data: Result[]) => {
    const newPokemonList: SimplePokemon[] = data.map(({url, name}) => {
      const urlparts = url.split('/');
      const id = urlparts[urlparts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, picture, name};
    });

    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
    setisLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return{
    isLoading,
    simplePokemonList,
    loadPokemons
  }

};

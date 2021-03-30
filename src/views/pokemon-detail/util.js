import React, { useState, useEffect, useContext } from 'react';
import PokemonListContext from '../../context/PokemonListContext';

export const FunctionCatch = (data) => {
    const [pokemonList, setPokemonList] = useContext(PokemonListContext);

    console.log(pokemonList, setPokemonList)

    const func = () => {
        const rdm = Math.random();
        if (rdm >= 0.5) {
            console.log('test');
            if (!!pokemonList && pokemonList.length > 0) setPokemonList([
                ...pokemonList,
                {
                    id: pokemonList[pokemonList.length - 1].id + 1,
                    name: 'Kew',
                    pokemon: 'lala'
                }
            ]);
            else {
                setPokemonList([
                    {
                        id: 0,
                        name: 'Kew',
                        pokemon: 'lala',
                    }
                ])
            }
        }
    }

    return (
        <button onClick={() => func(data)}> Catch </button>
    )
}
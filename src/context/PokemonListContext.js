import React, { useReducer, useEffect } from "react";

const initialState = JSON.parse(localStorage.getItem("myPokemon")) || [];
const PokemonContext = React.createContext();

let reducer = (info, newInfo) => {
    if (newInfo.type === 'remove') {
        const newData = info.filter(p => p.nickname !== newInfo.data.nickname);
        return newData;
    }
    return [...info, newInfo.data];
};

function PokemonProvider(props) {
    const [poke, setPoke] = useReducer(reducer, initialState);

    useEffect(() => {
        localStorage.setItem("myPokemon", JSON.stringify(poke));
    }, [poke]);

    return (
        <PokemonContext.Provider value={{ poke, setPoke }}>
            {props.children}
        </PokemonContext.Provider>
    );
}

export { PokemonContext, PokemonProvider };
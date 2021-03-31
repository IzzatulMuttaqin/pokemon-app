import { css } from '@emotion/react';

export const container = css`
    padding-top: min(25px, 5%);
    margin-left: 5%;
    margin-right: 5%;
`;

export const skillAbilities = css`
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 15px;
    padding: 5px 7.5px;
    font-weight: bold;
    font-size: 15px;
`;

export const titleStyles = css`
    margin: auto;
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
    text-align: center; 
    font-size: 22px;
`;

export const typeStyles = css`
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 15px;
    padding: 5px 7.5px;
    font-weight: bold;
    font-size: 15px;
`;

export const pokemonName = css`
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    padding: 5px 7.5px;
    font-weight: bold;
    font-size: 15px;
    margin: auto;
    width: max(200px, 30%);
    text-align: center;
`;

export const alertWarning = css`
    position:fixed; 
    top: 70px;
    z-index:9999; 
    border-radius:0px;
    justify-content: center;
    width: 90%;           
`;

export const alertBody = css`
    width: max(300px, 50%);
    margin: auto;
`;

export const divFiller = css`
    height: 20px;
`;

export const buttonsOnTopContainer = css`
    justify-content: space-evenly;
`;

export const cursorPointer = css`
    cursor: pointer;
`;

export const buttonCatchStyle = css`
    float: right; 
    background: green;
    padding: 2px 10px;
    color: white; 
    cursor: pointer; 
    border-radius: 15px;
`;

export const skillsContainer = css`
    margin-top: 10px; display: flex; flex-wrap: wrap; 
    grid-gap: .9rem; width: 100%; 
    justify-content: center;
`;

export const pictContainer = css`
    width: 100%; justify-content: center;
`;

export const pictBg = css`
    background-color: #B9B7BD; height: 200px; width: 200px;
    border-radius: 50%; margin-right: auto; margin-left: auto
`;

export const pictStyle = css`
    width: 200px; height: 200px;
`;
import { css } from '@emotion/react';

export const container = css`
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    padding-top: min(25px, 5%);
    padding-bottom: min(25px, 5%);
`;

export const cardContainer = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 0fr));
    grid-gap: .85rem;
    justify-content: space-around;
`;

export const buttonLoadContainer = css`
    margin-top: 25px;
    margin-bottom: 20px;
`;

export const buttonLoadStyle = css`
    background-color: #ffcb05;
    width: max(10%, 100px);
    margin: auto;
    font-weight: bold;
    padding: 10px;
    border: none;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    cursor: pointer;
    border-radius: max(.5%, 5px)
`;

export const spinnerContainer = css`
    margin-top: 5px; height: 75px;
`;
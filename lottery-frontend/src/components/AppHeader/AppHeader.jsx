import React from 'react';
import styled from 'styled-components';
import logo from './logo.svg';

const Img = styled.img`
    height: 10vh;
    pointer-events: none;
`;

const Header = styled.header`
    background-color: #282c34;
    min-height: 20vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

export default function AppHeader(props){

    return(
        <div>
            <Header>
                <h1>
                    Eth Lottery! 
                </h1>
                <Img src={logo} alt='logo' />
            </Header>
        </div>
    )
}
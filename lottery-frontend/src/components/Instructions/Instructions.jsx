import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const Div1 = styled.div`

`;

const Div2 = styled.div`

`;

export default function Instructions(props) {
  return (
    <div>
        <Div>
            <Div1>Instructions: </Div1>
            <Div2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta, maxime.</Div2>
        </Div>
    </div>
  )
}

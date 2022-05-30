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
            <Div2>
              <ol>
                <li>Connect to the Rinkeby Test Network - with a wallet holding test ETH.</li>
                <li>Place a bet in wei - bet sizing between 5% and 50% of limit.</li>
                <li>Refresh the page, confirming your bet!</li>
                <li>Wait for the limit to be reached!</li>
              </ol>
            </Div2>
        </Div>
    </div>
  )
}

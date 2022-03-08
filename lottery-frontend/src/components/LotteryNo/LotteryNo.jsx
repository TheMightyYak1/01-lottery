import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default function LotteryNo(props) {
  return (
    <div>
      <Div>
        <p>Lottery Limit: </p>
        <p> {props.getLimit.toString()}</p>

      </Div>


    </div>


  )
}

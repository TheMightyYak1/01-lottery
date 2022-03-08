import React from 'react';
import styled from 'styled-components';

const Td = styled.td`
  border: 1px solid #cccccc;
  width: 25vh;
`

export default function BetData(props) {

  return (
    <tr>
        <Td>{props.betNo}</Td>
        <Td>{props.punter}</Td>
        <Td>{props.amount}</Td>
    </tr>
  )
}

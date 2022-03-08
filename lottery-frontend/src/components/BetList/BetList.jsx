import React from 'react';
import styled from 'styled-components';
import BetData from '../BetData/BetData';

const Table = styled.table`
  margin: 50px auto 50px auto;
  display: inline-block;
  font-size: 1.4rem;
`;

export default function BetList(props) {


  return (
    <Table>
      <thead>
        <tr>
          <th>Bet Number</th>
          <th>Bet Address</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {
          props.getPunters.map(({key, betNo, punter, amount}) =>
            <BetData  key={key}
                      betNo={betNo}
                      punter={punter}
                      amount={amount}/>
          )
        }
      </tbody>
    </Table>
  )
}

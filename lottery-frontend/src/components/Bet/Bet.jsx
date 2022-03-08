import { BigNumber } from 'ethers';
import React from 'react';
import styled from 'styled-components';




export default function Bet(props) {

    async function handleBet(e, val) {
        e.preventDefault();
        //props.handleBet(props.);
        //await window.ethereum.request({method:'eth_requestAccounts'}); // request account
        //const betVal = BigNumber.from(val);
        const lotteryBet = await props.lottery.lotteryBet({value: val});
        await lotteryBet.wait();
        document.getElementById('input-bet').value = '';
    }

  return (
    <div>
        <form>
            <input id= 'input-bet' type='number' placeholder='Place a bet'/>
            <button
                id='btn-bet'
                onClick={(e) => {handleBet(
                    e, 
                    document.getElementById('input-bet').value);
            }}>
            Bet
            </button>

        </form>
    </div>
  )
}

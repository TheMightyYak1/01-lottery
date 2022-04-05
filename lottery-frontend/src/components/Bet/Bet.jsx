import { BigNumber } from 'ethers';
import React, { useEffect } from 'react';
import styled from 'styled-components';

export default function Bet(props) {

    async function handleBet(e, val) {
        e.preventDefault();
        const lotteryBet = await props.lottery.lotteryBet({value: val});
        await lotteryBet.wait();
        document.getElementById('input-bet').value = '';

        //TEMPORARY SOLUTION DON'T WANT WHOLE PAGE TO RELOAD
        //window.location.reload();
    }

    //useEffect(()=> {
        
    //});

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

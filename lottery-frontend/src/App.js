import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import Instructions from './components/Instructions/Instructions';
import styled from 'styled-components';
import LotteryNo from './components/LotteryNo/LotteryNo';
import getBlockchain from './ethereum';
import BetList from './components/BetList/BetList';
import Owner from './components/Owner/Owner';
import Bet from './components/Bet/Bet';

const Div = styled.div`

`;

const Div1 = styled.div`
  display: flex;
  
  justify-content: space-around;
  flex-direction: row;
`;

function App() {
  
  const [lottery, setLottery] = useState(undefined);
  const [getLimit, setGetLimit] = useState(undefined);
  const [showOwner, setShowOwner] = useState(false);
  //const [bet, setBet] = useState(undefined);

  useEffect(() => {
    const init = async() => {
      const { lottery } = await getBlockchain();
      const getLimit = await lottery.getLimit();
      //const bet = await lottery.lotteryBet();
      // lottery contract is the lottery object
      // getLimit method is an object.
      setLottery(lottery);
      setGetLimit(getLimit);
      //setBet(bet);
    };
    init();
  }, []);

  if(
    typeof lottery === 'undefined'
    || typeof getLimit === 'undefined'
  ){
    return 'Loading...';
  };

  const handleOwner = () => {

  }


  return (
    <Div>
      <AppHeader />
      <Instructions />
      <LotteryNo
        lottery={lottery}
        getLimit={getLimit} />
      < Bet
        lottery={lottery}
      />
      <Div1>
        <BetList />
        <Owner
          lottery={lottery}
          showOwner={showOwner}
          handleOwner={handleOwner}/>
      </Div1>
    </Div>
  );
}

export default App;

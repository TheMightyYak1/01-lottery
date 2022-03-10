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
  const [getPunters, setGetPunters] = useState([]);

  //const [bet, setBet] = useState(undefined);

  async function _betTable(lottery) {
    const getPunters = await lottery.getPunters();
    const numBets = getPunters.length
    let betTable = [];
    for (let i = 0; i < numBets; i++){
      betTable.push({
        key: i,
        betNo: i,
        punter: getPunters[i].punter,
        amount: getPunters[i].amount.toNumber(),
      });
    }
    console.log(betTable);
    setGetPunters(betTable);
  }

  useEffect(() => {
    const init = async() => {
      const { lottery } = await getBlockchain();
      const getLimit = await lottery.getLimit();
      // lottery contract is the lottery object
      // getLimit method is an object.
      setLottery(lottery);
      setGetLimit(getLimit);
      // betList table variables
      _betTable(lottery);

    };
    init();
  }, []);


  if(
    typeof lottery === 'undefined'
    || typeof getLimit === 'undefined'
  ){
    return 'Loading...';
  };

  // only owner can call
  const handleOwner = (currentShowOwner) => {
    let newShowOwner;
    if (currentShowOwner === true){
      newShowOwner = false;
    } else {
      newShowOwner = true;
    }
    setShowOwner(newShowOwner);
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
        <BetList
          lottery={lottery}
          getPunters={getPunters}/>
        <Owner
          lottery={lottery}
          showOwner={showOwner}
          handleOwner={handleOwner}/>
      </Div1>
    </Div>
  );
}

export default App;

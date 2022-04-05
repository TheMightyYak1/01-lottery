import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const Div = styled.div`
display: flex;
flex-direction: column;
`
const Button = styled.button`

`

export default function Owner(props) {

  const [showOwner, setShowOwner] = useState(false);

  const handleOwner = (currentShowOwner) => {
    let newShowOwner;

      if (currentShowOwner === true){
        newShowOwner = false;
      } else {
        newShowOwner = true;
      }
      setShowOwner(newShowOwner);
  }

  
  const ownerButtonText = showOwner ? 'Owner Hide' : 'Owner Show';

  const handleOwnerView = async (e) => {
    e.preventDefault();
    const ownerAddress = await props.lottery.getOwner();

    // *** check that ownerAddress is Signer?? ***

    handleOwner(showOwner);
  }

  const useHandleUpdate = async (e) => {
    e.preventDefault();
    const newLimit = document.getElementById('input-update').value;
    const lotteryUpdate = await props.lottery.changeLimit(newLimit);
    await lotteryUpdate.wait();
    document.getElementById('input-update').value = '';
  }

  return (
    <Div>
      <Button onClick={handleOwnerView}>{ownerButtonText}</Button>
      <div>
        <p>
        </p> 
          {showOwner ?
            <>
              <input id='input-update' type='number' placeholder='Update Lottery Limit' />
              <Button onClick={useHandleUpdate}>Change Limit</Button>
            </>
            : ''
          }
      </div>
    </Div>
  )
}

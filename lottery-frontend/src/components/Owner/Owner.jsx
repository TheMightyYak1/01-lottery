import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
display: flex;
flex-direction: column;
`

const Button = styled.button`

`

export default function Owner(props) {

  const ownerButtonText = props.showOwner ? 'Owner Hide' : 'Owner Show';

  //const ownerArea = 


  const handleOwnerView = async (e) => {
    e.preventDefault();
    const ownerAddress = await props.lottery.getOwner();

    props.handleOwner(props.showOwner);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newLimit = document.getElementById('input-update').value;
    const lotteryUpdate = await props.lottery.changeLimit(newLimit);
    await lotteryUpdate.wait();
    document.getElementById('input-update').value = '';
    window.location.reload();
  }

  
  return (
    <Div>
      <Button onClick={handleOwnerView}>{ownerButtonText}</Button>
      <div>
        <p>
        </p> 
          {props.showOwner ?
            <>
              <input id='input-update' type='number' placeholder='Update Lottery Limit' />
              <Button onClick={handleUpdate}>Change Limit</Button>
            </>
            : ''
          }
      </div>
    </Div>
  )
}

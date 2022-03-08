import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
display: flex;
flex-direction: column;
`

const Button = styled.button`

`

export default function Owner(props) {

  const handleOwnerView = async (e) => {
    e.preventDefault();
    const ownerAddress = await props.lottery.getOwner();
    console.log(ownerAddress);
    props.handleOwner(props.showOwner);
  }

  const handleUpdate = (e) => {

  }

  

  return (
    <Div>
      <Button onClick={handleOwnerView}>Owner Update</Button>
      <div>
        <p></p>
        <input id='input-update' type='number' placeholder='Update Lottery Limit' />
        <Button onClick={handleUpdate}>Change Limit</Button>
      </div>
    </Div>
  )
}

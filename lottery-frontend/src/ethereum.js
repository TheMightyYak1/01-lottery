import { ethers, Contract } from 'ethers';
import Lottery from './Lottery.json';

//import detectEthereumProvider from '@metamask/detect-provider';

const getBlockchain = () =>
    new Promise(async (resolve, reject) => {
        window.addEventListener('load', async () => {
            
            if(window.ethereum) {
                const [account] = await window.ethereum.request({method:'eth_requestAccounts'});
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();     
                const lottery = new ethers.Contract (
                    Lottery.address,
                    Lottery.abi,
                    signer
                );
                console.log(Lottery.address);
                resolve({ lottery});
                return;
            };
            resolve({signerAddress: undefined, lottery: undefined});
        });     
    });

    export default getBlockchain;
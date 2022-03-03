import { ethers, Contract } from 'hardhat';
import Lottery from './Lottery.json';

const getBlockchain = () =>
    new Promise((resolve, reject) => {
        window.addEventListener('load', async () => {
            if(window.ethereum) {
                await window.ethereum.enable();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const signerAddress = await signer.getAddress();
                const lottery = new Contract (
                    Lottery.address,
                    Lottery.abi,
                    signer
                );
                resolve({signerAddress, lottery});
            };

            resolve({signerAddress: undefined, lottery: undefined});
        });     
    });

    export default getBlockchain;
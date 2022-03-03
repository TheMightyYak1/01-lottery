/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

const INFURA_URL = 'https://rinkeby.infura.io/v3/0bc9a0740a0842cdb031e8772f4dc6b9';
const PRIVATE_KEY = 'a25247ab09e9e4dfe85f1ab5be5e2c07f60ead18a619c49a24416124627779a3';

module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};

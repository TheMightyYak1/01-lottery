const { expect } = require("chai");
const { ethers } = require("hardhat");

// testing
describe("Lottery", () => {
    //define test variables
    let Lottery, lottery, owner, addr1, addr2, addr3;

    beforeEach(async () => {
        Lottery = await ethers.getContractFactory('Lottery');
        lottery = await Lottery.deploy(1000); // 1000 initial limit
        [owner, addr1, addr2, addr3, _] = await ethers.getSigners();
    });
    
    describe('Deployment', () => {
        it('Should get the right owner', async () => {
            expect(await lottery.owner()).to.equal(owner.address);
        });

        it('Should assign the initial limit per the constructor', async () => {
            expect(await lottery.getLimit()).to.equal(1000);
        });
    });
    
    describe('Betting', () => {
        it('Should deposit bets into the lottery', async () => {
            await lottery.lotteryBet({value: 100});
            const lotteryBalance = await lottery.getBalance();
            expect(lotteryBalance).to.equal(100);
            const lotBalance = await lottery.getLotBalance();
            expect(lotBalance).to.equal(100);
        });
        
        it('Should fail if the punter does not bet enough', async () => {
            await expect(lottery.lotteryBet({value: 10})).to.be.revertedWith('Insufficient bet');
        });
         
        it('Should fail if the punter bets too much', async () => {
            await expect(lottery.lotteryBet({value: 550})).to.be.revertedWith('Bet too much');
        });
        
        it('Should not run _lottery if insufficient funds have been bet', async () => {
            await lottery.lotteryBet({value: 300});
            await lottery.connect(addr1).lotteryBet({value: 300});
            await lottery.connect(addr2).lotteryBet({value: 300});

            const lotteryBalance = await lottery.getBalance();
            expect(lotteryBalance).to.equal(900);
            const lotBalance = await lottery.getLotBalance();
            expect(lotBalance).to.equal(900);
        });
        
        it('Should transfer winnings to the winner', async () => {
            await lottery.lotteryBet({value: 500});
            await lottery.connect(addr1).lotteryBet({value: 300});
            await lottery.connect(addr2).lotteryBet({value: 300});

            const lotteryBalance = await lottery.getBalance();
            expect(lotteryBalance).to.equal(0);
            const lotBalance = await lottery.getLotBalance();
            expect(lotBalance).to.equal(0);
        });
    
        it('Should have a 0 balance after each lottery', async () => {
            await lottery.lotteryBet({value: 500});
            await lottery.connect(addr1).lotteryBet({value: 300});
            await lottery.connect(addr2).lotteryBet({value: 400});

            const lotteryBalance = await lottery.getBalance();
            expect(lotteryBalance).to.equal(0);
            const lotBalance = await lottery.getLotBalance();
            expect(lotBalance).to.equal(0);
        });

        it('Should store the correct owner address', async () => {
            const ownerAddress = await lottery.getOwner();
            console.log(owner.address);
            console.log(ownerAddress);
            expect(ownerAddress).to.equal(owner.address);
        });
    });
});

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Lottery is Ownable {

    using SafeMath for uint256;

    // emit when a bet has been made
    event BetReceived(address _punter, uint256 _amount, uint256 _percentBet);

    // emits the winner of each round
    event RoundWinner (address _winner, uint256 _amountWon);

    event LimitChange (uint256 _newLimit);

    // global variables
    uint256 lotteryNo = 0;

    struct Bet {
        address punter;
        uint256 amount;
        uint256 winNo;
        // dont really need to store percentage??
    }

    struct Lot {
        uint256 limit;
        uint256 amount;
        uint256 percentFilled;
    }

    Lot main;

    // lotteryNo => bets 
    mapping(uint256 => Bet[]) public bookKeeper; //store bets
    // could maybe get rid of the mapping storage and just wipe after each lottery

    // owner sets limit of Lot main
    constructor(uint256 _initialLimit) {
        main.limit = _initialLimit;
    }

    // maximum wager 50% of pool size
    // minimum wager 5% of pool size
    // suffient balance to wager _wager < eth balance in wallet
    // remove balance from msg.sender
    // allows overbetting i.e. above limit of lottery | to prevent a bet of 1-5%
    // downside is that lottery could potentially have 149% of total value
    // checks if amount >= limit of Lot
    // if it is, execute _lottery
    // last punter cops the big gas fee

    function lottery () public payable {
        // checks
        uint256 _bet = msg.value;
        require(msg.sender != address(0), "Betting from the zero address");
        require( _bet <= (main.limit.div(2)), "Bet too much");
        require( _bet >= (main.limit.div(20)), "Insufficient bet");

        // effects

        Bet[] storage bet = bookKeeper[lotteryNo];

        // percent of lottery limit as a whole number between 5 and 50
        uint256 _percent = 100;
        uint256 _percentBet = (_percent.mul(_bet)).div(main.limit);
        
        main.amount += _bet; // adds eth funds to lottery amount
        main.percentFilled += _percentBet; //no upper limit, can potentially be 149
        // create bet
        bet.push(
            Bet(msg.sender, _bet, main.percentFilled)
        );
        emit BetReceived(msg.sender, _bet, _percentBet);

        // interactions
        // if lottery pool is sufficient
        if(main.amount >= main.limit){
            address payable _winnerAdd = payable(_lottery());

            // send contract balance to _winnerAdd
            // dont really need to protect against reentrancy as the whole contract is sent
            // not sure what to do with bool success
            (bool success, ) = _winnerAdd.call{value: address(this).balance}("");
            emit RoundWinner(_winnerAdd, main.amount);
            main.amount = 0;
            main.percentFilled = 0;
            lotteryNo ++;
        }
    }

    // internal functions
    
    // runs RNG function and chooses winner
    // emits winner
    function _lottery () internal view returns(address){
        uint256 _percentFilled = main.percentFilled;
        uint256 _winNum = _rng(_percentFilled);

        uint256 _numPunter = bookKeeper[lotteryNo].length;
        uint256 _winnerId = _findWinner(_winNum, _numPunter);

        address _winnerAdd = bookKeeper[lotteryNo][_winnerId].punter;

        return _winnerAdd;
    }

    // runs a RNG from hashes between 1 and percentFilled (100-149)
    function _rng (uint256 _percentFilled) internal view returns(uint256){
        uint256 randomNo = uint256( keccak256(abi.encodePacked(block.difficulty, block.timestamp, lotteryNo))) % _percentFilled + 1;
        return randomNo;
    }

    function _findWinner (uint256 _winNum, uint256 _numPunter) internal view returns(uint256 _winnerId){
        for (uint256 i = 0; i < _numPunter; i++){
            if (_winNum <= bookKeeper[lotteryNo][i].winNo){
                return i;
            }
        }
        // code should never reach here, issue with contract logic
        require(false, "Lottery contract logic failed");
    }

    // getters

    // returns total ETH balance of contract
    // not sure if needed 
    function getBalance () public view returns (uint256){
        return address(this).balance;
    }

    // returns balance and/or percentage of the chosen pool
    function getLotBalance () public view returns (uint256){
        return main.amount;
    }

    function getLotRemaining () public view returns (uint256){
        return ( main.limit - main.amount );
    }

    function getPoolWagers () public view returns (Bet[] memory){
        return bookKeeper[lotteryNo];
    }

    // onlyOwner functions

    // creates new betting pool size
    // checks that a pool doesn't already exist of same size
    function changeLimit (uint256 _newLimit) onlyOwner public {
        main.limit = _newLimit;
        emit LimitChange(_newLimit);
    }
}
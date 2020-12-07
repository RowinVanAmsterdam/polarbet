pragma solidity 0.5.16;

contract Dealer {
    uint dealerBalance;
    uint bet;
    uint playedGames;
    address player;
    
    constructor() public {
        dealerBalance = 10;
         player = msg.sender;
    }
    
    event PlayerWins(
        address player,
        uint profit,
        uint dealerBalance
        );
    
    mapping(address => PlayerData) public playerList;
    
    struct PlayerData {
        address playerAddress;
        uint playedGames;
    }
    
    modifier onlyPlayer() {
        require(msg.sender == player);
        _;
    }
    
    function addBet(uint _bet) public onlyPlayer {
        if (checkIfBalanceIsEnough(_bet)) {
            bet = _bet;
            dealerBalance += bet;
            playedGames += 1;
            playerList[msg.sender] = PlayerData(msg.sender, playedGames);
        }
    }
    
    
    function returnBet() public {
        dealerBalance -= bet; 
    }
    
    function returnBetWithProfit() public {
        dealerBalance -= bet * 2; 
    }
    
    function showBalance() public view returns (uint) {
        return dealerBalance; 
    }
    
    function checkIfBalanceIsEnough(uint _bet) private view returns (bool) {
        return dealerBalance >= _bet; 
    }
}


contract PolarBet is Dealer {
    uint dealerDiceResult;
    uint userDiceResult; 
    
    function getRandomNumber() private view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.coinbase, block.difficulty)))%6) + 1;
    }
    
    function rollDice() public  {
        dealerDiceResult = getRandomNumber();
        userDiceResult = 6;
    }

    function getDiceResultOfDealer() public view returns (uint) {
        return dealerDiceResult;
    }
    
    function getDiceResultOfUser() public view returns (uint) {
        return userDiceResult;
    }
    
    function winLose() public  {
        if (dealerDiceResult < userDiceResult) {
            returnBetWithProfit();
            emit PlayerWins(player, bet, dealerBalance);
        }  else {
            returnBet();
        }
        bet = 0;
    }
}
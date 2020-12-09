pragma solidity ^0.6.0;
import "github.com/provable-things/ethereum-api/provableAPI_0.6.sol";

contract Dealer is usingProvable {
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
        require(checkIfBalanceIsEnough(_bet));
            bet = _bet;
            dealerBalance += bet;
            playedGames += 1;
            playerList[msg.sender] = PlayerData(msg.sender, playedGames);
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
    bytes32 public queryId;
    
    
    constructor() public { 
        provable_setProof(proofType_Ledger); 
    }
    
    
    function __callback(bytes32  _queryId,string memory _result,bytes memory _proof ) override public {
        require(msg.sender == provable_cbAddress());
        if (provable_randomDS_proofVerify__returnCode(_queryId,_result,_proof)== 0)
            userDiceResult = uint8(uint256(keccak256(abi.encodePacked(_result)))% 5) + 1;
        else
            revert("error message");
}
    
    function getRandom(uint8 nrBytes) public payable { // not supported in remix
        queryId=provable_newRandomDSQuery(
            0,          // QUERY_EXECUTION_DELAY
            nrBytes,    // NUM_RANDOM_BYTES_REQUESTED
            200000      // GAS_FOR_CALLBACK
        );
    }
    
    function getRandomNumber() private view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.coinbase, block.difficulty)))%6) + 1;
    }
    
    function rollDice() public payable {
        dealerDiceResult = getRandomNumber();
        getRandom(1);
    }

    function getDiceResultOfDealer() public view returns (uint) {
        return dealerDiceResult;
    }
    
    function getDiceResultOfUser() public view returns (uint) {
        return userDiceResult;
    }
    
    function payOut() public  {
        if (dealerDiceResult < userDiceResult) {
            returnBetWithProfit();
            emit PlayerWins(player, bet, dealerBalance);
        }  
        resetBetAndDiceResults();
    }
    
    function resetBetAndDiceResults() private {
        dealerDiceResult = 0;
        userDiceResult = 0;
        bet = 0; 
    }
}
pragma solidity ^0.6.0;
import "./provableAPI.sol";
import "@openzeppelin/upgrades-core/contracts/Initializable.sol";

contract DealerV4 is usingProvable, Initializable {
    uint256 public dealerBalance;
    uint256 bet;
    uint256 playedGames;
    address player;

    function initialize() public initializer {
        dealerBalance = 10;
        player = msg.sender;
    }

    fallback() external payable {}

    receive() external payable {}

    event PlayerWins(address player, uint256 profit, uint256 dealerBalance);

    mapping(address => PlayerData) public playerList;

    struct PlayerData {
        address playerAddress;
        uint256 playedGames;
    }

    modifier onlyPlayer() {
        require(msg.sender == player);
        _;
    }

    function addBet(uint256 _bet) public onlyPlayer {
        require(checkIfBalanceIsEnough(_bet));
        dealerBalance += _bet;
        playedGames += 1;
        playerList[msg.sender] = PlayerData(msg.sender, playedGames);
    }

    function addBet2(uint256 _bet) public onlyPlayer {
        require(checkIfBalanceIsEnough(_bet));
        dealerBalance += _bet * 2;
    }

    function returnBetWithProfit() public {
        dealerBalance -= bet * 2;
    }

    function showBalance() public view returns (uint256) {
        return dealerBalance;
    }

    function checkIfBalanceIsEnough(uint256 _bet) private view returns (bool) {
        return dealerBalance >= _bet;
    }
}

contract PolarBetV4 is DealerV4 {
    uint256 public dealerDiceResult;
    uint256 public userDiceResult;
    bytes32 public queryId;
    bytes public getRandomResult;


    // constructor() public {
    //     provable_setProof(proofType_Ledger);
    // }

    function initialize2() public initializer {
        provable_setProof(proofType_Ledger);
    }


        function __callback(bytes32  _queryId,string memory _result,bytes memory _proof ) override public {
        require(msg.sender == provable_cbAddress());
        if (provable_randomDS_proofVerify__returnCode(_queryId,_result,_proof)== 0)
            getRandomResult = bytes(_result);
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
        return
            uint8(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            block.timestamp,
                            block.coinbase,
                            block.difficulty
                        )
                    )
                ) % 6
            ) + 1;
    }

    function rollDice() public payable {
        dealerDiceResult = getRandomNumber();
        getRandom(1);
    }

    function getDiceResultOfDealer() public view returns (uint256) {
        return dealerDiceResult;
    }

    function getDiceResultOfUser() public payable {
        userDiceResult = uint8(uint256(keccak256(abi.encodePacked(getRandomResult)))% 5) + 1;
    }

    function payOut() public {
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
        queryId = "";
    }
}

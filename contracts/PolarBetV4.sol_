pragma solidity ^0.6.0;
import "./provableAPI.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract DealerV4 is  usingProvable, AccessControlUpgradeable {
    uint256 public dealerBalance;
    uint256 bet;
    uint256 playedGames;
    address player;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    function initialize(address admin) public initializer {
        dealerBalance = 10;
        player = msg.sender;
        _setupRole(ADMIN_ROLE, admin);
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
    uint256 dealerDiceResult;
    uint256 userDiceResult;
    bytes32 public queryId;

    // constructor() public {
    //     provable_setProof(proofType_Ledger);
    // }

    function initialize2() public initializer {
        provable_setProof(proofType_Ledger);
    }

    function __callback(
        bytes32 _queryId,
        string memory _result,
        bytes memory _proof
    ) public override {
        require(msg.sender == provable_cbAddress());
        if (
            provable_randomDS_proofVerify__returnCode(
                _queryId,
                _result,
                _proof
            ) == 0
        )
            userDiceResult =
                uint8(uint256(keccak256(abi.encodePacked(_result))) % 5) +
                1;
        else revert("error message");
    }

    function getRandom(uint8 nrBytes) public payable {
        // not supported in remix
        queryId = provable_newRandomDSQuery(
            0, // QUERY_EXECUTION_DELAY
            nrBytes, // NUM_RANDOM_BYTES_REQUESTED
            200000 // GAS_FOR_CALLBACK
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

    function getDiceResultOfUser() public view returns (uint256) {
        return userDiceResult;
    }

    function payOut() public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
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

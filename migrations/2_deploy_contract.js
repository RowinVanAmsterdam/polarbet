// var PolarBet = artifacts.require("PolarBet");

// module.exports = function(deployer) {
//     deployer.deploy(PolarBet);
//     // Additional contracts can be deployed here
// };

const { deployProxy } = require('@openzeppelin/truffle-upgrades');

var PolarBet = artifacts.require("PolarBet");

module.exports = async function (deployer) {
    const PolarBetContract = await deployProxy(PolarBet, [], { deployer, unsafeAllowCustomTypes: true  });
    console.log(`Address of PolarBetContract: ${PolarBetContract.address}`)
    console.log("Doing some tests with the just deployed contract");
    var bnx = await PolarBetContract.dealerBalance() // note dealerBalance should be 10 by default
    console.log(`Initialized with nothing, dealerBalance is by default and currently ${bnx.toString()}`)
    await PolarBetContract.addBet(2)
    var bnx = await PolarBetContract.dealerBalance() // note dealerBalance should be increased with X
    console.log(`Called function addBet(2), dealerBalance is now ${bnx.toString()}`)
};

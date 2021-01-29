const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
var PolarBet = artifacts.require("PolarBet");
var PolarBetV2 = artifacts.require("PolarBetV2");
var PolarBetV3 = artifacts.require("PolarBetV3");
var PolarBetV4 = artifacts.require("PolarBetV4");
var PolarBetV5 = artifacts.require("PolarBetV5");


module.exports = async function(deployer) {    
    const PolarBetContract=await PolarBet.deployed()
    const PolarBetV2Contract=await upgradeProxy(PolarBetContract.address, PolarBetV2, { deployer, unsafeAllowCustomTypes: true });
    const PolarBetV3Contract=await upgradeProxy(PolarBetContract.address, PolarBetV3, { deployer, unsafeAllowCustomTypes: true });
    const PolarBetV4Contract=await upgradeProxy(PolarBetContract.address, PolarBetV4, { deployer, unsafeAllowCustomTypes: true });
    const PolarBetV5Contract=await upgradeProxy(PolarBetContract.address, PolarBetV5, { deployer, unsafeAllowCustomTypes: true });

    console.log(`Address of PolarBetContract: ${PolarBetContract.address}`)
    console.log(`Address of PolarBetV2Contract: ${PolarBetV2Contract.address}`)
    console.log(`Address of PolarBetV3Contract: ${PolarBetV3Contract.address}`)
    console.log(`Address of PolarBetV4Contract: ${PolarBetV4Contract.address}`)
    console.log(`Address of PolarBetV5Contract: ${PolarBetV5Contract.address}`)

    console.log("Doing some tests with the just upgraded contract");
    await PolarBetV2Contract.addBet(3)
    var bnx=await PolarBetV2Contract.dealerBalance() // note dealerBalance should be increased with 3
    console.log(`Called function addBet(3), dealerBalance is now ${bnx.toString()}`)
    await PolarBetV2Contract.addBet2(3)
    var bnx=await PolarBetV2Contract.dealerBalance() // note dealerBalance should be increased with 6
    console.log(`Called function addBet2(3), dealerBalance is now ${bnx.toString()}`)
}
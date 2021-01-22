const truffleAssert = require('truffle-assertions');
const PolarBetContract = artifacts.require('PolarBetV4')

beforeEach('should setup the contract instance', async () => {
    PolarBet = await PolarBetContract.deployed();
});

contract('dealerBalance', async () => {
    it('should return 21 as start balance', async () => {
        const result = await PolarBet.dealerBalance();

        assert.equal(result, 21);
    })
})

contract('addBet', async (accounts) => {
    it('should increase the dealer balance with 2', async () => {
        await PolarBet.addBet(2);
        const result = await PolarBet.dealerBalance();

        assert.equal(result, 23);
    })

    it('should fail if the bet is higher than the dealer balance', async () => {
        await truffleAssert.reverts(PolarBet.addBet(200));

    })

    it('should execute only by the player', async () => {
        await PolarBet.addBet(2, {'from': accounts[0]});
        const result = await PolarBet.dealerBalance();

        assert.equal(result, 25);
    })

    it('should fail if it is executed by someone else than the player', async () => {
        await truffleAssert.reverts(PolarBet.addBet(2, {'from': accounts[1]}));
    })
})

contract('getDiceResultofDealer', async () => {
    it('should return 0 as default if function is called', async () => {
        const result = await PolarBet.getDiceResultOfDealer();

        assert.equal(result, 0);
    })
})
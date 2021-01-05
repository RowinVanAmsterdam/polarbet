const getCurrentAccount = async () => {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}

export const RollDice = async () => {
    const account = await getCurrentAccount();
  await window.contract.methods.rollDice().send( { from: account });
  console.log("Roll dice is called")
};

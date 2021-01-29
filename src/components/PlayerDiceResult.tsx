const getCurrentAccount = async () => {
  const accounts = await window.web3.eth.getAccounts();
  return accounts[0];
};

export const UserDiceResult = async () => {
  const finalResult = await window.contract.methods.userDiceResult().call();
  console.log("Result of userDiceResult().call()", finalResult);
  return finalResult;
};

export const SetUserDiceResult = async () => {
  const account = await getCurrentAccount();
  await window.contract.methods.getDiceResultOfUser().send({ from: account });
}
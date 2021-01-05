const getCurrentAccount = async () => {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}

export const PayOut = async () => {
    const account = await getCurrentAccount();
    const id = await window.contract.methods.payOut().send({ from: account });
    return id;
  };
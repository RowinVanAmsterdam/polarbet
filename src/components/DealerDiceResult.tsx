export const DealerDiceResult = async () => {
    const result = await window.contract.methods.getDiceResultOfDealer().call();
    return result;
  };
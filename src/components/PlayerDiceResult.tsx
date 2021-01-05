export const PlayerDiceResult = async () => {
    const result = await window.contract.methods.getDiceResultOfUser().call();
    return result;
  };
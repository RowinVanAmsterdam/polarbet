export const RandomResult = async () => {
    const result = await window.contract.methods.getRandomResult().call();
    console.log("Random result from oracle:", result);
    return result;
  };
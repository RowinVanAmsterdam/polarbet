export const UserDiceResult = async () => {
    const result = await window.contract.methods.userDiceResult().call();
    console.log("Result of userDiceResult().call()", result)
    return result;
  };
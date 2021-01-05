export const DealerBalance = async () => {
    const getBalance = await window.contract.methods.dealerBalance().call();
    return getBalance;
};
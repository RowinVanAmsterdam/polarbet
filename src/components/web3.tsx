import Web3 from "web3";
import contract from "../assets/static/build/contracts/PolarBetV2.json";
const contractAddress = "0x0435F38A77843FA5B48BD49d96CB5aa5599DeCAF"; // Rinkeby
// const contractAddress = "0x38FeAe295414d5f072F172c4D604c200739b0021"; // Ganache

const contractABI = () => {
  const abi = contract.abi;
  return abi; 
}

const startWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  } else {
    window.alert("Metamask not detected!");
  }
};

const loadContract = async () => {
  return await new window.web3.eth.Contract(contractABI(), contractAddress);
};

export const LoadWeb3 = async () => {
  await startWeb3();
  window.contract = await loadContract();
};
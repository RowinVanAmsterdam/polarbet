import Web3 from "web3";
// import contractABI from "../assets/static/json/contractABI.json";
// const contractAddress = "0x3Ff7a5a4262e1E018BEaBF657D94fEc22fCEc817";
import contract from "../assets/static/build/contracts/PolarBetV2.json";
const contractAddress = "0x0435F38A77843FA5B48BD49d96CB5aa5599DeCAF";

const contractABI = () => {
  const abi = contract.abi;
  return abi; 
}

const startWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    console.log("if state");
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
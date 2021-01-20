import Web3 from "web3";
import contract from "../assets/static/build/contracts/PolarBetV4.json";
const contractAddress = "0xb7F2C729AbD352dBaaC0b5930da84129e6c71cc0"; // Rinkeby
// const contractAddress = "0x0EEe5BCa52BAd4e2442Eb926889D4ED8b9dC6FA5"; // Ganache

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
import Web3 from "web3";
import contractABI from "../assets/static/json/contractABI.json";
const contractAddress = "0x3Ff7a5a4262e1E018BEaBF657D94fEc22fCEc817";

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
  return await new window.web3.eth.Contract(contractABI, contractAddress);
};

export const LoadWeb3 = async () => {
  await startWeb3();
  window.contract = await loadContract();
};
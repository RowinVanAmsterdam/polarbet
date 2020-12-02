import Web3 from "web3";
import contractABI from "../assets/static/json/contractABI.json";
const contractAddress = "0x78d412d8e50211076003D308925E7D8B8a22cD53";

const LoadWeb3 = async () => {
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

export const load = async () => {
  await LoadWeb3();
  window.contract = await loadContract();
};

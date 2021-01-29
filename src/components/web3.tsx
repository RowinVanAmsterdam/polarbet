import Web3 from "web3";
import contract from "../assets/static/build/contracts/PolarBetV4.json";
// const contractAddress = "polarbet.eth"; // ENS Rinkeby
// const contractAddress = "0xc980207f705242bEAb7C9401F841bDd9749dDb2b"; // Rinkeby address connected to ENS
const contractAddress = "0x58D4b2E06fDE2B386706584EF2f3058D5eBaD592"; // Rinkeby
// const contractAddress = "0x3C21f4A120b1FEd1b9F5Fc6c076c2E40124a3d8B"; // Ganache
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

export const LoadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: "eth_requestAccounts" });
    loadContract();
  } else {
    window.alert("Metamask not detected!");
  }
};

const contractABI = () => {
  const abi = contract.abi;
  return abi;
};

const loadContract = async () => {
  try {
    // const address = await web3.eth.ens.getAddress(contractAddress);
    // console.log("Contract address from ENS:", address);
    const result = await new web3.eth.Contract(contractABI() as any, contractAddress);
    window.contract = result;
  } catch (e) {
    console.log(e);
  }
};

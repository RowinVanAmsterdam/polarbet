import Web3 from "web3";
import contract from "../assets/static/build/contracts/PolarBetV4.json";
// const contractAddress = "polarbet.eth"; // ENS Rinkeby
// const contractAddress = "0xc980207f705242bEAb7C9401F841bDd9749dDb2b"; // Rinkeby
// const contractAddress = "0x3C21f4A120b1FEd1b9F5Fc6c076c2E40124a3d8B"; // Ganache
// let web3 = new Web3(Web3.givenProvider);

const contractABI = () => {
  const abi = contract.abi;
  return abi;
};

const startWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
     window.ethereum.enable();
  } else {
    window.alert("Metamask not detected!");
  }
};

const loadContract = async () => {
  try {
    // const address = await web3.eth.ens.getAddress("polarbet.eth");
    // console.log(address);
    const result = await new window.web3.eth.Contract(contractABI(), "0xc980207f705242bEAb7C9401F841bDd9749dDb2b");

    return result;
  } catch (e) {
    console.log(e);
  }
};



export const LoadWeb3 = async () => {
  await startWeb3();
  window.contract = await loadContract();
};

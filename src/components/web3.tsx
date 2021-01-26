import Web3 from "web3";
import contract from "../assets/static/build/contracts/PolarBetV4.json";
// const contractAddress = "polarbet.eth"; // ENS Rinkeby
// const contractAddress = "0xc980207f705242bEAb7C9401F841bDd9749dDb2b"; // Rinkeby
// const contractAddress = "0x3C21f4A120b1FEd1b9F5Fc6c076c2E40124a3d8B"; // Ganache
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

export const LoadWeb3 = async () => {
  if (window.ethereum) {
    window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("web3 is loaded");
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
    console.log("loadContract is called");

    const getAddress = await web3.eth.ens
      .getAddress("polarbet.eth")
      .then(function (address) {
        console.log("Address from ENS:" + address);
        return address;
      });

    console.log("Result from getAddress:");
    console.log(getAddress);

    const result = await new web3.eth.Contract(
      contractABI() as any,
      getAddress
    );
    window.contract = await result;
  } catch (e) {
    console.log(e);
  }
};

// export const LoadWeb3 = async () => {
//   const web3 = new Web3(Web3.givenProvider);
//   const [PolarBetContract, setPolarBetContract] = useState<any>();
// const [chainId, setChainId] = useState(0);
// const [networkId, setNetworkId] = useState(0);
// const [account, setAccount] = useState("");

// const contractABI = () => {
//   const abi = contract.abi;
//   return abi;
// };

// useEffect(() => {
//   const fetchWeb3Data = async () => {
//     const address = await web3.eth.ens.getAddress("polarbet.eth");
//     setPolarBetContract(new web3.eth.Contract(contractABI() as any, address));
//     await web3.eth.requestAccounts();
//     // await newChain();
//     // await newActs();
//   };
//   fetchWeb3Data();
// }, []);

// const newChain = async () => {
//   var chainId = await web3.eth.getChainId();
//   var networkId = await web3.eth.net.getId();
//   setChainId(chainId);
//   setNetworkId(networkId);
// };

// const newActs = async () => {
//   var acts = await web3.eth.getAccounts();
//   setAccount(acts[0]);
// };

// window.contract = await PolarBetContract;
// };


// Chain list
const NetworkID = {
  1: "MAINNET",
  3: "ROPSTEN",
  4: "RINKEBY",
  5: "GOERLI",
  42: "KOVAN",
  56: "BSC",
  97: "BSC_TESTNET",
  128: "HECO",
  256: "HECO_TESTNET",
  250: "OPERA",
  10: "OPTIMISTIC_ETHEREUM",
  69: "OPTIMISTIC_KOVAN",
  137: "POLYGON",
  1337: "GANACHE",
  80001: "POLYGON_MUMBAI",
  42161: "ARBITRUM_ONE",
}

// Contract address
const SCaddress = "0x1F81136889df4eBf3103f538ff846844FB652FaC";

// Contract ABI
const ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_contractAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_cooperant",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_kilograms",
        "type": "uint256"
      }
    ],
    "name": "depositFruits",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "makeTransfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_member",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "membershipStatus",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "coopTokenContractAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_kg",
        "type": "uint256"
      }
    ],
    "name": "depositFruitsToCOOP",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fundCoop",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_salje",
        "type": "address"
      }
    ],
    "name": "getUserAccountBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]



const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const coopContract = new web3.eth.Contract(ABI, SCaddress);
coopContract.setProvider(web3.givenProvider);


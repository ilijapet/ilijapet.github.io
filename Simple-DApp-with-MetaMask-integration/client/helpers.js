const { ethers } = require("ethers");

const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "addName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "returnName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contractAddress = "0xF9d10B6275A6881D470dcd69926B12B6F58eb997";

// Here we are getting Ethereum provider. Node through which we can speak to Ethereum blockchain
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Here we get signer. Signer has access to a private key, which can sign messages and transactions to authorize the network
// to charge your account ether to perform operations (transaction).
const signer = provider.getSigner();

// Here we boundle all that together in new contract obj. What means here we have address, ABI (artefact of compilation
// process with description of deployed smart contract interface) and signer we just get which will help us to signe new
// transaction and to pay fee if we make chnage in blockchaine state
const contract = new ethers.Contract(contractAddress, abi, signer);

module.exports = { contract };

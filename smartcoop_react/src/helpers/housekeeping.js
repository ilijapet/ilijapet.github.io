import Web3 from "web3";

import contract from "../contracts/SmartCOOP.json";

const raspberryPrice = 9;
const tokenAddress = "0x76932e71f17451e7760ffb9b02d991d73355024C";
const tokenSymbol = "COOP";
const tokenDecimals = 18;
const tokenImage =
  "https://ilijapet.github.io/photos/noun_raspberry_4132882_mala.svg";

// Contract address
const SCaddress = "0x614e8821C0Dc17F16Fdc89C237d5fBd037A041e1";

// Contracts abi
const ABI = contract.abi;

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const coopContract = new web3.eth.Contract(ABI, SCaddress);

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
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// Helper promise
function MakeQuerablePromise(promise) {
  // Don't modify any promise that has been already modified.
  if (promise.isFulfilled) return promise;

  // Set initial state
  var isPending = true;
  var isRejected = false;
  var isFulfilled = false;

  // Observe the promise, saving the fulfillment in a closure scope.
  var result = promise.then(
    function (v) {
      isFulfilled = true;
      isPending = false;
      return v;
    },
    function (e) {
      isRejected = true;
      isPending = false;
      throw e;
    }
  );

  result.isFulfilled = function () {
    return isFulfilled;
  };
  result.isPending = function () {
    return isPending;
  };
  result.isRejected = function () {
    return isRejected;
  };
  return result;
}

const progressButton = async (parOne, parTwo) => {
  var myTrans = MakeQuerablePromise(parOne);
  let x = 10;
  while (myTrans.isFulfilled() === false && x <= 100) {
    myTrans = MakeQuerablePromise(parOne);
    parTwo(x.toString() + "%");
    await sleep(1000);
    x += 5;
  }
  parTwo("100%");
};

export {
  NetworkID,
  coopContract,
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
  sleep,
  MakeQuerablePromise,
  progressButton,
};

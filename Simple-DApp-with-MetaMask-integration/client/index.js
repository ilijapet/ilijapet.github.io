import { contract } from "./helpers";

// Picking up elements from HTML
const connect = document.getElementById("connectBtn");
const read = document.getElementById("readBtn");
const update = document.getElementById("updateBtn");
const updateName = document.getElementById("inputName");
const readName = document.getElementById("readName");
const returnValue = document.getElementById("returnValue");

// Over ethereum object inside window object check on every load if Meta Mask is instaled. If now alert user to install Meta Mask
function init() {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    alert("Please install Meta Mask");
  }
}

// Connect button for Meta Mask
connect.onclick = async () => {
  try {
    await ethereum.request({ method: "eth_requestAccounts" });
    connect.innerHTML = "Connected";
  } catch (error) {
    console.log("Could not get a wallet connection", error);
  }
};

// Button whihc pick up input name we give and pass as argument to addName function from our smart contract. Take a look on syntaxt contrac.function(argument) Basically we create this contract with ethers.js Contract object that boundle our 1) smart contract address 2) ABI 3) Meta Mask signer
update.onclick = async () => {
  let newName = updateName.value;
  await contract.addName(newName);
  inputName.value = "";
  console.log("You just add new name");
};

// Here we are picking im desired index from our front end input and passing as argument to smart contract returnName function. Ones we get this value form blockchaine we can display to user name
read.onclick = async () => {
  let readNameRes = readName.value;
  let name = await contract.returnName(readNameRes);
  returnValue.textContent = name;
  readName.value = "";
};

window.addEventListener("load", () => {
  init();
});

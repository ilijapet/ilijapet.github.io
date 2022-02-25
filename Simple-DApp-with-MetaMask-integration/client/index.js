const { ethers } = require("ethers");
const { contract } = require("./helpers");

function init() {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    alert("Please install Meta Mask");
  }
}

const connect = async () => {
  try {
    await ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("connectBtn").innerHTML = "Connected";
  } catch (error) {
    console.log("Could not get a wallet connection", error);
  }
};

const update = async () => {
  let newName = document.getElementById("inputName").value;
  console.log(newName);
  await contract.addName(newName);
  document.getElementById("inputName").value = "";
  console.log("You just add new name");
};

const read = async () => {
  let readNameRes = document.getElementById("readName").value;
  console.log(readNameRes);
  let name = await contract.returnName(readNameRes);
  console.log(name);
  document.getElementById("returnValue").textContent = name;
  document.getElementById("readName").value = "";
};

window.addEventListener("load", () => {
  init();
});

module.exports = { connect, update, read };

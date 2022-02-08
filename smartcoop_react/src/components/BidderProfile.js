import { useState, useEffect } from "react";

import {
  NetworkID,
  coopContract,
  MakeQuerablePromise,
  sleep,
  progressButton,
} from "../helpers/housekeeping";
import { useEthers } from "@usedapp/core";

/**
 * This function is responsible for displaying the bidder dashboard.
 * It displays the current connected account and network, the total payed in USD, the total bought from SmartCOOP and optition to buy frutis from SmartCOOP.
 * @returns None
 */
const Bidder = () => {
  const [confirmation, setConfirmation] = useState("Buy raspberry");
  const [inputData, setInputData] = useState("");
  const [newWidth, setNewWidth] = useState("0%");
  const [account, setAccount] = useState();
  const [bidderBalance, setBidderBalance] = useState();
  const [bidderPayed, setBidderPayed] = useState();

  const { ethereum } = window;
  const { chainId } = useEthers();
  const raspberryPrice = 9;

  const getAccount = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const accountOne = accounts[0];
    setAccount(accountOne);
  };

  const getBidderBalance = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const bidderAccountBalance = await coopContract.methods
      .getBidderAccountBalance(accounts[0])
      .call();
    setBidderBalance(bidderAccountBalance[1]);
    setBidderPayed(bidderAccountBalance[0]);
  };

  // Buy your raspberry
  const buyRaspberry = async (props) => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    let inUSD = props * raspberryPrice;
    var inWei = await coopContract.methods.ethUSD(inUSD).call();
    var inWeiString = String(inWei);
    var done = coopContract.methods
      .bid(props)
      .send(
        { from: account, value: inWeiString, gas: 10000000 },
        async function (error, transactionHash) {
          if (error) {
            console.log(error);
          } else {
            await progressButton(done, setNewWidth);
            setInputData("");
            setNewWidth("0%");
            setConfirmation("Successful trade");
            await sleep(3000);
            setConfirmation("Buy raspberry");
          }
        }
      );
  };

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    getBidderBalance();
  });

  return (
    <>
      <section className="container">
        <p style={{ fontSize: 20 }}> Bidders dashboard </p>
        <p> Currently connected to {NetworkID[chainId]} network </p>
        {<p> Connected account: {account}</p>}
        <p> Total payed in USD: {bidderPayed}</p>
        <p> Total bought from SmartCOOP {bidderBalance} </p>
        <div className="trade">
          <label htmlFor="bought_kilograms" id="bought_label">
            I want to buy
          </label>
          <input
            type="number"
            id="bought_kilograms"
            name="bought_kilograms"
            placeholder="kg"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <button
            type="submit"
            id="buy_raspberry"
            onClick={() => buyRaspberry(inputData)}
          >
            <div
              className="button__progress_buy_raspberry"
              style={{ width: newWidth }}
            ></div>
            {confirmation}
          </button>
        </div>
      </section>
    </>
  );
};

export default Bidder;

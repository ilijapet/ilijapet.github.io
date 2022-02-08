import React, { useState, useEffect } from "react";

import Connect from "./Connect";
import Disconnect from "./Disconnect";
import Admin from "./AdminProfile";
import Cooperant from "./CooperantProfile";
import Bidder from "./BidderProfile";

/**
 * This function is the entry point of the DApp. It renders the Connect component if the user is not
 * connected to the DApp. Otherwise, it renders the Disconnect component. Also this function redner user, bidder or administraor profile based on eth address connected.
 * @returns The component that is being returned is the entry point of the application.
 */
const EntryPoint = () => {
  const [OnOFF, setOnOFF] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cooperant, setCooperant] = useState(false);
  const [bidder, setBidder] = useState(false);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];

    if (accounts.length !== 0) {
      console.log("Found an authorized account: ", account);
    } else {
      console.log("No authorized account found");
    }

    if (ethereum.chainId !== "0x2a") {
      alert(
        "If you would like to use this DApp please set your network   in MetaMask to KOVAN network"
      );
    }
  };
  const funSetOnOFF = (props) => {
    setOnOFF(props);
  };

  const funSetCooperant = (props) => {
    setCooperant(props);
  };

  const funSetAdmin = (props) => {
    setAdmin(props);
  };

  const funSetBidder = (props) => {
    setBidder(props);
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <>
      <div>
        {OnOFF ? (
          <Disconnect funSetOnOFF={funSetOnOFF} OnOFF={OnOFF} />
        ) : (
          <Connect
            funSetOnOFF={funSetOnOFF}
            OnOFF={OnOFF}
            funSetCooperant={funSetCooperant}
            cooperant={cooperant}
            funSetAdmin={funSetAdmin}
            admin={admin}
            funSetBidder={funSetBidder}
            bidder={bidder}
          />
        )}
        {admin && <Admin />}
        {cooperant && <Cooperant />}
        {bidder && <Bidder />}
      </div>
    </>
  );
};

export default EntryPoint;

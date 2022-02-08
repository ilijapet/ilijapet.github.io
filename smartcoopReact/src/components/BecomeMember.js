import React, { useState } from "react";
import {
  coopContract,
  sleep,
  MakeQuerablePromise,
} from "../helpers/housekeeping";

/**
 * It creates a button that will provide user option to become a SmartCOOP member.
 * @returns A button with a progress bar.
 */
const BecomeMember = () => {
  const [messageButton, setMessageButton] = useState(
    "Become a SmartCOOP member"
  );
  const [newWidth, setNewWidth] = useState("0%");

  const becomeCoopMember = async () => {
    const { ethereum } = window;

    var account = ethereum.selectedAddress;

    if (account !== undefined && account !== null) {
      let cooperants = await coopContract.methods
        .getUserAccountBalance(account)
        .call();

      if (cooperants[0] === "0") {
        var trans = coopContract.methods
          .becomeCoopMember()
          .send({ from: account, value: "10000" }, async function (
            error,
            transactionHash
          ) {
            if (error) {
              console.log(error);
            } else {
              await progressButton(trans);
              setMessageButton("You are now SmartCOOP member");
            }
          });
      } else {
        setMessageButton("You are already member");
      }
    } else {
      setMessageButton("Please connect your wallet");
      await sleep(5000);
      setMessageButton("Become a SmartCOOP member");
    }
  };

  const progressButton = async (props) => {
    var myTrans = MakeQuerablePromise(props);
    let x = 10;
    while (myTrans.isFulfilled() === false) {
      myTrans = MakeQuerablePromise(props);
      setNewWidth(x.toString() + "%");
      await sleep(1000);
      x += 5;
    }
    setNewWidth("100%");
  };

  return (
    <>
      <button className="button__progress" onClick={becomeCoopMember}>
        <div
          className="button__progress_become_member"
          style={{ width: newWidth }}
        ></div>
        {messageButton}
      </button>
    </>
  );
};

export default BecomeMember;

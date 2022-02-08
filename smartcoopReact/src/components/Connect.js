import { coopContract } from "../helpers/housekeeping";

/**
 * It connects the wallet to the DApp.
 * @returns A button that will connect the wallet to the dapp.
 */
const Connect = ({
  funSetOnOFF,
  OnOFF,
  funSetCooperant,
  cooperant,
  funSetAdmin,
  admin,
  funSetBidder,
  bidder,
}) => {
  const selection = async (props) => {
    let user_balance = await coopContract.methods
      .getUserAccountBalance(props)
      .call();
    if (user_balance[0] !== "0") {
      funSetCooperant(!cooperant);
    } else if (props === "0x273f4fca831a7e154f8f979e1b06f4491eb508b6") {
      funSetAdmin(!admin);
    } else {
      funSetBidder(!bidder);
    }
  };

  const connectWallet = async () => {
    const { ethereum } = window;

    try {
      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", account[0]);
      selection(account[0]);
      funSetOnOFF(!OnOFF);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <button id="btn-connect" onClick={connectWallet}>
          Connect wallet
        </button>
      </div>
    </div>
  );
};

export default Connect;

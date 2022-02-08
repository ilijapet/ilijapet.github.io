import React from "react";

/**
 * It disconnects the wallet.
 * @returns A button that when clicked, will reload the page and disconnect wallet.
 */
const Disconnect = ({ funSetOnOFF, OnOFF }) => {
  const disconnectWallet = () => {
    window.location.reload();
    funSetOnOFF(!OnOFF);
  };

  return (
    <div>
      <button id="btn-disconnect" onClick={disconnectWallet}>
        Discconect wallet
      </button>
    </div>
  );
};

export default Disconnect;

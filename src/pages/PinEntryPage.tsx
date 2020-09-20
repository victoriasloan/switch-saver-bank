import React from "react";
import PinEntry from "../components/PinEntry";
import SwitchSaverBankImgLarge from "../assets/SwitchSaverBankImgLarge.svg";

const PinEntryPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <img src={SwitchSaverBankImgLarge} className="pb-12" />
        <PinEntry />
      </div>
      {/* {current.matches("pinError") && <div>You made a mistake</div>} */}
    </div>
  );
};

export default PinEntryPage;

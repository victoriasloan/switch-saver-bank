import React, { useContext } from "react";
import { MachineContext } from "../state/AtmStateMachine";
import AlertMessage from "../components/AlertMessage";
import PinEntry from "../components/PinEntry";
import SwitchSaverBankImgLarge from "../assets/SwitchSaverBankImgLarge.svg";

const PinEntryPage = () => {
  const [current] = useContext(MachineContext);

  return (
    <div>
      <div className="flex items-center justify-center pt-48 card-height">
        <div>
          <img src={SwitchSaverBankImgLarge} className="pb-12 pt-12" />
          <PinEntry />
        </div>
      </div>

      <div className="flex items-center justify-center">
        {current.matches("wrongPin") && (
          <AlertMessage
            type="error"
            message="The PIN you entered is incorrect. Please enter correct PIN."
          />
        )}
      </div>
    </div>
  );
};

export default PinEntryPage;

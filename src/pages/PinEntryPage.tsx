import React, { useContext } from "react";
import PinEntry from "../components/PinEntry";
import SwitchSaverBankImgLarge from "../assets/SwitchSaverBankImgLarge.svg";
import { MachineContext } from "../state/AtmStateMachine";

const PinEntryPage = () => {
  const [current, send] = useContext(MachineContext);
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
          <div
            className="p-2 bg-red-800 text-red-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert"
          >
            <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              woopsie
            </span>
            <span className="font-semibold mr-2 text-left flex-auto">
              The PIN you entered is incorrect. Please enter correct PIN.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinEntryPage;

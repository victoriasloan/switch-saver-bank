import React, { useContext, useState } from "react";
import { MachineContext } from "../state/AtmStateMachine";
import PinInput from "react-pin-input";
import xIcon from "../assets/xIcon.svg";

const PinEntry = () => {
  const [current, send] = useContext(MachineContext);
  const [pin, setPin] = useState("");

  let pinInput;

  const updatePin = (pinEntered) => {
    setPin(pinEntered);

    send("SUBMIT_PIN", { pin: pinEntered });
  };

  const clearPin = () => {
    pinInput.clear();
  };

  return (
    <div className="flex">
      <PinInput
        ref={(n) => (pinInput = n)}
        length={4}
        initialValue=""
        focus
        secret
        type="numeric"
        inputMode="number"
        inputStyle={{
          borderColor: "#D9D9D9",
          borderRadius: "50px",
          marginRight: "20px",
          color: "#D9D9D9",
          borderWidth: "2px",
        }}
        inputFocusStyle={{
          borderColor: "#7f9cf5",
          color: "white",
          borderWidth: "2px",
        }}
        onComplete={(value, index) => {
          updatePin(value);
        }}
      />

      <img className="cursor-pointer" src={xIcon} onClick={() => clearPin()} />
    </div>
  );
};

export default PinEntry;

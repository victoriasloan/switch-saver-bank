import React, { useContext, useState } from "react";
import { MachineContext } from "../state/AtmStateMachine";
import PinInput from "react-pin-input";

const PinEntry = () => {
  const [current, send] = useContext(MachineContext);
  const [pin, setPin] = useState("");

  const updatePin = (pinEntered) => {
    setPin(pinEntered);

    send("SUBMIT_PIN", { pin: pinEntered });
  };

  return (
    <div>
      <PinInput
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
    </div>
  );
};

export default PinEntry;

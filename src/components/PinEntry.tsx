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
          borderColor: "black",
          borderRadius: "50px",
          marginRight: "20px",
        }}
        inputFocusStyle={{ borderColor: "blue" }}
        onComplete={(value, index) => {
          updatePin(value);
        }}
        autoSelect={true}
      />
    </div>
  );
};

export default PinEntry;

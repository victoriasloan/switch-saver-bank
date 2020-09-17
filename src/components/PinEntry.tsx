import React from "react";
import { useContext } from "react";
import { MachineContext } from "../state/AtmStateMachine";

const PinEntry = () => {
  const [current, send] = useContext(MachineContext);

  console.log(current, "heyeye current in pinEntry");
  return <div>fdfd</div>;
};

export default PinEntry;

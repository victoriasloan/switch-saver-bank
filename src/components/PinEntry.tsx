import React, { useContext, useState } from "react";
import { MachineContext } from "../state/AtmStateMachine";

const PinEntry = () => {
  const [current, send] = useContext(MachineContext);
  const [pin, setPin] = useState("");

  console.log(current, "current");
  const updatePin = (event) => {
    setPin(event.target.value);

    console.log(pin, "pin entered");
  };

  return (
    <div>
      {" "}
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Enter Pin"
        aria-label="Enter Pin"
        value={pin}
        onChange={updatePin}
      />
      <button
        className="flex-shrink-0 bg-red-700 hover:bg-red-500 border-red-700 hover:border-red-500 text-sm border-4 text-white py-1 px-2 rounded cursor-pointer font-bold"
        type="button"
        onClick={() => send("SUBMIT_PIN", { pin: pin })}
      >
        Enter Pin
      </button>
    </div>
  );
};

export default PinEntry;

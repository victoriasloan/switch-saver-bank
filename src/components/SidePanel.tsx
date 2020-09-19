import React, { useContext } from "react";
import { MachineContext } from "../state/AtmStateMachine";

const SidePanel = () => {
  const [current, send] = useContext(MachineContext);

  return (
    <div>
      <h1 className="text-white text-bold text-xl font-bold">
        Current Balance
      </h1>
      <h1 className="text-white text-bold text-3xl font-bold">
        £{current.context.currentBalance}
      </h1>
    </div>
  );
};

export default SidePanel;

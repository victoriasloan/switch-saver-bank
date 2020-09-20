import React, { useContext } from "react";
import { MachineContext } from "../state/AtmStateMachine";
import AlertMessage from "../components/AlertMessage";

const SidePanel = () => {
  const [current, send] = useContext(MachineContext);

  return (
    <div>
      <h1 className="text-white text-bold text-xl font-bold">
        Current Balance
      </h1>
      <h1 className="text-white text-bold text-3xl">
        £{current.context.currentBalance}
      </h1>
      <h1 className="text-white text-bold text-xl font-bold mt-12">
        Cash Withdrawn
      </h1>
      <h1 className="text-white text-bold text-3xl mb-8">
        £{current.context.amountWithdrew}
      </h1>

      {current.context.amountWithdrew >= current.context.switchCost && (
        <AlertMessage
          type="success"
          message="You have withdrawn enough to buy the switch!"
        />
      )}
    </div>
  );
};

export default SidePanel;

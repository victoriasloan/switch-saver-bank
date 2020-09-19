import React, { useContext } from "react";

import { MachineContext } from "../state/AtmStateMachine";

const TransactionsPage = () => {
  const [current, send] = useContext(MachineContext);

  if (current.context.withdrawals.length === 0) {
    return <div>No transactions</div>;
  }

  return (
    <div>
      {current.context.withdrawals.map((withdrawal, index) => (
        <button key={index}>
          {Object.entries(withdrawal).map(([key, value]) => (
            <div>
              {key}: {value}
            </div>
          ))}
        </button>
      ))}
    </div>
  );
};

export default TransactionsPage;

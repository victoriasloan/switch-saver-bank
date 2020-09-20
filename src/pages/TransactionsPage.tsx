import React, { useContext } from "react";

import { MachineContext } from "../state/AtmStateMachine";

const TransactionsPage = () => {
  const [current, send] = useContext(MachineContext);

  if (current.context.withdrawals.length === 0) {
    return <div>No transactions</div>;
  }

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Withdrawal</th>
          {current.context.denominations.map((denomination) => (
            <th className="px-4 py-2" key={denomination.value}>
              £{denomination.value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {current.context.withdrawals.map((withdrawal, idx) => (
          <tr>
            <td className="border px-4 py-2">{idx + 1}</td>
            {current.context.denominations.map((denomination) => (
              <td className="border px-4 py-2">
                {withdrawal[denomination.value] || 0}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsPage;

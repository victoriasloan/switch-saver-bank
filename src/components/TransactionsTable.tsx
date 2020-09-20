import React from "react";

const TransactionsTable = ({ denominations, withdrawals }) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Withdrawal</th>
          {denominations.map((denomination) => (
            <th className="px-4 py-2" key={denomination.value}>
              £{denomination.value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {withdrawals.map((withdrawal, idx) => (
          <tr className="text-white">
            <td className="border px-4 py-2">#{idx + 1}</td>
            {denominations.map((denomination) => (
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

export default TransactionsTable;

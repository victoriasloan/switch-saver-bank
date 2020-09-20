import React, { useContext } from "react";
import { MachineContext } from "../state/AtmStateMachine";
import TransactionImg from "../assets/TransactionImg.svg";
import TransactionsTable from "../components/TransactionsTable";
import Chevron from "../assets/Chevron.svg";

const TransactionsPage = () => {
  const [current, send] = useContext(MachineContext);

  if (current.context.withdrawals.length === 0) {
    return (
      <div>
        <img
          src={Chevron}
          className="cursor-pointer"
          onClick={() => send("BACK")}
        />
        <p className="font-bold text-white mt-12">No transactions</p>
      </div>
    );
  }

  return (
    <div className="mt-32 text-white">
      <img src={TransactionImg} className="ml-24" />

      <div className="text-white mb-12 mt-12">
        <h3 className="text-xl font-bold">Recent Transactions</h3>
        <p>
          See below your recent transactions with the number of each note
          denomination
        </p>
      </div>
      <TransactionsTable
        denominations={current.context.denominations}
        withdrawals={current.context.withdrawals}
      />

      <p className="font-bold mt-12">
        You have withdrew a total of £{current.context.amountWithdrew}
      </p>
      <button
        className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold font-bold py-2 px-8 rounded mt-6"
        onClick={() => send("WITHDRAW")}
      >
        Withdraw More
      </button>
    </div>
  );
};

export default TransactionsPage;

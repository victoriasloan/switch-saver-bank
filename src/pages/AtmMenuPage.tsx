import React, { useContext } from "react";
import WithdrawalPage from "./WithdrawalPage";
import { MachineContext } from "../state/AtmStateMachine";
import TransactionsPage from "./TransactionsPage";

const CheckBalancePage = () => {
  return <div>CHECK BALANCE Page</div>;
};

const AtmMenuHomePage = () => {
  const [current, send] = useContext(MachineContext);

  return (
    <div>
      <button onClick={() => send("WITHDRAW")}>Withdraw</button>
      <button onClick={() => send("CHECK_BALANCE")}>Check Balance</button>
      <button onClick={() => send("SHOW_TRANSACTIONS")}>
        Show Transactions
      </button>
    </div>
  );
};

const AtmMenuPage = () => {
  const [current, send] = useContext(MachineContext);

  console.log(current, "current");
  return (
    <div>
      <button onClick={() => send("BACK")}>back</button>
      {current.matches("atmMenu.selectAtmAction") && <AtmMenuHomePage />}

      {current.matches("atmMenu.withdrawal") && <WithdrawalPage />}

      {current.matches("atmMenu.showBalance") && <CheckBalancePage />}

      {current.matches("atmMenu.showTransactions") && <TransactionsPage />}
      {/* {current.matches("selectWithdrawalAmount") && <div>Please enter how much you want </div>} */}
    </div>
  );
};

export default AtmMenuPage;

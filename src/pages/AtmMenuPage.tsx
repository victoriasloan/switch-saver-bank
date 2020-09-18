import React, { useContext } from "react";

import { MachineContext } from "../state/AtmStateMachine";

const WithdrawalPage = () => {
  return <div>Withdrawal Page </div>;
};

const TransactionsPage = () => {
  return <div>Transactions Page</div>;
};

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
      </button>{" "}
    </div>
  );
};

const AtmMenuPage = () => {
  const [current, send] = useContext(MachineContext);
  console.log(current.value, "current");

  return (
    <div>
      {current.matches({ atmMenu: "selectAtmAction" }) && <AtmMenuHomePage />}

      {current.matches({ atmMenu: "selectWithdrawalAmount" }) && (
        <WithdrawalPage />
      )}

      {current.matches({ atmMenu: "showBalance" }) && <CheckBalancePage />}

      {current.matches({ atmMenu: "showTransactions" }) && <TransactionsPage />}
      {/* {current.matches("selectWithdrawalAmount") && <div>Please enter how much you want </div>} */}
    </div>
  );
};

export default AtmMenuPage;

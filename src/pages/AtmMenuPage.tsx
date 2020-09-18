import React, { useContext, useState } from "react";

import { MachineContext } from "../state/AtmStateMachine";

const WithdrawalPage = () => {
  const cashWithDrawalAmounts: number[] = [140000, 9000, 50000];
  const [current, send] = useContext(MachineContext);

  const [withDrawalAmount, setWithDrawalAmount] = useState("");

  const selectWithDrawalAmount = (amountSelected) => {
    setWithDrawalAmount(amountSelected);

    console.log(withDrawalAmount, "withdrawalAmount");

    send("SELECT_AMOUNT", { amount: withDrawalAmount });
  };

  return (
    <div className="flex -mx-2 mb-8 flex-wrap">
      {current.matches("atmMenu.withdrawal.selectWithdrawalAmount") && (
        <div>
          {cashWithDrawalAmounts.map((withdrawalAmount, index) => (
            <button
              key={index}
              onClick={() => selectWithDrawalAmount(withdrawalAmount)}
            >
              {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(withdrawalAmount)}
            </button>
          ))}
        </div>
      )}

      {current.matches("atmMenu.withdrawal.confirmAmount") && (
        <div>
          <button onClick={() => send("CONFIRM", { amount: withDrawalAmount })}>
            Confirm
          </button>
          <button onClick={() => send("BACK")}>Cancel Withdrawal</button>
        </div>
      )}
    </div>
  );
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

  console.log(current, "current");
  return (
    <div>
      {current.matches("atmMenu.selectAtmAction") && <AtmMenuHomePage />}

      {current.matches("atmMenu.withdrawal") && <WithdrawalPage />}

      {current.matches("atmMenu.showBalance") && <CheckBalancePage />}

      {current.matches("atmMenu.showTransactions") && <TransactionsPage />}
      {/* {current.matches("selectWithdrawalAmount") && <div>Please enter how much you want </div>} */}
    </div>
  );
};

export default AtmMenuPage;

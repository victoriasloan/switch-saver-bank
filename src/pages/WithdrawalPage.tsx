import React, { useContext, useState } from "react";

import { MachineContext } from "../state/AtmStateMachine";

const WithdrawalPage = () => {
  const cashWithDrawalAmounts: number[] = [140, 90, 50];
  const [current, send] = useContext(MachineContext);

  const [withDrawalAmount, setWithDrawalAmount] = useState("");

  const selectWithDrawalAmount = (amountSelected) => {
    setWithDrawalAmount(amountSelected);

    console.log(withDrawalAmount, "withdrawalAmount");

    send("SELECT_AMOUNT", { amount: amountSelected });
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

      {current.matches("atmMenu.withdrawal.goingIntoOverdraft") && (
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

export default WithdrawalPage;

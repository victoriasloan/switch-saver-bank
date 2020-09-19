import React, { useContext, useState } from "react";
import { MachineContext } from "../state/AtmStateMachine";
import WithdrawalAmountOption from "../components/WithdrawalAmountOption";

const WithdrawalPage = () => {
  const cashWithDrawalAmounts: number[] = [
    20,
    50,
    90,
    120,
    140,
    150,
    160,
    200,
    220,
  ];
  const [current, send] = useContext(MachineContext);
  const [withDrawalAmount, setWithDrawalAmount] = useState("");

  const selectWithDrawalAmount = (amountSelected) => {
    setWithDrawalAmount(amountSelected);

    send("SELECT_AMOUNT", { amount: amountSelected });
  };

  return (
    <div>
      {current.matches("atmMenu.withdrawal.selectWithdrawalAmount") && (
        <div>
          <div className="text-white mb-12">
            <h3 className="text-xl font-bold">Withdraw Cash</h3>
            <p>Please select cash withdrawal amount</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {cashWithDrawalAmounts.map((withdrawalAmount, index) => (
              <WithdrawalAmountOption
                key={index}
                onWithdrawalAmountClicked={() =>
                  selectWithDrawalAmount(withdrawalAmount)
                }
                withdrawalAmount={withdrawalAmount}
              />
            ))}
          </div>
        </div>
      )}

      {current.matches("atmMenu.withdrawal.confirmAmount") && (
        <div>
          <div className="text-white mb-12">
            <h3 className="text-xl font-bold">Confirm Cash Withdrawal</h3>
            <p>Please confirm cash withdrawal</p>
          </div>
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

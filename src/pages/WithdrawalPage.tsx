import React, { useContext, useState } from "react";
import { MachineContext } from "../state/AtmStateMachine";
import WithdrawalAmountOption from "../components/WithdrawalAmountOption";
import TrophyImg from "../assets/TrophyImg.svg";
import PlaneImg from "../assets/PlaneImg.svg";
import StarbucksCupImg from "../assets/StarbucksCupImg.svg";
import CashImg from "../assets/CashImg.svg";
import Chevron from "../assets/Chevron.svg";

const WithdrawalPage = () => {
  const cashWithDrawalAmounts: number[] = [
    10,
    20,
    50,
    90,
    120,
    140,
    150,
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
    <div className="flex items-center justify-center h-screen">
      {current.matches("atmMenu.withdrawal.selectWithdrawalAmount") && (
        <div>
          <img
            src={Chevron}
            className="cursor-pointer"
            onClick={() => send("BACK")}
          />
          <div className="text-white mb-12 mt-8">
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
          <img src={TrophyImg} />
          <div className="text-white mb-12 mt-12">
            <h3 className="text-xl font-bold">Confirm Cash Withdrawal</h3>
            <p>Are you sure you want to withdraw £{withDrawalAmount}?</p>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-white hover:text-indigo-500 text-indigo-700 font-bold font-bold py-2 px-8 rounded"
              onClick={() => send("BACK")}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold font-bold py-2 px-8 rounded"
              onClick={() => send("CONFIRM", { amount: withDrawalAmount })}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {current.matches("atmMenu.withdrawal.goingIntoOverdraft") && (
        <div>
          <img src={PlaneImg} />
          <div className="text-white mb-12 mt-12">
            <h3 className="text-xl font-bold">
              Happy to go into your overdraft?
            </h3>
            <p>Are you sure you want to withdraw £{withDrawalAmount}?</p>
            <p>This transaction will put you into your overdraft.</p>
            <p>You set your overdraft to £100 after your last holiday.</p>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-white hover:text-indigo-500 text-indigo-700 font-bold font-bold py-2 px-8 rounded"
              onClick={() => send("BACK")}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold font-bold py-2 px-8 rounded"
              onClick={() => send("CONFIRM", { amount: withDrawalAmount })}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {current.matches("atmMenu.withdrawal.insufficientNotes") && (
        <div>
          <img src={CashImg} />
          <div className="text-white mb-12 mt-12">
            <h3 className="text-xl font-bold">Not Enough Notes</h3>
            <p>
              Sorry, the SSB ATM doesn't have enough notes to give you £
              {withDrawalAmount}
            </p>
          </div>
          <button
            className="bg-white hover:text-indigo-500 text-indigo-700 font-bold font-bold py-2 px-8 rounded"
            onClick={() => send("BACK")}
          >
            Back
          </button>
        </div>
      )}

      {current.matches("atmMenu.withdrawal.insufficientFunds") && (
        <div>
          <img src={StarbucksCupImg} />
          <div className="text-white mb-12 mt-12">
            <h3 className="text-xl font-bold">Insufficient Funds</h3>
            <p>
              Unfortunately, you do not have enough funds to withdraw £
              {withDrawalAmount}.
            </p>
            <p>You may have been spending too much money on coffee again!</p>
          </div>
          <button
            className="bg-white hover:text-indigo-500 text-indigo-700 font-bold font-bold py-2 px-8 rounded"
            onClick={() => send("BACK")}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default WithdrawalPage;

import React, { useContext, useState } from "react";
import { MachineContext } from "../state/AtmStateMachine";
import WithdrawalAmountOption from "../components/WithdrawalAmountOption";
import TrophyImg from "../assets/TrophyImg.svg";
import PlaneImg from "../assets/PlaneImg.svg";
import StarbucksCupImg from "../assets/StarbucksCupImg.svg";
import CashImg from "../assets/CashImg.svg";
import Chevron from "../assets/Chevron.svg";
import ConfirmScreen from "../components/ConfirmScreen";

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
        <ConfirmScreen
          img={TrophyImg}
          hasConfirmButton={true}
          withdrawalAmount={withDrawalAmount}
          heading="Confirm Cash Withdrawal"
          description="You have enough funds in your current account."
          subheading="One step closer to that switch.. "
          onCancel={() => send("BACK")}
          onConfirm={() => send("CONFIRM", { amount: withDrawalAmount })}
        />
      )}

      {current.matches("atmMenu.withdrawal.goingIntoOverdraft") && (
        <div>
          <ConfirmScreen
            img={PlaneImg}
            hasConfirmButton={true}
            withdrawalAmount={withDrawalAmount}
            heading="Happy to go into your overdraft?"
            description="This transaction will put you into your overdraft."
            subheading="You set your overdraft to £100 after your recent holiday."
            onCancel={() => send("BACK")}
            onConfirm={() => send("CONFIRM", { amount: withDrawalAmount })}
          />
        </div>
      )}

      {current.matches("atmMenu.withdrawal.insufficientNotes") && (
        <div>
          <ConfirmScreen
            img={CashImg}
            hasConfirmButton={false}
            withdrawalAmount={withDrawalAmount}
            heading="Not Enough Notes in ATM"
            subheading="Try selecting a smaller amount."
            onConfirm={() => console.log("no confirm here")}
            description={`Sorry, the SSB ATM doesnt have enough notes left to give you £${withDrawalAmount}`}
            onCancel={() => send("BACK")}
          />
        </div>
      )}

      {current.matches("atmMenu.withdrawal.insufficientFunds") && (
        <div>
          <ConfirmScreen
            img={StarbucksCupImg}
            hasConfirmButton={false}
            withdrawalAmount={withDrawalAmount}
            heading="Insufficient Funds"
            subheading="You may have been spending too much on coffee again"
            onConfirm={() => console.log("no confirm here")}
            description={`Unfortunately, you do not have enough funds to withdraw £${withDrawalAmount}`}
            onCancel={() => send("BACK")}
          />
        </div>
      )}
    </div>
  );
};

export default WithdrawalPage;

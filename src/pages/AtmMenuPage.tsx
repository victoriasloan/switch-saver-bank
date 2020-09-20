import React, { useContext } from "react";
import WithdrawalPage from "./WithdrawalPage";
import { MachineContext } from "../state/AtmStateMachine";
import TransactionsPage from "./TransactionsPage";
import AtmMenuActionList from "../components/AtmMenuActionsList";

const AtmMenuPage = () => {
  const [current, send] = useContext(MachineContext);

  console.log(current, "current");
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <button onClick={() => send("BACK")}>back</button>
        <div>
          {current.matches("atmMenu.selectAtmAction") && <AtmMenuActionList />}

          {current.matches("atmMenu.withdrawal") && <WithdrawalPage />}

          {/* atmMenu.showTransactions */}
          {current.matches("atmMenu.withdrawal.withdrawalSuccess") && (
            <TransactionsPage />
          )}
        </div>
      </div>

      {/* {current.matches("selectWithdrawalAmount") && <div>Please enter how much you want </div>} */}
    </div>
  );
};

export default AtmMenuPage;

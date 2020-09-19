import React, { useContext } from "react";
import WithdrawalPage from "./WithdrawalPage";
import { MachineContext } from "../state/AtmStateMachine";
import TransactionsPage from "./TransactionsPage";
import AtmMenuActionList from "../components/AtmMenuActionsList";

const CheckBalancePage = () => {
  return <div>CHECK BALANCE Page</div>;
};

const AtmMenuPage = () => {
  const [current, send] = useContext(MachineContext);

  console.log(current, "current");
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div>
          {/* will be left hand panel */}
          <button onClick={() => send("BACK")}>back</button>
        </div>

        <div>
          {current.matches("atmMenu.selectAtmAction") && <AtmMenuActionList />}

          {current.matches("atmMenu.withdrawal") && <WithdrawalPage />}

          {current.matches("atmMenu.showBalance") && <CheckBalancePage />}

          {current.matches("atmMenu.showTransactions") && <TransactionsPage />}
        </div>
      </div>

      {/* {current.matches("selectWithdrawalAmount") && <div>Please enter how much you want </div>} */}
    </div>
  );
};

export default AtmMenuPage;

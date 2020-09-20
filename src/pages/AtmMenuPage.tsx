import React, { useContext } from "react";
import WithdrawalPage from "./WithdrawalPage";
import { MachineContext } from "../state/AtmStateMachine";
import TransactionsPage from "./TransactionsPage";
import AtmMenuActionList from "../components/AtmMenuActionsList";
import SwitchSaverBankImg from "../assets/SwitchSaverBankImg.svg";

const AtmMenuPage = () => {
  const [current, send] = useContext(MachineContext);

  console.log(current, "current");
  return (
    <div className="h-screen overflow-hidden">
      <button onClick={() => send("BACK")}>back</button>

      <div className="flex items-center justify-center">
        <div>
          {current.matches("atmMenu.selectAtmAction") && <AtmMenuActionList />}

          {current.matches("atmMenu.withdrawal") && <WithdrawalPage />}

          {current.matches("atmMenu.showTransactions") && <TransactionsPage />}
        </div>
      </div>
    </div>
  );
};

export default AtmMenuPage;

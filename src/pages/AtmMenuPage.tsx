import React, { useContext } from "react";
import { MachineContext } from "../state/AtmStateMachine";
import WithdrawalPage from "./WithdrawalPage";
import TransactionsPage from "./TransactionsPage";
import AtmMenuActionList from "../components/AtmMenuActionsList";
import SSlogo from "../assets/SSlogo.svg";

const AtmMenuPage = () => {
  const [current, send] = useContext(MachineContext);

  console.log(current, "current");
  return (
    <div className="h-screen overflow-hidden">
      <img
        src={SSlogo}
        className="mt-2 ml-2 cursor-pointer"
        onClick={() => send("BACK")}
      />

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

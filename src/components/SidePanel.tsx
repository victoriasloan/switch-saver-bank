import React, { useContext } from "react";
import { MachineContext } from "../state/AtmStateMachine";
import DonoutChart from "simple-react-donut-chart";
import "simple-react-donut-chart/src/style.css";

const SidePanel = () => {
  const [current, send] = useContext(MachineContext);

  const calculatePercentage = () => {
    const percentage =
      (100 * current.context.amountWithdrew) / current.context.switchCost;

    return Math.round(percentage);
  };

  return (
    <div>
      <h1 className="text-white text-bold text-xl font-bold">
        Current Balance
      </h1>
      <h1 className="text-white text-bold text-3xl font-bold">
        £{current.context.currentBalance}
      </h1>
      <DonoutChart
        percentage={calculatePercentage()}
        colorOn="#c53030"
        colorOff="#2b6cb0"
        labelOff="Cash Withdrew"
        labelOn="Amount needed to afford Switch"
        textStyle={{
          color: "#ff0000",
        }}
        labelStyle={{
          off: {
            fontSize: "16px",
          },
          on: {
            fontSize: "18px",
          },
        }}
      />
    </div>
  );
};

export default SidePanel;

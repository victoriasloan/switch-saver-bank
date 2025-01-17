import React from "react";

import CashImg from "../assets/CashImg.svg";
import TransactionImg from "../assets/TransactionImg.svg";
import AtmMenuAction from "./AtmMenuAction";
import SidePanel from "./SidePanel";

const AtmMenuActions = () => {
  const atmMenuActions = [
    {
      actionName: "Withdraw Cash >>",
      actionImgUrl: CashImg,
      action: "WITHDRAW",
    },
    {
      actionName: "Show Transactions >>",
      actionImgUrl: TransactionImg,
      action: "SHOW_TRANSACTIONS",
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="mr-32">
        <SidePanel />
      </div>
      {atmMenuActions.map((action, index) => (
        <div className="mr-12">
          <AtmMenuAction
            key={index}
            actionName={action.actionName}
            actionImgUrl={action.actionImgUrl}
            action={action.action}
          />
        </div>
      ))}
    </div>
  );
};

export default AtmMenuActions;

import React from "react";

import CashImg from "../assets/CashImg.svg";
import TransactionImg from "../assets/TransactionImg.svg";
import AtmMenuAction from "../components/AtmMenuAction";

const AtmMenuActions = () => {
  const atmMenuActions = [
    {
      actionName: "Withdraw Cash",
      actionImgUrl: CashImg,
      action: "WITHDRAW",
    },
    {
      actionName: "Show Transactions",
      actionImgUrl: TransactionImg,
      action: "SHOW_TRANSACTIONS",
    },
  ];

  return (
    <div>
      {atmMenuActions.map((action, index) => (
        <AtmMenuAction
          key={index}
          actionName={action.actionName}
          actionImgUrl={action.actionImgUrl}
          action={action.action}
        />
      ))}
    </div>
  );
};

export default AtmMenuActions;

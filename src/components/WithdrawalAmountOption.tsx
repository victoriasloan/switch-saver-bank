import React from "react";

const WithdrawalAmountOption = ({
  withdrawalAmount,
  onWithdrawalAmountClicked,
}) => {
  return (
    <div
      onClick={onWithdrawalAmountClicked}
      className="bg-white w-32 h-32 rounded shadow-lg transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer"
    >
      <h2 className="text-indigo-900 text-xl font-bold pt-12 pb-12 pl-6">
        {new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(withdrawalAmount)}
      </h2>
    </div>
  );
};

export default WithdrawalAmountOption;

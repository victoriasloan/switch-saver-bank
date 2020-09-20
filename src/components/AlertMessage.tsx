import React from "react";

const AlertMessage = ({ type, message }) => {
  const alertType = type === "error" ? "Woopsie" : "Woohoo";
  const colorClass = type === "error" ? "red" : "green";

  return (
    <div
      className={`p-2 leading-none lg:rounded-full flex lg:inline-flex bg-${colorClass}-800 text-${colorClass}-100`}
      role="alert"
    >
      <span
        className={`flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3 bg-${colorClass}-500`}
      >
        {alertType}
      </span>
      <span className="font-semibold mr-2 text-left flex-auto">{message}</span>
    </div>
  );
};

export default AlertMessage;

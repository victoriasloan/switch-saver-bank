import React, { useContext } from "react";
import { MachineContext } from "../state/AtmStateMachine";

const AtmMenuAction = ({ actionName, actionImgUrl, action }) => {
  const [current, send] = useContext(MachineContext);

  return (
    <div
      onClick={() => send(action)}
      className="relative bg-white w-64 rounded shadow-lg transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110  cursor-pointer card-height"
    >
      <h2 className="text-indigo-900 text-xl font-bold pb-64 pt-5 pl-5">
        {actionName}{" "}
      </h2>
      <img src={actionImgUrl} className="absolute bottom-0 right-0" />
    </div>
  );
};

export default AtmMenuAction;

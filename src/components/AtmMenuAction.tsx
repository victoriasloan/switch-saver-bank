import React, { useContext } from "react";
import { MachineContext } from "../state/AtmStateMachine";

const AtmMenuAction = ({ actionName, actionImgUrl, action }) => {
  const [current, send] = useContext(MachineContext);

  return (
    <div
      onClick={() => send(action)}
      className="relative bg-white w-56 h-64 rounded shadow-lg hover:shadow-outline cursor-pointer"
    >
      <h3 className="text-indigo-900 text-xl font-bold">{actionName} </h3>
      <img src={actionImgUrl} className="absolute bottom-0 right-0" />
    </div>
  );
};

export default AtmMenuAction;

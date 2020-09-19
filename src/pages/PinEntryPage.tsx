import React from "react";
import PinEntry from "../components/PinEntry";

const PinEntryPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* {current.matches("pinError") && <div>You made a mistake</div>} */}
      <PinEntry />
    </div>
  );
};

export default PinEntryPage;

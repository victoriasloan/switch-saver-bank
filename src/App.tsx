import React from "react";
import "./App.css";
import "./base.css";
import PinEntryPage from "./pages/PinEntryPage";
import { useMachine } from "@xstate/react";
import { atmStateMachine, MachineContext } from "./state/AtmStateMachine";

function App() {
  const [current, send] = useMachine(atmStateMachine);

  return (
    <MachineContext.Provider value={[current, send]}>
      <div>
        <PinEntryPage />
      </div>
    </MachineContext.Provider>
  );
}

export default App;

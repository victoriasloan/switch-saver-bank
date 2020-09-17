import React from "react";
import "./App.css";
import "./base.css";
import PinEntryPage from "./pages/PinEntryPage";
import { useMachine } from "@xstate/react";
import { atmStateMachine, MachineContext } from "./state/AtmStateMachine";

function App() {
  const [current, send] = useMachine(atmStateMachine);
  console.log(current, "current");
  return (
    <MachineContext.Provider value={[current, send]}>
      <div>
        <button onClick={() => send("SUBMIT_PIN")}>Submit PIN</button>
        <PinEntryPage />
      </div>
    </MachineContext.Provider>
  );
}

export default App;

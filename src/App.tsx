import React from "react";
import "./App.css";
import "./base.css";
import PinEntryPage from "./pages/PinEntryPage";
import AtmMenuPage from "./pages/AtmMenuPage";
import { useMachine } from "@xstate/react";
import { atmStateMachine, MachineContext } from "./state/AtmStateMachine";

function App() {
  const [current, send] = useMachine(atmStateMachine);

  const Page = current.matches("atmMenu") ? AtmMenuPage : PinEntryPage;

  return (
    <MachineContext.Provider value={[current, send]}>
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-900 to-red-900 h-screen">
        <Page />
      </div>
    </MachineContext.Provider>
  );
}

export default App;

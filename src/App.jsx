import React from "react";
import "./App.css";
import "./base.css";
import PinEntryPage from "./pages/PinEntryPage";
import AtmMenuPage from "./pages/AtmMenuPage";
import { useMachine } from "@xstate/react";
import { atmStateMachine, MachineContext } from "./state/AtmStateMachine";

function App() {
  const [current, send] = useMachine(atmStateMachine);

  console.log(current.value, "current");

  const Page = current.value.atmMenu ? AtmMenuPage : PinEntryPage;

  return (
    <MachineContext.Provider value={[current, send]}>
      <div>
        <button onClick={() => send("BACK")}>back</button>
        <Page />
      </div>
    </MachineContext.Provider>
  );
}

export default App;

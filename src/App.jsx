import React from "react";
import "./App.css";
import "./base.css";
import PinEntryPage from "./pages/PinEntryPage";
import AtmMenuPage from "./pages/AtmMenuPage";
import { useMachine } from "@xstate/react";
import { atmStateMachine, MachineContext } from "./state/AtmStateMachine";

// const PAGE_MAP = {
//   idle: PinEntryPage,
//   submittingPin: PinEntryPage,
//   atmPage: {
//     selectAtmAction: AtmMenuPage,
//   },
// };

function App() {
  const [current, send] = useMachine(atmStateMachine);

  console.log(current.value, "current");
  // const Page = PAGE_MAP[current.value as string];

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

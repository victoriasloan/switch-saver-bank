import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

describe("Withdraw Cash", () => {
  let app;

  beforeEach(async () => {
    const CURRENT_BALANCE = 220;
    app = render(<App />);

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            currentBalance: CURRENT_BALANCE,
          }),
      })
    );

    const pinInputs = Array.from(
      app.container.querySelectorAll(".pincode-input-text")
    );

    for (let pinInput of pinInputs) {
      fireEvent.change(pinInput as Node, { target: { value: "2" } });
    }

    await waitFor(() =>
      expect(app.getByText(`£${CURRENT_BALANCE}`)).toBeInTheDocument()
    );
  });

  it("W001 - Successfully withdraws £140", () => {
    const withDrawCashButton = app.getByText(/Withdraw Cash/);
    fireEvent.click(withDrawCashButton);

    const oneHundredAndFortyOption = app.getByText(/£140.00/);
    fireEvent.click(oneHundredAndFortyOption);

    const confirmWithdraw = app.getByText("Confirm");
    fireEvent.click(confirmWithdraw);

    expect(
      app.getByText("You have withdrew a total of £140")
    ).toBeInTheDocument();
  });

  it("W002 - Successfully shows confirmation message", () => {
    const withDrawCashButton = app.getByText(/Withdraw Cash/);
    fireEvent.click(withDrawCashButton);

    const twoHundredAndTwenty = app.getByText(/£150.00/);
    fireEvent.click(twoHundredAndTwenty);

    expect(
      app.getByText("Are you sure you want to withdraw £150?")
    ).toBeInTheDocument();
  });

  it("W003 - Unsuccessful withdraw as not enough notes in machine", () => {
    const withDrawCashButton = app.getByText(/Withdraw Cash/);
    fireEvent.click(withDrawCashButton);

    const twoHundredAndTwenty = app.getByText(/£200.00/);
    fireEvent.click(twoHundredAndTwenty);

    expect(
      app.getByText(
        "Sorry, the SSB ATM doesnt have enough notes left to give you £200"
      )
    ).toBeInTheDocument();
  });
});

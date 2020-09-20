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

  it("T001 - Display no transactions if no transactions have been made", () => {
    const showTransactionsButton = app.getByText(/Show Transactions/);
    fireEvent.click(showTransactionsButton);

    expect(app.getByText("No transactions")).toBeInTheDocument();
  });

  it("T002 - Successfully show transactions page after withdrawal", () => {
    const withDrawCashButton = app.getByText(/Withdraw Cash/);
    fireEvent.click(withDrawCashButton);

    const oneHundredAndFortyOption = app.getByText(/£140.00/);
    fireEvent.click(oneHundredAndFortyOption);

    const confirmWithdraw = app.getByText("Confirm");
    fireEvent.click(confirmWithdraw);

    expect(app.getByText("Recent Transactions")).toBeInTheDocument();
  });

  it("T003 - Successfully show Withdrawal page after clicking Withdraw More", () => {
    const withDrawCashButton = app.getByText(/Withdraw Cash/);
    fireEvent.click(withDrawCashButton);

    const oneHundredAndFortyOption = app.getByText(/£20.00/);
    fireEvent.click(oneHundredAndFortyOption);

    const confirmWithdraw = app.getByText("Confirm");
    fireEvent.click(confirmWithdraw);

    const withdrawMoreButton = app.getByText("Withdraw More");
    fireEvent.click(withdrawMoreButton);

    expect(app.getByText("Withdraw Cash")).toBeInTheDocument();
  });
});

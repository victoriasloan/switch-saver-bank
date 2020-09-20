import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

describe("Login", () => {
  it("L001- Logs in successfully", async () => {
    const CURRENT_BALANCE = 220;
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            currentBalance: CURRENT_BALANCE,
          }),
      })
    );

    const { getByText, container } = render(<App />);
    const pinInputs = Array.from(
      container.querySelectorAll(".pincode-input-text")
    );
    for (let pinInput of pinInputs) {
      fireEvent.change(pinInput, { target: { value: "1" } });
    }
    await waitFor(() =>
      expect(getByText(`£${CURRENT_BALANCE}`)).toBeInTheDocument()
    );
  });

  it("L002 - Logs in unsuccessfully", async () => {
    const CURRENT_BALANCE = 220;
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.reject(),
      })
    );

    const { getByText, container } = render(<App />);
    const pinInputs = Array.from(
      container.querySelectorAll(".pincode-input-text")
    );
    for (let pinInput of pinInputs) {
      fireEvent.change(pinInput, { target: { value: "2" } });
    }
    await waitFor(() =>
      expect(
        getByText("The PIN you entered is incorrect. Please enter correct PIN.")
      ).toBeInTheDocument()
    );
  });
});

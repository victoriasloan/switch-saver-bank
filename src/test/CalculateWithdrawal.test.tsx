import { calculateWithdrawal } from "../state/AtmStateMachine";

it("CW001 - Successfully calculate the withdrawal amount and update the context", () => {
  // Arrange
  const context = {
    denominations: [
      {
        value: 20,
        amount: 7,
      },
      {
        value: 10,
        amount: 15,
      },
      {
        value: 5,
        amount: 4,
      },
    ],
    withdrawals: [],
    amountWithdrew: 0,
    currentBalance: 220,
    overdraft: 100,
    switchCost: 270,
  };

  const event = {
    amount: 140,
  };

  const expectedWithdrawal = {
    withdrawals: [
      ...context.withdrawals,
      {
        5: 4,
        10: 4,
        20: 4,
      },
    ],
    currentBalance: 80,
    amountWithdrew: 140,
  };

  // Act
  const withDrawal = calculateWithdrawal(context, event);

  // Assert
  expect(withDrawal).toEqual(expectedWithdrawal);
});

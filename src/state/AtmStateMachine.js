import { Machine, assign } from "xstate";
import { createContext } from "react";

async function pinEntry(pinEntered) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pin: pinEntered,
    }),
  };

  const pinEnteredResponse = await fetch(
    `https://frontend-challenge.screencloud-michael.now.sh/api/pin/`,
    requestOptions
  );

  if (pinEnteredResponse.status >= 400) throw pinEnteredResponse.status;

  const pinEntryJson = await pinEnteredResponse.json();

  return pinEntryJson;
}

export function calculateWithdrawal(context, event) {
  const withdrawal = {};
  let stillToWithdraw = event.amount;

  // iterate over denominations
  while (stillToWithdraw > 0) {
    for (let denomination of context.denominations) {
      if (denomination.amount === 0 || denomination.value > stillToWithdraw)
        continue;

      withdrawal[denomination.value] = withdrawal[denomination.value]
        ? withdrawal[denomination.value] + 1
        : 1;

      denomination.amount -= 1;
      stillToWithdraw -= denomination.value;
    }
  }

  console.log({
    withdrawals: [...context.withdrawals, withdrawal],
    currentBalance: context.currentBalance - event.amount,
    amountWithdrew: context.amountWithdrew + event.amount,
  });

  return {
    withdrawals: [...context.withdrawals, withdrawal],
    currentBalance: context.currentBalance - event.amount,
    amountWithdrew: context.amountWithdrew + event.amount,
  };
}

export const MachineContext = createContext();

// This machine is completely decoupled from React
export const atmStateMachine = Machine(
  {
    id: "atm",
    initial: "idle",
    context: {
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
      currentBalance: 0,
      overdraft: 100,
      switchCost: 270,
    },
    states: {
      idle: {
        on: { SUBMIT_PIN: "submittingPin" },
      },
      submittingPin: {
        invoke: {
          src: (context, event) => pinEntry(event.pin),
          onDone: {
            target: "atmMenu",
            actions: assign({
              currentBalance: (context, event) => event.data.currentBalance,
            }),
          },
          onError: {
            target: "wrongPin",
          },
        },
      },
      wrongPin: {
        on: {
          BACK: "idle",
        },
        after: {
          3000: "idle",
        },
      },
      atmMenu: {
        initial: "selectAtmAction",
        states: {
          selectAtmAction: {
            on: {
              BACK: "#atm.idle",
              WITHDRAW: "withdrawal",
              CHECK_BALANCE: "showBalance",
              SHOW_TRANSACTIONS: "showTransactions",
            },
          },
          showBalance: {
            on: {
              BACK: "selectAtmAction",
            },
          },
          showTransactions: {
            on: {
              BACK: "selectAtmAction",
              WITHDRAW: "withdrawal",
            },
          },

          withdrawal: {
            initial: "selectWithdrawalAmount",
            states: {
              selectWithdrawalAmount: {
                on: {
                  BACK: "#atm.atmMenu.selectAtmAction",
                  SELECT_AMOUNT: [
                    {
                      target: "insufficientFunds",
                      cond: "insufficientFunds",
                    },
                    {
                      target: "insufficientNotes",
                      cond: "insufficientNotes",
                    },
                    {
                      target: "goingIntoOverdraft",
                      cond: "goingIntoOverdraft",
                    },
                    {
                      target: "confirmAmount",
                    },
                  ],
                },
              },
              goingIntoOverdraft: {
                on: {
                  BACK: "selectWithdrawalAmount",
                  CONFIRM: [
                    {
                      target: "#atm.atmMenu.showTransactions",
                      actions: ["withdraw"],
                    },
                  ],
                },
              },
              insufficientNotes: {
                on: {
                  BACK: "selectWithdrawalAmount",
                },
              },
              confirmAmount: {
                on: {
                  BACK: "selectWithdrawalAmount",
                  CONFIRM: [
                    {
                      target: "#atm.atmMenu.showTransactions",
                      actions: ["withdraw"],
                    },
                  ],
                },
              },
              insufficientFunds: {
                on: {
                  BACK: "selectWithdrawalAmount",
                },
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      withdraw: assign((context, event) => calculateWithdrawal(context, event)),
    },
    guards: {
      insufficientNotes: (context, event) => {
        const noteTotal = context.denominations.reduce(
          (total, deno) => total + deno.value * deno.amount,
          0
        );
        return event.amount > noteTotal;
      },
      goingIntoOverdraft: (context, event) => {
        return (
          context.currentBalance > 0 && event.amount > context.currentBalance
        );
      },
      insufficientFunds: (context, event) =>
        context.currentBalance + context.overdraft < event.amount,
    },
  }
);

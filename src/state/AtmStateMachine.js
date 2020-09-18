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

  if (pinEnteredResponse.status >= 300) throw pinEnteredResponse.status;

  const pinEntryJson = await pinEnteredResponse.json();

  return pinEntryJson;
}

function calculateWithdrawal(context, event) {
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

  return {
    withdrawals: [...context.withdrawals, withdrawal],
    currentBalance: context.currentBalance - event.amount,
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
      currentBalance: 0,
      overdraft: 100,
      pinAttempts: 0,
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
            actions: ["incPinAttempts"],
          },
        },
      },
      wrongPin: {
        on: {
          BACK: "idle",
        },
      },
      lockedOut: {
        on: {
          EXIT: "idle",
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
                      target: "withdrawalSuccess",
                      actions: ["withdraw"],
                    },
                  ],
                },
              },
              confirmAmount: {
                on: {
                  BACK: "selectWithdrawalAmount",
                  CONFIRM: [
                    {
                      target: "withdrawalSuccess",
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
              withdrawalSuccess: {
                on: {
                  BACK: "#atm.atmMenu.selectAtmAction",
                  WITHDRAW_MORE: "selectWithdrawalAmount",
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
      incPinAttempts: assign((context) => ({
        pinAttempts: context.pinAttempts + 1,
        error: "Pin Incorrect",
      })),
    },
    guards: {
      goingIntoOverdraft: (context, event) => {
        return (
          context.currentBalance > 0 && event.amount > context.currentBalance
        );
      },
      insufficientFunds: (context, event) =>
        context.currentBalance + context.overdraft < event.amount,
      noWithdrawalsRemaining: (context) => context.withdrawals === 0,
      tooManyAttempts: (context) => context.pinAttempts >= 3,
    },
  }
);

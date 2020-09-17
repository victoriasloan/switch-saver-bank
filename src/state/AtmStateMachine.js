import { Machine, assign } from "xstate";
import { createContext } from "react";

async function pinEntry(context) {
  console.log("weee");
  const response = await fetch(`https://somepin.com`);
  const json = await response.json();
  return json;
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
          value: 2000,
          amount: 7,
        },
        {
          value: 1000,
          amount: 15,
        },
        {
          value: 500,
          amount: 4,
        },
      ],
      withdrawals: 0,
      currentBalance: 0,
      overdraft: 100,
      pinAttempts: 0,
    },
    states: {
      idle: {
        on: { SUBMIT_PIN: "submittingPin" },
      },
      submittingPin: {
        src: (context) => pinEntry(context),
        onDone: {
          target: "atmMenu",
        },
        onError: {
          target: "wrongPin",
          actions: ["incPinAttempts"],
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
        initial: "selectOption",
        states: {
          selectOption: {
            on: {
              EXIT: "#atm.idle",
              WITHDRAW: "selectWithdrawalAmount",
              CHECK_BALANCE: "showBalance",
            },
          },
          showBalance: {
            on: {
              BACK: "selectOption",
            },
          },
          selectWithdrawalAmount: {
            on: {
              BACK: "selectOption",
              SELECT_AMOUNT: [
                {
                  target: "goingIntoOverdraft",
                  cond: "goingIntoOverdraft",
                },
                {
                  target: "insufficientFunds",
                  cond: "insufficientFunds",
                },
                {
                  target: "confirmAmount",
                },
              ],
            },
          },
          goingIntoOverdraft: {
            on: {
              DECLINE: "selectWithdrawalAmount",
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
              DECLINE: "selectWithdrawalAmount",
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
              BACK: "selectOption",
              WITHDRAW_MORE: "selectWithdrawalAmount",
            },
          },
        },
        on: {
          EXIT: "idle",
        },
      },
    },
    on: {},
  },
  {
    actions: {
      withdraw: assign(calculateWithdrawal),

      incPinAttempts: assign((context) => ({
        pinAttempts: context.pinAttempts + 1,
      })),
    },
    guards: {
      goingIntoOverdraft: (context, event) => {
        return (
          event.amount >= context.currentBalance &&
          event.amount <= context.currentBalance + context.overdraft
        );
      },
      insufficientFunds: (context, event) =>
        context.currentBalance + context.overdraft <= event.amount,
      noWithdrawalsRemaining: (context) => context.withdrawals === 0,
      tooManyAttempts: (context) => context.pinAttempts >= 3,
    },
  }
);

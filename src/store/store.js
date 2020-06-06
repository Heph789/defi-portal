// store.js
import React, { createContext, useContext, useReducer } from "react";

const StoreContext = createContext();
const initialState = {
  web3: null,
  account: null,
  modals: { connectionPending: false },
  balances: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setWeb3":
      return {
        ...state,
        web3: action.web3
      };
    case "setWallet":
      return {
        ...state,
        wallet: action.wallet
      };
    case "setAccount":
      return {
        ...state,
        account: action.account
      };
    case "setModals":
      return {
        ...state,
        modals: action.modals
      };
    case "setPrices":
      return {
        ...state,
        prices: action.prices
      };
    case "setBalances":
      return {
        ...state,
        balances: action.balances
      };
    case "setMaker":
      return {
        ...state,
        maker: action.maker
      };
    case "disconnect":
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

import React, { createContext, useContext, useReducer } from 'react';

const AppStateContext = createContext();

const initialState = {
  user: {
    steamid: "",
    avatar: "",
    nickname: "",
    isSet: false,
  }
};

const getInitialState = () => ({
  user: {
    steamid: "",
    avatar: "",
    nickname: "",
    isSet: false,
  }
});

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ASSIGN_USER':
      return {...state, user: {...state.user, ...action.payload}};
    case 'RESET_STATE':
      return getInitialState();
    default:
      return state;
  }
}

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if(!context)
    throw new Error('Please use useAppState inside AppStateProvider!');

  return context;
}

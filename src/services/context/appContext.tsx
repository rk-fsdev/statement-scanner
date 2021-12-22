import React, { Dispatch } from 'react';
import { ModalBody } from '@chakra-ui/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum AppActionTypes {
  SET_AUTHENTICATED = 'SET_AUTHENTICATED',
  SET_MODAL_CONTENT = 'SET_MODAL_CONTENT',
  SET_MODAL_OPEN = 'SET_MODAL_OPEN',
}

interface AppState {
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalContent: React.ComponentType<any>;
  isModalOpen: boolean;
  modalTitle: string;
}

interface AppPayload {
  [AppActionTypes.SET_AUTHENTICATED]: {
    isAuthenticated: boolean;
  };
  [AppActionTypes.SET_MODAL_OPEN]: { isModalOpen: boolean };
  [AppActionTypes.SET_MODAL_CONTENT]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modalContent: React.ComponentType<any>;
    modalTitle: string;
  };
}

export type AppAction = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

export const appInitialState: AppState = {
  isAuthenticated: false,
  modalContent: ModalBody,
  isModalOpen: false,
  modalTitle: '',
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionTypes.SET_MODAL_CONTENT:
      return {
        ...state,
        isModalOpen: true,
        ...action.payload,
      };
    default:
      return {
        ...state,
        ...action.payload,
      };
  }
};

export const AppContext = React.createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
}>({
  state: appInitialState,
  dispatch: () => null,
});

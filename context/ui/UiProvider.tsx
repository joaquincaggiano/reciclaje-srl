import { FC, PropsWithChildren, useReducer } from "react";
import { UiContext, uiReducer } from "./";

export interface UiState {
  isMenuOpen: boolean;
  isModalOpen: boolean;
  isModalCancelChange: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
  isModalOpen: false,
  isModalCancelChange: false,
};

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: "[UI] - ToggleMenu" });
  };

  const toggleModalOpen = () => {
    dispatch({ type: "[UI] - ToggleModal" });
  };

  const toggleModalCancelChange = () => {
    dispatch({ type: "[UI] - ToggleModalCancelChange" });
  };

  const openModalChange = () => {
    dispatch({ type: "[UI] - openModalChange" });
  }

  return (
    <UiContext.Provider
      value={{
        ...state,

        // Methods
        toggleSideMenu,
        toggleModalOpen,
        toggleModalCancelChange,
        openModalChange
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

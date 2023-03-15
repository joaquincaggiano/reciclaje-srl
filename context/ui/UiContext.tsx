import { createContext } from "react";

interface ContextProps {
  isMenuOpen: boolean;
  isModalOpen: boolean;
  isModalCancelChange: boolean

  // Methods
  toggleSideMenu: () => void;
  toggleModalOpen: () => void;
  toggleModalCancelChange: () => void;
  openModalChange: () => void;
}

export const UiContext = createContext({} as ContextProps);

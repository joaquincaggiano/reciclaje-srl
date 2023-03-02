import { createContext } from "react";

interface ContextProps {
  isMenuOpen: boolean;
  isModalOpen: boolean;

  // Methods
  toggleSideMenu: () => void;
  toggleModalOpen: () => void;
}

export const UiContext = createContext({} as ContextProps);

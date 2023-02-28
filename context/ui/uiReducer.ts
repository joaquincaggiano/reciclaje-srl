import { UiState } from "./";

type UiActionType =
  | { type: "[UI] - ToggleMenu" }
  | { type: "[UI] - ToggleModal" }

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case "[UI] - ToggleMenu":
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    case "[UI] - ToggleModal":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    default:
      return state;
  }
};

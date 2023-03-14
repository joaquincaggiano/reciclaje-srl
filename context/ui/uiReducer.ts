import { UiState } from "./";

type UiActionType =
  | { type: "[UI] - ToggleMenu" }
  | { type: "[UI] - ToggleModal" }
  | { type: "[UI] - ToggleModalCancelChange" }

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
      case "[UI] - ToggleModalCancelChange":
      return {
        ...state,
        isModalCancelChange: !state.isModalCancelChange,
      };
    default:
      return state;
  }
};

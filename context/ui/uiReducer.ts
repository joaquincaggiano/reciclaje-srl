import { UiState } from "./";

type UiActionType =
  | { type: "[UI] - ToggleMenu" }
  | { type: "[UI] - ToggleModal" }
  | { type: "[UI] - ToggleModalCancelChange" }
  | {type: "[UI] - openModalChange"}

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
      case "[UI] - openModalChange":
      return {
        ...state,
        isModalCancelChange: true,
      };
    default:
      return state;
  }
};

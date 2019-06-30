import { CHANGE_VIEW_MODE } from "../main.constants";

export const changeViewMode = (viewMode: string) => {
  return {
    type: CHANGE_VIEW_MODE,
    payload: viewMode,
  }
}


import { PayloadAction } from "@reduxjs/toolkit";
import Settings from "../../settings/types/Settings";
import State from "../state";

export default function handleSetSettings(state: State, action: PayloadAction<Settings>) {
  if (state !== null)
    state.settings = action.payload
}
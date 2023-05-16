import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./state";

import handleAddFollows from "./actions/handleAddFollows";
import handleAddFollowers from "./actions/handleAddFollowers";
import handleRemoveFollows from "./actions/handleRemoveFollows";
import handleRemoveFollowers from "./actions/handleRemoveFollowers";

const following = createSlice({
  name: "following",
  initialState,
  reducers: {
    addFollows: handleAddFollows,
    addFollowers: handleAddFollowers,
    removeFollows: handleRemoveFollows,
    removeFollowers: handleRemoveFollowers
  }
})

export default following
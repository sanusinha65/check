import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: null,
  team_id: null,
  team_name: null,
  email: null,
  name: null,
  initials: null,
  plugin_installed_at: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.team_id = action.payload.team_id;
      state.team_name = action.payload.team_name;
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.initials = action.payload.initials;
      state.plugin_installed_at = action.payload.plugin_installed_at;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

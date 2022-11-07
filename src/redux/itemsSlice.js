import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid';

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItem: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({name, number}) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteItem(state, action) {
      const itemId = state.findIndex(item => item.id === action.payload);
      state.splice(itemId, 1);
    },
  },
});

export const { addItem, deleteItem } = itemsSlice.actions;
export const itemsReducer = itemsSlice.reducer;
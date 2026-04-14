// import { createSlice } from "@reduxjs/toolkit";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit/react";

// const addTodo = createSlice({
//   name: "Todo",
//   initialState: {
//     todoList: [] as string[],
//   },
//   reducers: {
//     add: (state, action) => {
//       state.todoList.push(action.payload);
//     },
//     remove: (state, action) => {
//       state.todoList = state.todoList.filter(
//         ( index) => index !== action.payload,
//       );
//     },
//   },
// });

// export const { add, remove } = addTodo.actions;

// export default addTodo.reducer;import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state , action: PayloadAction<string>) => {
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
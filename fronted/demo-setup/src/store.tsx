// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./features/counter/CounterSlice";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./features/counter/CounterSlice";
// import todoSlice from "./features/todo-store/";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     addTodo: todoSlice.,
//   },
// });


import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo-store/TodoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
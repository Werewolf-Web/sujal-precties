// import { createSlice } from "@reduxjs/toolkit";


// const counterSlice = createSlice({
//   name:"counter",
//   initialState:{
//     value:0
//   },
//   reducers:{
  //     increment:(state)=>{
//       state.value +=1;
//     },
//     decrement:(state)=>{
  //       state.value -=1;
//     },
//     reset:(state)=>{
  //       state.value=0;
  //     },
  // },})

  // export const {increment,decrement,reset} = counterSlice.actions;
  // export default counterSlice.reducer;

  // =================================================   api using createAsyncThunk   =================================================
  

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchData = createAsyncThunk(
//   "data/fetchData",
//   async () => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users");
//     return res.json();
//   }
// );

// const userSlice = createSlice({
  //   name:"UserData",
  //   initialState:{
    //     data:[],
    //     loading:false,
    //     error:null as string | null,
    //   },
    //   reducers:{},
    //   extraReducers:(builder)=>{
      //     builder
//       .addCase(fetchData.pending,(state)=>{
  //         state.loading = true;
//       })
// .addCase(fetchData.fulfilled, (state, action) => {
  //   state.loading = false;
//   state.data = action.payload;
// })
//       .addCase(fetchData.rejected,(state)=>{
  //         state.loading = false ;
  //         // state.error = action.error.message;
  //       })
  //   }
  // })
  
  // export default userSlice.reducer;
  
  

  import { createSlice } from "@reduxjs/toolkit";

  const countClice = createSlice({
    name:"counter",
  initialState:{
    value:0
  },
  reducers:{
    increment:(state)=>{
      state.value +=1;
    },
    decrement:(state)=>{
      state.value -=1;
    },
    resetValue:(state)=>{
      state.value=0;
    }
  }
})

export const {increment, decrement,resetValue} = countClice.actions;
export default countClice.reducer;


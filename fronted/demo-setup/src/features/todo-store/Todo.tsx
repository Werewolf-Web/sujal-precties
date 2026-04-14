

// import { useState } from "react";
// import { set } from "zod";

// const Todo = () => {
//   const [addToDo, setAddToDo] = useState<string>("");
//   const [todoList, setTodoList] = useState<string[]>([]);
//   const [compliteTodoList, setCompliteTodoList] = useState<string[]>([]);

//   const handleToDo = () => {
//     if (addToDo.trim() === "") return;
//     setTodoList([...todoList, addToDo]);
//     setAddToDo("");
//   };
  
//   const handleComplite=(item: string)=>{
//     setCompliteTodoList([...compliteTodoList,item])
//     const newTodoList=todoList.filter((todo)=>todo!==item)
//     setTodoList(newTodoList)
//   }
//     const handleCompliteReset=(item: string)=>{
//     setTodoList([...todoList,item])
//     const newCompliteTodoList=compliteTodoList.filter((todo)=>todo!==item)
//     setCompliteTodoList(newCompliteTodoList)
//   }
  
//   console.log('Completed Todo List:', compliteTodoList);
//   return (
//     <>
//       <div className="d-flex">
//         <div className="mx-5">
//           <h3>Add Todo List</h3>
//           <div className="d-flex gap-3 align-items-center">
//             <input
//               className="border"
//               type="text"
//               placeholder="Enter todo item"
//               value={addToDo}
//               onChange={(e) => {
//                 setAddToDo(e.target.value);
//               }}
//             />
//             <button
//               onClick={() => {
//                 handleToDo();
//               }}
//               className="btn btn-primary"
//             >
//               Add
//             </button>
//           </div>
//         </div>
//         <div>
//           <h3 className="mx-5">Todo List</h3>
//           <div>
//             {todoList.map((item, index) => {
//               return (
//                 <div key={index} className="d-flex gap-3 align-items-center">
//                   <input type="checkbox" value={item} onClick={() => handleComplite(item)} />
//                   <p>{item}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <div className="mx-5">
//             <div className="d-flex gap-4">

//           <h3>Complite Todo List</h3>
//           <button className="btn btn-success" onClick={() => setCompliteTodoList([])}>clear</button>
//             </div>
//           <div className=" gap-3 align-items-center">
//             {compliteTodoList.map((item, index) => {
//               return (
//                 <>
//                 <div key={index} className="d-flex gap-3 align-items-center">
//                   <input checked type="checkbox" value={item} onClick={() => handleCompliteReset(item)}  />
//                   <del>{item}</del>
//                 </div><br />
//                 </>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Todo;



// // user.email=darshak.netsol@gmail.com
// // user.name=Darshak
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, toggleTodo } from "./TodoSlice";

function TodoApp() {
  const [text, setText] = useState("");

  const todos = useSelector((state : any) => state.todos); // get data
  const dispatch = useDispatch(); // send actions

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <div>
      <h2>Todo List</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo :any) => (
          <li key={todo.id}>
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => dispatch(removeTodo(todo.id))}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
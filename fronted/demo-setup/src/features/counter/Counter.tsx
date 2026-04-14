import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, resetValue } from "./CounterSlice";
import { useState } from "react";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: any) => state.counter);
    const [number, setNumber] = useState(0)
  return (
    <>
    <div className="text-center container">
<h3>{count.value}</h3>
      <div className="d-flex gap-5 align-items-center justify-content-center">

<button className="bg-primary text-white h-75 w-15 rounded"
        onClick={() => {
          dispatch(increment());
        }}
      >
        +
      </button>
      <button
      className="bg-primary text-white h-50 w-15 rounded" 
      onClick={()=>{
        dispatch(decrement())
      }}>-</button>
      <button
      className="bg-primary text-white h-50 w-15 rounded"
      onClick={()=>{
        dispatch(resetValue())
      }}>Reset</button>
      </div>
      
    </div>
      
        <div>
            <h3>{number}</h3>
                    <div className="d-flex gap-5">
                        <button 
                         className="bg-primary text-white h-50 w-15 rounded" 
                        onClick={()=>{
                            setNumber(number+1)
                        }}>+</button>
                        <button
                         className="bg-primary text-white h-50 w-15 rounded" 
                        onClick={()=>{
                            setNumber(number-1)
                        }}>-</button>
                        <button
                         className="bg-primary text-white h-50 w-15 rounded" 
                        onClick={()=>{

                            setNumber(0)
                        }}>reset</button>
                    </div>
        </div>

    </>
  );
};

export default Counter;

import React, { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

const getItems = () => {
  if (typeof window !== "undefined") {
    const items = localStorage.getItem("todo");
    if (items) {
      return JSON.parse(items);
    } else {
      return [];
    }
  } else {
    return [];
  }
};
const Todos = () => {
  const [todo, setTodo] = useState("");
  const [localItems, setLocalItems] = useState([]);

  const handleTodo = (todo) => {
    setTodo(todo.target.value);
  };
  const addTodo = () => {
    // setLocalItems((pre) => {
    //   return [...pre, todo];
    // });
    setLocalItems([...localItems, todo]);
  };

  //setting the data to the localStorage...
  useEffect(() => {
    if (!todo) {
      console.log("object");
      return;
    } else {
      localStorage.setItem("todo", JSON.stringify(localItems));
      setTodo("");
    }
  }, [localItems]);

  // getting the data from localStorage...
  
  // useEffect(() => {
  //   const items = localStorage.getItem("todo");
  //   if (items) {
  //     setLocalItems(JSON.parse(items));
  //   } else {
  //     setLocalItems([]);
  //   }
  // }, []);

  // removing data...

  const removeTodo = (cur) => {
    const newItems = localItems.filter((item) => item !== cur);
    console.log(newItems);
    setLocalItems(newItems);
  };

  return (
    <div className="w-full text-center">
      <h1 className="text-gray-500 capitalize text-5xl font-normal tracking-wider">
        List Todo
      </h1>
      <div className="flex flex-col justify-start items-start  mt-16">
        <div className="flex justify-center items-center  w-full mx-auto space-x-4">
          <input
            type="text"
            placeholder="enter todos..."
            onChange={handleTodo}
            value={todo}
            className="md:w-[50%] w-[70%]  p-3 text-xl outline-none focus:ring-0 tracking-wider text-center text-gray-600 border-gray-400 border-b bg-transparent"
          />
          <button
            onClick={addTodo}
            className="text-xl tracking-wider bg-green-500 text-white font-light px-5 py-2 rounded-lg outline-none hover:bg-green-600 transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add
          </button>
        </div>
        <div className="list md:w-[50%] w-[95%] mx-auto mt-12">
          {localItems.map((cur, id) => (
            <div
              key={id}
              className="flex justify-evenly items-center my-5  bg-[#5550bd]/10 p-4 rounded-xl"
            >
              <div className="flex-1">
                <h2 className="text-3xl font-light text-gray-500 tracking-wider capitalize">
                  {cur}
                </h2>
              </div>
              <div className="flex-1 flex justify-evenly items-center">
                {/* <ModeEditOutlinedIcon className="text-green-500/60 text-3xl cursor-pointer" /> */}

                <DeleteOutlineOutlinedIcon
                  onClick={() => removeTodo(cur)}
                  className="text-red-500/60 text-3xl cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Todos;

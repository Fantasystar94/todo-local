import React, { createContext, useReducer, useContext, useEffect, useState } from "react";

// 초기 상태
const initialState = {
  todos: [
    { id: 1, content: "샘플1", date: "2024-11-15", category: "위생" },
    { id: 2, content: "샘플2", date: "2024-11-16", category: "운동" },
    { id: 3, content: "샘플3", date: "2024-11-17", category: "자기개발" },
  ],
};

const defaultCategory = "전체";

// 리듀서 함수
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "MODI_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        ),
      };
    case "DELETE_TODO":
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };
    default:
      return state;
  }
};

// TodoContext 생성
const TodoContext = createContext();

// TodoProvider 컴포넌트
export const TodoProvider = ({ children }) => {
  let savedTodos = [];
  if(localStorage.getItem("todolist")){
    savedTodos = JSON.parse(localStorage.getItem("todolist"))
  }
  else{
    savedTodos = initialState.todos;
  }
  const [state, dispatch] = useReducer(todoReducer, { todos: savedTodos });
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  // todos 상태가 변경될 때 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch, selectedCategory, setSelectedCategory }}>
      {children}
    </TodoContext.Provider>
  );
};

// useTodos 훅
export const useTodos = () => useContext(TodoContext);
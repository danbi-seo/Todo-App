import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <>
      <h2>🙌 오늘의 할일</h2>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue(""); //input창 비우기
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [editing, setEditing] = useState(false);   //새로운 state 추가

  // 수정시 호출될 핸들러
  const handlerEditing = () => {
    if(editing) {
      setTodoList((prev) => prev.map((el) => el.id === todo.id ? {...el, content : inputValue} : el)
    );
  setEditing(false);
  } else {
  setInputValue(todo.content);
  setEditing(true);
  }
};

  // 할일완료 클릭시 호출될 핸들러
  const handlerCompleted = () => {
    setTodoList((prev) => {
      return prev.map((el) => el.id === todo.id ? {...el, completed: !el.completed } : el);
    });
  };

  return ( //할일완료시 취소선 넣기
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {editing ? (
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />) : (<span>{todo.content}</span>)}
      <button
        onClick={handlerEditing}>
          {editing ? "저장" : "수정"}
      </button>

      <button
        onClick={() => {
          if (editing) {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
          setEditing(false);
        } else {
          setInputValue(todo.content);
          setEditing(true);
          }
        }}
      >
        삭제
      </button>

      <button 
        onClick={handlerCompleted}>
        할일완료!
      </button>
    </li>

  );
}

export default App;

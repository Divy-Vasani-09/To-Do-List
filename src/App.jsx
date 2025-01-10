import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { createBrowserRouter } from 'react-router-dom';
// import './App.css'

function App() {
  

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (e) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  const handleEdit = (e, id) => { 
    let t = todos.filter(i=>i.id==id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-4 bg-violet-200 min-h-[80vh] w-1/2">
      <h1 className='font-bold text-center text-xl '>iTask - Manage your to-dos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a To-do</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-600 hover:bg-violet-800 disabled:bg-violet-400 p-2 py-1 text-sm text-white font-bold rounded-md'>Save</button>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} id="" className='cursor-pointer my-3'/> Show Finished
        <h2 className='text-lg font-bold'>Your To-Dos</h2>
        <div className='todos'>
          {todos.length === 0 && <div className='m-5'>No todos to display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) &&  <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
              <div className='flex gap-5'>
                <input className='cursor-pointer' onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e)=> handleEdit(e, item.id)} className='bg-violet-600 hover:bg-violet-800 p-2 py-1  mx-4 text-sm text-white font-bold rounded-md'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-600 hover:bg-violet-800 p-2 py-1  mx-4 text-sm text-white font-bold rounded-md'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

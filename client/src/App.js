import './App.css';
import {Routes, Route} from 'react-router-dom'
import Palindrome from './pages/Palindrome';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import FilesServer from './pages/FilesServer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CourseApp from './pages/Courseapp';
import Counter from './component/Counter';
function App() {
 
  setInterval(()=>{
    // setCount(count+1)

  },5000)
    return (
    <div className="App">
      
      
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/palindrome" element={<Palindrome/>}></Route>
        <Route path="/todo" element={<TodoList/>}></Route>
        <Route path="/file" element={<FilesServer/>}></Route>
        <Route path="/file" element={<CourseApp/>}></Route>
        <Route path="counter" element={<Counter/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;

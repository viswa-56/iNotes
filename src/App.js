import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import About from './components/about';
import NotesState from './context/notes/NotesState';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Alert from './components/alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
// import CombinedLogin from './components/combinedlogin'

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
    <NotesState>
      <BrowserRouter>
        <Navbar/>
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route path="/about" element={<About showAlert={showAlert}/>} />
          <Route path="/" element={<Home showAlert={showAlert}/>} />
          {/* <Route path="/login" element={<CombinedLogin showAlert={showAlert}/>} /> */}
          <Route path="/login" element={<Login showAlert={showAlert}/>} />
          <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
        </Routes>
        </div>
      </BrowserRouter>
    </NotesState>
    </>
  );
}

export default App;

import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/ntoes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App(props) {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 3000);
  }
  return (
    <div>
      <NoteState>
      <Router>
      <Navbar/>
  
      <div>
      <Alert alert={alert}/>
      </div>
      <div className='container'>
      <Routes>
      <Route exact path="/about" element={<About />} />
      <Route path="/" element={<Home showAlert={showAlert}/>} />
      <Route path="/login" element={<Login showAlert={showAlert}/>} />
      <Route path="/signup" element={<Signup showAlert={showAlert}/>} />

      </Routes>
      </div>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;

import './App.css';
// import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Form from "./components/Form";
import Eventreg from "./components/Eventreg"


function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes >
          <Route exact path='/spotregistration' element={<Form/>} />
          <Route path='/eventreg' element={<Eventreg/>}/>
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

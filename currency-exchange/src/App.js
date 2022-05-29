import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Converter from './routes/converter/converter.coimponent';
import Currencies from './routes/currencies/Header';


function App() {
  <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>} />      
        <Route path='converter' element={<Converter/>} />      
        <Route path='rates' element={<Currencies/>} />      
      </Route>           
    </Routes> 
}

export default App;
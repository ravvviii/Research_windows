import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Research from './pages/research';




function App() {
  return (
    
    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/research' element={<Research />} />
      <Route path='/profile' element={<Profile />} />
      
      
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;

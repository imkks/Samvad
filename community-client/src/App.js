import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { RequiredAuth } from './components/RequiredAuth';
import Signup from './components/Signup';
import WebChat from './components/WebChat';
import { AuthProvider } from './contexts/AuthContext';
function App() {
  return (
      <>
      <div className="bg-primary text-center">
        <h2 className="text-light">A chaating App</h2>
        </div>
      <BrowserRouter>
      <AuthProvider>
      <Routes>
          <Route path="/" element={<RequiredAuth><WebChat/></RequiredAuth>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>

      </Routes>
      </AuthProvider>
      </BrowserRouter>
      </>
  );
}

export default App;

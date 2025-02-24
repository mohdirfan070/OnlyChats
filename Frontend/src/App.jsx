import './App.css';

import { AuthContextProvider } from './contexts/AuthContext';
import { UserContextProvider } from './contexts/UserContextProvider';
import { UseSocketServiceProvider } from './services/socketService/useSocketService.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import {Home} from './pages/Home/Home.jsx';
import { CurrentChatUserProvider } from './contexts/Chats/CurrentChatUser.jsx';
import Signup from './pages/Signup/Signup.jsx';

function App() {


 
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <UseSocketServiceProvider>
          <CurrentChatUserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path="/signup" element={<Signup/>}  />
          </Routes>
        </BrowserRouter>
          </CurrentChatUserProvider>
        </UseSocketServiceProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
